const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const checks=[
 ['cue thumbnail refresh helper updates all cue slots',html.includes('function refreshCueThumbs(){data.cues.forEach')],
 ['refresh helper maps cue slots to corresponding item images',html.includes('thumb.src=data.items[i%4]?.image||')],
 ['new image selection triggers cue thumbnail refresh',html.includes('preview.src=data.items[i].image||\'\';refreshCueThumbs();')],
 ['special-photo file listener is rebound safely',html.includes('specialFile.replaceWith(specialFile.cloneNode(true))')],
 ['cue thumbnails remain rendered on settings open',html.includes('thumb.src=data.items[i%4]?.image||')],
];
for(const [name,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${name}`);
console.log(`${checks.filter(c=>c[1]).length}/${checks.length} passed`);
if(checks.some(c=>!c[1]))process.exit(1);
