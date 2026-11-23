const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const java=fs.readFileSync('app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java','utf8');
const checks=[
 ['JS listens to Android bridge event name',html.includes("addEventListener('mindmagic-speech'" )],
 ['bridge dispatches same event name',java.includes("new CustomEvent('mindmagic-speech'" )],
 ['recognized result text is forwarded to cue matching',html.includes("if(d.type==='result'){onCue(d.text);" )],
 ['result restarts listening only when no reveal is pending',html.includes("if(!pending&&!revealed)startListen();" )]
];
let failures=0;for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+': '+name);if(!ok)failures++;}
console.log((checks.length-failures)+'/'+checks.length+' speech event checks passed');if(failures)process.exit(1);
