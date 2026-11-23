const fs=require('fs');const assert=require('assert');const src=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(!src.includes('Google画像検索'),'manual Google image-search workflow must not be present');
assert(!src.includes('tbm=isch'),'image-search URLs must not be present');
assert(src.includes("txt.textContent=item.name||cueLabel||'品物'"),'reveal must display item name when image is missing');
assert(src.includes("(!item.image?' noImageText':'')"),'no-image fallback must be centered text');
assert(src.includes('length:6'),'six-slot configuration must remain');
console.log('No manual image-search workflow; no-image reveal fallback and six slots verified.');
