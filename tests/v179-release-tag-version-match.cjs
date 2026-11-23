const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const workflow = fs.readFileSync(path.join(root, '.github/workflows/android-release.yml'), 'utf8');
const script = path.join(root, 'verify_release_version.py');
const setup = fs.readFileSync(path.join(root, 'upload-source-to-github.ps1'), 'utf8');
const gradle = fs.readFileSync(path.join(root, 'app/build.gradle'), 'utf8');\nconst version = gradle.match(/versionName ['"]([^'"]+)['"]/);\nconst validTag = version ? 'v' + version[1] : '';\nconst invalidTag = validTag ? validTag + '-wrong' : 'v-invalid';
const docs = fs.readFileSync(path.join(root, 'BUILD_APK_ON_GITHUB.md'), 'utf8');
const checks = [
  ['release workflow calls version guard', workflow.includes('python3 verify_release_version.py')],
  ['release tag is passed to guard', workflow.includes('RELEASE_TAG: ${{ github.ref_name }}')],
  ['guard compares tag with Gradle version', fs.readFileSync(script, 'utf8').includes("expected = 'v' + version.group(1)")],
  ['valid tag passes guard', spawnSync('python3', [script], { cwd: root, env: { ...process.env, RELEASE_TAG: validTag } }).status === 0],
  ['mismatched tag is rejected', spawnSync('python3', [script], { cwd: root, env: { ...process.env, RELEASE_TAG: invalidTag } }).status !== 0],
  ['upload helper validates root and git', setup.includes("Get-Command git") && setup.includes('Run this script from the extracted project root')],
  ['upload helper avoids overwriting mismatched origin', setup.includes('Existing origin points to')],
  ['upload procedure documented', docs.includes('START_APK_UPLOAD.bat') && docs.includes('ikisogyo/mind-reader-magic')],
];
for (const [name, ok] of checks) { if (!ok) { console.error('FAIL:', name); process.exitCode = 1; } else console.log('PASS:', name); }
console.log(`${checks.filter(x => x[1]).length}/${checks.length} checks passed`);
