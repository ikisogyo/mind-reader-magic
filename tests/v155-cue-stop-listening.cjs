const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const onCue=html.match(/function onCue\\(text\\)\\{[\\s\\S]*?\\nfunction prepareReveal/);
assert(onCue,'cue handler exists');
assert(onCue[0].includes('let idx=data.cues.findIndex'),'cue handler maps recognized text to configured cue slot');
assert(onCue[0].includes('if(idx>=0){stopListen();pending={kind:\'item\',index:idx,cueIndex:idx};prepareReveal();'),'matched item cue stops recognition and prepares the corresponding reveal');
assert(html.includes("if(data.specialCue&&normalize(data.specialCue)&&t.includes(normalize(data.specialCue))){stopListen();pending={kind:'special'};prepareReveal();"),'special cue stops listening and requires a nonempty configured cue');
console.log('v155 cue stop listening/index mapping: 3 checks passed');