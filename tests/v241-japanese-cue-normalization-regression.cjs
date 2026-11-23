const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const start=html.indexOf('function normalize(s){'),end=html.indexOf('function isResetCue(text){',start);
assert(start>=0&&end>start,'cue normalization helper exists');
const context={};vm.runInNewContext(html.slice(start,end)+';this.normalize=normalize;',context);
const cases=[
 ['spoken kanji cue','行きますよ','いきますよ'],
 ['punctuation and whitespace','行きます よ！','いきますよ'],
 ['NFKC normalization','いきますよ','いきますよ'],
 ['spoken short form','行きます','いきます'],
];
for(const [label,input,expected] of cases){const actual=context.normalize(input);assert.strictEqual(actual,expected,label);}
console.log('v241 Japanese cue normalization regression: '+cases.length+' passed');
