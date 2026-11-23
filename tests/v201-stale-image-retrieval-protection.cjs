const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function retrieveItemImage'),end=html.indexOf('function retrieveImagesForNewItems',start);
assert(start>=0&&end>start,'no-image handling function exists');
const fn=html.slice(start,end);
assert(fn.includes('品物名で表示します'),'no-image handling explains text fallback');
assert(!fn.includes('Google画像検索')&&!fn.includes('tbm=isch'),'no manual image-search UI remains');
assert(html.includes("txt.textContent=item.name||cueLabel||'品物'"),'reveal displays registered item name when no image exists');
console.log('v201 no-image text fallback: 4 checks passed');