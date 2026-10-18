"""Pages smoke test: --live checks the deployed game; otherwise virtual HTTPS.
Uses an isolated browser, without real accounts or stored player data.
"""
from pathlib import Path
from urllib.parse import urlparse, unquote
from playwright.sync_api import sync_playwright
import argparse, json, mimetypes

ROOT=Path(__file__).resolve().parents[1]
BASE='https://deteco.github.io/SCPSurvivor/'

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true')
    args=parser.parse_args();mode='live' if args.live else 'virtual-https'
    out=ROOT/'tests/artifacts/v2-pages'/mode;out.mkdir(parents=True,exist_ok=True)
    records=[]
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True)
        for mobile,query in [(False,''),(True,'?rapida=1')]:
            context=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},
                has_touch=mobile,is_mobile=mobile)
            page=context.new_page();errors=[];external=[];bad=[]
            page.on('pageerror',lambda error:errors.append(str(error)))
            page.on('console',lambda message:errors.append(message.text) if message.type=='error' else None)
            page.on('response',lambda response:bad.append([response.status,response.url]) if response.status>=400 else None)
            def route(request):
                url=request.request.url
                if not url.startswith(BASE):
                    external.append(url);request.abort();return
                if args.live:
                    request.continue_();return
                name=unquote(urlparse(url).path[len('/SCPSurvivor/'):]) or 'index.html'
                target=(ROOT/name).resolve()
                if not target.is_relative_to(ROOT) or not target.is_file():
                    request.fulfill(status=404,body='Not found');return
                content_type=mimetypes.guess_type(target.name)[0] or 'application/octet-stream'
                request.fulfill(status=200,body=target.read_bytes(),content_type=content_type)
            page.route('**/*',route)
            page.goto(BASE+query,wait_until='networkidle',timeout=60000)
            page.wait_for_selector('#btn-technical-start:visible')
            assert page.evaluate('G.MapTrial.enabled && G.MapTrial.publicDemo')
            assert page.get_by_text('Desarrollado por Ivan Vivanco',exact=True).is_visible()
            assert page.locator('header .version').inner_text()=='ALFA · DEMO V2'
            assert 'Demo web' in page.locator('#technical-account-hint').inner_text()
            assert page.locator('#loadout-mods-0 input, #loadout-mods-1 input').count()==0
            page.click('#btn-technical-start')
            page.wait_for_function('() => G.Game.state === "playing" && !!G.Expedition.state.v2')
            assert page.evaluate('!G.LocalAccounts.enabled && !G.InventoryTrial.enabled && !G.DimensionalRifts.enabled && G.RunCheckpoint.capture()===null')
            page.click('#btn-technical-pause')
            clock=page.evaluate('G.Expedition.state.v2.mapTime')
            assert (270<=clock<275) if mobile else (0<=clock<5)
            page.wait_for_timeout(150)
            assert page.evaluate('G.Expedition.state.v2.mapTime')==clock
            page.click('#btn-technical-resume')
            page.wait_for_function('(clock) => G.Expedition.state.v2.mapTime > clock',arg=clock)
            screenshot=out/('touch.png' if mobile else 'desktop.png')
            page.screenshot(path=str(screenshot))
            assert not errors,errors
            assert not external,external
            assert not bad,bad
            records.append({'url':BASE+query,'touchEmulated':mobile,'clockAtPause':clock,
                'started':True,'accountsEnabled':False,'checkpoint':None,'javascriptErrors':errors,
                'unexpectedNetwork':external,'httpFailures':bad,'status':'PASS'})
            context.close()
        browser.close()
    result={'mode':mode,'records':records,'limits':'Smoke test of menu, start, pause and account isolation; not balance, five-minute human play or physical mobile acceptance.'}
    (out/'results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=True))

if __name__=='__main__':main()
