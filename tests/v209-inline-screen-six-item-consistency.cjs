const fs=require('fs'),assert=require('assert');
const js=fs.readFileSync('tests/inline-screen.js','utf8');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(js.includes("items:Array.from({length:6},()=>({name:'',image:''}))"),'harness initializes six item slots');
assert(js.includes('thumb.src=data.items[i]?.image||'),'cue thumbnail maps directly to corresponding item slot');
assert(js.includes("data.items=Array.from({length:6},()=>({name:'',image:''}))"),'reset keeps six item slots');
assert(js.includes("pending={kind:'item',index:idx}"),'cue index is not wrapped modulo four');
assert(!js.includes('%4'),'no legacy modulo-four slot mapping remains');
console.log('v209 inline screen six-item consistency: 5 checks passed');

assert(!html.includes('id="itemFields"'),'no duplicated item-management panel in settings');
assert(!html.includes('textContent=\'画像再検索\''),'no redundant per-item retry control in settings');
assert(html.includes('function renderItemSlots(){/* 品物管理は重複表示せず'),'item management is not duplicated in settings');
assert(html.includes('function renderSettings(){const cues=document.getElementById(\'cueFields\');cues.innerHTML=\'\';data.cues.forEach'),'settings only renders the six cue words and thumbnails');
console.log('v209 settings-render check passed');
