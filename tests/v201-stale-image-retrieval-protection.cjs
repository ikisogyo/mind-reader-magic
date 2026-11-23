const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('let imageRequestTokens=Array.from({length:6},()=>0);'),'per-slot request tokens initialized');
assert(html.includes('const requestToken=++imageRequestTokens[slot];'),'each image retrieval gets fresh token');
assert(html.includes('requestToken!==imageRequestTokens[slot]'),'stale retrievals rejected before saving');
assert(html.includes('imageRequestTokens.forEach((token,i)=>{imageRequestTokens[i]++;imageLoadingSlots[i]=false;});'),'reset invalidates pending retrievals');
console.log('v201 stale image retrieval protection checks: 4 passed');
