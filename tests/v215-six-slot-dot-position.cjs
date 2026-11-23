const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('.countDots .dot.empty{visibility:visible;opacity:.22}'),'empty slots remain visible as faint placeholders so slot positions do not shift');
assert(html.includes('data.items.forEach((item,i)=>{const registered=!!(item&&(item.name||item.image));'),'dot rendering follows the original six item slots in array order');
assert(html.includes("span.className='dot'+(registered?(item.image||imageLoadingSlots[i]?'':' failed'):' empty')"),'registered slots preserve image-loading and failed status colors');
console.log('v215 six-slot dot position: 3 checks passed');
