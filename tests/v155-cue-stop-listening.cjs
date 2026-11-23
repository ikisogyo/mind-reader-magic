const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function onCue(text){'),end=html.indexOf('function onPartialCue(text){',start);
assert(start>=0&&end>start,'final cue handler exists');const onCue=html.slice(start,end);
assert(onCue.includes('specialCuePosition(text)'),'special cue position is resolved');
assert(onCue.includes("stopListen();pending={kind:'special'};prepareReveal();"),'special cue reveal stops recognition and prepares reveal');
assert(onCue.includes('matchesSpecialCue(text)'),'fuzzy special cue fallback remains');
console.log('v155 cue-stop and cue-index checks passed');
