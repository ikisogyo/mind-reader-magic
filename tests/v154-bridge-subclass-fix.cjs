const fs=require('fs');const path=require('path');const root=path.resolve(__dirname,'..');
const bridge=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java'),'utf8');
const activity=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/app/MainActivity.java'),'utf8');
const gradle=fs.readFileSync(path.join(root,'app/build.gradle'),'utf8');
const version=gradle.match(/versionCode\s+(\d+);\s*versionName\s+'0\.3\.(\d+)'/);
const checks=[
 ['WebViewSpeechBridge is no longer final',/public class WebViewSpeechBridge/.test(bridge)&&!/public final class WebViewSpeechBridge/.test(bridge)],
 ['MainActivity extends bridge anonymously',/new WebViewSpeechBridge\(webView, speech\)\s*\{/.test(activity)],
 ['start override exists for runtime mic permission',/@Override public void start\(\)\s*\{\s*runOnUiThread\(\(\) -> requestMicAndStart\(\)\);\s*\}/.test(activity)],
 ['versionCode and versionName align dynamically',!!version&&version[1]===version[2]]
];let fails=0;for(const [name,ok] of checks){console.log((ok?'PASS ':'FAIL ')+name);if(!ok)fails++;}console.log(`${checks.length-fails}/${checks.length} checks passed`);process.exit(fails?1:0);
