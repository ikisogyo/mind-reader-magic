const fs=require('fs');
const html=fs.readFileSync(__dirname+'/../app/src/main/assets/index.html','utf8');
const tests=[
 ['six internal item slots',html.includes('length:6')],
 ['settings contain no item-registration fields',!html.includes('id="itemFields"')&&!html.includes('id="itemName0"')&&!html.includes('id="itemFile0"')],
 ['special photo is above cue-word settings',html.indexOf('特別写真')<html.indexOf('判定用の言葉（6個）')&&!html.includes('特別写真（最上部）')],
 ['six cue words',html.includes("cues:['いきますよ','みえるかな','すごいこと','しずかにして','こころをうつします','むずかしいかな']")],
 ['local storage persistence',html.includes('localStorage.getItem(STORE')&&html.includes('localStorage.setItem(STORE')],
 ['cue recognition logic',html.includes('function onCue(text)')&&html.includes('function prepareReveal()')],
 ['heart tap reveal',html.includes('function heartAction()')&&html.includes('onclick=heartAction')],
 ['device orientation hook',html.includes('deviceorientation')],
 ['spoken reset implemented',html.includes('function isResetCue(text)')&&html.includes('if(isResetCue(text)){resetItems();return;}')&&html.includes('items:Array.from')&&html.includes('if(!saved)data=previous')],
 ['special photo separate upload',html.includes('specialFile')&&html.includes('specialImage')],
 ['special cue and message fields',html.includes('specialCue')&&html.includes('specialMessage')],
 ['bridge events wired',html.includes('mindmagic-cue-text')&&html.includes('mindmagic-speech-status')],
 ['cue thumbnails',html.includes('cueThumb')&&html.includes('item.image')]
];
for(const [name,ok] of tests)console.log(`${ok?'PASS':'FAIL'} ${name}`);
const fail=tests.filter(t=>!t[1]).length;console.log(`${tests.length-fail}/${tests.length} passed`);process.exit(fail?1:0);
