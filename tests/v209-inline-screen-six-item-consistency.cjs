const fs=require('fs'),assert=require('assert');
const js=fs.readFileSync('tests/inline-screen.js','utf8');
assert(js.includes("items:Array.from({length:6},()=>({name:'',image:''}))"),'harness initializes six item slots');
assert(js.includes('thumb.src=data.items[i]?.image||'),'cue thumbnail maps directly to corresponding item slot');
assert(js.includes("data.items=Array.from({length:6},()=>({name:'',image:''}))"),'reset keeps six item slots');
assert(js.includes("pending={kind:'item',index:idx}"),'cue index is not wrapped modulo four');
assert(!js.includes('%4'),'no legacy modulo-four slot mapping remains');
console.log('v209 inline screen six-item consistency: 5 checks passed');
