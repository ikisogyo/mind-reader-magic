const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
if(!html.includes("idx>=0){stopListen();pending={kind:'item',index:idx%4,cueIndex:idx};prepareReveal();return;")) throw new Error('item cue should stop listening');
if(!html.includes("if(data.specialCue&&t.includes(normalize(data.specialCue))){stopListen();pending={kind:'special'};prepareReveal();}")) throw new Error('special cue should stop listening');
console.log('PASS item cue stops listening');
console.log('PASS special cue stops listening');
console.log('2/2 passed');
