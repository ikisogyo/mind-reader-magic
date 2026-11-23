const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes("match(/^(?:ここに|これが|品物は|品物が)?(.+?)(?:がいます|があります|を追加(?:します|して)?|追加します|追加して|です)$/"), 'natural spoken item registration patterns exist');
assert(html.includes("data.specialCue&&normalize(data.specialCue).length>=4&&cueSimilarity(t,data.specialCue)>=0.62"), 'special cue full results tolerate speech recognition variation');
assert(html.includes("Hello Kitty plush toy single isolated"), 'Hello Kitty search focuses on single plush');
assert(html.includes("Doraemon plush toy single isolated"), 'Doraemon search focuses on single plush');
assert(html.includes("group|groups|collection|lineup|set of|multiple|many|collage|montage|family|scene|background|crowd|store|museum|exhibit|壁紙|集合|複数|背景"), 'group and cluttered results are penalized');
console.log('v210 voice registration and focused image retrieval: 5 checks passed');
