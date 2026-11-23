const fs=require('fs'),vm=require('vm');const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const checks=[
 ['6 object slots',html.includes('length:6')],
 ['6 cue slots',html.includes("cues:['いきますよ','みえるかな','すごいこと','しずかにして','こころをうつします','むずかしいかな']")&&html.includes('data.cues.forEach')],
 ['multi-item voice add accepts 「追加します」',html.includes('追加(?:してください|して下さい|しました|します|してね|お願いします|しておいてください|しておいて|しておく|して)?')],
 ['multi-item parser cleanup and conjunction split',html.includes("s=s.replace(/^(?:ここに|これらは|品物は|品物が|それは|あと|あとは)/")&&html.includes("(?:と|および|及び)")],
 ['cue thumbnails',html.includes('cueThumb')&&html.includes('data.items[i]?.image')],
 ['special photo cue/message',html.includes('specialCue')&&html.includes('specialMessage')],
 ['reset retains cues',html.includes('data.cues')&&html.includes('判定用の言葉・特別写真の設定は保持')],
 ['cue-before-reveal gate',html.includes('if(!pending||revealed)return')],
 ['heart tap reveals both ordinary items and special photo',html.includes("function heartAction(){if(pending&&!revealed){reveal();}}")],
 ['result tap returns',html.includes('result.onclick=nextRound')],
 ['face-down sensor reveal',html.includes('faceDown=Math.abs(e.beta)>145')],
 ['ordinary and special photos share face-down then face-up reveal',html.includes('if(pending&&!revealed){if(faceDown&&!specialFaceDownSeen){specialFaceDownSeen=true;')&&html.includes('if(specialFaceDownSeen&&faceUp){reveal();return;}')],
 ['five randomized reveal sound patterns',html.includes('function playRevealSound(){try{')&&html.includes('const patterns=[[880,1175,1568],[660,990,1320],[784,1047,1397],[523,784,1047,1568],[698,1047,1397]]')&&html.includes('patterns[Math.floor(Math.random()*patterns.length)]')],
 ['audio graceful fallback',html.includes('音声再生が使えなくても判定表示は続行')],
 ['native speech result event feeds cue handler',html.includes("window.addEventListener('mindmagic-speech'")&&html.includes("onCue(d.text);if(!pending&&!revealed)startListen();")],
 ['speech status event',fs.readFileSync(__dirname+'/../app/src/main/assets/bridge-events.js','utf8').includes('mindmagic-speech-status')],
];for(const [n,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${n}`);console.log(`${checks.filter(c=>c[1]).length}/${checks.length} passed`);if(checks.some(c=>!c[1]))process.exit(1);
const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].pop()?.[1];new vm.Script(inline);console.log('PASS inline script syntax');
// Run parser behavior tests against the actual helper code from the app source.
const start=html.indexOf('function cleanItemName'),end=html.indexOf('function retrieveItemImage',start;
if(start<0||end<0)throw new Error('Parser helper extraction failed');
const parserContext={};vm.runInNewContext(html.slice(start,end)+';this.parseItemNames=parseItemNames;',parserContext);
const parserCases=[
 ['conjunctions','りんごとみかんとバナナ',['りんご','みかん','バナナ']],
 ['Japanese commas','りんご、みかん，バナナ',['りんご','みかん','バナナ']],
 ['prefix cleanup','ここにりんごとみかん',['りんご','みかん']],
 ['spaces','りんご みかん バナナ',['りんご','みかん','バナナ']],
];
for(const [name,input,expected] of parserCases){const actual=parserContext.parseItemNames(input);const ok=JSON.stringify(actual)===JSON.stringify(expected);console.log(`${ok?'PASS':'FAIL'} parser ${name}: ${JSON.stringify(actual)}`);if(!ok)process.exit(1);}
