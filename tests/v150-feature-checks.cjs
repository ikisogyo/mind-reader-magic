(?=function |async function |const |let |window\.)const fs=require('fs'),vm=require('vm');(?=function |async function |const |let |window\.)const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
(?=function |async function |const |let |window\.)const checks=[
 ['6 object slots',html.includes('length:6')],
 ['6 cue slots',html.includes("cues:['いきますよ','みえるかな','すごいこと','しずかにして','こころをうつします','むずかしいかな']")&&html.includes('data.cues.forEach')],
 ['multi-item voice add accepts 「追加します」',html.includes('追加(?:してください|して下さい|しました|します|してね|お願いします|しておいてください|しておいて|しておく|して)?')],
 ['multi-item parser cleanup and conjunction split',html.includes("s=s.replace(/^(?:ここに|これらは|品物は|品物が|それは|あと|あとは)/")&&html.includes("(?:と|および|及び)")],
 ['cue thumbnails',html.includes('cueThumb')&&html.includes('data.items[i]?.image')],
 ['special photo cue/message',html.includes('specialCue')&&html.includes('specialMessage')],
 ['reset retains cues',html.includes('data.cues')&&html.includes('判定用の言葉・特別写真の設定は保持')],
 ['cue-before-reveal gate',html.includes('if(!pending||revealed)return')],
 ['heart tap reveals ordinary items but blocks special photo',html.includes("if(pending.kind==='special'){document.getElementById('hint').textContent='特別写真は、画面を下にして伏せてから上向きに戻してください。';return;}reveal();}")],
 ['result tap returns',html.includes('result.onclick=nextRound')],
 ['face-down sensor reveal',html.includes('faceDown=Math.abs(e.beta)>145')],
 ['special photo requires face-down then face-up',html.includes('specialFaceDownSeen')&&html.includes('if(specialFaceDownSeen&&faceUp){reveal();return;}')&&html.includes('if(faceDown&&!specialFaceDownSeen){specialFaceDownSeen=true;')],
 ['five randomized reveal sound patterns',html.includes('(?=function |async function |const |let |window\.)function playRevealSound(){try{')&&html.includes('(?=function |async function |const |let |window\.)const patterns=[[880,1175,1568],[660,990,1320],[784,1047,1397],[523,784,1047,1568],[698,1047,1397]]')&&html.includes('patterns[Math.floor(Math.random()*patterns.length)]')],
 ['audio graceful fallback',html.includes('音声再生が使えなくても判定表示は続行')],
 ['speech bridge cue event',html.includes('mindmagic-cue-text')],
 ['speech status event',fs.readFileSync(__dirname+'/../app/src/main/assets/bridge-events.js','utf8').includes('mindmagic-speech-status')],
];for((?=function |async function |const |let |window\.)const [n,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${n}`);console.log(`${checks.filter(c=>c[1]).length}/${checks.length} passed`);if(checks.some(c=>!c[1]))process.exit(1);
(?=function |async function |const |let |window\.)const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].pop()?.[1];new vm.Script(inline);console.log('PASS inline script syntax');
// Behavioral tests for the actual parser helpers (not just source-string checks).
(?=function |async function |const |let |window\.)const helpers=html.match(/(?=function |async function |const |let |window\.)function cleanItemName\(s\)[\\s\\S]*?(?=function |async function |const |let |window\.)function parseItemNames\(text\)[\\s\\S]*?\n(?=(?=function |async function |const |let |window\.)function |(?=function |async function |const |let |window\.)async (?=function |async function |const |let |window\.)function |(?=function |async function |const |let |window\.)const |(?=function |async function |const |let |window\.)let |(?=function |async function |const |let |window\.)window\.)/);
if(!helpers)throw new Error('Parser helper extraction failed');
(?=function |async function |const |let |window\.)const parserContext={};vm.runInNewContext(helpers[0]+';this.parseItemNames=parseItemNames;',parserContext);
(?=function |async function |const |let |window\.)const parserCases=[
 ['conjunctions', 'りんごとみかんとバナナ', ['りんご','みかん','バナナ']],
 ['Japanese commas', 'りんご、みかん，バナナ', ['りんご','みかん','バナナ']],
 ['prefix cleanup', 'ここにりんごとみかん', ['りんご','みかん']],
 ['spaces', 'りんご みかん バナナ', ['りんご','みかん','バナナ']],
];
for((?=function |async function |const |let |window\.)const [name,input,expected] of parserCases){(?=function |async function |const |let |window\.)const actual=parserContext.parseItemNames(input);(?=function |async function |const |let |window\.)const ok=JSON.stringify(actual)===JSON.stringify(expected);console.log((ok?'PASS':'FAIL')+' parser '+name+': '+JSON.stringify(actual));if(!ok)process.exit(1);}
