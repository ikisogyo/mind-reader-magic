(function(){
  function emit(name, detail){window.dispatchEvent(new CustomEvent(name,{detail:detail||{}}));}
  window.addEventListener('mindmagic-speech',function(e){var d=e.detail||{};if(d.type==='result'&&d.text)emit('mindmagic-cue-text',{text:d.text});emit('mindmagic-speech-status',d);});
})();
