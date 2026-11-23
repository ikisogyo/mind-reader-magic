const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('async function retrieveItemImage'),end=html.indexOf('function retrieveImagesForNewItems',start);
assert(start>=0&&end>start,'image retrieval function exists');
const fn=html.slice(start,end);
assert(fn.includes("https://www.google.com/search?tbm=isch&q="),'image lookup opens Google Images');
assert(fn.includes("encodeURIComponent(String(name||'').trim())"),'Japanese item name is passed directly without translation');
assert(!fn.includes('translate')&&!fn.includes('英訳')&&!fn.includes('Wikimedia')&&!fn.includes('commons.wikimedia.org'),'no translation or Wikimedia dependency in lookup');
console.log('v201 direct Japanese Google image lookup: 4 checks passed');
