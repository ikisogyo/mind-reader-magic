const fs=require('fs');const path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','app/src/main/assets/index.html'),'utf8');
const gradle=fs.readFileSync(path.join(__dirname,'..','app/build.gradle'),'utf8');
const version=gradle.match(/versionCode\\s+(\\d+);\\s*versionName\\s+'0\\.3\\.(\\d+)'/);\nconst checks=[
 ['reset matcher added',html.includes('function isResetCue(text)')],
 ['exact reset cue accepted',html.includes("if(t==='リセット')return true")],
 ['command suffixes supported',html.includes("'してください','して下さい','して','お願いします','お願い','します','する'")],
 ['reset matcher used before cue matching',html.includes('if(isResetCue(text)){resetItems();return;}')&&html.includes('function onCue(text)')],
 ['reset matcher rejects arbitrary trailing words',html.includes("if(!t.startsWith('リセット'))return false;const suffix=t.slice('リセット'.length)")],
 ['app version metadata aligns dynamically',!!version&&version[1]===version[2]]
];let fails=0;for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`);if(!ok)fails++;}console.log(`${checks.length-fails}/${checks.length} passed`);process.exit(fails?1:0);
