const fs=require('fs');const path=require('path');
const p=path.join(__dirname,'..','app','build.gradle');const s=fs.readFileSync(p,'utf8');
const version=s.match(/versionCode\s+(\d+);\s*versionName\s+'0\.3\.(\d+)'/);
if(!version||version[1]!==version[2]){console.error('FAIL Android version metadata: versionCode and versionName do not align');process.exit(1)}
console.log('PASS Android versionCode and versionName align dynamically');