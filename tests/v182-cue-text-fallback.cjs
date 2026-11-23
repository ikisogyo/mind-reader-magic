const fs=require('fs'),assert=require('assert'),vm=require('vm');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const revealSource=html.match(/function reveal\(\)\{[\s\S]*?\nfunction nextRound\(/);
assert(revealSource,'reveal function is present');
assert(html.includes("pending={kind:'item',index:idx,cueIndex:idx}"),'recognized cue index is preserved for reveal text');
const revealFn=revealSource[0].replace(/\nfunction nextRound\($/,'');
function runReveal(item,cueIndex){
 const result={hidden:true,innerHTML:'',children:[],appendChild(x){this.children.push(x)}};
 const heart={classList:{removed:false,remove(){this.removed=true}}};
 const hint={textContent:''};
 const elements={result,heart,hint};
 const context={pending:{kind:'item',index:0,cueIndex},revealed:false,data:{items:[item,item,item,item,item,item],cues:['いきますよ','みえるかな','すごいこと','しずかにして','こころをうつします','むずかしいかな']},playRevealSound(){},stopListen(){},nextRound(){},document:{getElementById(id){return elements[id]},createElement(tag){return {tag,className:'',src:'',alt:'',textContent:''}}}};
 vm.runInNewContext(revealFn+';reveal()',context);
 return {result,context};
}
const noImage=runReveal({name:'',image:''},2);
assert.strictEqual(noImage.result.children[0].textContent,'時計','when no image/name exists, show selected cue word');
const namedNoImage=runReveal({name:'鍵',image:''},3);
assert.strictEqual(namedNoImage.result.children[0].textContent,'鍵','configured item name remains fallback when image is absent');
const blankNameWithImage=runReveal({name:'',image:'data:image/png;base64,abc'},1);
assert.strictEqual(blankNameWithImage.result.children[0].tag,'img','configured image is rendered');
assert.strictEqual(blankNameWithImage.result.children[1].textContent,'バナナ','cue label is visible when image exists but item name is blank');
console.log('v182 cue text fallback: 5 checks passed');
