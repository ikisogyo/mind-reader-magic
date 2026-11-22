const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function resetItems(){');const end=html.indexOf('function normalize(',start);const reset=start>=0&&end>start?html.slice(start,end):'';
const checks=[
 ['reset stops speech recognition',reset.includes('stopListen();')],
 ['reset clears pending reveal state',reset.includes('pending=null;revealed=false;')],
 ['reset clears stale result view',reset.includes("document.getElementById('result').hidden=true")],
 ['reset preserves cue words and special settings',reset.includes('判定用の言葉・特別写真の設定は保持')],
 ['reset gives feedback on performance screen',reset.includes("classList.contains('active')")&&reset.includes("getElementById('hint').textContent")],
];
for(const [name,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${name}`);
console.log(`${checks.filter(c=>c[1]).length}/${checks.length} passed`);
if(checks.some(c=>!c[1]))process.exit(1);
