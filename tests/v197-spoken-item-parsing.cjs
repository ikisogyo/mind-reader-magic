const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
function extract(name){const start=html.indexOf('function '+name+'(');assert(start>=0,name+' exists');const brace=html.indexOf('{',start);let depth=0;for(let i=brace;i<html.length;i++){if(html[i]==='{')depth++;else if(html[i]==='}')depth--;if(depth===0)return html.slice(start,i+1);}throw Error('cannot extract '+name);}
const clean=extract('cleanItemName'),parse=extract('parseItemNames');
const result=vm.runInNewContext(clean+';'+parse+';parseItemNames(input)',{input:'りんご と みかん バナナ'});
assert.deepStrictEqual(Array.from(result),['りんご','みかん','バナナ'],'spaces and と should separate spoken item names');
const spaced=vm.runInNewContext(clean+';cleanItemName(input)',{input:'  りんご   '});
assert.strictEqual(spaced,'りんご','leading/trailing whitespace removed');
console.log('v197 spoken item parsing: 2 checks passed');
