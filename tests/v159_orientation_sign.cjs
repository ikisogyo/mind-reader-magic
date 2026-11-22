const fs=require('fs');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
const match=html.match(/const faceDown=([^,]+),faceUp=([^;]+);/);
if(!match) throw new Error('orientation thresholds missing');
if(!match[1].includes('Math.abs(e.beta)>145')) throw new Error('face-down detection must accept negative and positive beta');
if(!match[2].includes('Math.abs(e.beta)<35')) throw new Error('face-up detection must remain symmetric');
console.log('PASS face-down sensor threshold handles both beta signs');
console.log('PASS face-up threshold symmetric');
console.log('2/2 passed');
