let lastScreen=null,lastMapStep=null,lastYugo=null,lastView=null;
let swallowMap=false;
const mapSig=()=>{const L=curLeg();return L?`${S.officeIdx}|${L.at}|${L.arrived}`:''};
function render(){
  const m=$app.querySelector('main'),lane=$app.querySelector('.lane');
  const keep=lastScreen===S.screen+'|'+S.officeIdx,SC=['main','main>.check'],tops=SC.map(q=>{const el=$app.querySelector(q);return el?el.scrollTop:0});
  const cw=[...$app.querySelectorAll('.citywrap')].map(e=>e.scrollLeft);
  if(S.tut)tutSync();
  $app.innerHTML=(['intro','rules','closed','vitrina','who','options','tutdone'].includes(S.screen)?'':status())+screen()+panelHTML()+askHTML()+errandAskHTML()+overlay()+pauseHTML()+(S.tut?tutHTML():'');
  if(LANG==='sr')cyrTree($app);
  if(keep)SC.forEach((q,i)=>{const el=$app.querySelector(q);if(el)el.scrollTop=tops[i]});
  $app.querySelectorAll('.citywrap').forEach((e,i)=>{if(cw[i]!=null)e.scrollLeft=cw[i]});
  lastScreen=S.screen+'|'+S.officeIdx;
  laneLayout();framePortrait();if(S.tut)tutPlace();
  gossipTick();fitTitle();musicSync();
  // The map: the Yugo drives from where it was to where it is now (hazards off while it drives),
  // and the strip scrolls so it stays in the middle. Opening the map panel also centres on you.
  if(S.screen==='map'){const y=$app.querySelector('.mapmain .yugo'),sig=mapSig(),moved=lastMapStep!==sig;
    if(y){const p={o:S.officeIdx,l:y.style.left,t:y.style.top};
      if(lastYugo&&lastYugo.o===p.o&&(lastYugo.l!==p.l||lastYugo.t!==p.t)&&y.animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
        y.classList.add('driving');const an=y.animate([{left:lastYugo.l,top:lastYugo.t},{left:p.l,top:p.t}],{duration:700,easing:'ease-in-out'});
        an.onfinish=()=>y.classList.remove('driving')}
      lastYugo=p}
    if(moved){const first=lastMapStep==null||lastMapStep.split('|')[0]!==sig.split('|')[0];lastMapStep=sig;centerCity(!first&&!!y)}}
  else lastMapStep=null;
  if(S.view==='map'&&lastView!=='map')centerCity(false);
  lastView=S.view;
  if(S.office&&S.office.fresh!=null){S.office.fresh=null;const li=$app.querySelector('.rows li.fresh');if(li&&li.scrollIntoView)li.scrollIntoView({block:'nearest',behavior:'smooth'})}
}

/* ============ music ============
   Two looping tracks: the menu theme on the title and rules screens, and the in-game track during a run
   (office, errands, rewards, stops). Switching crossfades between them; pausing turns the in-game track down
   to a murmur; the end-of-run screen is quiet. Browsers only allow sound after the player has touched or
   clicked the page, so the first tap anywhere starts it. One on/off setting covers both, remembered per device. */
const TRACKS={menu:{src:'waiting-room-shuffle.mp3',vol:.55},game:{src:'ingame-music.mp3',vol:.38}};
const MENU_SCREENS=['intro','rules'],QUIET_SCREENS=['closed','end'];
for(const t of Object.values(TRACKS)){t.a=typeof Audio==='function'?new Audio(t.src):null;if(t.a){t.a.loop=true;t.a.preload='auto';t.a.volume=0}t.fade=null;t.target=-1}
let musicOn=true;
try{musicOn=localStorage.getItem('ft1p.music')!=='off'}catch(e){}
function fadeTrack(t,v,ms){const a=t.a;if(!a||t.target===v)return;t.target=v;clearInterval(t.fade);
  if(v>0&&a.paused){const pr=a.play();if(pr&&pr.catch)pr.catch(()=>{t.target=-1})}
  const from=a.volume,t0=Date.now();
  t.fade=setInterval(()=>{const k=Math.min(1,(Date.now()-t0)/ms);a.volume=Math.max(0,Math.min(1,from+(v-from)*k));
    if(k>=1){clearInterval(t.fade);if(v===0)a.pause()}},40)}
function musicSync(){
  if(!S)return;
  const want=!musicOn||QUIET_SCREENS.includes(S.screen)?null:MENU_SCREENS.includes(S.screen)?'menu':'game';
  const m=TRACKS.menu,g=TRACKS.game;
  // a play() refused before the first tap leaves the track paused: try again on the next sync
  for(const t of [m,g])if(t.a&&t.a.paused&&t.target>0)t.target=-1;
  fadeTrack(m,want==='menu'?m.vol:0,want==='menu'?900:1000);
  fadeTrack(g,want==='game'?(S.paused?g.vol*.3:g.vol):0,want==='game'?(S.paused?350:1400):700);
}
function soundBtn(light){return `<button class="ts-sound ${light?'light':''}" data-act="music" aria-label="${musicOn?L`Turn music off`:L`Turn music on`}" aria-pressed="${musicOn}">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/>${musicOn?'<path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>':'<path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'}</svg></button>`}
// First touch / click / key anywhere unlocks audio (browser autoplay rule).
['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,()=>musicSync(),{capture:true,passive:true}));
// Title logo: shrink the type until both lines fit the screen (fallback fonts are wider than Barlow Condensed).
function fitTitle(){const t=$app.querySelector('.ts-title');if(!t)return;t.style.fontSize='';
  const max=Math.min(innerWidth,$app.clientWidth||innerWidth)*0.9;let f=parseFloat(getComputedStyle(t).fontSize),n=0;
  while(t.scrollWidth>max&&f>30&&n++<40){f-=2;t.style.fontSize=f+'px'}}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(S)fitTitle()});
/* ============ gossip bubbles ============
   The clerks talk continuously while you are at the window: one line at a time, a short gap between lines,
   a longer one between scenes. The office's STORY plays in order (progress is saved in the run); a hint about
   the clerk's next move can slip in between scenes; once the story is told, they fall back to small talk.
   Everything waits while an announcement, a side page or the pause menu is open. Tap a bubble to skip it.
   This runs on timers outside render(); render() only re-attaches the current bubble. */
const GB={line:null,t:null,on:false,tell:null,small:[],office:-1};
function drawBubble(anim){
  const stage=$app.querySelector('.stage');if(!stage)return;
  const old=stage.querySelector('.bubble');if(old)old.remove();
  const ln=GB.line;if(!ln)return;
  const d=cur(),[w,l]=ln,clerk=w==='C';
  const el=document.createElement('div');
  el.className=`bubble ${clerk?'c':'k'} ${anim?'pop':''}`;el.setAttribute('role','status');el.dataset.gb='1';
  el.innerHTML=`<b>${esc(clerk?d.clerk:L`${d.pal}, next window`)}</b>${esc(fillT(l,[]))}`;
  stage.appendChild(el);if(LANG==='sr')cyrTree(el);
  aimBubble(stage,el,lookOf(d));
}

// Frame the clerk by the rule of thirds: her eyes on the upper third line, her face centred on the left third line.
// The head is scaled to a share of the stage height; on phones she is made just big enough that the bust ends
// behind the location band. Where the bust ends, the counter (stage::after) takes over.
const EYE_Y=.46; // eyes sit about this far down the head picture (hair included)
function framePortrait(){
  const st=$app.querySelector('.stage.hero'),cv=st&&st.querySelector('.portrait');if(!cv)return;
  const P=PUPPETS[cv.dataset.office];if(!P)return;
  const [bw]=P.bust,[top,bot]=P.crop,hh=P.head[1]*P.hs,hw=P.head[0]*P.hs,eye=P.hy+EYE_Y*hh,fx=P.hx+hw/2;
  const W=st.clientWidth,H=st.clientHeight,band=st.querySelector('.band'),B=band?band.offsetHeight:45;
  const safe=parseFloat(getComputedStyle(st).getPropertyValue('--st'))||0,vis=H-safe,tall=H>W;
  const ey=safe+vis/3;
  let s=(tall?.55:.74)*vis/hh;
  if(!tall)s=Math.max(s,(H-B+6-ey)/(bot-eye));
  // tall column (landscape): the bust stands on the bottom edge; the location band is along the top there
  const h=(bot-top)*s,w=bw*s,y=tall?H-h:ey-(eye-top)*s,x=W/3-fx*s;
  Object.assign(cv.style,{width:w.toFixed(1)+'px',height:h.toFixed(1)+'px',left:x.toFixed(1)+'px',top:y.toFixed(1)+'px'});
  st.style.setProperty('--cb',(y+h).toFixed(1)+'px');
}
// Where each clerk's face ends on the right, as a fraction of the portrait's width (the bubble starts just past it).
const FACE_RIGHT={'Registry':0.663,'Police':0.658,'Tax Office':0.698,'Bureau':0.681,'Bank':0.71};
// The bubble sits just above the next-action box, beside the clerk's face, with a short tail toward her.
// The portrait canvas is scaled to fit its box (object-fit: contain, anchored bottom-left), so the drawn picture's width is worked out first.
function aimBubble(stage,el,office){
  const it=stage.querySelector('.intent');if(it)stage.style.setProperty('--ib',it.offsetHeight+'px');
  const img=stage.querySelector('.portrait'),fr=FACE_RIGHT[office];if(!img||!fr||!el.classList.contains('c'))return fitBubble(stage,el);
  const nw=img.naturalWidth||img.width,nh=img.naturalHeight||img.height;
  if(!nw){img.addEventListener('load',()=>{if(el.isConnected)aimBubble(stage,el,office)},{once:true});return}
  const W=stage.clientWidth,iw=img.clientWidth,ih=img.clientHeight,k=Math.min(iw/nw,ih/nh);
  const face=img.offsetLeft+fr*nw*k;
  el.style.left=Math.round(Math.max(W*.34,Math.min(W*.6,face+14)))+'px';
  fitBubble(stage,el);
}
// A long line can still reach up under the Patience/Time tiles: then its text gets a little smaller until it clears them.
// (Positions are read from offsetTop/offsetLeft, which ignore the pop-in animation's scaling.)
function fitBubble(stage,el){
  const hud=$app.querySelector('.hud.float');if(!hud||!el.isConnected)return;
  el.style.fontSize='';
  const h=hud.getBoundingClientRect(),s=stage.getBoundingClientRect(),lim=h.bottom+6;
  const hits=()=>{const t=s.top+el.offsetTop,l=s.left+el.offsetLeft;return t<lim&&l<h.right&&l+el.offsetWidth>h.left};
  let f=parseFloat(getComputedStyle(el).fontSize),n=0;
  while(hits()&&f>11.5&&n++<12){f-=.5;el.style.fontSize=f+'px'}
}
function gbLater(fn,ms){clearTimeout(GB.t);GB.t=setTimeout(fn,ms)}
function nextLine(){
  // the clerks' running story belongs to the First job chapter (v30)
  const o=S.office,sc=CHAPTER===CHAPTERS.job&&STORY[cur().name]||[];
  const atBreak=o.story===0||sc[o.story-1]===null||o.story>=sc.length;
  if(GB.tell&&GB.tell.length&&atBreak&&!GB.inTell){GB.small=GB.tell;GB.tell=null;GB.inTell=true}
  if(GB.small.length)return {line:GB.small.shift()};
  GB.inTell=false;
  if(o.story<sc.length){const ln=sc[o.story++];return ln?{line:ln}:{gap:4200+Math.random()*2500}}
  // story told: small talk now and then
  const pool=GOSSIP_LIFE[cur().clerk]||GOSSIP_LIFE[(CHAPTERS.job.offices.find(x=>x.name===lookOf(cur()))||CHAPTERS.job.offices[0]).clerk],idx=pool.map((x,i)=>i).filter(i=>!o.usedGossip.includes(i)),k=idx.length?rnd(idx):Math.floor(Math.random()*pool.length);
  o.usedGossip.push(k);GB.small=pool[k].slice();
  return {gap:9000+Math.random()*7000};
}
function gossipStep(){
  if(!S||S.screen!=='office'||!S.office){GB.on=false;GB.line=null;return}
  if(S.overlays.length||S.view||S.paused||S.errandAsk){gbLater(gossipStep,700);return}
  const old=$app.querySelector('.stage .bubble');
  if(GB.line){GB.line=null;if(old){old.classList.remove('pop');old.classList.add('out')}gbLater(gossipStep,650+Math.random()*500);return}
  if(old)old.remove();
  const n=nextLine();
  if(n.gap){gbLater(gossipStep,n.gap);return}
  GB.line=n.line;drawBubble(true);
  gbLater(gossipStep,2300+n.line[1].length*55);
}
function gossipTick(){
  const o=S.office;
  if(S.tut){if(GB.on){clearTimeout(GB.t);GB.on=false;GB.line=null}return}
  if(S.screen!=='office'||!o){if(GB.on){clearTimeout(GB.t);GB.on=false;GB.line=null}return}
  if(GB.office!==S.officeIdx){GB.office=S.officeIdx;GB.small=[];GB.inTell=false;GB.line=null;GB.on=false}
  if(o.story==null)o.story=0;
  if(!GB.on){GB.on=true;gbLater(gossipStep,1400)}
  else if(GB.line)drawBubble(false);
}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-gb]')){e.stopPropagation();if(GB.line)gossipStep()}},true);
