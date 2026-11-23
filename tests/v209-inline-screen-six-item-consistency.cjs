const fs=require('fs'),assert=require('assert');
const js=fs.readFileSync('tests/inline-screen.js','utf8');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(js.includes("items:Array.from({length:6},()=>({name:'',image:''}))"),'harness initializes six item slots');
assert(js.includes('thumb.src=data.items[i]?.image||'),'cue thumbnail maps directly to corresponding item slot');
assert(js.includes("data.items=Array.from({length:6},()=>({name:'',image:''}))"),'reset keeps six item slots');
assert(js.includes("pending={kind:'item',index:idx}"),'cue index is not wrapped modulo four');
assert(!js.includes('%4'),'no legacy modulo-four slot mapping remains');
console.log('v209 inline screen six-item consistency: 5 checks passed');

assert(html.includes('id="itemFields"'),'six-item management list is rendered in settings');
assert(html.includes('function renderItemSlots(){'),'item list renderer exists');
assert(html.includes('retry.onclick=()=>retrieveItemImage(item.name,i)'),'per-slot image retry button exists');
assert(html.includes('clear.onclick=()=>clearItemSlot(i)'),'per-slot clear button exists');
assert(html.includes('function clearItemSlot(i){'),'clear action is defined');
console.log('v209 extended: six-slot management UI checks passed');
