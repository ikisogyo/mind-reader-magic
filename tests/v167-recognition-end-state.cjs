const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("if(d.type==='error'){listening=false;if(!pending&&!revealed&&(d.code===1||d.code===2||d.code===3||d.code===4||d.code===6||d.code===7||d.code===8)"), 'transient recognition errors restart only when no reveal is pending');
assert(html.includes('},900);'),'recognition retry is delayed');
assert(html.includes('if(speechRetryTimer){clearTimeout(speechRetryTimer);speechRetryTimer=null;}'),'stop cancels pending retry');
assert(!html.includes("id='listen'")&&!html.includes("id='stop'"),'audience screen does not expose speech controls');
console.log('v167 recognition lifecycle checks: 4 passed');
