(function () {
  'use strict';
  var root = document.documentElement;
  var systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  var soundButton = document.getElementById('lab-sound');
  var motionButton = document.getElementById('lab-motion');
  var audio;
  function read(key, fallback) { try { var value = localStorage.getItem(key); return value === null ? fallback : value === 'true'; } catch (_) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, String(value)); } catch (_) {} }
  var sound = read('learner-sound', true);
  var motion = read('learner-motion', true);
  function moving() { return motion && !systemMotion.matches; }
  function settings() {
    root.dataset.labMotion = moving() ? 'on' : 'off';
    soundButton.textContent = sound ? '♪ Sound on' : '♪ Sound off';
    soundButton.setAttribute('aria-pressed', String(sound));
    motionButton.textContent = moving() ? 'Motion on' : 'Motion off';
    motionButton.setAttribute('aria-pressed', String(moving()));
    motionButton.disabled = systemMotion.matches;
    motionButton.title = systemMotion.matches ? 'Reduced motion is enabled in your device settings' : 'Toggle interface animation';
    document.dispatchEvent(new CustomEvent('labmotionchange'));
  }
  function tone(kind) {
    if (!sound || document.hidden) return;
    try {
      var Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!audio) audio = new Audio();
      var ready = audio.state === 'suspended' ? audio.resume() : Promise.resolve();
      ready.then(function () {
        if (!sound || audio.state !== 'running') return;
        var notes = kind === 'correct' ? [523.25,659.25,783.99] : kind === 'retry' ? [349.23,293.66] : kind === 'chapter' ? [392,587.33] : [660];
        notes.forEach(function (hz,i) {
          var osc = audio.createOscillator(), gain = audio.createGain(), at = audio.currentTime + i * .06;
          osc.type = 'sine'; osc.frequency.setValueAtTime(hz,at);
          if (kind === 'chapter') osc.frequency.exponentialRampToValueAtTime(hz*1.06,at+.16);
          gain.gain.setValueAtTime(0,at); gain.gain.linearRampToValueAtTime(.025,at+.012); gain.gain.exponentialRampToValueAtTime(.0001,at+.2);
          osc.connect(gain); gain.connect(audio.destination); osc.start(at); osc.stop(at+.22);
          osc.onended = function () { osc.disconnect(); gain.disconnect(); };
        });
      }).catch(function () {});
    } catch (_) {}
  }
  soundButton.addEventListener('click',function () { sound = !sound; save('learner-sound',sound); settings(); if (sound) tone('tap'); });
  motionButton.addEventListener('click',function () { motion = !motion; save('learner-motion',motion); settings(); });
  systemMotion.addEventListener('change',settings);
  settings();
  function stopVideo(card, focus) {
    var stage = card.querySelector('.video-stage');
    var frame = stage.querySelector('iframe');
    if (frame) frame.remove();
    var stop = stage.querySelector('.video-stop');
    if (stop) stop.remove();
    var load = stage.querySelector('.video-load');
    load.hidden = false;
    if (focus) load.focus();
  }
  function stopAll() { document.querySelectorAll('.video-card').forEach(function (card) { stopVideo(card,false); }); }
  document.querySelectorAll('.video-load').forEach(function (button) {
    button.addEventListener('click',function () {
      stopAll();
      var card = button.closest('.video-card'), stage = button.parentElement;
      var frame = document.createElement('iframe');
      frame.title = button.dataset.title;
      frame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?autoplay=1&playsinline=1&cc_load_policy=1&rel=0';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allowFullscreen = true;
      button.hidden = true;
      stage.appendChild(frame);
      var stop = document.createElement('button');
      stop.type = 'button'; stop.className = 'video-stop'; stop.textContent = 'Close video';
      stop.addEventListener('click',function () { stopVideo(card,true); });
      stage.appendChild(stop);
      frame.focus();
    });
  });
  document.querySelectorAll('[data-watch]').forEach(function (button) {
    button.addEventListener('click',function () {
      var section = document.getElementById(button.dataset.watch);
      section.scrollIntoView({behavior:moving()?'smooth':'auto',block:'start'});
      section.querySelector('h3').focus({preventScroll:true});
    });
  });
  document.addEventListener('click',function (event) {
    if (event.target.closest('button[data-sol],button[data-beat],button[data-cmp-a],button[data-cmp-b],#beatNext')) tone('tap');
  });
  window.learningLab = {
    tone:tone, moving:moving, stopVideos:stopAll,
    update:function (index,total,label) {
      document.getElementById('lab-progress-fill').style.width = ((index+1)/total*100)+'%';
      var progress = document.getElementById('lab-progress');
      progress.setAttribute('aria-valuenow',String(index+1));
      progress.setAttribute('aria-valuetext','Chapter '+(index+1)+' of '+total+': '+label);
      document.getElementById('lab-chapter').textContent = String(index+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
    }
  };
}());
