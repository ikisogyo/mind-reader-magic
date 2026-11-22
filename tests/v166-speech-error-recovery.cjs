const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("window.addEventListener('mindmagic-speech-status',e=>{let d=e.detail||{};if(d.type==='error')stopListen();});"),'speech error handler stops recognition');
assert(html.includes("function stopListen(){if(window.MindMagicSpeech)window.MindMagicSpeech.stop();listening=false;}"),'stop helper clears listening state');
assert(html.includes("if(d.type==='error')stopListen();"),'error event triggers stop helper');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version metadata updated');
console.log('v166 speech error recovery checks: 4 passed');
