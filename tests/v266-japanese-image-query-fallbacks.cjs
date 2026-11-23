const fs=require('fs');const assert=require('assert');const src=fs.readFileSync('app/src/main/assets/index.html','utf8');
const fn=src.match(/async function retrieveItemImage\([\s\S]*?\n\nfunction retrieveImagesForNewItems/);
assert(fn,'image retrieval function must exist');
assert(fn[0].includes('const queries=[name,name+\' 画像\',name+\' filetype:bitmap\']'),'image retrieval should try Japanese query variants');
assert(fn[0].includes('for(const query of queries)'),'image retrieval should try fallbacks sequentially');
assert(fn[0].includes('token!==imageRequestTokens[slot]||data.items[slot]?.name!==name'),'late image responses must not attach to a changed slot');
assert(fn[0].includes('if(!save())'),'retrieved images must be saved before success is reported');
console.log('Japanese image-query fallbacks and slot/token guards verified.');
