const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');
assert(html.includes('<section id="magic" class="screen">'),'magic screen starts inactive in markup');
assert(html.includes('<section id="settings" class="screen settings">'),'settings starts hidden, not active');
const startup=html.slice(html.lastIndexOf('load();renderSettings();'));
assert(startup.includes('showMagic();startListen();'),'startup shows performance screen before listening');
assert(html.includes('function handleSecretTap(){secretTapCount++;')&&html.includes('secretTapCount>=5'),'hidden settings still require five taps');
console.log('v203 startup privacy screen: 4 checks passed');
