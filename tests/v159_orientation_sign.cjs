const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const match=html.match(/const faceDown=([^,]+),faceUp=([^;]+);/);
if(!match) throw new Error('orientation thresholds missing');
if(!match[1].includes('Math.abs(e.beta)>145')) throw new Error('face-down detection must accept negative and positive beta');
if(!match[2].includes('Math.abs(e.beta)<35')) throw new Error('face-up detection must remain symmetric');
console.log('PASS face-down sensor threshold handles both beta signs');
console.log('PASS face-up threshold symmetric');

const sharedGesture=html.includes('if(pending&&!revealed){if(faceDown&&!specialFaceDownSeen){specialFaceDownSeen=true;');
if(!sharedGesture) throw new Error('face-down detection must work for both ordinary and special photo cues');
const resetOnly=html.includes('if(specialFaceDownSeen&&faceUp){reveal();return;}');
if(!resetOnly) throw new Error('face-up must reveal special photo only after face-down was detected');
console.log('PASS ordinary and special face-down then face-up sequence');
console.log('4/4 passed');
