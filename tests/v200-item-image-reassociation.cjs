const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function handleItemCommand(text)'),end=html.indexOf('function cueSimilarity',start);
assert(start>=0&&end>start,'item command handler exists');
const handler=html.slice(start,end);
assert(handler.includes('findIndex(it=>!it.name&&!it.image)'),'voice additions target the first empty slot');
assert(handler.includes('data.items.some(it=>normalize(it.name)===normalize(name))'),'duplicate item names are rejected');
assert(!handler.includes('changeMatch')&&!handler.includes('changeItem'),'item replacement command is absent');
console.log('v200 append-only registration checks: 3 passed');
