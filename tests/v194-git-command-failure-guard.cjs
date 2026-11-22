const fs = require('fs');
const path = require('path');
const script = fs.readFileSync(path.join(__dirname, '..', 'upload-source-to-github.ps1'), 'utf8');
const checks = [
  ['all required Git operations use checked wrapper', /Invoke-GitChecked -GitArgs @\('push', '-u', 'origin', 'main'\)/.test(script) && /Invoke-GitChecked -GitArgs @\('commit', '-m', 'MindMagic source update'\)/.test(script)],
  ['wrapper captures native exit code', /\$code = \$LASTEXITCODE/.test(script)],
  ['wrapper throws with command and exit code on failure', /Git command failed \(exit \$code\)/.test(script)],
  ['remote discovery avoids unchecked get-url when no origin', /\$hasOrigin =/.test(script) && /if \(\$hasOrigin\)/.test(script)],
  ['git status checked before commit decision', /\$changes = & git status --porcelain[\s\S]*if \(\$LASTEXITCODE -ne 0\)/.test(script)],
  ['existing global config not modified', !script.includes('git config --global')],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
console.log(`${checks.length}/${checks.length} Git failure guard checks passed`);
