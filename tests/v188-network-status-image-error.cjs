const fs = require('fs');
const html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');
const checks = [
  ['ordinary image import failure is visible', /画像を読み込めませんでした/.test(html)],
  ['special photo import failure is visible', /特別写真を読み込めませんでした/.test(html)],
];
let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
if (failed) process.exit(1);
console.log(`PASS ${checks.length}/${checks.length} checks`);
