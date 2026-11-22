const fs=require('fs'),assert=require('assert');
const w=fs.readFileSync('.github/workflows/android-build.yml','utf8');
assert(w.includes('pull_request:'),'PRs targeting main/master run Android CI');
assert(w.includes('group: android-build-${{ github.ref }}'),'builds are grouped by ref');
assert(w.includes('cancel-in-progress: true'),'superseded runs are cancelled');
assert(w.includes('retention-days: 14'),'APK artifact has bounded retention');
assert(w.includes('assembleDebug'),'workflow still builds APK');
assert(w.includes('mindmagic-debug-apk'),'workflow still uploads APK artifact');
console.log('v168 CI trigger/retention checks: 6 passed');
