const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("const before={...data.items[idx];")===false,'sanity: malformed backup absent');
assert(html.includes("const before={...data.items[idx]};"),'rename backs up full slot');
assert(html.includes("data.items[idx].image='';"),'rename clears stale image');
assert(html.includes("retrieveItemImage(to,idx);"),'rename starts matching image retrieval');
assert(html.includes("data.items[idx]=before;"),'save failure restores old slot');
console.log('v200 item image reassociation checks: 5 passed');
