const fs=require('fs'),assert=require('assert');const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('function storeImageFile(file,done)'), 'image storage helper exists');
assert(html.includes('const max=1280'), 'image max dimension is bounded');
assert(html.includes("toDataURL('image/jpeg',0.82)"), 'jpeg compression quality is set');
assert(html.includes('function commitImage(target,key,value){const previous=target[key];target[key]=value;if(save())return true;target[key]=previous;return false;}'), 'image updates rollback on save failure');
assert(html.includes('const saved=commitImage(data.items[i],\'image\',result);preview.src=data.items[i].image||\'\';refreshCueThumbs();'), 'item image selection commits and refreshes thumbnails');
assert(html.includes('const saved=commitImage(data,\'specialImage\',result);sp.src=data.specialImage||\'\';'), 'special image selection commits and updates preview');
assert(html.includes('const rawFallback=()=>{const r=new FileReader();'), 'raw reader fallback remains available');
console.log('v165 image compression checks: 7 passed');
