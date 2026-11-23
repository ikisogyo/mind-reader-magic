const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const build = fs.readFileSync(path.join(root, 'app/build.gradle'), 'utf8');
const release = fs.readFileSync(path.join(root, '.github/workflows/android-release.yml'), 'utf8');
const docs = fs.readFileSync(path.join(root, 'BUILD_APK_ON_GITHUB.md'), 'utf8');
const version = build.match(/versionCode\\s+(\\d+);?\\s*versionName\\s+'([^']+)'/);
const checks = [
  ['versionCode matches current release metadata', !!version && new RegExp('versionCode\\\\s+' + version[1]).test(build)],
  ['versionName matches current release metadata', !!version && build.includes("versionName '" + version[2] + "'")],
  ['tag trigger v*', /tags:\s*- 'v\*'/.test(release)],
  ['tag verification is skipped for manual dispatch', /Verify release tag matches app version\s+if: startsWith\(github\.ref, 'refs\/tags\/'\)/.test(release)],
  ['manual workflow uploads APK artifact', release.includes('Upload APK artifact for manual workflow runs') && release.includes("if: always() && github.event_name == 'workflow_dispatch'") || release.includes("if: github.event_name == 'workflow_dispatch'")],
  ['release publication is tag-push only', release.includes('Publish clearly labeled debug APK GitHub Release') && release.includes("if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')")],
  ['release workflow regression loop', release.includes('for test in tests/*.cjs')],
  ['APK output is verified', /test -s app\/build\/outputs\/apk\/debug\/app-debug\.apk/.test(release)],
  ['checksum generated for renamed release asset', /sha256sum mindmagic-debug\.apk > mindmagic-debug\.apk\.sha256/.test(release)],
  ['release assets uploaded', /uses: softprops\/action-gh-release@v2/.test(release)],
  ['tag procedure documented', docs.includes('git push origin v0.3.192')],
];
for (const [name, ok] of checks) { if (!ok) { console.error('FAIL:', name); process.exitCode = 1; } else console.log('PASS:', name); }
console.log(`${checks.filter(x => x[1]).length}/${checks.length} checks passed`);
