const fs = require('fs');
const html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');
const checks = [
  ['network status is visible in settings', /id="networkStatus"/.test(html)],
  ['status reflects navigator online state', /navigator\.onLine/.test(html)],
  ['online/offline events refresh status', /addEventListener\('online',updateNetworkStatus\)/.test(html) && /addEventListener\('offline',updateNetworkStatus\)/.test(html)],
  ['settings entry refreshes status', /showSettings\(\)[\s\S]*?updateNetworkStatus\(\)/.test(html)],
  ['ordinary image import failure is visible', /画像を読み込めませんでした/.test(html)],
  ['special photo import failure is visible', /特別写真を読み込めませんでした/.test(html)],
];
let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
if (failed) process.exit(1);
console.log(`PASS ${checks.length}/${checks.length} checks`);
