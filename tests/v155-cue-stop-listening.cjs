const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
if(!html.includes("idx>=0){stopListen();pending={kind:'item',index:idx,cueIndex:idx};prepareReveal();return;")) throw new Error('item cue should stop listening and use the matching six-slot index');
if(!html.includes("if(data.specialCue&&t.includes(normalize(data.specialCue))){stopListen();pending={kind:'special'};prepareReveal();}")) throw new Error('special cue should stop listening');
console.log('PASS item cue stops listening and maps directly to six-slot index');
console.log('PASS special cue stops listening');
console.log('2/2 passed');
