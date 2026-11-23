const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('async function retrieveItemImage'),end=html.indexOf('function retrieveImagesForNewItems',start);
assert(start>=0&&end>start,'image retrieval function found');
const fn=html.slice(start,end);
assert((fn.split('if(requestToken===imageRequestTokens[slot])').length-1)>=2,'no-result and catch status updates guarded against stale requests');
assert(fn.includes('if(requestToken===imageRequestTokens[slot])updateCountDots();'),'stale requests do not overwrite slot status dots');
assert(fn.includes('requestToken!==imageRequestTokens[slot]'),'stale success is rejected');
console.log('v202 stale image status protection: 3 checks passed');

assert(html.includes('imageLoadingSlots[i]?\'\':\' failed\''),'loading slots must not show failed red dot');
assert(html.includes('画像取得中'),'loading slots expose loading state');
console.log('v202 image loading indicator: 2 additional checks passed');
