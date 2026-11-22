const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/android-release.yml'), 'utf8');
const docs = fs.readFileSync(path.join(root, 'BUILD_APK_ON_GITHUB.md'), 'utf8');
const checks = [
  ['release asset is explicitly debug APK', workflow.includes('Build debug APK (not production-signed)') && workflow.includes('mindmagic-debug.apk')],
  ['release is marked prerelease', /prerelease:\s*true/.test(workflow)],
  ['debug APK is copied with clear name', /cp app\/build\/outputs\/apk\/debug\/app-debug\.apk mindmagic-debug\.apk/.test(workflow)],
  ['checksum matches renamed APK', /sha256sum mindmagic-debug\.apk > mindmagic-debug\.apk\.sha256/.test(workflow)],
  ['release name indicates debug build', /MindMagic Debug APK/.test(workflow)],
  ['docs warn release is debug not production signed', docs.includes('debug APK, not a production-signed release APK')],
];
for (const [name, ok] of checks) { if (!ok) { console.error('FAIL:', name); process.exitCode = 1; } else console.log('PASS:', name); }
console.log(`${checks.filter(x => x[1]).length}/${checks.length} checks passed`);
