const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'app/src/main/assets/index.html'),'utf8');
const java=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/app/MainActivity.java'),'utf8');
const gradle=fs.readFileSync(path.join(root,'app/build.gradle'),'utf8');
const version=gradle.match(/versionCode\\s+(\\d+);?\\s*versionName\\s+'([^']+)'/);
const checks=[
 ['JS back handler returns to performance screen from settings',/function handleAndroidBack\(\)\{if\(document\.getElementById\('settings'\)\.classList\.contains\('active'\)\)\{stopListen\(\);showMagic\(\);/.test(html)],
 ['JS back handler exits when already on performance screen',/function handleAndroidBack\(\).*return false;\}/.test(html)],
 ['native activity handles Android back',/onBackPressed\(\)[\s\S]*evaluateJavascript/.test(java)],
 ['native activity closes when JS declines back handling',java.includes('if (!\"true\".equals(value)) finish();')],
 ['version metadata is internally consistent',!!version&&version[1]===version[2].split('.').pop()]
];
let failed=0;for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+name);if(!ok)failed++;}
console.log(`${checks.length-failed}/${checks.length} checks passed`);if(failed)process.exit(1);
