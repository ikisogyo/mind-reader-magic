const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function retrieveItemImage'),end=html.indexOf('function retrieveImagesForNewItems',start);
assert(start>=0&&end>start,'no-image fallback function found');
const fn=html.slice(start,end);
assert(fn.includes('画像がない場合は品物名を表示します'),'registration does not require image search');
assert(!fn.includes('Google画像検索')&&!fn.includes('tbm=isch')&&!fn.includes('link.href=url'),'no search link is generated');
assert(html.includes("txt.textContent=item.name||cueLabel||'品物'"),'missing image uses item name in reveal screen');
console.log('v202 text fallback with no search workflow: 4 checks passed');