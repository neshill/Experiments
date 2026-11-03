
/* ============ input ============ */
// Layout switches between portrait and landscape: redraw (fan geometry depends on the width).
// Big landscape screens: scale the whole layout up from a 1280×800 baseline (Steam Deck size) so it doesn't look lost.
const LANDSCAPE='(orientation:landscape) and (min-width:900px) and (min-height:540px)';
function fitScreen(){
  const land=matchMedia(LANDSCAPE).matches,z=land?Math.max(1,Math.min(innerWidth/1100,innerHeight/690,1.9)):1,r=document.documentElement.style;
  r.setProperty('--z',z);r.setProperty('--lvh',(innerHeight/z/100)+'px');r.setProperty('--lvw',(innerWidth/z/100)+'px');
  $app.style.zoom=z===1?'':String(z);
}
fitScreen();
let rsT=null;addEventListener('resize',()=>{clearTimeout(rsT);rsT=setTimeout(()=>{fitScreen();if(S)render()},120)});
function tapCard(uid){
  const c=C(uid),tg=S.target;
  if(S.redrawing){toggleSwap(uid);return}
  if(S.keeping){toggleKeep(uid);return}
  if(tg){
    if(tg.src===uid){S.target=null;return}
    const ok=tgtOk(tg,c);
    if(ok){S.target=null;useAction(C(tg.src),c)}
    return;
  }
  if(S.confirm){S.confirm=null}
  if(!canPlay(c)){S.log=whyNot(c);return}
  if(c.kind==='doc'){const r=rowFor(c);
    if(r.form==='alt'&&c.form==='original'){S.confirm={uid,row:S.office.rows.indexOf(r)};return}
    return handIn(c,r)}
  if(ACTIONS[c.key].target){S.target={type:ACTIONS[c.key].target,src:uid};return}
  useAction(c);
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b)return;
  const a=b.dataset.act,uid=+b.dataset.uid;
  if(S.paused){if(!['resume','pauseMenu','pauseRules','pauseFeedback','fbType','fbSend','music','endRun','endRunYes','pauseCards','pauseOptions','lang'].includes(a))return}
  else{if(S.overlays.length&&a!=='dismiss')return;
  if(S.pocketAsk!=null&&!S.overlays.length&&a!=='pocketUse'&&a!=='pocketNo')return;
  if(S.errandAsk&&!S.overlays.length&&a!=='errandGo'&&a!=='stay')return;
  if(S.view&&a!=='view')return;}
  if(S.tut&&!tutAllow(a,b)){render();return}
  if(S.redrawing&&!['card','redraw','redrawCancel','dismiss','view','pause','resume','pauseMenu'].includes(a))S.redrawing=null;
  switch(a){
    case 'dismiss':S.overlays.shift();break;
    case 'view':S.view=b.dataset.v||null;break;
    case 'start':S.screen='who';break;
    case 'who':pickChar(b.dataset.k);break;
    case 'reform':stepReform(+b.dataset.k);break;
    case 'toVitrina':S.screen='vitrina';break;
    case 'toWho':S.screen='who';break;
    case 'nextChapter':startNextChapter();break;
    case 'begin':beginRun();break;
    case 'equip':{const k=b.dataset.k,eq=META.equipped,i=eq.indexOf(k);if(i>=0)eq.splice(i,1);else{eq.push(k);while(eq.length>META.slots)eq.shift()}saveMeta();break}
    case 'again':newRun();S.screen='who';break;
    case 'toTitle':newRun();break;
    case 'mapSel':mapSelect(+b.dataset.leg,b.dataset.id==='office'?'office':+b.dataset.id);break;
    case 'mapUnsel':S.mapSel=null;break;
    case 'mapGo':mapGo();break;
    case 'eventPick':{const s=snapRun();eventPick(b.dataset.k);tagStop(s,'event');break}
    case 'reissueAt':{if(uid){C(uid).issued=S.day;S.counterLeft--}if(!uid||S.counterLeft<=0)nodeDone();break}
    case 'counterDone':nodeDone();break;
    case 'pocketAsk':S.pocketAsk=+b.dataset.i;break;
    case 'pocketNo':S.pocketAsk=null;break;
    case 'pocketUse':{const i=S.pocketAsk;S.pocketAsk=null;usePocket(i);break}
    case 'rules':S.screen='rules';break;
    case 'options':S.screen='options';break;
    case 'pauseOptions':S.paused='options';break;
    case 'lang':setLang(b.dataset.l,true);break;
    case 'tutorial':tutStart();break;
    case 'tutNo':tutMark('declined');break;
    case 'tutNext':if(S.tut&&TUT_STEPS[S.tut.step]&&!TUT_STEPS[S.tut.step].done)S.tut.step++;break;
    case 'tutSkip':tutMark('skipped');newRun();break;
    case 'tutRun':newRun();S.screen='who';break;
    case 'pause':S.paused='menu';S.target=null;S.confirm=null;break;
    case 'resume':S.paused=null;break;
    case 'pauseMenu':S.paused='menu';break;
    case 'pauseRules':S.paused='rules';break;
    case 'pauseCards':S.paused='cards';break;
    case 'pauseFeedback':S.paused='feedback';FB.err='';break;
    case 'fbType':FB.type=b.dataset.t;break;
    case 'fbSend':sendFeedback();return;
    case 'endRun':S.paused='confirm';break;
    case 'endRunYes':S.paused=null;newRun();break;
    case 'title':if(['vitrina','who','rules','closed','options'].includes(S.screen))S.screen='intro';break;
    case 'music':musicOn=!musicOn;try{localStorage.setItem('ft1p.music',musicOn?'on':'off')}catch(_){}break;
    // Quit: a web page can only close itself if a script opened it, so fall back to a "closed" screen.
    case 'quit':S.screen='closed';render();try{window.close()}catch(_){}return;
    case 'card':tapCard(uid);break;
    case 'confirmYes':{const cf=S.confirm;S.confirm=null;handIn(C(cf.uid),S.office.rows[cf.row]);break}
    case 'row':{const tg=S.target;if(tg&&tg.type==='row'){const r=S.office.rows[+b.dataset.i];if(!r.done){S.target=null;useAction(C(tg.src),r)}}break}
    case 'cancel':S.target=null;S.confirm=null;break;
    case 'end':if(S.keeping)endTurn(S.keeping);else requestEndTurn();break;
    case 'keepCancel':S.keeping=null;break;
    case 'redraw':if(S.redrawing){if(S.redrawing.length)doRedraw();else cancelSwap()}else if(canBagSwap()&&!S.keeping)startSwap('bag');break;
    case 'redrawCancel':cancelSwap();break;
    case 'fromBag':fromBag(+b.dataset.i);break;
    case 'pay':payAtBank(+b.dataset.i);break;
    case 'fetch':S.pending=+b.dataset.i;S.target=null;S.confirm=null;S.errandAsk=true;break;
    case 'errandGo':S.errandAsk=false;goErrand();break;
    case 'stay':S.errandAsk=false;S.screen='office';break;
    case 'back':backToWindow();break;
    case 'reward':pickReward(uid||null);break;
    case 'relic':S.relics.push(b.dataset.k);nodeDone();break;
    case 'copy':{if(uid){const c=C(uid),x={issued:c.issued,noexp:c.noexp};addToDeck(mkDoc(c.doc,'copy',x));addToDeck(mkDoc(c.doc,'copy',x))}nodeDone();break}
    case 'shred':if(uid)S.deck=S.deck.filter(u=>u!==uid);nodeDone();break;
  }
  render();
});

/* ============ hand gestures ============
   Tap a card            -> play it (lifts slightly the moment you touch it, plays on release).
   Hold ~0.28 s          -> big preview above the fan. Release to close, nothing is played.
   Slide sideways        -> the hand slides (it's a row of cards that can be wider than the screen); a flick keeps it gliding.
   While previewing, slide sideways -> preview follows your finger through the hand (a little "sticky" so it doesn't flicker).
   While previewing, slide UP out of the fan -> "Release to play", let go to play it.
   Other screens: hold a card to enlarge it. */
if(typeof document.createElement==='function'){
  const HOLD_MS=280,OTHER_MS=240,SLIDE_PX=11;
  const pk=document.createElement('div');pk.id='peek';pk.hidden=true;document.body.appendChild(pk);
  let g=null,swallow=false;
  const fanCards=()=>[...document.querySelectorAll('.lane.fan .card[data-uid]')];
  // Cards overlap left to right (each covers the right edge of the one before), so what you see of a card is its
  // left strip. The card under the finger is the one whose visible strip, along its tilted axis, is nearest.
  const TAN=Math.tan(HAND_TILT*Math.PI/180),STICKY_PX=10;
  function cardAt(x,y,cur){const cs=fanCards();let best=null,bd=1e9,cd=1e9;
    cs.forEach((el,i)=>{const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,
      ax=cx+(cy-y)*(i%2?-TAN:TAN)-(i<cs.length-1?(122-HAND_STEP)/2:0),d=Math.abs(x-ax);if(d<bd){bd=d;best=el}if(el===cur)cd=d});
    if(cur&&best&&best!==cur&&cd-bd<STICKY_PX)return cur;return best}
  // the hint over a lifted card: one whole sentence per case, so every language can word it its own way
  const VERB={drop:{go:()=>L`Release to drop`,click:()=>L`Click to drop`,slide:()=>L`↑ Slide up to drop`},
    keep:{go:()=>L`Release to keep`,click:()=>L`Click to keep`,slide:()=>L`↑ Slide up to keep`},
    hand:{go:()=>L`Release to hand in`,click:()=>L`Click to hand in`,slide:()=>L`↑ Slide up to hand in`},
    play:{go:()=>L`Release to play`,click:()=>L`Click to play`,slide:()=>L`↑ Slide up to play`},
    swap:{go:()=>L`Release to pick for swapping`,click:()=>L`Click to pick for swapping`,slide:()=>L`↑ Slide up to pick for swapping`}};
  const verb=c=>VERB[S.redrawing?'swap':S.keeping?(S.keeping.includes(c.uid)?'drop':'keep'):c.kind==='doc'?'hand':'play'];
  let ptr='touch',hv=null;
  function label(c,launch){
    if(S.screen!=='office'||!S.office||!S.office.hand.includes(c.uid)||S.confirm)return '';
    if(S.target)return '';
    if(!S.keeping&&!S.redrawing&&!canPlay(c))return `<span class="pk-lbl no">${esc(whyNot(c))}</span>`;
    if(launch)return `<span class="pk-lbl go">${verb(c).go()}</span>`;
    return ptr==='mouse'?`<span class="pk-lbl hint">${verb(c).click()}</span>`:`<span class="pk-lbl hint">${verb(c).slide()}</span>`;
  }
  function place(el,fan){
    const vw=innerWidth,vh=innerHeight,W=118,H=194;
    if(fan){
      const wrap=el.closest('.fanwrap').getBoundingClientRect(),top=wrap.top+10;
      const s=Math.max(1.1,Math.min(1.75,(top-64)/H,(vw-28)/W)),w=W*s,h=H*s,r=el.getBoundingClientRect();
      const cx=Math.max(w/2+10,Math.min(vw-w/2-10,r.left+r.width/2));
      pk.style.setProperty('--s',s);pk.style.left=cx+'px';pk.style.top=Math.max(8,top-h-38)+'px';pk.classList.remove('center');
    }else{
      const s=Math.min(1.8,(vh-80)/H,(vw-28)/W),h=H*s;
      pk.style.setProperty('--s',s);pk.style.left=vw/2+'px';pk.style.top=Math.max(8,(vh-h)/2-16)+'px';pk.classList.add('center');
    }
  }
  function preview(el,fan,launch){
    const c=C(+el.dataset.uid);
    pk.innerHTML=label(c,launch)+`<div class="pk-card">${cardHTML(c,{act:'zoom'})}</div>`;if(LANG==='sr')cyrTree(pk);
    place(el,fan);
    if(pk.hidden){pk.hidden=false;requestAnimationFrame(()=>pk.classList.add('on'))}
  }
  function focus(el){ // move the lifted card + preview to el
    if(!g||g.el===el&&g.mode==='peek')return;
    if(g.el)g.el.classList.remove('press','peek','launch');
    g.el=el;g.launch=false;el.classList.add('peek');preview(el,true,false);
  }
  function startPeek(){if(!g||g.mode==='peek')return;clearTimeout(g.t);g.mode='peek';
    if(g.fan){g.el.closest('.lane').classList.add('peeking');g.el.classList.remove('press');const el=g.el;g.el=null;focus(el)}
    else preview(g.el,false,false)}
  function clear(){
    if(g){clearTimeout(g.t);if(g.el){g.el.classList.remove('press','peek','launch');const l=g.el.closest('.lane');if(l)l.classList.remove('peeking')}}
    pk.classList.remove('on');pk.hidden=true;g=null;
  }
  // Mouse: hovering a hand card lifts it and shows the big preview; no holding needed.
  function hoverOff(){if(hv&&hv.isConnected){hv.classList.remove('peek');const l=hv.closest('.lane');if(l)l.classList.remove('peeking')}hv=null;if(!g){pk.classList.remove('on');pk.hidden=true}}
  document.addEventListener('pointermove',e=>{
    ptr=e.pointerType||'mouse';
    if(ptr!=='mouse'||g||e.buttons)return;
    const over=e.target.closest&&e.target.closest('.lane.fan .card[data-uid]');
    if(!over||S.overlays.length||S.view||S.paused||S.errandAsk){if(hv)hoverOff();return}
    const el=cardAt(e.clientX,e.clientY,hv&&hv.isConnected?hv:null)||over;
    if(el===hv)return;
    if(hv&&hv.isConnected)hv.classList.remove('peek');
    hv=el;el.classList.add('peek');el.closest('.lane').classList.add('peeking');preview(el,true,false);
  });
  document.addEventListener('pointerleave',hoverOff);
  document.addEventListener('pointerdown',e=>{
    ptr=e.pointerType||'mouse';
    if(ptr==='mouse'&&e.button!==0)return;
    if(hv)hoverOff();
    if(g)clear();
    const hit=e.target.closest('.card[data-uid]');if(!hit||hit.closest('#peek'))return;
    const fan=!!hit.closest('.lane.fan');
    if(fan)laneStop();
    g={el:hit,fan,sx:e.clientX,sy:e.clientY,mode:'press',launch:false,id:e.pointerId,sx0:HAND.sx,lx:e.clientX,lt:e.timeStamp,v:0};
    if(fan)hit.classList.add('press');
    // With a mouse, hover already previews, so a press is always a click (no hold timer); dragging still slides the hand.
    if(!(fan&&ptr==='mouse'))g.t=setTimeout(startPeek,fan?HOLD_MS:OTHER_MS);
  });
  document.addEventListener('pointermove',e=>{
    if(!g||e.pointerId!==g.id)return;
    const dx=e.clientX-g.sx,dy=e.clientY-g.sy;
    if(!g.fan){if(g.mode==='press'&&Math.hypot(dx,dy)>10){clearTimeout(g.t);g=null}return}
    if(g.mode==='press'){
      // sideways before the hold kicks in: slide the hand. Up: preview, then the launch zone.
      if(Math.abs(dx)>SLIDE_PX&&Math.abs(dx)>Math.abs(dy)){clearTimeout(g.t);g.el.classList.remove('press');g.mode='scroll'}
      else if(dy<-SLIDE_PX)startPeek();
      else return;
    }
    if(g.mode==='scroll'){const dt=Math.max(1,e.timeStamp-g.lt);g.v=.6*g.v+.4*(-(e.clientX-g.lx)/dt);g.lx=e.clientX;g.lt=e.timeStamp;
      laneScrollTo(g.sx0-dx);return}
    // Previewing: above the hand = launch zone for the focused card; inside the hand = scrub through the cards.
    const top=g.el.closest('.fanwrap').getBoundingClientRect().top+40,inZone=e.clientY<top;
    if(inZone!==g.launch){g.launch=inZone;g.el.classList.toggle('launch',inZone);preview(g.el,true,inZone)}
    if(!inZone){const el=cardAt(e.clientX,e.clientY,g.el);if(el&&el!==g.el)focus(el)}
  });
  document.addEventListener('pointerup',e=>{
    if(!g||e.pointerId!==g.id)return;
    const {el,fan,mode,launch}=g,v=e.timeStamp-g.lt>90?0:g.v;
    clear();
    if(mode==='scroll'){if(Math.abs(v)>.15)laneFling(v);return}
    if(mode==='peek'&&!fan){swallow=true;setTimeout(()=>swallow=false,350);return}
    if(!fan)return; // a plain tap on a non-fan card goes through the normal click
    if(mode==='press'||launch)el.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  });
  // Mouse wheel / trackpad over the hand slides it.
  document.addEventListener('wheel',e=>{
    if(!HAND.max||!e.target.closest||!e.target.closest('.fanwrap')||S.view||S.paused||S.overlays.length)return;
    e.preventDefault();laneStop();laneScrollTo(HAND.sx+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY));
  },{passive:false});
  document.addEventListener('pointercancel',()=>{if(g)clear()});
  // Native clicks on fan cards are ignored: pointerup above decides (so tap vs hold is never guessed twice).
  document.addEventListener('click',e=>{
    if(e.isTrusted&&swallow){e.stopPropagation();e.preventDefault();swallow=false;return}
    if(e.isTrusted&&e.detail>0&&e.target.closest('.lane.fan .card[data-uid]')){e.stopPropagation();e.preventDefault()}
  },true);
  document.addEventListener('contextmenu',e=>{if(e.target.closest('.card'))e.preventDefault()});
  // The city map is a wide strip: a mouse wheel scrolls it sideways, and dragging with the mouse pans it.
  document.addEventListener('wheel',e=>{const w=e.target.closest&&e.target.closest('.citywrap');if(!w||Math.abs(e.deltaX)>=Math.abs(e.deltaY))return;
    e.preventDefault();w.scrollLeft+=e.deltaY},{passive:false});
  let pan=null;
  document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;const w=e.target.closest('.citywrap');if(w)pan={w,x:e.clientX,s:w.scrollLeft,moved:false}});
  document.addEventListener('pointermove',e=>{if(!pan)return;const dx=e.clientX-pan.x;if(!pan.moved&&Math.abs(dx)>6){pan.moved=true;pan.w.classList.add('drag')}if(pan.moved)pan.w.scrollLeft=pan.s-dx});
  document.addEventListener('pointerup',()=>{if(!pan)return;if(pan.moved){const w=pan.w;swallowMap=true;setTimeout(()=>{swallowMap=false;w.classList.remove('drag')},0)}pan=null});
  document.addEventListener('click',e=>{if(swallowMap){e.stopPropagation();e.preventDefault();swallowMap=false}},true);
  // Keyboard: 1–9 play a card, Space/E end turn, Esc cancel/close, M map, C cards, Enter/Space dismiss announcements.
  document.addEventListener('keydown',e=>{
    if(!S||e.metaKey||e.ctrlKey||e.altKey)return;
    const k=e.key;
    const inRun=!['intro','rules','closed','end','options','tutdone'].includes(S.screen);
    if(e.target.closest&&e.target.closest('textarea,input')){if(k==='Escape'){e.preventDefault();S.paused='menu';render()}return}
    if(S.paused){if(k==='Escape'||k==='p'||k==='P'){e.preventDefault();S.paused=S.paused==='menu'?null:'menu';render()}return}
    if(S.overlays.length){if(k==='Enter'||k===' '||k==='Escape'){e.preventDefault();S.overlays.shift();render()}return}
    if(S.pocketAsk!=null){if(k==='Escape'){S.pocketAsk=null;render()}return}
    if(S.errandAsk){if(k==='Escape'){S.errandAsk=false;render()}return}
    if((k==='p'||k==='P')&&inRun){S.paused='menu';render();return}
    if(k==='Escape'){if(S.view)S.view=null;else if(S.target||S.confirm){S.target=null;S.confirm=null}else if(S.redrawing)S.redrawing=null;else if(S.keeping&&!S.tut)S.keeping=null;else if(inRun)S.paused='menu';else if(S.screen==='rules'||S.screen==='options')S.screen='intro';else return;render();return}
    if(k==='m'||k==='M'||k==='c'||k==='C'){const v=/m/i.test(k)?'map':'deck';if(['intro','rules','closed','options','tutdone'].includes(S.screen)||S.tut&&v==='map')return;S.view=S.view===v?null:v;render();return}
    if(S.view||S.screen!=='office')return;
    if(k===' '||k==='e'||k==='E'){e.preventDefault();if(S.tut&&!tutAllow('end')){render();return}if(S.keeping)endTurn(S.keeping);else requestEndTurn();render();return}
    if((k==='r'||k==='R')&&!S.tut){if(S.redrawing){if(S.redrawing.length)doRedraw();else cancelSwap()}else if(canBagSwap()&&!S.keeping)startSwap('bag');render();return}
    if(/^[1-9]$/.test(k)){const el=document.querySelectorAll('.lane.fan .card[data-uid]')[+k-1];if(el){if(g)clear();hoverOff();el.dispatchEvent(new MouseEvent('click',{bubbles:true}))}}
  });
  document.addEventListener('dragstart',e=>{if(e.target.closest&&e.target.closest('.card'))e.preventDefault()});
}
