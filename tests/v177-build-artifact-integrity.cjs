const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const build = fs.readFileSync(path.join(root, '.github/workflows/android-build.yml'), 'utf8');
const checks = [
  ['test loop fails fast', build.includes('Run JavaScript regression tests') && build.includes('set -e\n          for test in tests/*.cjs')],
  ['APK file checked before upload', /test -s app\/build\/outputs\/apk\/debug\/app-debug\.apk/.test(build)],
  ['checksum generated', /sha256sum app\/build\/outputs\/apk\/debug\/app-debug\.apk > app-debug\.apk\.sha256/.test(build)],
  ['APK and checksum both uploaded', /path:[\s\S]*app\/build\/outputs\/apk\/debug\/app-debug\.apk[\s\S]*app-debug\.apk\.sha256/.test(build)],
  ['missing files fail upload', /if-no-files-found: error/.test(build)],
];
for (const [name, ok] of checks) { if (!ok) { console.error('FAIL:', name); process.exitCode = 1; } else console.log('PASS:', name); }
console.log(`${checks.filter(x => x[1]).length}/${checks.length} checks passed`);
