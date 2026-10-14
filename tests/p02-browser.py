"""Compatible test entry: P02 evolved into the current P03 integration flow.
Historical P02 outcomes are documented separately in docs/P02-validation.json.
"""
from pathlib import Path
import runpy
if __name__ == '__main__':
    runpy.run_path(str(Path(__file__).with_name('p03-browser.py')), run_name='__main__')
