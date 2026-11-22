const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("if(d.type==='error')stopListen();"),'recognition error stops listening');
assert(html.includes("function stopListen(){if(window.MindMagicSpeech)window.MindMagicSpeech.stop();listening=false;}"),'stop helper clears listening state');
assert(!html.includes("id='listen'")&&!html.includes("id='stop'"),'audience screen does not expose speech controls');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version metadata updated');
console.log('v167 recognition end-state checks: 4 passed');
