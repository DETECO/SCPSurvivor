"""INC-MOVIL-002: armería sin solapamientos y con ficha visual completa."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
import json
import os

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get("SCP_INC_MOVIL_002_OUTPUT", Path(os.environ.get("TEMP", ".")) / "inc-movil-002-armory"))
ENTRY = os.environ.get("SCP_ARMORY_ENTRY", "dev.html")
assert ENTRY in ("dev.html", "index.html")
VIEWPORTS = [
    ("320x568", 320, 568, True),
    ("375x667", 375, 667, True),
    ("390x844", 390, 844, True),
    ("844x390", 844, 390, True),
    ("pc", 1280, 800, False),
]


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = Server(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    results = []
    problems = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True, channel="chrome")
            for name, width, height, mobile in VIEWPORTS:
                context = browser.new_context(
                    viewport={"width": width, "height": height},
                    is_mobile=mobile,
                    has_touch=mobile,
                )
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(
                    f"http://127.0.0.1:{server.server_port}/{ENTRY}?prueba=combate-v2&gacha=prueba&cofres=prueba&graficos=32"
                )
                page.wait_for_selector("#operations-menu:visible")
                page.locator('[data-open-screen="weapons"]:visible').first.click()
                page.wait_for_selector("#armory-014:visible")
                page.wait_for_function("() => { const image=document.querySelector('.armory014-image'); return image?.complete && image.naturalWidth > 0; }")
                page.locator('[data-armory-weapon="shotgun"]').click()
                page.screenshot(path=str(OUT / f"armory-{name}.png"))
                result = page.evaluate("""() => {
                  const box = el => { const r=el.getBoundingClientRect(); return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}; };
                  const root=document.querySelector('#armory-014');
                  const head=root.querySelector('.armory014-head');
                  const body=root.querySelector('.armory014-body');
                  const detail=root.querySelector('.armory014-detail');
                  const controls=root.querySelector('.armory014-controls');
                  const stage=root.querySelector('.armory014-stage');
                  const image=root.querySelector('.armory014-image');
                  const panel=box(root), h=box(head), b=box(body), d=box(detail), c=box(controls);
                  const grid=getComputedStyle(body);
                  const outside=(x,y)=>x.left<y.left-1||x.right>y.right+1||x.top<y.top-1||x.bottom>y.bottom+1;
                  const intersect=(x,y)=>x.left<y.right-1&&x.right>y.left+1&&x.top<y.bottom-1&&x.bottom>y.top+1;
                  const clipped=[...detail.querySelectorAll('.armory014-metric,.armory014-no-profile')]
                    .filter(el=>outside(box(el),d)).length;
                  const img=box(image);
                  return {
                    viewport:[innerWidth,innerHeight],
                    root:panel,head:h,body:b,stage:box(stage),detail:d,controls:c,image:img,
                    bodyGrid:{rows:grid.gridTemplateRows,minHeight:grid.minHeight,overflow:grid.overflow},
                    detailStyle:{height:getComputedStyle(detail).height,minHeight:getComputedStyle(detail).minHeight,overflow:getComputedStyle(detail).overflow,scrollHeight:detail.scrollHeight,clientHeight:detail.clientHeight},
                    headBodyOverlap:intersect(h,b), detailControlsOverlap:intersect(d,c),
                    detailContentsOutside:clipped,
                    documentScroll:document.documentElement.scrollWidth>innerWidth||document.documentElement.scrollHeight>innerHeight,
                    summary:{total:G.Armory014.getCards().length,selectable:G.Armory014.getCards().filter(card=>card.selectable).length},
                    spriteIntrinsic:[image.naturalWidth,image.naturalHeight]
                  };
                }""")
                if result["headBodyOverlap"]:
                    problems.append(f"{name}: el encabezado se cruza con el contenido")
                if result["detailControlsOverlap"]:
                    problems.append(f"{name}: la ficha se cruza con el carrusel")
                if result["detailContentsOutside"]:
                    problems.append(f"{name}: {result['detailContentsOutside']} bloques de ficha exceden su panel")
                if result["documentScroll"]:
                    problems.append(f"{name}: aparece desplazamiento de página")
                if result["summary"] != {"total": 13, "selectable": 4}:
                    problems.append(f"{name}: el catálogo no distingue diseños y modelos equipables: {result['summary']!r}")
                results.append({"name": name, **result, "errors": errors})
                if name == "844x390":
                    page.locator('[data-armory-weapon="shotgun"]').click()
                    page.wait_for_function("() => { const image=document.querySelector('.armory014-image'); return image?.complete && image.naturalWidth > 0; }")
                    page.screenshot(path=str(OUT / "armory-844x390-shotgun.png"))
                    sprite = page.evaluate("""() => {
                      const image=document.querySelector('.armory014-image');
                      return {src:image.currentSrc,natural:[image.naturalWidth,image.naturalHeight],box:(()=>{const r=image.getBoundingClientRect();return [r.width,r.height]})()};
                    }""")
                    # The approved sprite remains unmodified; its alpha bounds are 29/32 of the square.
                    visible_width = min(sprite["box"]) * 29 / 32
                    if "shotgun-32.png" not in sprite["src"] or visible_width < 120:
                        problems.append(f"844x390: la escopeta se ve demasiado pequeña: {sprite}")
                    results[-1]["shotgunSprite"] = sprite
                if errors:
                    problems.append(f"{name}: errores JS: {errors}")
                context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    report = {"status": "PASS" if not problems else "FAIL", "results": results, "problems": problems}
    (OUT / "armory-layout.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    assert not problems, "; ".join(problems)


if __name__ == "__main__":
    main()
