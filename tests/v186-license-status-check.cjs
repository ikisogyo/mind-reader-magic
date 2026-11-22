const fs = require('fs');
const files = ['.github/workflows/android-build.yml', '.github/workflows/android-release.yml'];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const segment = text.split('- name: Accept Android SDK licenses')[1]?.split('- name: Install Android platform')[0];
  if (!segment) throw new Error(`Missing license step in ${file}`);
  const capture = segment.indexOf('sdkmanager_status=${PIPESTATUS[1]}');
  const propagate = segment.indexOf('exit "$sdkmanager_status"');
  if (capture < 0 || propagate < capture) throw new Error(`sdkmanager exit code capture/propagation order invalid: ${file}`);
  if (/set -o pipefail/.test(segment)) throw new Error(`pipefail causes yes SIGPIPE false failure: ${file}`);
}
console.log('PASS sdkmanager failure status is captured and propagated in both CI workflows');
console.log('2/2 passed');
