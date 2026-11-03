
/* ============ render ============ */
const $app=document.getElementById('app');
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

// Art mapping: game ids -> asset keys in ART (cropped from the concept sheet). Missing ids use drawn fallbacks.
const OFFICE_STYLE={
  'Registry':{color:'#c4512f',logo:'shield'},
  'Police':{color:'#153c62',logo:'star'},
  'Tax Office':{color:'#c93f31',logo:'chevron'},
  'Bureau':{color:'#5f7f63',logo:'briefcase'},
  'Bank':{color:'#1d5a96',logo:'waves'}
};
const CARD_BG={
  id:'#dcd7ea',birth:'#f3d3d0',rental:'#d6e3cc',utility:'#d1e0ec',joboffer:'#f7d8b3',stamp:'#f4b89d',stamp_mun:'#f3b5a6',stamp_fed:'#bfd0ea',stamp_adm:'#c7dcc4',photo:'#e4e0d7',
  citizenship:'#d3e6d4',residence:'#d1dfee',taxno:'#f6d5aa',salary:'#cddcef',alive:'#efe4cb',landlord:'#efe4cb',nodebt:'#efe4cb',
  wait:'#f2c69c',breath:'#c7e2ee',smile:'#f4e29f',photocopy:'#bfe0db',notary:'#f1c1c1',rulebook:'#c8d5ea',argue:'#ebc6b6',number:'#e8dfc4',
  envelope:'#d8b679',coffee:'#e2c8a0',cousin:'#e8a493',backdoor:'#efb8a3',friend:'#d6cde6',reissue:'#cfe3c8',backdate:'#e0b0a8'
};
const SHADY=new Set(['envelope','coffee','backdoor','backdate','bigenvelope','lostmail']);
const ICON={
  heart:'<svg viewBox="0 0 20 18" class="heart" aria-hidden="true"><path fill="currentColor" d="M10 17.5 1.7 9.4A5 5 0 0 1 10 3a5 5 0 0 1 8.3 6.4z"/></svg>',
  map:'<svg viewBox="0 0 16 16" class="mapic" aria-hidden="true"><path d="M1 3l4.5-1.5 5 2L15 2v11l-4.5 1.5-5-2L1 14z" fill="#f2e5c8" stroke="#18283a" stroke-width="1.3" stroke-linejoin="round"/><path d="M5.5 1.5v11M10.5 3.5v11" stroke="#18283a" stroke-width="1.1"/><circle cx="8" cy="7" r="1.6" fill="#c93f31"/></svg>',
  deck:'<svg viewBox="0 0 16 18" class="deckic" aria-hidden="true"><rect x="4" y="1" width="11" height="14" rx="2" fill="#4c9e9b" stroke="#18283a" stroke-width="1.3"/><rect x="1" y="3" width="11" height="14" rx="2" fill="#153c62" stroke="#18283a" stroke-width="1.3"/></svg>',
  check:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sigh:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M5 7h22v14H14l-6 5v-5H5z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="11" cy="14" r="1.6" fill="currentColor"/><circle cx="16" cy="14" r="1.6" fill="currentColor"/><circle cx="21" cy="14" r="1.6" fill="currentColor"/></svg>',
  rule:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M8 4h11l5 5v19H8z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 13h8M12 17h8" stroke="currentColor" stroke-width="1.6"/><circle cx="23" cy="24" r="6" fill="#c93f31"/><path d="M23 21v6M20 24h6" stroke="#fff" stroke-width="2"/></svg>',
  reject:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M8 4h11l5 5v19H8z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 13h8M12 17h8" stroke="currentColor" stroke-width="1.6"/><circle cx="23" cy="24" r="6" fill="#c93f31"/><path d="M20.8 21.8l4.4 4.4M25.2 21.8l-4.4 4.4" stroke="#fff" stroke-width="2"/></svg>',
  break:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M6 12h17v7a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7z" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M23 14h2a3 3 0 0 1 0 6h-2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 4c-1 2 1 3 0 5M16 4c-1 2 1 3 0 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 28h22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  phone:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M5 11c0-3 5-6 11-6s11 3 11 6l-1 3-5-1v-3c-3-1-7-1-10 0v3l-5 1z" fill="#c93f31" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 16h14l3 11H6z" fill="#c93f31" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="21" r="3" fill="#fff" stroke="currentColor" stroke-width="1.4"/></svg>',
  blocked:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="#fff" stroke="#4c9e9b" stroke-width="2.6"/><path d="M8.5 23.5l15-15" stroke="#4c9e9b" stroke-width="2.6"/></svg>',
  certify:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><path d="M7 4h12l5 5v19H7z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="21" r="6.5" fill="none" stroke="#4a3a8c" stroke-width="2.4"/><circle cx="20" cy="21" r="3" fill="#4a3a8c"/><path d="M11 11h7M11 15h5" stroke="currentColor" stroke-width="1.6"/></svg>',
  stale:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><rect x="5" y="7" width="22" height="20" rx="2" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M5 13h22M11 4v6M21 4v6" stroke="currentColor" stroke-width="2"/><path d="M11 18l10 6M21 18l-10 6" stroke="#c93f31" stroke-width="2.4" stroke-linecap="round"/></svg>',
  system:'<svg viewBox="0 0 32 32" class="ic" aria-hidden="true"><rect x="4" y="5" width="24" height="17" rx="2" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M12 28h8M16 22v6" stroke="currentColor" stroke-width="2"/><path d="M11 10l10 7M21 10l-10 7" stroke="#c93f31" stroke-width="2.4" stroke-linecap="round"/></svg>'
};
// v22 placeholders for new art. Real art goes into ART under these keys: trk_<trinket>, pkt_<pocket item>, ext_<map node>, act_<action>.
const PH=(fill,glyph)=>`<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="${fill}" stroke="#18283a" stroke-width="2"/><text x="20" y="26.5" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="18" fill="#18283a">${glyph}</text></svg>`;
const TRK_GLYPH={thermos:'☕',stampbox:'¤',notebook:'✎',partycard:'★',folder:'▤',laminator:'▣',bag:'↻'};
const PKT_GLYPH={rakija:'🍶',pita:'◍',ticket:'№'};
const KIND_GLYPH={good:'+',bad:'!',event:'?',rare:'★'},KIND_FILL={good:'#bfe0db',bad:'#f2b4a8',event:'#f4e29f',rare:'#d6cde6'};
function trkIcon(k){return ART['trk_'+k]?`<img src="${ART['trk_'+k]}" alt="">`:PH('#e8b44b',TRK_GLYPH[k]||'•')}
function pktIcon(k){return ART['pkt_'+k]?`<img src="${ART['pkt_'+k]}" alt="">`:PH('#efe4cb',k==='rakija'?'ℜ':PKT_GLYPH[k]||'•')}
function nodeIcon(k){const n=NODES[k];return ART['ext_'+k]?`<img src="${ART['ext_'+k]}" alt="">`:PH(KIND_FILL[n.kind],KIND_GLYPH[n.kind])}
function clockStr(o,d){const used=d.turns-o.turnsLeft,m=8*60+Math.round(used*420/d.turns/10)*10;return `${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}`}
const LOGO={
  shield:'<svg viewBox="0 0 20 20"><path d="M3 2h14v8c0 4-3 6.5-7 8-4-1.5-7-4-7-8z" fill="#153c62"/><path d="M10 5l1.3 2.8 3 .3-2.3 2 .7 3L10 11.6 7.3 13.1l.7-3-2.3-2 3-.3z" fill="#e8b44b"/></svg>',
  star:'<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#153c62"/><path d="M10 3.5l1.8 4.4 4.7.3-3.6 3 1.2 4.6L10 13.3l-4.1 2.5 1.2-4.6-3.6-3 4.7-.3z" fill="#c93f31" stroke="#e8b44b" stroke-width=".8"/></svg>',
  chevron:'<svg viewBox="0 0 20 20"><path d="M2 12l8-8 8 8-3 3-5-5-5 5z" fill="#c93f31"/><path d="M5 17l5-5 5 5" fill="none" stroke="#153c62" stroke-width="3"/></svg>',
  briefcase:'<svg viewBox="0 0 20 20"><rect x="2" y="6" width="16" height="11" rx="2" fill="#5f7f63"/><path d="M7 6V4h6v2" fill="none" stroke="#18283a" stroke-width="1.8"/><path d="M2 11h16" stroke="#e8b44b" stroke-width="1.6"/></svg>',
  waves:'<svg viewBox="0 0 20 20"><g fill="none" stroke="#1d5a96" stroke-width="2.6" stroke-linecap="round"><path d="M2 6c3-2 5 2 8 0s5-2 8 0"/><path d="M2 11c3-2 5 2 8 0s5-2 8 0"/><path d="M2 16c3-2 5 2 8 0s5-2 8 0"/></g></svg>'
};
const FALLBACK={
  friend:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M3 5h22v13H12l-5 4v-4H3z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7 10h14M7 14h9" stroke="currentColor" stroke-width="1.5"/><path d="M37 17H19v12h11l5 4v-4h2z" fill="#4c9e9b" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><text x="28" y="27" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="10" fill="#fff">psst</text></svg>',
  doc:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M9 4h16l7 7v25H9z" fill="#fff" stroke="currentColor" stroke-width="2"/><path d="M13 15h14M13 19h14M13 23h9" stroke="currentColor" stroke-width="1.5"/><circle cx="26" cy="29" r="4.5" fill="none" stroke="#4a3a8c" stroke-width="1.6"/></svg>',
  argue:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M3 6h20v12H11l-5 4v-4H3z" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M37 16H17v12h12l5 4v-4h3z" fill="#e76a36" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10v4M12 15.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  number:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 10h28v6a4 4 0 0 0 0 8v6H6v-6a4 4 0 0 0 0-8z" fill="#fff" stroke="currentColor" stroke-width="2"/><text x="20" y="25" text-anchor="middle" font-family="Share Tech Mono,monospace" font-size="11" fill="#c93f31">247</text></svg>'
};
function artKey(c){return c.kind==='doc'?'doc_'+c.doc:'act_'+c.key}
function artHTML(c){
  const src=ART[artKey(c)],form=c.kind==='doc'?c.form:'';
  const inner=src?`<img src="${src}" alt="" loading="lazy">`:`<div class="fallback">${c.kind==='doc'?FALLBACK.doc:(FALLBACK[c.key]||FALLBACK.doc)}</div>`;
  return `<span class="art ${form}">${inner}${form==='certified'?`<span class="seal">${L`OVJERENO`}</span>`:''}</span>`;
}
function status(){
  const o=S.screen==='office'||S.screen==='errand'?S.office:null,p=Math.max(0,S.patience/S.maxP*100);
  if(S.screen==='office'&&o)return `<header class="hud float"><div class="tiles">
      <div class="tile pat" style="color:var(--red)"><span class="lbl">${L`Patience`}</span><span class="val" style="color:var(--ink)">${ICON.heart.replace('class="heart"','class="heart" style="color:#c93f31"')}${S.patience}/${S.maxP}</span><span class="pbar"><i style="width:${p}%"></i></span></div>
      <div class="tile day" role="img" aria-label="${L`Day ${S.day}, ${clockStr(o,cur())}. The window closes at 15:00.`}"><span class="lbl">${L`Day ${S.day}`}</span><span class="val">${clockStr(o,cur())}</span></div>
      ${S.pocket.map((k,i)=>`<button class="tile pkt" data-act="pocketAsk" data-i="${i}" aria-label="${L`Pocket`}: ${esc(POCKET[k].name)}" title="${esc(POCKET[k].name)}: ${esc(POCKET[k].text)}"><span class="lbl">${L`Pocket`}</span>${pktIcon(k)}</button>`).join('')}
      ${resChips()}
      ${S.trinkets&&S.trinkets.length?`<button class="tile hbtn vtile" data-act="view" data-v="map" aria-label="${L`From the Vitrina`}: ${esc(S.trinkets.map(k=>TRINKETS[k].name).join(', '))}" title="${esc(S.trinkets.map(k=>TRINKETS[k].name+': '+TRINKETS[k].text).join(' · '))}"><span class="lbl">Vitrina</span><span class="vti">${S.trinkets.map(trkIcon).join('')}</span></button>`:''}
    </div></header>`;
  return `<header class="hud">
    <div class="tiles">
      <div class="tile" style="color:var(--red)"><span class="lbl">${L`Patience`}</span><span class="val" style="color:var(--ink)">${ICON.heart.replace('class="heart"','class="heart" style="color:#c93f31"')}${S.patience}/${S.maxP}</span><span class="pbar"><i style="width:${p}%"></i></span></div>
      <div class="tile"><span class="lbl">${L`Calendar`}</span><span class="val">${L`Day ${S.day}`}</span></div>
      <button class="tile hbtn" data-act="view" data-v="map" aria-label="${L`Run map`}"><span class="lbl">${L`Map`}</span><span class="val">${ICON.map}${S.officeIdx+1}/${OFFICES.length}</span></button>
      <button class="tile hbtn" data-act="view" data-v="deck" aria-label="${L`Your cards`}"><span class="lbl">${L`Cards`}</span><span class="val">${ICON.deck}${S.deck.length}</span></button>
      <button class="tile hbtn menubtn" data-act="pause" aria-label="${L`Settings and pause: rules, music, end run`}" title="${L`Settings`}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#18283a" fill-rule="evenodd" d="M10.3 1.5h3.4l.5 2.9a8 8 0 0 1 2 .9l2.4-1.7 2.4 2.4-1.7 2.4c.4.6.7 1.3.9 2l2.9.5v3.4l-2.9.5a8 8 0 0 1-.9 2l1.7 2.4-2.4 2.4-2.4-1.7a8 8 0 0 1-2 .9l-.5 2.9h-3.4l-.5-2.9a8 8 0 0 1-2-.9l-2.4 1.7-2.4-2.4 1.7-2.4a8 8 0 0 1-.9-2l-2.9-.5v-3.4l2.9-.5c.2-.7.5-1.4.9-2L3.4 6.4l2.4-2.4 2.4 1.7c.6-.4 1.3-.7 2-.9zM12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z"/></svg></button>
    </div>
  </header>`;
}
function cardHTML(c,{act='card',cls='',style=''}={}){
  if(c.kind==='doc'){
    const single=DOCS[c.doc].single;
    const foot=c.form!=='original'||single?L`Clerk keeps it`:L`Comes back`;
    const oldHere=!!S.office&&S.screen==='office'&&S.office.rows.some(r=>!r.done&&r.doc===c.doc&&formOk(r,c)&&tooOld(r,c));
    const age=dated(c)?`<span class="age ${c.noexp?'forever':oldHere?'old':''}">${ageLabel(c)}</span>`:'';
    return `<button class="card doc ${cls}" style="--c:${CARD_BG[c.doc]||'#efe4cb'};${style}" data-act="${act}" data-uid="${c.uid}" aria-label="${esc(L`${docName(c.doc,c.form)}, document, free to hand in`)}">
      ${artHTML(c)}
      <span class="sub ${c.form}">${single?L`Document`:FORM[c.form]}</span>
      <span class="body"><span class="nm">${esc(DOCS[c.doc].name)}</span>${age}<span class="foot">${foot}</span></span>
      ${/\bheard\b/.test(cls)?`<span class="heardmark">${L`Heard`}</span>`:''}</button>`;
  }
  const a=ACTIONS[c.key],pc=patCost(c),shady=SHADY.has(c.key),sty=CARD_STYLE[c.key];
  return `<button class="card act ${shady?'shady':''} ${cls}" style="--c:${CARD_BG[c.key]||'#efe3c6'};${style}" data-act="${act}" data-uid="${c.uid}" aria-label="${esc(pc?L`${a.name}, shady action, costs ${pc} patience`:shady?L`${a.name}, shady action`:L`${a.name}, action`)}">
    ${artHTML(c)}
    <span class="sub ${shady?'shady':sty||''}">${shady?L`Shady`:sty?L(STYLE_NAME[sty]):L`Action`}</span>
    <span class="body"><span class="nm">${esc(a.name)}</span><span class="tx">${esc(a.text)}</span></span>
    ${pc||a.fav?`<span class="costs">${pc?`<span class="pcost">−${pc}${ICON.heart.replace('class="heart"','')}</span>`:''}${a.fav?`<span class="pcost fav">−${a.fav}★</span>`:''}</span>`:''}</button>`;
}
function handCls(c){
  const h=isHeardCard(c)?' heard':'';
  if(S.keeping)return (S.keeping.includes(c.uid)?'keep':'tossing')+h;
  if(S.redrawing)return (S.redrawing.includes(c.uid)?'swap':'')+h;
  return handCls0(c)+h;
}
function handCls0(c){
  const tg=S.target;
  if(tg){if(tg.src===c.uid)return 'armed';
    if(tgtOk(tg,c))return 'targetable';return 'off'}
  if(S.confirm)return S.confirm.uid===c.uid?'armed':'off';
  return canPlay(c)?'':'off';
}
function rowThumb(r){const k=isFeeRow(r)?'doc_'+DOCS[r.doc].fee:'doc_'+r.doc;return ART[k]?`<img class="thumb" src="${ART[k]}" alt="">`:`<span class="thumb" style="display:grid;place-items:center;color:var(--ink)">${FALLBACK.doc.replace('<svg','<svg style="width:20px;height:20px"')}</span>`}
// Hand ("lane fan", Figma 47:7334): cards in a straight row, 84px apart, alternately tilted +5° / −5°, with the −5° ones
// raised 8px. More cards never squeeze the spacing, the row just gets longer and you slide it sideways (see laneLayout).
const HAND_STEP=84,HAND_TILT=5,HAND_RAISE=8;
function fanHTML(hand){
  const n=hand.length;if(!n)return `<span class="empty">${L`No cards in hand.`}</span>`;
  return '<div class="track">'+hand.map((u,i)=>{const c=C(u);return cardHTML(c,{cls:handCls(c),style:`z-index:${10+i}`})}).join('')+'</div>';
}
// Sideways scroll of the hand. A short hand is centred; a long one starts centred too (both ends peek out) and slides.
const HAND={sx:0,max:0,off:0,sig:''};let handRaf=0;
// Hand physics. Each card chases its spot in the row on its own spring instead of snapping to it:
// - sliding the row: the card under your finger leads and the others trail behind a little, leaning into the motion;
// - lifting a card out (hold, slide up) pops it up with a small overshoot and straightens it; letting go drops it back with a bounce;
// - when a card leaves, the rest close the gap on springs; a played card floats up and fades, an end-of-turn discard sweeps to Used;
// - new cards are dealt from the Draw pile one after another.
// Positions are written as one transform per card per frame (no layout work), and the loop stops once every card is at rest.
const HP={m:new Map(),raf:0,last:0,px:null,calm:matchMedia('(prefers-reduced-motion: reduce)')};
const liftOf=el=>{const c=el.classList;return c.contains('launch')?-56:c.contains('peek')?-28:(c.contains('keep')||c.contains('armed'))?-14:c.contains('press')?-12:0};
function hpWrite(p,W){const el=p.el;
  // cards that have slid fully off screen are taken out, so they can't make the page wider than the screen
  el.style.display=(p.x>W+30||p.x<-152)?'none':'';
  el.style.opacity=p.d>0?'0':'';
  el.style.transform=`translate3d(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px,0) rotate(${p.r.toFixed(2)}deg) scale(${p.s.toFixed(3)})`}
function laneApply(){const lane=$app.querySelector('.lane.fan'),tr=lane&&lane.querySelector('.track');
  if(!tr){HP.m.clear();return}
  const W=lane.clientWidth,base=HAND.off-HAND.sx,els=[...tr.querySelectorAll('.card[data-uid]')],seen=new Set();
  let lr=null,born=0;const calm=HP.calm.matches,first=!HP.m.size;
  els.forEach((el,i)=>{const u=el.dataset.uid,odd=i%2===1;seen.add(u);
    const tx=base+i*HAND_STEP,ty=odd?-HAND_RAISE:0,tr0=odd?-HAND_TILT:HAND_TILT;let p=HP.m.get(u);
    if(!p){p={x:tx,y:ty,r:tr0,s:1,vx:0,vy:0,vr:0,vs:0,d:0};HP.m.set(u,p);
      const pile=!calm&&$app.querySelector('.pilebtn.draw');
      if(pile){lr=lr||lane.getBoundingClientRect();const pr=pile.getBoundingClientRect();   // dealt from the Draw pile
        p.x=pr.left+pr.width/2-lr.left-61;p.y=pr.top+pr.height/2-lr.top-(el.offsetTop+100);p.r=-22;p.s=.3;p.d=(first?i:born)*75;born++}}
    p.el=el;p.i=i;p.tx=tx;p.ty=ty;p.tr=tr0;el.style.left='0';el.style.translate='';el.style.setProperty('--rot',tr0+'deg');hpWrite(p,W)});
  // cards that just left the hand: keep their old element for a moment and send it off
  const gone=[...HP.m].filter(([u])=>!seen.has(u));
  gone.forEach(([u,p],k)=>{HP.m.delete(u);const g=p.el;if(calm||!g||!g.animate||g.isConnected)return;
    g.removeAttribute('data-uid');g.classList.remove('press','peek','launch','armed','keep');g.style.pointerEvents='none';g.style.display='';
    tr.appendChild(g);const from=g.style.transform;let to,dur,delay=0;
    if(gone.length===1){g.style.zIndex=90;to=`translate3d(${p.x}px,${p.y-190}px,0) rotate(${-p.r*1.6}deg) scale(.8)`;dur=340}
    else{const used=$app.querySelector('.pilebtn.used');lr=lr||lane.getBoundingClientRect();
      const ur=used?used.getBoundingClientRect():{left:lr.left,top:lr.bottom,width:0,height:0};
      to=`translate3d(${ur.left+ur.width/2-lr.left-61}px,${ur.top+ur.height/2-lr.top-(g.offsetTop+100)}px,0) rotate(-30deg) scale(.25)`;dur=380;delay=k*45}
    const a=g.animate([{transform:from,opacity:1},{transform:to,opacity:0}],{duration:dur,delay,easing:'cubic-bezier(.45,0,.75,.4)',fill:'forwards'});
    a.onfinish=()=>g.remove()});
  laneKick()}
function laneKick(){if(!HP.raf&&HP.m.size){HP.last=performance.now();HP.raf=requestAnimationFrame(laneTick)}}
function laneTick(t){HP.raf=0;const lane=$app.querySelector('.lane.fan');if(!lane)return;
  const W=lane.clientWidth,calm=HP.calm.matches;let dt=Math.min(.04,(t-HP.last)/1000);HP.last=t;
  // the card nearest the finger (or the screen centre) leads; cards further away follow more loosely
  const fx=HP.px==null?W/2:HP.px-lane.getBoundingClientRect().left,focus=(fx-61-(HAND.off-HAND.sx))/HAND_STEP;
  let busy=false;const n=dt>.017?2:1;dt/=n;
  HP.m.forEach(p=>{if(!p.el.isConnected)return;
    if(p.d>0){p.d-=dt*n*1000;busy=true;hpWrite(p,W);return}
    const lift=liftOf(p.el),out=lift<-20,ty=p.ty+lift;
    if(calm){p.x=p.tx;p.y=ty;p.r=p.tr;p.s=1;p.vx=p.vy=p.vr=p.vs=0;hpWrite(p,W);return}
    const kx=260/(1+.2*Math.abs(p.i-focus)),ky=ty<p.y?560:400,zy=ty<p.y?.5:.58,kr=320,ks=260;
    for(let j=0;j<n;j++){
      const lean=Math.max(-7,Math.min(7,-p.vx*.008)),tr=(out?p.tr*.2:p.tr)+lean;
      p.vx+=(kx*(p.tx-p.x)-2*.8*Math.sqrt(kx)*p.vx)*dt;p.x+=p.vx*dt;
      p.vy+=(ky*(ty-p.y)-2*zy*Math.sqrt(ky)*p.vy)*dt;p.y+=p.vy*dt;
      p.vr+=(kr*(tr-p.r)-2*.45*Math.sqrt(kr)*p.vr)*dt;p.r+=p.vr*dt;
      p.vs+=(ks*(1-p.s)-2*.62*Math.sqrt(ks)*p.vs)*dt;p.s+=p.vs*dt}
    if(Math.abs(p.tx-p.x)+Math.abs(ty-p.y)>.15||Math.abs(p.vx)+Math.abs(p.vy)>2||Math.abs(p.tr-p.r)>.05&&!out||Math.abs(p.vr)>.5||Math.abs(1-p.s)>.002)busy=true;
    else if(!out){p.x=p.tx;p.y=ty;p.r=p.tr;p.s=1;p.vx=p.vy=p.vr=p.vs=0}
    hpWrite(p,W)});
  if(busy)HP.raf=requestAnimationFrame(laneTick)}
// class changes on hand cards (press / peek / launch / keep / armed) set a new lift, so wake the springs
if(typeof MutationObserver==='function')new MutationObserver(ms=>{if(ms.some(m=>m.target.matches&&m.target.matches('.lane.fan .card')))laneKick()})
  .observe($app,{subtree:true,attributes:true,attributeFilter:['class']});
document.addEventListener('pointerdown',e=>{HP.px=e.clientX},{capture:true,passive:true});
document.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType!=='mouse')HP.px=e.clientX},{capture:true,passive:true});
document.addEventListener('pointerup',()=>{setTimeout(()=>{HP.px=null},400)},{capture:true,passive:true});
function laneLayout(){
  const lane=$app.querySelector('.lane.fan'),tr=lane&&lane.querySelector('.track');if(!tr)return;
  const n=tr.children.length,W=lane.clientWidth,OV=24,PAD=12,box=(n-1)*HAND_STEP+122+2*OV;
  const hand=S.office?S.office.hand.map(String):[],prev=HAND.sig.split(','),fresh=!hand.some(u=>prev.includes(u));
  HAND.sig=hand.join(',');
  if(box<=W-2*PAD){HAND.max=0;HAND.off=(W-box)/2+OV;HAND.sx=0}
  else{HAND.off=PAD+OV;HAND.max=box+2*PAD-W;if(fresh)HAND.sx=HAND.max/2;HAND.sx=Math.max(0,Math.min(HAND.max,HAND.sx))}
  laneApply();
}
function laneStop(){cancelAnimationFrame(handRaf)}
function laneScrollTo(v){HAND.sx=Math.max(0,Math.min(HAND.max,v));laneApply()}
function laneFling(v){laneStop();let last=performance.now();
  const step=t=>{const dt=Math.min(40,t-last);last=t;v*=Math.pow(.94,dt/16);const b=HAND.sx;laneScrollTo(HAND.sx+v*dt);
    if(Math.abs(v)>.03&&HAND.sx!==b)handRaf=requestAnimationFrame(step)};
  handRaf=requestAnimationFrame(step)}
// End turn: round button, half below the screen edge. Turns left = red LED segments on the black ring around it
// (one per turn the window is open today); the ring's label switches to LAST TURN on the final one.
function endBtnHTML(o,d){
  const n=d.turns,left=o.turnsLeft,cx=80,cy=80,rs=69.5,span=168,gap=n>5?4:5,seg=(span-gap*(n-1))/n;
  const pt=(a,r)=>[(cx+r*Math.sin(a*Math.PI/180)).toFixed(2),(cy-r*Math.cos(a*Math.PI/180)).toFixed(2)];
  const arc=(a0,a1,r)=>{const [x0,y0]=pt(a0,r),[x1,y1]=pt(a1,r);return `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}`};
  // Segments fill from the left: the rightmost lit one goes out each turn.
  const segs=Array.from({length:n},(_,i)=>{const a0=-span/2+i*(seg+gap);return `<path class="seg ${i<left?'on':''}" d="${arc(a0,a0+seg,rs)}"/>`}).join('');
  const playable=o.hand.some(u=>canPlay(C(u)));
  const cls=[left<=1?'low':'',S.keeping?'keepmode':'',!S.keeping&&!S.target&&!S.confirm&&!playable?'ready':''].join(' ');
  return `<button class="endbtn ${cls}" data-act="end" aria-label="${S.keeping?L`Keep ${S.keeping.length} cards, discard the rest and end turn`:L`End turn`}. ${L`${left} of ${n} turns left before the window closes.`}">
    <svg viewBox="0 0 160 160" aria-hidden="true"><circle class="bezel" cx="80" cy="80" r="69.5"/>${segs}
</svg>
    <span class="face"><span class="et">${S.keeping?(S.keeping.length?L`Keep<br>${S.keeping.length}`:L`Keep<br>none`):L`End<br>turn`}</span></span></button>`;
}
function moodNotes(idx,cls){const d=OFFICES[idx];if(!d)return '';const ks=moodsKnown(idx),hid=moodHidden(idx);if(!ks.length&&!hid)return '';
  return LG(d,()=>`<div class="moods ${cls||''}">${ks.map((k,i)=>`<div class="mood ${MOODS[k].good?'good':''}" style="--r:${i%2?1.2:-1.4}deg"><span class="kicker">${MOODS[k].good?L`Good mood`:L`Today's mood`}</span><b>${esc(L(MOODS[k].title))}</b><small>${esc(L(MOODS[k].text))}</small></div>`).join('')}${hid?`<div class="mood unknown" style="--r:1.2deg"><span class="kicker">${L`Today's mood`}</span><b>?</b><small>${L`One more mood you'll only see at the window. A tip can tell you.`}</small></div>`:''}</div>`)}
function officeView(){
  const o=S.office,d=cur(),tg=S.target,st=OFFICE_STYLE[lookOf(d)]||OFFICE_STYLE.Registry,il=intentLabel(o.intent);
  const total=o.rows.length,done=o.rows.filter(r=>r.done).length,left=total-done;
  const rows=o.rows.map((r,i)=>{
    const pick=tg&&tg.type==='row'&&!r.done;
    const mark=r.done?(r.bribed?`<span class="mini-stamp bribe">${L`Settled`}</span>`:r.paid?`<span class="mini-stamp ok">${L`Paid`}</span>`:`<span class="mini-stamp ok">${L`Received`}</span>`):r.ft1p?'<span class="tag ft" translate="no">FT1P</span>':r.added?`<span class="tag new">${r.told?L`Heard it`:L`New rule`}</span>`:r.stricter?`<span class="tag new">${L`Stricter`}</span>`:'';
    const have=!r.done&&inFolder(r);
    const isFee=isFeeRow(r),n=r.done?0:pileCards().filter(c=>accepts(r,c)).length;
    const sub=isFee?`<em>${L`${DOCS[DOCS[r.doc].fee].name}, or pay at a bank (costs your turn)`}</em>`:DOCS[r.doc].single?'':`<em>${FORM[r.form]}${r.form==='copy'&&moodOn('originals')?' · <b class="maxage">'+L`certified only`+'</b>':''}${r.form==='alt'?' · '+L`an original is kept`:''}${r.max!=null?` · <b class="maxage">${maxLabel(r.max)}</b>`:''}</em>`;
    const fn=isFee?DOCS[DOCS[r.doc].fee].name.toLowerCase():'';
    // Ownership is not spelled out: the deck reshuffles, so a paper you own turns up sooner or later, and a missing
    // one already shows a "Go get it" button. Only the one non-obvious fix is hinted: photocopy an original you own.
    const origs=!r.done&&!have&&!isFee&&r.form!=='original'?pileCards().filter(c=>c.kind==='doc'&&c.doc===r.doc&&c.form==='original'):[];
    const canCopy=!moodOn('nocopier')&&origs.some(c=>!tooOld(r,c)),oldOrig=!canCopy&&origs.length>0;
    const stale=!r.done&&!have&&!isFee&&staleFor(r);
    const own=!r.done&&r.ft1p&&bagHas(r.doc)?`<span class="have">${L`In your bag`}</span>`:r.done?`<span class="ok">✓ ${r.bribed?L`Done (envelope)`:r.paid?L`Done (paid at bank)`:L`Done`}</span>`:stale?`<span class="have no">${L`Yours is too old: re-issue it`}</span>`:canCopy?`<span class="have no">${L`Photocopy your original`}</span>`:oldOrig?`<span class="have no">${L`Your original is too old: re-issue it, then copy`}</span>`:'';
    const fetch=r.done||tg?'':r.ft1p&&bagHas(r.doc)?`<button class="fetch bagbtn" data-act="fromBag" data-i="${i}">${L`From your bag`}</button>`:isFee?`<button class="fetch" data-act="pay" data-i="${i}">${L`Pay at bank`}</button>`:!have?`<button class="fetch urgent" data-act="fetch" data-i="${i}">${L`Go get it`}</button>`:'';
    return `<li class="${r.done?'done':''} ${o.fresh===i?'fresh':''}"><button class="row ${r.done?'done':''} ${pick?'pick':''}" data-act="row" data-i="${i}" ${pick?'':'tabindex="-1"'}>
      <span class="box">${r.done?ICON.check:''}</span>${rowThumb(r)}<span class="row-label"><span class="nm">${esc(DOCS[r.doc].name)}</span>${sub}${own}</span>${mark}</button>${fetch}</li>`;
  }).join('');
  const ghosts=heardPending(S.officeIdx).map(x=>x.none
    ?`<li class="heard none"><div class="row ghost"><span class="box"></span><span class="row-label"><span class="nm">${L`No strange papers here`}</span><em>${L`Heard in the queue`}</em></span><span class="tag heard">${L`Heard`}</span></div></li>`
    :`<li class="heard"><div class="row ghost"><span class="box"></span>${rowThumb(x)}<span class="row-label"><span class="nm">${esc(DOCS[x.doc].fee?DOCS[DOCS[x.doc].fee].name:DOCS[x.doc].name)}?</span><em>${x.ft1p?L`Heard: a strange paper, right at the end`:L`Heard: [[he|she]] may ask for it later`}${!x.ft1p&&!DOCS[x.doc].single?` · ${FORM[x.form]}`:''}</em></span><span class="tag heard">${L`Heard`}</span></div></li>`).join('');
  const segs=Array.from({length:total},(_,i)=>`<span class="seg ${i<done?'on':''}"></span>`).join('');
  const tgtMsg=tg?{original:L`Pick an original in your hand`,copy:L`Pick a copy to notarize`,row:L`Pick a line on the checklist to tick off`,dated:C(tg.src).key==='reissue'?L`Pick a document to re-issue (dated today)`:L`Pick a document to backdate`}[tg.type]:'';
  return `<main class="withdock">
    <section class="stage hero" aria-label="${esc(d.full)}">
      <img class="bg" src="${ART['office_'+lookOf(d)]||ART.office_Registry}" alt="">
      <div class="band" style="background:${st.color}"><b>${S.officeIdx+1}. ${esc(d.full)}</b><span>${esc(d.window)} · ${esc(clerkName(d))}</span></div>
      ${S.tut?`<div class="portrait pupwrap ${S.tut.talk?'talk':''}" role="img" aria-label="${esc(clerkName(d))}">${PUPPY_SVG}</div>`:`<canvas class="portrait" data-office="${esc(lookOf(d))}" width="${pupW(lookOf(d))}" height="${PUP_H}" role="img" aria-label="${esc(clerkName(d))}"></canvas>`}
      <div class="intent ${blockedNext()?'blocked':''}">
        <div class="txt"><span class="k">${blockedNext()?L`Next action · blocked`:L`Next action`}</span><span class="act">${esc(il.name)}</span><span class="eff">${esc(il.effect)}</span></div>
        ${blockedNext()?ICON.blocked:ICON[o.intent.type]||ICON.sigh}
      </div>
    </section>
    <section class="check">
      <div class="check-head"><span class="logo" style="background:#fff;border:1.5px solid var(--line)">${LOGO[st.logo]}</span><b style="color:${st.color}">${esc(d.label)}</b><span>${esc(d.goal)}</span><span class="count">✓ ${done}/${total}</span></div>
      ${S.tut?'':moodNotes(S.officeIdx)}
      <ul class="rows">${rows}${ghosts}</ul>
      <div class="ftmeter"><span>${L`Progress`}</span><span class="segs">${segs}</span><span>${L`${done}/${total} ticked`}</span></div>
    </section>
    <p class="log sr-only" aria-live="polite">${esc(S.log)}</p>
  </main>
  <footer class="dock">
    ${o.lunch&&!tg&&!S.keeping?`<div class="banner"><span>${L`Lunch break: the window is shut this turn. No papers, only actions.`}</span></div>`:''}
    ${S.redrawing?`<div class="banner swapbar"><span>${L`Swap: tap the cards you want to swap (${S.redrawing.length} picked), then tap Swap.`}</span><button data-act="redrawCancel">${L`Back`}</button></div>`:''}
    ${tg?`<div class="banner"><span>${tgtMsg}</span><button data-act="cancel">${L`Cancel`}</button></div>`:''}
    ${S.keeping?`<div class="banner keepbar"><span>${L`End of turn: tap up to ${keepMax()} cards to keep (${S.keeping.length}/${keepMax()}). The rest are discarded and you draw back up to ${HAND_SIZE}. Keep none to redraw all.`}${o.hand.some(u=>isHeardCard(C(u)))?' '+L`Cards marked HEARD will probably be asked for here.`:''}</span><button data-act="keepCancel">${L`Back`}</button></div>`:''}
    ${S.confirm?`<div class="banner warn"><span>${L`This line takes an original or a certified copy. If you hand over the original, the clerk keeps it.`}</span><span class="bb"><button class="solid" data-act="confirmYes">${L`Hand it over`}</button><button data-act="cancel">${L`Keep it`}</button></span></div>`:''}
    <div class="fanwrap">
      <div class="lane fan">${fanHTML(o.hand)}</div>
      <button class="pilebtn draw" data-act="view" data-v="deck" aria-label="${L`Draw pile, ${o.draw.length} cards`}"><b>${o.draw.length}</b><span>${L`Draw`}</span></button>
      <button class="pilebtn used" data-act="view" data-v="deck" aria-label="${L`Used pile, ${o.discard.length+o.exhaust.length} cards`}"><b>${o.discard.length+o.exhaust.length}</b><span>${L`Used`}</span></button>
      ${S.redrawing||canBagSwap()?`<button class="pilebtn redraw ${S.redrawing?'on':''}" data-act="redraw" ${!S.keeping?'':'disabled'} aria-label="${S.redrawing?L`Swap the picked cards for new ones`:L`Grandma's shopping bag: swap cards for new ones, once per office`}"><i aria-hidden="true">↻</i><span>${S.redrawing?(S.redrawing.length?L`Swap ${S.redrawing.length}`:L`Cancel`):L`Bag swap`}</span></button>`:''}
      <button class="pilebtn map" data-act="view" data-v="map" aria-label="${L`Run map, office ${S.officeIdx+1} of ${OFFICES.length}`}">${ICON.map}<span>${L`Map`}</span></button>
      <button class="pilebtn gear" data-act="pause" aria-label="${L`Settings and pause: rules, music, your cards, end run`}" title="${L`Settings`}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#18283a" fill-rule="evenodd" d="M10.3 1.5h3.4l.5 2.9a8 8 0 0 1 2 .9l2.4-1.7 2.4 2.4-1.7 2.4c.4.6.7 1.3.9 2l2.9.5v3.4l-2.9.5a8 8 0 0 1-.9 2l1.7 2.4-2.4 2.4-2.4-1.7a8 8 0 0 1-2 .9l-.5 2.9h-3.4l-.5-2.9a8 8 0 0 1-2-.9l-2.4 1.7-2.4-2.4 1.7-2.4a8 8 0 0 1-.9-2l-2.9-.5v-3.4l2.9-.5c.2-.7.5-1.4.9-2L3.4 6.4l2.4-2.4 2.4 1.7c.6-.4 1.3-.7 2-.9zM12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z"/></svg></button>
      ${endBtnHTML(o,d)}
    </div>
  </footer>`;
}
function screen(){
  switch(S.screen){
  case 'intro':{const P=[['doc_birth',-30,-62],['doc_id',-11,-22],['doc_rental',9,20]];
    return `<div class="ts-bg" aria-hidden="true"><img src="${ART['office_Registry']}" alt=""></div>
    ${soundBtn()}<main class="ts"><div class="ts-logo">
      <div class="ts-papers" aria-hidden="true">${P.map(([k,r,x],i)=>`<span class="ts-p" style="--x:${x}px;--r:${r}deg;--d:${(-i*1.3).toFixed(1)}s;--t:${(4.6+i*.7).toFixed(1)}s"><img src="${ART[k]}" alt=""></span>`).join('')}<span class="ts-p miss" style="--x:62px;--r:26deg;--d:-2.2s;--t:3.8s">?</span></div>
      <h1 class="ts-title" aria-label="Fali ti jedan papir"><span class="l1">Fali ti</span><span class="l2">jedan papir</span></h1>
</div>
      <nav class="ts-menu" aria-label="${L`Main menu`}">
        <button class="btn primary" data-act="start">${L`Start new run`}</button>
        <button class="btn" data-act="tutorial">${L`How to play`}</button>
        <button class="btn" data-act="rules">${L`Rules`}</button>
        <button class="btn" data-act="options">${L`Options`}</button>
        <button class="btn quiet" data-act="quit">${L`Quit`}</button>
      </nav>
      <span class="ts-foot">${L`Vibe created while putting H to sleep in 2026`}</span></main>
    <span class="ts-ver" translate="no" title="Build ${GAME_BUILD.n}, committed ${GAME_BUILD.date}">${versionLabel()}</span>${tutInviteHTML()}`;}
  case 'closed':return `<div class="ts-bg" aria-hidden="true"><img src="${ART['office_Registry']}" alt=""></div>
    <main class="ts"><div class="ov-stamp violet" style="color:var(--paper);border-color:var(--paper)">${L`Closed`}</div>
      <p style="margin:18px 0 22px;max-width:30ch;font-size:16px;line-height:1.45">${L`The window is closed. Come back tomorrow, between 8:00 and 15:00. You can close this tab now.`}</p>
      <nav class="ts-menu"><button class="btn" data-act="title">${L`Back to the title`}</button></nav></main>`;
  case 'rules':return `<main><div class="sheet">
      <button class="sheet-x" data-act="title" aria-label="${L`Close rules`}" title="${L`Close (Esc)`}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button>
      <span class="kicker">${L`How it works`}</span><h2>${L`Rules`}</h2>
      ${rulesBody()}</div></main>`;
  case 'options':return `<main><div class="sheet">${closeX('title',L`Back`)}${optionsBody()}
      <div class="btnrow"><button class="btn primary" data-act="title">${L`Done`}</button></div></div></main>`;
  case 'tutdone':return tutDoneHTML();
  case 'office':return officeView();
  case 'errand':{const r=S.office.rows[S.pending],e=errandFor(r),d=cur();
    return `<main><div class="sheet"><span class="kicker">${L`Leave the window`}</span><h2>${L`Go get: ${esc(e.get)}`}</h2>
      <p>${esc(e.place)}.</p>
      <div class="costlist">
        <div><b>${L`Costs`}</b><span>${L`The rest of today. By the time you're back the window is closed: −${closeCost()} patience, and every paper you own gets a day older.`}</span></div>
        <div><b>${L`You get`}</b><span>${L`${esc(e.get)}, added to your cards for good. It's in your hand tomorrow morning, along with the cards you hold now.`}</span></div>
      </div>
      <div class="btnrow"><button class="btn primary" data-act="errandGo">${L`Go (back tomorrow)`}</button><button class="btn quiet" data-act="stay">${L`Stay in line`}</button></div></div></main>`;}
  case 'errandDone':return `<main><div class="sheet"><span class="kicker">${L`Errand`}</span><h2>${esc(S.errand.place)}</h2><p>${esc(S.errand.text)}</p>
      <span class="big-stamp">${L`Obtained`}</span><p>${L`${esc(S.errand.get)} is in your cards.`}</p>
      <button class="btn primary" data-act="back">${L`Back to the window`}</button></div></main>`;
  case 'reward':{const d=OFFICES[S.officeIdx],nx=OFFICES[S.officeIdx+1];
    return `<main><div class="sheet"><span class="big-stamp">${L`Approved`}</span><h2>${esc(d.goal)}</h2>
      <p>${S.chapterEnd?LG(d,()=>L`${esc(clerkName(d))} stamps it, signs it, and stamps it again. Chapter ${S.chapter+1} is done.`):LG(d,()=>L`${esc(clerkName(d))} hands over your ${esc(DOCS[d.reward].name)} (original). It joins your cards. Next: pick a route to the ${esc(nx.full)}.`)}</p>
      <span class="kicker">${L`You learned something. Pick one action:`}</span>
      <div class="card-row">${S.choices.map(u=>cardHTML(C(u),{act:'reward'})).join('')}</div>
      <button class="btn quiet" data-act="reward" data-uid="0">${L`Skip`}</button></div></main>`;}
  case 'vitrina':{const eq=META.equipped.filter(k=>META.unlocked.includes(k)).slice(0,META.slots),keys=Object.keys(TRINKETS);
    // Grandma's glass cabinet: keepsakes stand on two shelves. Tap one to take it out; it moves into your bag below
    // and leaves a dusty outline on the shelf. Locked keepsakes are dark shapes behind the glass.
    const item=k=>{const t=TRINKETS[k],un=META.unlocked.includes(k),on=eq.includes(k);
      if(!un)return `<div class="vt-item locked"><span class="vt-obj">${trkIcon(k)}</span><span class="vt-tag">${L`Locked`}</span><small>${esc(t.how)}</small></div>`;
      return `<button class="vt-item ${on?'out':''}" data-act="equip" data-k="${k}" aria-pressed="${on}" aria-label="${esc(t.name)}: ${esc(t.text)}${on?' '+L`In your bag. Tap to put it back.`:''}"><span class="vt-obj">${trkIcon(k)}</span><span class="vt-tag">${on?L`In your bag`:esc(t.name)}</span><small>${esc(t.text)}</small></button>`};
    const shelves=Array.from({length:Math.ceil(keys.length/3)},(_,i)=>keys.slice(i*3,i*3+3)).map(s=>`<div class="shelf">${s.map(item).join('')}</div>`).join('');
    const slots=Array.from({length:META.slots},(_,i)=>{const k=eq[i];
      return k?`<button class="vt-slot full" data-act="equip" data-k="${k}" aria-label="${esc(TRINKETS[k].name)}. ${L`Put it back.`}"><span class="vt-obj">${trkIcon(k)}</span><span class="vt-st"><b>${esc(TRINKETS[k].name)}</b><small>${esc(TRINKETS[k].text)}</small></span><i>${L`Put back`}</i></button>`
        :`<div class="vt-slot empty"><span class="vt-ghost"></span><span>${L`Empty slot. Tap a keepsake in the cabinet to take it.`}</span></div>`}).join('');
    const go=eq.length?(eq.length>1?L`Take them and go`:L`Take it and go`):L`Go empty-handed`;
    return `<main class="vitmain"><div class="sheet"><span class="kicker">${L`Grandma's glass cabinet`}</span><h2>${L`The Vitrina`}</h2>
      <p>${META.slots===1?L`What you earn stays here between runs. Take one thing with you.`:L`What you earn stays here between runs. Take up to ${META.slots} things with you.`}</p>
      <div class="cabinet"><div class="cab-crown"></div><div class="cab-glass">${shelves}</div><div class="cab-feet"><i></i><i></i></div></div>
      <div class="takebag"><span class="kicker">${L`In your bag for this run`} · ${eq.length}/${META.slots}</span>${slots}</div>
      <div class="btnrow"><button class="btn primary" data-act="begin">${go}</button><button class="btn quiet" data-act="toWho">${L`Back`}</button></div></div></main>`;}
  case 'who':return whoHTML();
  case 'chapter':return chapterHTML();
  case 'map':{const Lg=curLeg(),nx=cur(),nxt=mapNext();
    const h2=Lg.at<0?L`Pick a stop`:L`On to the ${esc(nx.short)}`;
    return `<main class="mapmain"><div class="sheet"><span class="kicker">${L`Chapter ${S.chapter+1}`} · ${L`Day ${S.day}`} · ${esc(Lg.name)} · ${L`on the way to the ${esc(nx.full)}`}</span><h2>${h2}</h2>
      <p class="lead">${Lg.at<0?L`Pick one stop on the way: it takes a day, and so does the walk to the office. Every route gives you something; some cost you on the way.`+(Lg.tram?' '+L`The tram skips the stop and saves a day.`:''):L`One more day and you are at the window.`}</p>
      ${Lg.at<0?`<div class="maplegend"><span><b>+</b>${L`Helps`}</span><span class="event"><b>?</b>${L`Gamble`}</span><span class="rare"><b>★</b>${L`Rare`}</span><span class="bad"><b>!</b>${L`Trouble on the way`}</span>${Lg.tram?`<span class="tram"><b>T</b>${L`Tram`}</span>`:''}</div>`:''}
      ${vitRow()}${pocketRow()}${bagRow()}${moodRow()}${mapHTML(true)}${mapCard()}</div></main>`;}
  case 'counter':{const ds=S.deck.map(C).filter(canReissue);
    return `<main><div class="sheet"><span class="kicker">${L`Citizen service centre`}</span><h2>${L`Re-issue ${S.counterLeft} more`}</h2><p>${L`Tap a document to have it issued again, dated today (day ${S.day}).`}</p>
      <div class="card-row">${ds.length?ds.map(c=>cardHTML(c,{act:'reissueAt'})).join(''):`<p>${L`All your papers are from today. Nothing to do here.`}</p>`}</div>
      <button class="btn quiet" data-act="counterDone">${L`Done`}</button></div></main>`;}
  case 'event':{const e=EVENTS[S.ev];
    return `<main><div class="sheet"><span class="kicker">${L`Day ${S.day}`} · ${L`something comes up`}</span><h2>${esc(e.title)}</h2><p>${esc(e.text)}</p>
      <div class="choices">${['a','b'].map(x=>`<button class="choice" data-act="eventPick" data-k="${x}"><b>${esc(e[x].label)}</b><span>${esc(e[x].text)}</span></button>`).join('')}</div></div></main>`;}
  case 'relic':return `<main><div class="sheet"><span class="kicker">${L`Your cousin's kitchen`}</span><h2>${L`"I know someone."`}</h2><p>${L`Pick a connection. It lasts the whole run.`}</p>
      <div class="choices">${S.choices.map(k=>`<button class="choice" data-act="relic" data-k="${k}"><b>${esc(RELICS[k].name)}</b><span>${esc(RELICS[k].text)}</span></button>`).join('')}</div></div></main>`;
  case 'copyshop':{const os=S.deck.map(C).filter(isOriginalCopyable);
    return `<main><div class="sheet"><span class="kicker">${L`Copy shop`}</span><h2>${L`Copy which original?`}</h2><p>${L`You get 2 copies, with the same date as the original. The clerk keeps a copy each time you hand one in.`}</p>
      <div class="card-row">${os.map(c=>cardHTML(c,{act:'copy'})).join('')}</div>
      <button class="btn quiet" data-act="copy" data-uid="0">${L`Skip`}</button></div></main>`;}
  case 'shred':return `<main><div class="sheet"><span class="kicker">${L`Clean out your cards`}</span><h2>${L`Throw away one card`}</h2>
      <div class="card-row">${S.deck.map(u=>cardHTML(C(u),{act:'shred'})).join('')}</div>
      <button class="btn quiet" data-act="shred" data-uid="0">${L`Keep everything`}</button></div></main>`;
  case 'end':{const win=S.result==='win',d=cur();
    return `<main><div class="sheet">
      <img class="hero-img" src="${ART['office_'+lookOf(d)]}" alt="">
      <span class="big-stamp ${win?'':'red'}">${win?L`Pension approved`:L`Patience: 0`}</span>
      <h2>${win?L`You did it. A whole life of paperwork.`:L`You walk out of the ${esc(d.full)}.`}</h2>
      <p class="kicker">${esc(curChar().name)} · ${L`Chapter ${S.chapter+1}: ${CHAPTER.title}`}${S.reform?' · '+L`Reform ${S.reform}`:''}</p>
      <p>${win?L`Your first pension will be paid on the 15th, starting next month. To collect it, please bring your ID (original), a Proof of Being Alive (not older than 30 days), and a fee stamp.`:L`${esc(clerkName(d))} calls "Next!" before the door closes behind you.`}</p>
      <div class="stats"><div>${L`Days`}<b>${S.day}</b></div><div>${L`Turns`}<b>${S.stats.turns}</b></div><div>${L`Errands`}<b>${S.stats.detours}</b></div><div>${L`Envelopes`}<b>${S.stats.bribes}</b></div></div>
      ${S.newCard?`<span class="kicker">${L`New card in the pool`}</span><ul class="rel"><li><b>${esc(ACTIONS[S.newCard].name)}</b> · ${esc(ACTIONS[S.newCard].text)}</li></ul>`:''}
      ${S.unlockedNow.length?`<span class="kicker">${L`Unlocked`}</span><ul class="rel">${S.unlockedNow.map(k=>k==='slot'?`<li><b>${L`A second slot`}</b> · ${L`take two things into every run`}</li>`:k==='slot3'?`<li><b>${L`A third slot`}</b> · ${L`take three things into every run`}</li>`:k==='reform'?`<li><b>${L`Reform ${reformOpen(S.char)}`}</b> · ${esc(curChar().name)}: ${esc(L(REFORMS[reformOpen(S.char)].text))}</li>`:`<li><b>${esc(TRINKETS[k].name)}</b> · ${esc(TRINKETS[k].text)}</li>`).join('')}</ul>`:`<p>${L`Nothing new for the Vitrina this time.`}</p>`}
      <div class="btnrow"><button class="btn primary" data-act="again">${L`New run`}</button><button class="btn quiet" data-act="toTitle">${L`Title screen`}</button></div></div></main>`;}
  }
}
function rulesBody(){return `      <p>${L`<b>A run is a life in three chapters</b>: Youth (a student ID), First job (a salary account) and Old age (your first pension). Each chapter is four offices and a boss office. Your cards, patience, Favours and Traces carry over; between chapters years pass and your papers get older. Pick who you are before each run: Amra plays by the book, Braco calls in Favours, Dado pays in envelopes and leaves Traces. Clerks who hear about your Traces ask around, and that costs patience.`}</p>
      <p>${L`Chapter 2 in detail:`} ${L`You got the job. Your employer pays salaries only into a local bank account, and your first payday is soon. The bank wants your Employment Registration. The employment bureau wants a Tax Number. The tax office wants a Certificate of Residence. The police want a Citizenship Certificate. The registry wants your birth certificate. You have 80 patience.`}</p>
      <div class="route">${OFFICES.map((x,i)=>`<figure><img src="${ART['ext_'+lookOf(x)]}" alt=""><figcaption>${i+1}. ${esc(x.short)}<small>${esc(x.goal)}</small></figcaption></figure>`).join('')}</div>
      <ul class="rules">
        <li>${L`Your cards (your deck) are <b>documents</b> and <b>actions</b>. Each turn you draw back up to 5. At the end of every turn you choose up to 3 cards to keep; the rest are discarded. Keep none to draw a fresh 5.`}</li>
        <li>${L`There is no limit on cards per turn: play everything that helps. The clock is the <b>turns</b>: when the window closes for the day (the lights around End turn), you lose patience (5, then 8, then 11… the longer you stay at one office) and every paper gets a day older.`}</li>
        <li>${L`Shady actions (dashed border) also cost <b>patience</b>, shown with a red heart. Patience is your health. At zero you give up.`}</li>
        <li>${L`Copies, stamps and photos are kept by the clerk. Originals come back, unless the line says "original or certified copy" and you hand over the original.`}</li>
        <li>${L`Sometimes, just when one line is left, the clerk says <b>fali ti jedan papir</b> and asks for a strange paper. Strange papers never go into your cards: the ones you find (one at the start, some rewards, your aunt's drawer) wait in your <b>bag</b>, and you hand them over straight from the form. If you don't have it, bribe it or tap <b>Go get it</b>: an errand takes the rest of the day, so you're back tomorrow with the paper (closing-time patience, papers a day older).`}</li>
        <li>${L`<b>Every run, the forms are different.</b> Each office still asks for the paper the office before gave you; the rest of the form, the rules clerks suddenly remember and their strange papers are rolled when the run starts.`}</li>
        <li>${L`<b>Swapping cards.</b> Grandma's shopping bag (in the Vitrina) lets you swap any cards in your hand for new ones once per office: tap <b>Bag swap</b> (key R). Tabbed Folder and the priority ticket do it too.`}</li>
        <li>${L`<b>My Friend Went Last Week</b> tells you something the clerk will ask for later: a rule they will suddenly remember, or their strange paper. Tips show up on the form in pencil and mark matching cards in your hand <b>Heard</b>, so you know what to keep. If the clerk asks for something you heard about, it costs you no patience. When an office has no secrets left, you hear about the next one.`}</li>
        <li>${L`Fees take a fee stamp. No stamp? Pay at the bank instead, but it costs the rest of your turn.`}</li>
        <li>${L`<b>Controls.</b> Touch: tap a card to play, hold to look, slide up to play what you're looking at. Mouse: hover to look, click to play. Keys: 1–9 play a card, Space ends the turn, Esc cancels or pauses, P pause, M map, C cards. The ⚙ button pauses the game.`}</li>
        <li>${L`<b>Days.</b> Every paper shows how old it is. Some lines want a fresh one ("max 4 days old"). <b>Re-issue</b> dates a paper today, <b>Notarize</b> dates a certified copy today, and <b>Backdate</b> (shady) makes a paper never too old. Photocopies keep the date of their original and stay in your cards.`}</li>
        <li>${L`Clerks get stricter later in the run: they can demand a certified copy, a fresher paper, or their system goes down.`}</li>
        <li>${L`<b>Moods.</b> Every run, each clerk is in a mood: the copier is broken, they don't trust copies, it's their birthday. A mood is a rule for that whole office, shown on a note at the top of the form. The map shows the next clerk's mood, so you can prepare. The bank clerk has two, and the second is a surprise unless a friend tips you off.`}</li>
        <li>${L`<b>The map.</b> Between offices you pick a route. Every step is a day. Some stops help (café, kafana, copy shop, cousin), some hurt (the bus doesn't come), and some are a choice.`}</li>
        <li>${L`<b>Pocket items</b> are one-use helpers (rakija, pita). <b>The Vitrina</b> keeps trinkets you earn for good: equip them before a run.`}</li>
        <li>${L`New here? <b>How to play</b> on the title screen walks you through one practice office.`}</li>
      </ul>`}

/* ============ v30 screens: who you are, between chapters ============ */
// Favours and Traces, shown in the office HUD once you have any (always for Braco).
function resChips(){const f=S.favours||0,t=S.traces||0;if(!f&&!t&&!isChar('fixer'))return '';
  return `<div class="tile res" role="img" aria-label="${L`Favours: ${f}. Traces: ${t}.`}"><span class="lbl">${L`Favours`}</span><span class="val">★${f}</span>${t?`<span class="lbl tr">${L`Traces`} ${t}</span>`:''}</div>`}
const CHAR_GLYPH={student:'A',fixer:'B',returnee:'D'},STYLE_FILL={book:'#c8d5ea',conn:'#bfe0db',shady:'#d8b679'};
function whoHTML(){
  const sel=charOpen(META.char)?META.char:'student',lvl=Math.min(META.level||0,reformOpen(sel)),top=reformOpen(sel);
  const card=k=>{const c=CHARACTERS[k],open=charOpen(k),on=k===sel;
    if(!open)return `<div class="choice pic who locked"><span class="who-ic">${PH('#d9d2c2','?')}</span><b>${L`Locked`}</b><span>${esc(L(c.unlock))}</span></div>`;
    return `<button class="choice pic who ${on?'on':''}" data-act="who" data-k="${k}" aria-pressed="${on}"><span class="who-ic">${PH(STYLE_FILL[c.style],CHAR_GLYPH[k])}</span>
      <b>${esc(c.name)} · ${esc(L(c.role))}</b><span>${esc(L(c.blurb))}</span>
      <span class="who-perk"><i>${esc(L(STYLE_NAME[c.style]))}</i> <b>${esc(L(c.perk))}:</b> ${esc(L(c.perkText))} ${L`Patience ${c.patience}.`}</span></button>`};
  const active=REFORMS.slice(1,lvl+1).map((r,i)=>`<li><b>${i+1}. ${esc(L(r.name))}</b> · ${esc(L(r.text))}</li>`).join('');
  return `<main><div class="sheet"><span class="kicker">${L`A new life`}</span><h2>${L`Who are you this time?`}</h2>
    <div class="choices">${CHAR_ORDER.map(card).join('')}</div>
    ${top>0?`<div class="reform"><span class="kicker">${L`Reform level`}</span><div class="rf-row">
      <button class="btn quiet" data-act="reform" data-k="-1" ${lvl<=0?'disabled':''} aria-label="${L`Lower`}">−</button>
      <b class="rf-n">${lvl}</b><button class="btn quiet" data-act="reform" data-k="1" ${lvl>=top?'disabled':''} aria-label="${L`Higher`}">+</button>
      <span>${lvl?L`Every level adds a new rule. Win at your highest level to open the next one.`:L`No reforms. Win at a level to open the next one.`}</span></div>
      ${active?`<ul class="rel">${active}</ul>`:''}</div>`:`<p class="muted">${L`Win a full run to open Reform levels: the same life, with harder rules.`}</p>`}
    <div class="btnrow"><button class="btn primary" data-act="toVitrina">${L`Next: the Vitrina`}</button><button class="btn quiet" data-act="title">${L`Back`}</button></div></div></main>`;
}
function chapterHTML(){
  const done=CHAPTERS[CHAPTER_ORDER[S.chapter]],nx=CHAPTERS[CHAPTER_ORDER[S.chapter+1]],heal_=reformOn(7)?10:25;
  const papers=(nx.start||[]).map(([d])=>DOCS[d].name).filter((x,i,a)=>a.indexOf(x)===i).join(', ');
  return `<main><div class="sheet"><span class="big-stamp">${L`Chapter ${S.chapter+1} done`}</span><h2>${esc(done.goal)}</h2>
    <p>${L`Years pass.`} ${esc(L(nx.intro))}</p>
    <div class="costlist">
      <div><b>${L`Next`}</b><span>${L`Chapter ${S.chapter+2}: ${nx.title}`} · ${esc(L(nx.age))} · ${L`goal: ${nx.goal}`}</span></div>
      <div><b>${L`You keep`}</b><span>${L`Your cards, bag, pocket, Favours and Traces. Patience +${heal_}.`}</span></div>
      <div><b>${L`Time`}</b><span>${L`A week passes on the calendar: every paper you own is 7 days older.`}</span></div>
      ${papers?`<div><b>${L`New papers`}</b><span>${esc(papers)}</span></div>`:''}
    </div>
    ${S.unlockedNow.length?`<p class="muted">${L`Something new is waiting in the Vitrina for your next run.`}</p>`:''}
    <div class="btnrow"><button class="btn primary" data-act="nextChapter">${L`Begin chapter ${S.chapter+2}`}</button></div></div></main>`;
}
