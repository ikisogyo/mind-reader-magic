const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function onCue(text){'),end=html.indexOf('function prepareReveal(){',start);
assert(start>=0&&end>start,'cue handler exists');const onCue=html.slice(start,end);
assert(onCue.includes('let idx=data.cues.findIndex'),'cue handler maps recognized text to configured cue slot');
assert(onCue.includes("if(idx>=0){stopListen();pending={kind:'item',index:idx,cueIndex:idx};prepareReveal();"),'matched item cue stops recognition and prepares corresponding reveal');
assert(onCue.includes("if(data.specialCue&&normalize(data.specialCue)&&t.includes(normalize(data.specialCue))){stopListen();pending={kind:'special'};prepareReveal();"),'special cue requires nonempty cue and stops recognition');
console.log('v155 cue-stop and cue-index checks passed');