const fs=require('fs');const path=require('path');
const p=path.join(__dirname,'..','app','build.gradle');const s=fs.readFileSync(p,'utf8');
const ok=/versionCode\s+192/.test(s)&&/versionName\s+'0\.3\.192'/.test(s);
if(!ok){console.error('FAIL Android version metadata');process.exit(1)}
console.log('PASS Android versionCode matches v0.3.192');
console.log('PASS Android versionName matches v0.3.192');
