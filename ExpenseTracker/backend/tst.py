import sys
import unittest

unittest.main(module=None, argv=['', 'discover', '-s', 'tests'])
sys.path.append(".")

# Traceback (most recent call last):
  File "<frozen runpy>", line 198, in _run_module_as_main
  File "<frozen runpy>", line 88, in _run_code
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\__main__.py", line 18, in <module>
    main(module=None)
    ~~~~^^^^^^^^^^^^^
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\main.py", line 103, in __init__
    self.parseArgs(argv)
    ~~~~~~~~~~~~~~^^^^^^
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\main.py", line 119, in parseArgs
    self._do_discovery(argv[2:])
    ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\main.py", line 242, in _do_discovery
    self.createTests(from_discovery=True, Loader=Loader)
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\main.py", line 149, in createTests
    self.test = loader.discover(self.start, self.pattern, self.top)
                ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\singale-admin\AppData\Local\Programs\Python\Python313\Lib\unittest\loader.py", line 308, in discover
    raise ImportError('Start directory is not importable: %r' % start_dir)
# ImportError: Start directory is not importable: 'tests'