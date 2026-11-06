
/* ============ play analytics (v33, Mixpanel) ============
   Records how people play (what they tap, how long they hesitate, where they quit), so playtests don't depend on
   friends remembering to write in. Nothing is sent unless the player says yes: asked once on the title screen,
   changeable any time in Options. Session replay (a video-like recording of the game screen) comes with it.
   The game code itself isn't changed: this file loads last and wraps a few game functions (beginRun, enterOffice,
   tapCard, endTurn...) and watches clicks and screen changes from the outside. If it breaks, the game still runs.
   Switch it off for a build (Steam) by emptying ANALYTICS_TOKEN. */
const ANALYTICS_TOKEN='35b26cc4137afffd5f604ddf87260fa3';
// EU data residency project. A US-region project would use 'https://api-js.mixpanel.com' instead.
const ANALYTICS_HOST='https://api-eu.mixpanel.com';
const ANALYTICS_REPLAY=100; // % of sessions that get a screen recording
const AN={consent:null,on:false,queue:[],t0:Date.now(),scr:null,scrAt:Date.now(),first:null,taps:0,dead:0,
  runAt:0,offAt:0,turnAt:0,errs:0,started:false};
try{AN.consent=localStorage.getItem('ft1p.analytics')}catch(e){}
// Copies running on this computer (or in Claude's tests) send nothing unless the address has ?track in it.
AN.dev=location.protocol==='file:'||/^(localhost|127\.|0\.0\.0\.0|\[::1\]|)$/.test(location.hostname);
AN.allowed=!!ANALYTICS_TOKEN&&(!AN.dev||/[?&]track\b/.test(location.search));

const anSecs=t=>Math.round((Date.now()-t)/100)/10;
function anScreen(){if(typeof S==='undefined'||!S)return 'boot';
  if(S.paused)return 'pause:'+S.paused;
  if(S.view)return S.screen+'+'+S.view;
  if(S.overlays&&S.overlays.length)return S.screen+'+popup';
  if(S.errandAsk)return 'errand-ask';
  if(S.pocketAsk!=null)return 'pocket-ask';
  return S.screen}
function anOffice(){try{return S.office||S.tut?cur().name:undefined}catch(e){return undefined}}
// Where the player is: added to every event.
function anCtx(){if(typeof S==='undefined'||!S)return {};const o=S.office;
  return {screen:anScreen(),tutorial:!!S.tut,character:S.char||undefined,reform:S.reform||0,chapter:S.chapter,
    office:anOffice(),office_idx:S.officeIdx,turn:o?o.turn:undefined,day:S.day,patience:S.patience}}
function anCard(c){return c?(c.kind==='doc'?c.doc+(c.form&&c.form!=='original'?':'+c.form:''):c.key):undefined}

// The one door every event goes through. Before the player answers, events wait in memory, so the
// tutorial and first screens are still sent if they say yes later in the same visit.
function track(name,props){
  if(!AN.allowed||AN.consent==='no')return;
  const p=Object.assign(anCtx(),props||{});
  if(AN.on&&window.mixpanel)try{mixpanel.track(name,p)}catch(e){}
  else if(AN.consent==null&&AN.queue.length<400)AN.queue.push([name,p,Date.now()]);
}
function anBase(){return {game_version:GAME_VERSION,game_build:GAME_BUILD.n,host:location.hostname||'file',
  lang:typeof LANG!=='undefined'?LANG:'en'}}
function anStart(){
  if(AN.on||!AN.allowed||AN.consent!=='yes')return;AN.on=true;
  // Mixpanel's own loader (their "snippet"), pointed at the copy of the library in js/vendor/ instead of their CDN,
  // so the version is pinned and it also works inside a desktop wrapper later.
  window.MIXPANEL_CUSTOM_LIB_URL='js/vendor/mixpanel-with-recorder.min.js';
  (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
  for(h=0;h<l.length;h++)t(b,l[h]);c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src=MIXPANEL_CUSTOM_LIB_URL;e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);
  mixpanel.init(ANALYTICS_TOKEN,{api_host:ANALYTICS_HOST,persistence:'localStorage',track_pageview:false,autocapture:false,
    record_sessions_percent:ANALYTICS_REPLAY,
    record_mask_all_text:false,          // game text is shown in replays (it's the whole point)...
    record_mask_inputs:true,             // ...but what people type (feedback form) is hidden
    record_block_selector:'video, audio', // pictures are kept (default would blank every card's art)
    record_idle_timeout_ms:5*60*1000});
  mixpanel.opt_in_tracking();
  mixpanel.register(anBase());
  // events from before the yes, with their real times
  AN.queue.forEach(([n,p,t])=>mixpanel.track(n,Object.assign({time:t},p)));AN.queue=[];
}
function anSessionStart(){if(AN.started)return;AN.started=true;
  let tut=null;try{tut=localStorage.getItem('ft1p.tut')}catch(e){}
  track('Session Start',{viewport_w:innerWidth,viewport_h:innerHeight,landscape:innerWidth>innerHeight,
    touch:matchMedia('(pointer:coarse)').matches,dpr:devicePixelRatio,
    runs_before:typeof META!=='undefined'?META.runs:undefined,wins_before:typeof META!=='undefined'?META.wins:undefined,
    tutorial_state:tut,resumed:typeof S!=='undefined'&&!!S&&S.screen!=='intro'})}
function anSet(v){
  AN.consent=v;try{localStorage.setItem('ft1p.analytics',v)}catch(e){}
  if(v==='yes'){if(AN.on){try{mixpanel.opt_in_tracking();mixpanel.start_session_recording()}catch(e){}}else anStart();track('Analytics On')}
  else{if(AN.on){try{mixpanel.track('Analytics Off');mixpanel.stop_session_recording();mixpanel.opt_out_tracking()}catch(e){}}AN.queue=[]}
}

/* ---------- the ask (title screen) and the switch (Options) ---------- */
function anAskHTML(){
  if(!AN.allowed||AN.consent!=null||S.screen!=='intro'||S.paused)return '';
  if(typeof tutSeen==='function'&&!tutSeen())return ''; // the tutorial invite goes first
  return `<div class="an-ask" role="region" aria-label="${L`Play data`}"><b>${L`Help test the game?`}</b>
    <p>${L`Share anonymous play data and a screen recording of the game: what you tap, where you get stuck. No names, and nothing you type.`}</p>
    <div class="btnrow"><button class="btn primary" data-act="anYes">${L`Share`}</button><button class="btn quiet" data-act="anNo">${L`No thanks`}</button></div></div>`}
function anOptHTML(){if(!AN.allowed)return '';const on=AN.consent==='yes';
  return `<h2 class="opt-h">${L`Play data`}</h2>
    <div class="langs"><button class="btn" data-act="anToggle" aria-pressed="${on}">${on?L`Sharing play data: on`:L`Sharing play data: off`}</button></div>
    <p class="an-note">${L`Anonymous taps, timings and a screen recording, used only to make the game easier to play.`}</p>`}

/* ---------- watching from the outside ---------- */
// Wrap a game function: run `before` (returns a snapshot), call the original, then `after(snapshot, args)`.
// A mistake in here is caught, so analytics can never break the game.
function anWrap(name,after,before){
  const f=window[name];if(typeof f!=='function')return;
  window[name]=function(...a){let s;try{s=before&&before(...a)}catch(e){}
    const r=f.apply(this,a);try{after&&after(s,...a)}catch(e){}return r}}

anWrap('render',()=>{
  const ask=anAskHTML();if(ask){$app.insertAdjacentHTML('beforeend',ask);if(LANG==='sr'&&typeof cyrTree==='function')cyrTree($app.querySelector('.an-ask'))}
  const k=anScreen();if(k===AN.scr)return;
  if(AN.scr)track('Screen',{from:AN.scr,to:k,secs_on_from:anSecs(AN.scrAt),
    first_tap_secs:AN.first==null?null:Math.round((AN.first-AN.scrAt)/100)/10,taps:AN.taps,dead_taps:AN.dead});
  AN.scr=k;AN.scrAt=Date.now();AN.first=null;AN.taps=0;AN.dead=0});
anWrap('optionsBody',null);{const ob=window.optionsBody;window.optionsBody=function(){return ob()+anOptHTML()}}
anWrap('setLang',()=>{if(AN.on)try{mixpanel.register({lang:LANG})}catch(e){}});

anWrap('beginRun',()=>{AN.runAt=Date.now();
  track('Run Start',{trinkets:(S.trinkets||[]).join(','),runs_before:META.runs})});
anWrap('enterOffice',()=>{AN.offAt=Date.now();let boss=false;try{boss=!S.tut&&isBoss(cur())}catch(e){}
  track('Office Enter',{boss,deck_size:S.deck.length,favours:S.favours})});
anWrap('startTurn',()=>{AN.turnAt=Date.now()});
anWrap('endTurn',s=>{
  track('Turn End',Object.assign(s,{turn_secs:anSecs(AN.turnAt),patience_after:S.patience}))},
  ()=>{const o=S.office;return {turn:o.turn,hand_left:o.hand.length,rows_done:o.rows.filter(r=>r.done).length,rows:o.rows.length}});
anWrap('officeDone',s=>track('Office Done',s),
  ()=>({office:anOffice(),turns_used:S.office.turn,closings:S.office.closings,office_secs:anSecs(AN.offAt)}));
anWrap('tapCard',s=>{if(s)track('Card Tap',s)},uid=>{const c=C(uid);if(!c)return null;
  const mode=S.redrawing?'swap':S.keeping?'keep':S.target?'target':'play';let blocked=false,why;
  if(mode==='play'&&!S.confirm){try{blocked=!canPlay(c);if(blocked)why=whyNot(c)}catch(e){}}
  return {card:anCard(c),kind:c.kind,mode,blocked,why}});
anWrap('goErrand',s=>track('Errand',s),()=>{const r=S.office&&S.office.rows[S.pending];
  let cost;try{cost=closeCost()}catch(e){}return {paper:r?r.doc:undefined,cost}});
anWrap('mapGo',s=>{if(s)track('Map Stop',s)},()=>{const s=S.mapSel,l=curLeg();if(!s||!l)return null;
  const n=s.id==='office'?null:l.nodes[s.id];return {stop:n?n.k:'office',hazard:n&&n.hz||undefined,choices:mapNext().length}});
anWrap('pickReward',s=>track('Reward Pick',s),uid=>({card:uid?anCard(C(uid)):'skip'}));
anWrap('runEnded',s=>{if(!s)track('Run End',{result:S.result,run_secs:anSecs(AN.runAt||AN.t0),runs:META.runs,wins:META.wins})},()=>S.ended);
anWrap('tutStart',()=>track('Tutorial',{step:'start'}));
anWrap('tutMark',(s,v)=>track('Tutorial',{step:v}));
anWrap('sendFeedback',()=>track('Feedback Sent',{type:typeof FB!=='undefined'?FB.type:undefined}));

// Every tap on the game: counts taps per screen, and logs "dead taps" (on something that does nothing),
// the clearest sign that a player thought something was a button. Capture phase = sees the tap before the game.
document.addEventListener('click',e=>{
  if(!e.isTrusted||!e.target.closest||!e.target.closest('#app'))return;
  AN.taps++;if(AN.first==null)AN.first=Date.now();
  const b=e.target.closest('[data-act]');
  if(b){const a=b.dataset.act;
    if(a==='anYes'||a==='anNo'||a==='anToggle'){anSet(a==='anNo'||a==='anToggle'&&AN.consent==='yes'?'no':'yes');setTimeout(()=>render())}
    else if(a!=='card'){const d=Object.assign({},b.dataset);delete d.act;delete d.uid;
      if(b.dataset.uid)d.card=anCard(C(+b.dataset.uid));track('Tap',Object.assign({act:a},d))}
    return}
  if(e.target.closest('button,a,input,textarea,select,label,.card,.citywrap,[role=button],[tabindex]'))return;
  AN.dead++;if(AN.dead>25)return;
  const t=e.target,txt=(t.textContent||'').trim().replace(/\s+/g,' ').slice(0,40);
  track('Dead Tap',{target:t.tagName.toLowerCase()+(t.className&&typeof t.className==='string'?'.'+t.className.trim().split(/\s+/).join('.'):''),text:txt||undefined,
    x:Math.round(e.clientX/innerWidth*100),y:Math.round(e.clientY/innerHeight*100)});
},true);

addEventListener('error',e=>{if(++AN.errs>20)return;
  track('JS Error',{message:String(e.message||'').slice(0,200),source:String(e.filename||'').split('/').pop()+':'+e.lineno})});
addEventListener('unhandledrejection',e=>{if(++AN.errs>20)return;track('JS Error',{message:String(e.reason).slice(0,200),source:'promise'})});

// Leaving (tab closed, app switched, phone locked): sent with sendBeacon, which survives the page closing.
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden'){
    const p=Object.assign(anCtx(),{secs_on_screen:anSecs(AN.scrAt),session_secs:anSecs(AN.t0)});
    if(AN.on&&window.mixpanel&&AN.consent==='yes')try{mixpanel.track('Leave',p,{transport:'sendBeacon',send_immediately:true})}catch(e){}}
  else if(AN.started)track('Return',{})});

anSessionStart();anStart();
if(AN.consent==null&&AN.allowed&&typeof S!=='undefined'&&S&&S.screen==='intro')render();
