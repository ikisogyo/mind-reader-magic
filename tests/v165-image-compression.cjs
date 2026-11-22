const fs=require('fs'),assert=require('assert');const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('function storeImageFile(file,done)'), 'image storage helper exists');
assert(html.includes('max=1280'), 'image max dimension is bounded');
assert(html.includes('toDataURL(\'image/jpeg\',0.82)'), 'jpeg compression quality is set');
assert(html.includes("storeImageFile(f,result=>{if(!result){document.getElementById('settingsStatus').textContent='画像を読み込めませんでした。ファイルを変更して再試行してください。';return;}const saved=commitImage(data.items[i],'image',result);preview.src=data.items[i].image||'';refreshCueThumbs();"), 'item images compress, atomically autosave, and rollback preview on failure');
assert(html.includes("storeImageFile(f,result=>{if(!result){document.getElementById('settingsStatus').textContent='特別写真を読み込めませんでした。ファイルを変更して再試行してください。';return;}const saved=commitImage(data,'specialImage',result);sp.src=data.specialImage||'';"), 'special image compresses, autosaves, and rolls back on failure');
assert(html.includes('const rawFallback=()=>{const r=new FileReader();'), 'raw reader fallback remains available');
console.log('v165 image compression checks: 6 passed');
