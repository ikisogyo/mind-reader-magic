const fs = require('fs');
for (const file of ['.github/workflows/android-build.yml', '.github/workflows/android-release.yml']) {
  const workflow = fs.readFileSync(file, 'utf8');
  const step = workflow.split('- name: Accept Android SDK licenses')[1]?.split('- name: Install Android platform')[0] || '';
  if (!step.includes('yes | sdkmanager --licenses')) throw new Error(`${file}: license acceptance pipeline missing`);
  if (!step.includes('sdkmanager_status=${PIPESTATUS[1]}')) throw new Error(`${file}: sdkmanager exit status not captured`);
  if (!step.includes('exit "$sdkmanager_status"')) throw new Error(`${file}: sdkmanager status not propagated`);
  if (step.includes('set -o pipefail')) throw new Error(`${file}: upstream yes SIGPIPE must not fail pipeline`);
}
console.log('PASS both workflows preserve sdkmanager status while avoiding upstream yes SIGPIPE false failure');
console.log('2/2 workflow checks passed');
