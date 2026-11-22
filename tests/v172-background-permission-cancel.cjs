const fs=require('fs'),assert=require('assert');
const activity=fs.readFileSync('app/src/main/java/jp/mindmagic/app/MainActivity.java','utf8');
const stop=activity.slice(activity.indexOf('public void onStop()'),activity.indexOf('public void onDestroy()'));
assert(stop.includes('pendingStart = false'),'pending microphone start is cleared on background');
assert(stop.indexOf('pendingStart = false') < stop.indexOf('speech.cancel()'),'pending start is cleared before speech cancellation');
assert(activity.includes('if (pendingStart && granted) speech.start()'),'permission callback still requires pending request');
assert(fs.readFileSync('app/build.gradle','utf8').includes("versionCode 192; versionName '0.3.192'"),'version bumped');
console.log('v172 background permission cancellation checks: 4 passed');
