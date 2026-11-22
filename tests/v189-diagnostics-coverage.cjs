const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const checks=[
 ['diagnostics report network state',/navigator\.onLine/.test(html)&&/：ネットワーク/.test(html)],
 ['diagnostics distinguishes server reachability',/外部サーバー疎通は未確認/.test(html)],
 ['diagnostics tests canvas JPEG support',/createElement\('canvas'\)[\s\S]*toDataURL\('image\/jpeg'\)/.test(html)],
 ['diagnostics reports orientation API only as support',/実センサー動作は未確認/.test(html)&&/DeviceOrientationEvent/.test(html)],
 ['diagnostics still tests local storage',/__kokoromie_diag__/.test(html)],
 ['version metadata aligned to 0.3.192',/versionCode 192/.test(fs.readFileSync('app/build.gradle','utf8'))&&/versionName '0\.3\.192'/.test(fs.readFileSync('app/build.gradle','utf8'))]
];let fail=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)fail++;}if(fail)process.exit(1);console.log(`PASS ${checks.length}/${checks.length} checks`);
