// ---------- v24: the city map ----------
// Drawn like a street map on a phone (Google Maps-ish): pale blocks, white side streets, parks, the river along the
// bottom, the main streets you can take in pale yellow, your options in navy. The city itself is drawn once per run
// from S.citySeed and cached; each render adds your trail, the streets you can take now, the stops, and you.
function seeded(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
// Art from the ART table as short blob: URLs, so repeated pictures don't copy a long data: URL around.
const ARTURL={};
function artURL(k){if(!ART[k])return null;if(ARTURL[k])return ARTURL[k];let u=ART[k];
  try{const c=u.indexOf(','),mime=u.slice(5,u.indexOf(';')),bin=atob(u.slice(c+1)),a=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);u=URL.createObjectURL(new Blob([a],{type:mime}))}catch(e){}
  return ARTURL[k]=u}
const OFFICE_HW=52; // half the width of an office card on the map
const legStart=li=>({x:officeX(li)+OFFICE_HW,y:MAP_MID,o:1}),legEnd=li=>({x:officeX(li+1)-OFFICE_HW,y:MAP_MID,o:1});
// A street from a to b: right, then up or down, then right, turning halfway between the two (a stop pin takes
// about 22px on each side). Streets are kept as corner points so trouble markers and footprints can sit on them.
const ptsPath=P=>'M'+P.map(p=>p.join(' ')).join('L');
function streetPts(a,b){const lo=a.x+(a.o?0:24),hi=b.x-(b.o?0:24),m=Math.round((lo+hi)/2);return [[a.x,a.y],[m,a.y],[m,b.y],[b.x,b.y]]}
// The tram leaves the office square, runs along the top of the map, and turns in to the next office.
function tramPts(L,li){const a=legStart(li),e=legEnd(li),y=L.tramY;return [[a.x,a.y],[a.x+12,a.y],[a.x+12,y],[e.x-12,y],[e.x-12,e.y],[e.x,e.y]]}
function legEdges(L,li){const E=[],add=(f,t,P,tram)=>E.push({f,t,P,tram,d:ptsPath(P)});
  L.nodes.forEach(n=>{add(-1,n.id,streetPts(legStart(li),n));add(n.id,'office',streetPts(n,legEnd(li)))});
  if(L.tram)add(-1,'office',tramPts(L,li),true);
  return E}
// Where the trouble marker sits: on the last stretch of the street into the stop.
function hazardSpot(li,n){const P=streetPts(legStart(li),n),m=P[1][0];return {x:Math.round((m+n.x-24)/2),y:n.y}}
let cityCache=null;
function citySVG(){
  const W=mapW(),H=MAP_H,key='v24|'+S.citySeed+'|'+W+'|'+S.map.map(L=>L.nodes.length+(L.tram?'t':'')).join();
  if(cityCache&&cityCache.key===key)return cityCache.svg;
  const R=seeded(S.citySeed);let g='';
  // blocks: most plain, some a shade darker (built up), some parks
  const G=46;
  for(let x=-G;x<W;x+=G)for(let y=-G;y<MAP_RIVER;y+=G){const r=R();
    if(r<.08)g+=`<rect x="${x+3}" y="${y+3}" width="${G-6}" height="${G-6}" rx="4" fill="#cfe2bf"/>`;
    else if(r<.38)g+=`<rect x="${x+3}" y="${y+3}" width="${G-6}" height="${G-6}" rx="3" fill="#e9e2d2"/>`}
  // side streets: a white grid with a few gaps
  let side='';
  for(let x=0;x<W;x+=G)for(let y=0;y<MAP_RIVER;y+=G){if(R()<.88)side+=`M${x} ${y}V${y+G}`;if(R()<.88)side+=`M${x} ${y}H${x+G}`}
  g+=`<path d="${side}" stroke="#ddd3bf" stroke-width="6" fill="none"/><path d="${side}" stroke="#fff" stroke-width="3.5" fill="none"/>`;
  // the river along the bottom, with its name here and there
  g+=`<rect x="0" y="${MAP_RIVER}" width="${W}" height="${H-MAP_RIVER}" fill="#a9d3d6"/><path d="M0 ${MAP_RIVER}H${W}" stroke="#86bdc2" stroke-width="2"/>`;
  for(let x=170;x<W;x+=520)g+=`<text x="${x}" y="${MAP_RIVER+18}" class="criver">Miljacka</text>`;
  // squares around every office
  OFFICES.forEach((_,i)=>{const x=officeX(i);g+=`<rect x="${x-OFFICE_HW-10}" y="${MAP_MID-70}" width="${OFFICE_HW*2+20}" height="140" rx="10" fill="#e4dccb" stroke="#d3c8b2"/>`});
  // main streets (the ones you can take) in pale yellow; the tram line in orange along the top
  let roads='',tram='';
  S.map.forEach((L,li)=>legEdges(L,li).forEach(e=>{if(e.tram)tram+=`<path d="${e.d}"/>`;else roads+=`<path d="${e.d}"/>`}));
  g+=`<g fill="none" stroke-linejoin="round" stroke-linecap="round"><g stroke="#d6c39a" stroke-width="13">${roads}</g><g stroke="#fbefc0" stroke-width="9.5">${roads}</g>
    <g stroke="#fff" stroke-width="7">${tram}</g><g stroke="#e76a36" stroke-width="3.5">${tram}</g></g>`;
  // tram stops: small orange "T" badges where the line leaves and reaches an office
  S.map.forEach((L,li)=>{if(!L.tram)return;const a=legStart(li),e=legEnd(li);
    [[a.x+12,L.tramY],[e.x-12,L.tramY]].forEach(([x,y])=>{g+=`<g transform="translate(${x} ${y})"><circle r="8" fill="#e76a36" stroke="#fff" stroke-width="2"/><text y="3.5" text-anchor="middle" class="ctram">T</text></g>`});
    if(artURL('map_tram'))g+=`<image href="${artURL('map_tram')}" x="${Math.round((a.x+e.x)/2)-24}" y="${L.tramY-8}" width="48" height="16"/>`});
  // district names, small and spaced out, just above the river
  S.map.forEach((L,li)=>{const x=Math.round((officeX(li)+officeX(li+1))/2);g+=`<text x="${x}" y="${MAP_RIVER-10}" text-anchor="middle" class="cdist">${esc(L.name)}</text>`});
  const svg=`<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><rect width="${W}" height="${H}" fill="#f1ece1"/>${g}</svg>`;
  cityCache={key,svg};return svg;
}
// Your footprints along a street: one pair every 18px, turned to face the way you walked.
function footprints(P){const u=artURL('map_footsteps');if(!u)return null;let s='';
  P.slice(1).forEach((q,i)=>{const p=P[i],dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;
    for(let d=7;d<len-3;d+=18){const x=p[0]+dx*d/len,y=p[1]+dy*d/len;s+=`<image href="${u}" x="${(x-6).toFixed(1)}" y="${(y-6).toFixed(1)}" width="12" height="12" transform="rotate(${ang} ${x.toFixed(1)} ${y.toFixed(1)})"/>`}});
  return s}
const KIND_TAG_EN={good:'Helps',bad:'Trouble',event:'Could go either way',rare:'Rare find'},KIND_TAG={...KIND_TAG_EN};
// The red Yugo, seen from above, nose to the right. Its four corner lights blink while it's parked
// (on the pavement, at an angle: definitely not legally).
const YUGO=`<svg viewBox="0 0 46 30" aria-hidden="true"><rect x="3" y="3" width="40" height="24" rx="6" fill="#c93f31" stroke="#18283a" stroke-width="1.8"/><rect x="25" y="6" width="8" height="18" rx="2" fill="#bfe0db" stroke="#18283a" stroke-width="1.2"/><rect x="8" y="7" width="6" height="16" rx="2" fill="#bfe0db" stroke="#18283a" stroke-width="1.2"/><rect x="15" y="8" width="9" height="14" fill="#e05a49"/><g class="hz"><circle cx="42" cy="4.5" r="3.2"/><circle cx="42" cy="25.5" r="3.2"/><circle cx="4" cy="4.5" r="3.2"/><circle cx="4" cy="25.5" r="3.2"/></g></svg>`;
const YUGO_HZ=`<svg viewBox="0 0 46 30" aria-hidden="true"><g class="hz"><circle cx="43" cy="5" r="2.6"/><circle cx="43" cy="25" r="2.6"/><circle cx="3.5" cy="5.5" r="2.6"/><circle cx="3.5" cy="24.5" r="2.6"/></g></svg>`;
function yugoSpot(){
  const L=curLeg(),cl=S.officeIdx-1;
  if(S.screen==='map'&&L&&!L.arrived&&L.at>=0){const n=L.nodes[L.at];return {x:n.x+26,y:n.y-24,a:-14}}
  const i=S.screen==='map'&&L&&!L.arrived?cl:Math.min(S.officeIdx,OFFICES.length-1);
  return {x:officeX(i)+OFFICE_HW+4,y:MAP_MID+58,a:-10};
}
function mapHTML(live){
  const W=mapW(),cl=S.officeIdx-1,nx=live?mapNext():[],sel=live?S.mapSel:null;
  const P=(x,y)=>`left:${x}px;top:${y}px`;
  let over='',nodes='';
  S.map.forEach((L,li)=>{
    const cur=live&&li===cl&&!L.arrived,past=li<cl||(li===cl&&L.arrived),E=legEdges(L,li);
    // your trail through this district
    const steps=[-1,...L.trail,...(L.arrived?['office']:[])];
    for(let i=0;i<steps.length-1;i++){const e=E.find(e=>e.f===steps[i]&&e.t===steps[i+1]);if(e)over+=footprints(e.P)||`<path d="${e.d}" class="ctrail"/>`}
    // the routes you can take right now (navy), the one you are looking at drawn solid
    if(cur){const at=L.at;E.filter(e=>e.f===at&&nx.includes(e.t)).forEach(e=>{
      const on=sel&&sel.leg===li&&sel.id===e.t;over+=`<path d="${e.d}" class="cnext ${on?'on':''} ${e.tram?'tram':''}"/>`})}
    L.nodes.forEach(n=>{
      const nd=NODES[n.k],reach=cur&&nx.includes(n.id),visited=L.trail.includes(n.id),isSel=sel&&sel.leg===li&&sel.id===n.id;
      const st=reach?'reach':visited?'visited':past||li===cl?'gone':'ahead';
      const tap=live&&(st==='reach'||st==='ahead');
      const vk=visited&&artURL('map_visited');
      const body=`<span class="mi">${nodeIcon(n.k)}${vk?`<img class="vchk" src="${vk}" alt="">`:''}</span><span class="ml">${esc(nd.name)}</span>`;
      const label=`${nd.name}. ${KIND_TAG[nd.kind]}.${n.hz?' '+T('On the way: {0}.',NODES[n.hz].name):''}${reach?' '+T('You can go here.'):''}`;
      nodes+=tap?`<button class="cnode ${nd.kind} ${st} ${isSel?'sel':''}" style="${P(n.x,n.y)}" data-act="mapSel" data-leg="${li}" data-id="${n.id}" aria-label="${esc(label)}">${body}</button>`
        :`<div class="cnode ${nd.kind} ${st} ${vk?'vart':''}" style="${P(n.x,n.y)}">${body}</div>`;
      // trouble on the way: a red warning sign on the street, like a traffic incident
      if(n.hz&&!past&&!(li===cl&&L.at>=0)){const h=hazardSpot(li,n);nodes+=`<span class="chaz ${reach?'':'dim'}" style="${P(h.x,h.y)}" title="${esc(NODES[n.hz].name)}" aria-hidden="true">!</span>`}
    });
  });
  OFFICES.forEach((x,i)=>{
    const st=S.result==='win'||i<S.officeIdx?'done':i===S.officeIdx?'now':'ahead',reach=live&&i===S.officeIdx&&nx.includes('office');
    const isSel=reach&&sel&&sel.id==='office';
    const tag=st==='done'?T('Approved'):reach?T('Open now'):st==='now'?(S.screen==='map'?T('Next'):T('You are here')):T('Ahead');
    const inner=`<img src="${ART['ext_'+lookOf(x)]}" alt=""><span class="co-t"><b>${i+1}. ${esc(x.short)}</b></span><i>${tag}</i>`;
    nodes+=reach?`<button class="coffice reach ${isSel?'sel':''}" style="${P(officeX(i),MAP_MID)}" data-act="mapSel" data-leg="${cl}" data-id="office" aria-label="${esc(x.full)}. ${T('Go in.')}">${inner}</button>`
      :`<div class="coffice ${st}" style="${P(officeX(i),MAP_MID)}">${inner}</div>`;
  });
  const me=yugoSpot(),yu=artURL('map_yugo');
  const yugo=`<span class="yugo ${yu?'yart':''}" style="${P(me.x,me.y)};--a:${me.a}deg">${yu?`<img src="${yu}" alt="">${YUGO_HZ}`:YUGO}</span>`;
  return `<div class="citywrap"><div class="city" style="width:${W}px;height:${MAP_H}px">${citySVG()}<svg class="cover" viewBox="0 0 ${W} ${MAP_H}" aria-hidden="true">${over}</svg>${nodes}${yugo}</div></div>`;
}
// Scroll the city strip: on the map screen it frames the district you are crossing; in the map panel it centres on you.
function centerCity(smooth){const w=$app.querySelector('.citywrap'),y=w&&w.querySelector('.yugo');if(!w||!y)return;
  const L=curLeg(),live=S.screen==='map'&&!S.view&&L&&!L.arrived;
  const x=(live?officeX(S.officeIdx-1)+MAP_STOP+(L.at<0?0:60):parseFloat(y.style.left))-w.clientWidth/2;
  if(smooth&&w.scrollTo)w.scrollTo({left:x,behavior:'smooth'});else w.scrollLeft=x}
// The card under the map: what you'd get, what happens on the way, what it means for you now, and Go.
function mapCard(){
  const s=S.mapSel,nx=mapNext();
  if(!s)return `<div class="mapcard hint"><span class="pulse-dot"></span>${nx.length===1&&nx[0]==='office'?L`The office is open. Tap it to go in.`:L`Tap a stop to compare. Each route has something for you, and some have trouble on the way.`}</div>`;
  const Lg=S.map[s.leg],ok=s.leg===S.officeIdx-1&&nx.includes(s.id);
  const back=`<button class="btn quiet" data-act="mapUnsel">${ok?L`Back`:L`OK`}</button>`;
  if(s.id==='office'){const o=OFFICES[s.leg+1],tram=Lg.at<0;
    return `<div class="mapcard"><span class="mc-i office"><img src="${ART['ext_'+lookOf(o)]}" alt=""></span><div class="mc-t"><span class="kicker">${tram?L`Tram`:L`Office ${s.leg+2}`} · ${esc(clerkName(o))}</span><b>${esc(o.full)}</b><p>${esc(o.goal)}</p>
      <ul class="mc-l">${moodsKnown(s.leg+1).map(k=>`<li class="${MOODS[k].good?'get':'haz'}"><b>${L`Mood`}</b>${LG(o,()=>esc(L(MOODS[k].title)+' '+L(MOODS[k].text)))}</li>`).join('')}${moodHidden(s.leg+1)?`<li class="haz"><b>${L`Mood`}</b>${L`One more you'll only see at the window.`}</li>`:''}${tram?`<li class="get"><b>${L`Get`}</b>${L`Straight there: 1 day instead of 2. Your papers stay a day fresher.`}</li><li class="haz"><b>${L`Miss`}</b>${L`No stop on the way.`}</li>`:`<li class="get"><b>${L`Takes`}</b>${L`1 day. Then the window opens.`}</li>`}</ul></div>
      <div class="mc-b">${ok?`<button class="btn primary" data-act="mapGo">${tram?L`Take the tram`:L`Go in`}</button>`:''}${back}</div></div>`}
  const n=Lg.nodes[s.id],nd=NODES[n.k],hz=n.hz&&NODES[n.hz];
  const where=ok?'':s.leg>S.officeIdx-1?`<p class="mc-note">${L`Later, in ${esc(Lg.name)}. You can't go there yet.`}</p>`:`<p class="mc-note">${L`Not on your way any more.`}</p>`;
  return `<div class="mapcard ${nd.kind}"><span class="mc-i">${nodeIcon(n.k)}</span><div class="mc-t"><span class="kicker">${KIND_TAG[nd.kind]} · ${L`2 days to the office`}</span><b>${esc(nd.name)}</b>
    <ul class="mc-l"><li class="get"><b>${L`Get`}</b>${esc(nd.text)}</li>${hz?`<li class="haz"><b>${L`On the way`}</b>${esc(hz.name)}: ${esc(hz.text)}</li>`:`<li class="ok"><b>${L`On the way`}</b>${L`Nothing. A quiet street.`}</li>`}<li class="you"><b>${L`For you`}</b>${esc(forYouNow(n.k))}</li></ul>${where}</div>
    <div class="mc-b">${ok?`<button class="btn primary" data-act="mapGo">${L`Go here`}</button>`:''}${back}</div></div>`;
}
// What you took from the Vitrina, shown on the map screen (tap: the map panel lists it in full).
function bagRow(){const b=bagDocs();return b.length?`<div class="vitrow bagrow"><span class="kicker">${L`Strange papers in your bag`}</span>${b.map(c=>`<span class="vitchip"><b>${esc(DOCS[c.doc].name)}</b></span>`).join('')}</div>`:''}
function moodRow(){const d=OFFICES[S.officeIdx];if(!d||!S.moods)return '';const ks=moodsKnown(S.officeIdx),hid=moodHidden(S.officeIdx);
  return `<div class="moodrow"><span class="kicker">${LG(d,()=>ks.length||hid?L`${clerkName(d)} at the ${d.full} today`:L`${clerkName(d)} at the ${d.full}: in no particular mood`)}</span>${moodNotes(S.officeIdx,'mini')}</div>`}
function vitRow(){return S.trinkets&&S.trinkets.length?`<div class="vitrow"><span class="kicker">${L`From the Vitrina`}</span>${S.trinkets.map(k=>`<button class="vitchip" data-act="view" data-v="map" title="${esc(TRINKETS[k].text)}"><span class="vt-obj">${trkIcon(k)}</span><b>${esc(TRINKETS[k].name)}</b></button>`).join('')}</div>`:''}
function pocketRow(){return S.pocket.length?`<div class="pocketrow"><span class="kicker">${L`Pocket`}</span>${S.pocket.map((k,i)=>`<button class="pk" data-act="pocketAsk" data-i="${i}"><span class="ti">${pktIcon(k)}</span><b>${esc(POCKET[k].name)}</b><small>${esc(POCKET[k].text)}${POCKET[k].office?' '+L`At a counter.`:''}</small></button>`).join('')}</div>`:''}
function askHTML(){const i=S.pocketAsk;if(i==null||!S.pocket[i])return '';const k=S.pocket[i],p=POCKET[k],ok=!p.office||S.screen==='office';
  return `<div class="panel ask" role="dialog" aria-modal="true"><div class="panel-in"><span class="kicker">${L`From your pocket`}</span><h2>${esc(p.name)}</h2><p class="lead">${esc(p.text)} ${ok?L`One use.`:L`Save it for a counter: it only works at an office window.`}</p>
    <div class="pm-btns">${ok?`<button class="btn primary" data-act="pocketUse">${L`Use it`}</button>`:''}<button class="btn" data-act="pocketNo">${ok?L`Not now`:L`OK`}</button></div></div></div>`}
function overlay(){
  const ov=S.overlays[0];if(!ov)return '';
  const face=ov.head&&ov.clerk&&S.office?(S.tut?`<span class="ovface pupface" aria-hidden="true">${PUPPY_HEAD}</span>`:`<canvas class="ovface" data-office="${esc(lookOf(cur()))}" width="168" height="186" aria-hidden="true"></canvas>`):'';
  return `<button class="overlay" data-act="dismiss" aria-label="${L`Dismiss`}"><div class="ov-box">
    ${ov.head?`<div class="ov-top">${face}<div class="ov-head">${esc(ov.head)}</div></div>`:''}<div class="ov-stamp ${ov.violet?'violet':''}">${esc(ov.stamp)}</div><p>${esc(ov.text)}</p>${ov.hint?`<p><b>${esc(ov.hint)}</b></p>`:''}<small>${L`Tap to continue`}</small></div></button>`;
}
