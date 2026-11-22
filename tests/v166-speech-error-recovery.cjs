const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("if(d.type==='error'){stopListen();document.getElementById('hint').textContent='音声認識エラー：'+(d.text||'')+'。もう一度「聞き取り開始」を押してください。'}"),'error handler calls stopListen and shows retry');
assert(html.includes("document.getElementById('listen').hidden=false;document.getElementById('stop').hidden=true;"),'stop helper restores controls');
assert(html.includes('もう一度「聞き取り開始」を押してください。'),'retry hint exists');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version metadata updated');
console.log('v166 speech error recovery checks: 4 passed');
