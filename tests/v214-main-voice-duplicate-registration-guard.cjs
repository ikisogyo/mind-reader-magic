const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function onCue(text){'),end=html.indexOf('function onPartialCue(text){',start);
assert(start>=0&&end>start,'voice cue handler exists');
const fn=html.slice(start,end);
const branch=fn.slice(fn.indexOf('const spokenItem='),fn.indexOf('let idx=-1'));
assert(branch.includes('!data.items.some(it=>normalize(it.name)===normalize(candidate))'),'plain voice item addition rejects an existing normalized name');
assert(branch.includes('data.items.findIndex(it=>!it.name&&!it.image)'),'new plain voice items use first empty slot');
console.log('v214 main-screen voice duplicate registration guard: 2 checks passed');
