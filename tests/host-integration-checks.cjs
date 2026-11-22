const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const activity = read('app/src/main/java/jp/mindmagic/app/MainActivity.java');
const checks = [
  ['Activity registers WebView JS bridge', activity.includes('addJavascriptInterface(bridge, "MindMagicSpeech")')],
  ['Start triggers runtime mic request', activity.includes('@JavascriptInterface @Override public void start()') && activity.includes('requestMicAndStart()')],
  ['Activity loads local HTML', activity.includes('file:///android_asset/index.html')],
  ['Manifest microphone permission', read('app/src/main/AndroidManifest.xml').includes('android.permission.RECORD_AUDIO')],
  ['JS invokes native start', read('app/src/main/assets/index.html').includes('MindMagicSpeech.start()')],
  ['JS invokes native stop', read('app/src/main/assets/index.html').includes('MindMagicSpeech.stop()')],
  ['Cue event forwarded', read('app/src/main/assets/bridge-events.js').includes('mindmagic-cue-text')],
  ['Speech bridge source included', fs.existsSync(path.join(root, 'app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java'))]
];
let fails = 0;
for (const [name, ok] of checks) { console.log((ok ? 'PASS' : 'FAIL') + ' ' + name); if (!ok) fails++; }
console.log(`${checks.length - fails}/${checks.length} checks passed`);
process.exitCode = fails ? 1 : 0;
