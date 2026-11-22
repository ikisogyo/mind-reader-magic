const fs=require('fs');
const workflow=fs.readFileSync('.github/workflows/android-build.yml','utf8');
const checks=[
  ['SDK license acceptance is not masked',workflow.includes('yes | sdkmanager --licenses') && !workflow.includes('sdkmanager --licenses || true')],
  ['SDK license pipeline captures sdkmanager status without yes SIGPIPE false failure',workflow.includes('sdkmanager_status=${PIPESTATUS[1]}') && workflow.includes('exit \"${sdkmanager_status}\"') && !workflow.split('- name: Accept Android SDK licenses')[1]?.split('- name: Install Android platform')[0].includes('set -o pipefail')],
  ['SDK install is a separate step',workflow.includes("sdkmanager 'platforms;android-35' 'build-tools;35.0.0' 'platform-tools'")],
  ['toolchain versions are logged',workflow.includes('gradle --version') && workflow.includes('java -version')],
  ['Gradle build includes stacktrace',workflow.includes('gradle --no-daemon --stacktrace assembleDebug')],
  ['APK output is verified before upload',workflow.includes('test -s app/build/outputs/apk/debug/app-debug.apk')],
  ['APK artifact upload remains enabled',workflow.includes('upload-artifact@v4') && workflow.includes('if-no-files-found: error')]
];
for(const [name,ok] of checks) console.log(`${ok?'PASS':'FAIL'} ${name}`);
if(checks.some(([,ok])=>!ok)) process.exit(1);
console.log(`${checks.length}/${checks.length} passed`);
