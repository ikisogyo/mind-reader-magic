const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('let speechRetryTimer=null;'),'retry timer state exists');
assert(html.includes("if(d.type==='error'){listening=false;if(!pending&&!revealed&&(d.code===1||d.code===2||d.code===3||d.code===4||d.code===6||d.code===7||d.code===8)"),'transient speech errors trigger guarded retry');
assert(html.includes('},900);'),'retry delay is bounded');
assert(html.includes('if(speechRetryTimer){clearTimeout(speechRetryTimer);speechRetryTimer=null;}'),'stop cancels retry timer');
console.log('v166 speech error recovery checks: 4 passed');
