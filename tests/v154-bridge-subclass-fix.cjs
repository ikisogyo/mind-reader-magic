const fs=require('fs');const path=require('path');const root=path.resolve(__dirname,'..');
const bridge=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java'),'utf8');
const activity=fs.readFileSync(path.join(root,'app/src/main/java/jp/mindmagic/app/MainActivity.java'),'utf8');
const gradle=fs.readFileSync(path.join(root,'app/build.gradle'),'utf8');
const checks=[
 ['WebViewSpeechBridge is no longer final',/public class WebViewSpeechBridge/.test(bridge)&&!/public final class WebViewSpeechBridge/.test(bridge)],
 ['MainActivity extends bridge anonymously',/new WebViewSpeechBridge\(webView, speech\)\s*\{/.test(activity)],
 ['start override exists for runtime mic permission',/@Override public void start\(\)\s*\{\s*runOnUiThread\(\(\) -> requestMicAndStart\(\)\);\s*\}/.test(activity)],
 ['versionCode 192',/versionCode 192/.test(gradle)],
 ['versionName 0.3.192',/versionName '0.3.192'/.test(gradle)]
];let fails=0;for(const [name,ok] of checks){console.log((ok?'PASS ':'FAIL ')+name);if(!ok)fails++;}console.log(`${checks.length-fails}/${checks.length} checks passed`);process.exit(fails?1:0);
