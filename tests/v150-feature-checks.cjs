const fs=require('fs'),vm=require('vm');const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const checks=[
 ['4 object slots',html.includes('length:4')],
 ['6 cue slots',html.includes("cues:['りんご','バナナ','時計','鍵','','']")&&html.includes('data.cues.forEach')],
 ['cue thumbnails',html.includes('cueThumb')&&html.includes('data.items[i%4]?.image')],
 ['special photo cue/message',html.includes('specialCue')&&html.includes('specialMessage')],
 ['reset retains cues',html.includes('data.cues')&&html.includes('判定用の言葉・特別写真の設定は保持')],
 ['cue-before-reveal gate',html.includes('if(!pending||revealed)return')],
 ['heart tap reveals',html.includes('function heartAction(){if(pending&&!revealed)reveal();}')],
 ['result tap returns',html.includes('result.onclick=nextRound')],
 ['face-down sensor reveal',html.includes('faceDown=Math.abs(e.beta)>145')],
 ['face-up returns/listens',html.includes('if(revealed&&faceUp){nextRound();}')&&html.includes('startListen();')],
 ['five randomized sounds',html.includes('Math.floor(Math.random()*5)')&&html.includes('[660,880],[523,784],[440,660,880],[740,988],[392,587,784]')],
 ['audio graceful fallback',html.includes('sound is optional')],
 ['speech bridge cue event',html.includes('mindmagic-cue-text')],
 ['speech status event',html.includes('mindmagic-speech-status')],
];for(const [n,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${n}`);console.log(`${checks.filter(c=>c[1]).length}/${checks.length} passed`);if(checks.some(c=>!c[1]))process.exit(1);
const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].pop()?.[1];new vm.Script(inline);console.log('PASS inline script syntax');
