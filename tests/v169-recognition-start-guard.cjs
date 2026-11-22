const fs=require('fs'),assert=require('assert');
const src=fs.readFileSync('app/src/main/java/jp/mindmagic/speech/SpeechRecognitionHelper.java','utf8');
assert(src.includes('if (destroyed || recognitionActive) return;'),'start ignores duplicate calls while recognition lifecycle is active');
assert(src.includes('private boolean recognitionActive = false;'),'recognition lifecycle has its own active flag');
assert(src.includes('recognitionActive = true;'),'start marks lifecycle active before startListening');
assert(src.includes('recognitionActive = false;\n      setListening(false);'),'error/results release lifecycle guard');
assert(src.includes('recognitionActive = false;\n    if (recognizer != null) recognizer.cancel();'),'cancel releases guard before cancellation');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'app version bumped');
console.log('v169 speech-start guard checks: 6 passed');
