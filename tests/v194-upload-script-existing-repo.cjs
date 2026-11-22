const fs = require('fs');
const path = require('path');
const script = fs.readFileSync(path.join(__dirname, '..', 'START_APK_UPLOAD.bat'), 'utf8');
const checks = [
  ['targets the user-provided GitHub repository', script.includes('https://github.com/ikisogyo/mind-reader-magic.git')],
  ['requires Git only, not GitHub CLI', script.includes('where git') && !script.includes('where gh') && !script.includes('gh auth')],
  ['checks that Android build workflow is present', script.includes('.github\\workflows\\android-build.yml')],
  ['initializes Git only when missing', script.includes('if not exist .git (')],
  ['sets main branch for new or existing repository', script.includes('git branch -M main')],
  ['preserves local author identity or supplies fallback', script.includes('git config --local user.name') && script.includes('if not defined LOCAL_NAME') && script.includes('if not defined LOCAL_EMAIL')],
  ['stages project changes', script.includes('git add .')],
  ['commits staged changes when present', script.includes('git diff --cached --quiet') && script.includes('git commit -m "MindMagic source upload/update"')],
  ['adds origin only when missing and checks an existing origin', script.includes('git remote add origin "%REPO_URL%"') && script.includes('git remote get-url origin') && script.includes('differs from the target repository')],
  ['pushes main to the specified repository', script.includes('git push -u origin main')],
  ['keeps the console open after errors or success', script.includes('pause') && script.includes(':FINISH')],
  ['prints clear status and error messages', script.includes('[ERROR]') && script.includes('[SUCCESS]') && script.includes('Finished with errors')],
];
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
console.log(`${checks.length} upload script checks passed`);
