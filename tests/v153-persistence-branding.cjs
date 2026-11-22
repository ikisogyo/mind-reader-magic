const fs=require('fs');const path=require('path');
const root=path.join(__dirname,'..');
const activity=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/app/MainActivity.java'),'utf8');
const manifest=fs.readFileSync(path.join(root,'app/src/main/AndroidManifest.xml'),'utf8');
const gradle=fs.readFileSync(path.join(root,'app/build.gradle'),'utf8');
const version=gradle.match(/versionCode\s+(\d+);\s*versionName\s+'0\.3\.(\d+)'/);
const checks=[
 ['WebView DOM storage enabled for local persistence',/setDomStorageEnabled\(true\)/.test(activity)],
 ['Application label no longer says Host prototype',/android:label="こころみえみえ"/.test(manifest)&&!/Host試作/.test(manifest)],
 ['versionCode and versionName match dynamically',!!version&&version[1]===version[2]],
];
let failed=0;for(const [name,ok] of checks){console.log((ok?'PASS ':'FAIL ')+name);if(!ok)failed++;}if(failed)process.exit(1);console.log(`${checks.length}/${checks.length} passed`);
