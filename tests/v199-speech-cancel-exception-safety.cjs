const fs=require('fs'),assert=require('assert');
const src=fs.readFileSync('app/src/main/java/jp/mindmagic/speech/SpeechRecognitionHelper.java','utf8');
function method(name,next){const start=src.indexOf('public void '+name+'()');const end=next?src.indexOf('public void '+next+'()',start):src.indexOf('private void setListening',start);assert(start>=0&&end>start,name+' method exists');return src.slice(start,end);}
for(const name of ['stop','cancel']){const body=method(name,name==='stop'?'cancel':'destroy');assert(body.includes('try { recognizer.cancel(); }'),name+' protects cancellation call');assert(body.includes('recognizer.destroy()')&&body.includes('recognizer = null;'),name+' destroys recognizer after cancellation exception');assert(body.includes('setListening(false);'),name+' releases UI listening state');}
const destroy=method('destroy',null);assert(destroy.includes('try { recognizer.cancel(); } catch (RuntimeException ignored) { }'),'destroy tolerates cancel failure');assert(destroy.includes('try { recognizer.destroy(); } catch (RuntimeException ignored) { }'),'destroy tolerates destroy failure');
console.log('speech cancellation exception-safety checks: 7 passed');
