const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const s=html.indexOf('function onCue(text){'),e=html.indexOf('function onPartialCue(text){',s);assert(s>=0&&e>s,'final cue matcher exists');const fn=html.slice(s,e);
assert(fn.includes('lastCuePosition')&&fn.includes('t.lastIndexOf(nc)'),'final transcript chooses the last cue spoken');
assert(fn.includes('if(pos>=0&&pos>=lastCuePosition)'),'later cue occurrence replaces earlier cue');
const ps=html.indexOf('function onPartialCue(text){'),pe=html.indexOf('function prepareReveal(){',ps);assert(ps>=0&&pe>ps,'partial handler exists');const partial=html.slice(ps,pe);
assert(!partial.includes("pending={kind:'item'"),'partials do not lock in an early cue');assert(partial.includes('音声を聞き取り中'),'partial results show listening status only');
console.log('v211 last-spoken-cue selection: 4 checks passed');
