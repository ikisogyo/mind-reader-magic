const fs=require('fs');const path=require('path');const vm=require('vm');
const html=fs.readFileSync(path.join(__dirname,'..','app/src/main/assets/index.html'),'utf8');
const match=html.match(/function isResetCue\(text\)\{[^}]+\}/);
if(!match){console.error('FAIL reset cue function found');process.exit(1)}
vm.runInThisContext(match[0]);
const positive=['リセット','リセットして','リセットしてください','リセットして下さい','リセットお願いします','リセットをお願いします','リセットする','リセット、してください'];
const negative=['リセットしたい','リセット機能','リセットボタン','リセットとは','リセットの話','リセットしてもいい？'];
let fails=0;
for(const s of positive){const ok=isResetCue(s);console.log(`${ok?'PASS':'FAIL'} accepts ${s}`);if(!ok)fails++;}
for(const s of negative){const ok=!isResetCue(s);console.log(`${ok?'PASS':'FAIL'} rejects ${s}`);if(!ok)fails++;}
const gradle=fs.readFileSync(path.join(__dirname,'..','app/build.gradle'),'utf8');const versionOk=/versionCode 192/.test(gradle)&&/versionName '0.3.192'/.test(gradle);
console.log(`${versionOk?'PASS':'FAIL'} app version metadata 0.3.192`);if(!versionOk)fails++;
console.log(`${positive.length+negative.length+1-fails}/${positive.length+negative.length+1} behavioral checks passed`);process.exit(fails?1:0);
