const fs=require('fs'),assert=require('assert');
const src=fs.readFileSync('app/src/main/java/jp/mindmagic/speech/SpeechRecognitionHelper.java','utf8');
assert(src.includes('if (destroyed || recognitionActive) return;'),'start ignores duplicate calls while recognition lifecycle is active');
assert(src.includes('private boolean recognitionActive = false;'),'recognition lifecycle has its own active flag');
assert(src.includes('recognitionActive = true;'),'start marks lifecycle active before startListening');
assert(src.includes('recognitionActive = false;\n      setListening(false);'),'error/results release lifecycle guard');
const cancelStart=src.indexOf('public void cancel()');const cancelEnd=src.indexOf('public void destroy()',cancelStart);const cancelBody=src.slice(cancelStart,cancelEnd);assert(cancelStart>=0&&cancelBody.includes('recognitionActive = false;'),'cancel releases recognition guard');assert(cancelBody.includes('try { recognizer.cancel(); }'),'cancel handles recognizer cancellation safely');
const gradle=fs.readFileSync('app/build.gradle','utf8');const m=gradle.match(/versionCode\s+(\d+).*?versionName\s+'0\.3\.(\d+)'/s);assert(m&&m[1]===m[2],'app version metadata aligns dynamically');
console.log('v169 speech-start guard checks: 6 passed');
