const fs = require('fs');
const path = require('path');
const script = fs.readFileSync(path.join(__dirname, '..', 'upload-source-to-github.ps1'), 'utf8');
const checks = [
  ['sets repository-local name when missing', script.includes("@('config', '--local', 'user.name', 'MindMagic Build')")],
  ['sets repository-local email when missing', script.includes("@('config', '--local', 'user.email', 'mindmagic-build@users.noreply.github.com')")],
  ['does not overwrite existing identity', script.includes('if (-not $gitName)') && script.includes('if (-not $gitEmail)')],
  ['does not change global git identity', !script.includes('git config --global')],
  ['still pushes main to configured origin', script.includes("@('push', '-u', 'origin', 'main')")],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
console.log(`${checks.length} Git upload helper checks passed`);
