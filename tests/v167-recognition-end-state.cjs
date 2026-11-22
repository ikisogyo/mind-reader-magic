const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("else if(d.type==='state'&&!d.listening&&!pending&&!revealed)"),'ended recognition restores controls only when no cue/reveal is active');
assert(html.includes("document.getElementById('listen').hidden=false;document.getElementById('stop').hidden=true;"),'listen and stop buttons restored after recognition ends');
assert(html.includes('音声認識が終了しました。合図の言葉をもう一度どうぞ。'),'clear retry hint shown when recognition ends without a cue');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version metadata updated');
console.log('v167 recognition end-state checks: 4 passed');
