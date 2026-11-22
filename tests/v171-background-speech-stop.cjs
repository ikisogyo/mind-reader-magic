const fs=require('fs'),assert=require('assert');
const activity=fs.readFileSync('app/src/main/java/jp/mindmagic/app/MainActivity.java','utf8');
assert(activity.includes('pendingStart = false') && activity.includes('speech.cancel()'),'onStop clears pending start and cancels recognition');
assert(activity.includes('Stop microphone recognition when the activity leaves the foreground'),'lifecycle behavior is documented in source');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version updated');
console.log('v172 background speech-stop checks: 3 passed');
