"""Mide el movimiento técnico P01 y el joystick táctil corto en Chromium local."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from functools import partial
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def run():
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True,
                                         args=['--no-sandbox', '--disable-dev-shm-usage'])
            context = browser.new_context(viewport={'width': 390, 'height': 844},
                                          is_mobile=True, has_touch=True, device_scale_factor=3)
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
            page.goto(origin + '/dev.html', wait_until='networkidle')
            assert page.locator('#technical-ready').is_visible(), 'Falló el arranque de P01'
            assert not errors, errors
            page.locator('#btn-technical-start').click()
            page.wait_for_function("G.Game.state === 'playing' && G.Game.player")
            box = page.locator('#game').bounding_box()
            x, y = box['x'] + box['width'] * .4, box['y'] + box['height'] * .55
            page.dispatch_event('#game', 'pointerdown', {'pointerId': 17, 'pointerType': 'touch',
                                                          'clientX': x, 'clientY': y, 'bubbles': True})
            page.dispatch_event('#game', 'pointermove', {'pointerId': 17, 'pointerType': 'touch',
                                                          'clientX': x + 10, 'clientY': y, 'bubbles': True})
            vector = page.evaluate('G.Touch.vector()')
            start = page.evaluate('({x:G.Game.player.x,y:G.Game.player.y,t:G.Game.st.time})')
            page.wait_for_timeout(500)
            end = page.evaluate('({x:G.Game.player.x,y:G.Game.player.y,t:G.Game.st.time})')
            elapsed = end['t'] - start['t']
            speed = ((end['x'] - start['x']) ** 2 + (end['y'] - start['y']) ** 2) ** .5 / elapsed
            assert vector and vector[0] >= .9 and abs(vector[1]) < .001, {
                'failure': 'joystick corto debe dar fuerza >= 0.9', 'vector10px': vector,
                'measuredWorldUnitsPerGameSecond': speed, 'elapsedGameSeconds': elapsed}
            assert 160 <= speed <= 170, {'failure': 'velocidad fuera de 1.5x solicitado (165)',
                                  'measuredWorldUnitsPerGameSecond': speed, 'elapsedGameSeconds': elapsed}
            assert not errors, errors
            print(json.dumps({'status': 'PASS', 'vector10px': vector,
                              'measuredWorldUnitsPerGameSecond': speed,
                              'elapsedGameSeconds': elapsed}, ensure_ascii=False))
            context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    run()
