
/* ============ between offices: the city map (v24) ============
   The whole run is one city, read left to right like a strip: the first office on the left, the last on the right.
   Between two offices lies a district with ONE stop to make, out of 2 (sometimes 3) routes. Each route is a
   destination (something that helps, a gamble, or the rare attic) and sometimes trouble on the way there
   (the bus doesn't come, a strike...). The tram is a route too: no stop, no trouble, one day saved.
   Routes in a district are balanced: the better the stop, the more likely there is trouble on the way, and
   districts are rerolled until no route is clearly better than another. Which one is best depends on you:
   your patience, which papers are getting old, what the next clerk wants.
   S.map[i] is the district between office i and office i+1. It is the live one while S.officeIdx===i+1. */
const MAP_H=320,MAP_GAP=290,MAP_PAD=80,MAP_MID=150,MAP_STOP=145,MAP_RIVER=292;
const DISTRICTS=['Grbavica','Čengić Vila','Hrasno','Alipašino Polje','Koševo','Otoka','Dolac Malta','Bistrik'];
const mapW=()=>MAP_PAD*2+(OFFICES.length-1)*MAP_GAP;
const officeX=i=>MAP_PAD+i*MAP_GAP;
// Rough worth of each stop and cost of each kind of trouble, used only to keep a district's routes even.
const STOP_VALUE={cafe:1,kiosk:1.1,shred:1,drawer:1.3,copyshop:1.4,counter:1.4,kafana:1.7,cousin:1.8,attic:2.4,event:1.1};
const HAZ_COST={bus:.9,strike:.8,reno:1,flood:.9,inlaw:.6},TRAM_VALUE=1;
function makeMap(){const names=shuffle(DISTRICTS);return OFFICES.slice(1).map((_,i)=>makeLeg(i,names[i%names.length]))}
function rollRoutes(){
  const options=Math.random()<.7?2:3,tram=Math.random()<.25,n=options-(tram?1:0);
  const dest=shuffle([...GOOD_NODES,'event']).filter(k=>k!=='cousin'||Math.random()<.7).slice(0,n);
  if(Math.random()<.2){const g=dest.findIndex(k=>k!=='event');if(g>=0)dest[g]='attic'}
  const usedB=[];
  const routes=dest.map(k=>{const v=STOP_VALUE[k],p=Math.max(.1,Math.min(.9,(v-.8)*.75));let hz=null;
    if(Math.random()<p){const pool=BAD_NODES.filter(b=>!usedB.includes(b));hz=rnd(pool);usedB.push(hz)}
    return {k,hz}});
  const nets=routes.map(r=>STOP_VALUE[r.k]-(r.hz?HAZ_COST[r.hz]:0));if(tram)nets.push(TRAM_VALUE);
  return {routes,tram,spread:Math.max(...nets)-Math.min(...nets)};
}
function makeLeg(li,name){
  let best=null;
  for(let i=0;i<60;i++){const r=rollRoutes();if(!best||r.spread<best.spread)best=r;if(best.spread<=.45)break}
  const {routes,tram}=best,n=routes.length;
  const ys=n===1?[205]:n===2?[95,205]:[62,145,228];
  const N=routes.map((r,i)=>({id:i,k:r.k,hz:r.hz,exit:true,to:[],x:officeX(li)+MAP_STOP,y:ys[i]}));
  return {name,nodes:N,tram,tramY:16,at:-1,trail:[],arrived:false};
}
function curLeg(){return S.map[S.officeIdx-1]}
// Where you can go next: a stop id, or 'office' once you are at a stop (or straight away, by tram).
function mapNext(){const L=curLeg();if(!L||L.arrived)return [];if(L.at<0)return [...L.nodes.map(n=>n.id),...(L.tram?['office']:[])];
  return ['office']}
function mapSelect(leg,id){S.mapSel=S.mapSel&&S.mapSel.leg===leg&&S.mapSel.id===id?null:{leg,id}}
// Going to a stop: a day passes, the trouble on the way happens first, then the stop itself.
function mapGo(){const s=S.mapSel,L=curLeg();S.mapSel=null;
  if(S.screen!=='map'||!s||!L||s.leg!==S.officeIdx-1||!mapNext().includes(s.id))return;
  if(s.id==='office')return mapOffice();
  const n=L.nodes[s.id];L.at=s.id;L.trail.push(s.id);newDay();
  if(n.hz){resolveNode(n.hz);if(S.screen==='end')return}
  resolveNode(n.k)}
function mapOffice(){const L=curLeg();if(!L||!mapNext().includes('office'))return;L.arrived=true;S.mapSel=null;newDay();enterOffice()}
// One line about what a stop would do for you right now, so the choice is an informed one.
function forYouNow(k){
  const docs=S.deck.map(C).filter(c=>c.kind==='doc');
  switch(k){
    case 'cafe':case 'kafana':return L`Your patience: ${S.patience}/${S.maxP}.`;
    case 'kiosk':{const st=docs.filter(c=>STAMPS.includes(c.doc)).length,ph=docs.filter(c=>c.doc==='photo').length;return L`You have ${st} [[0:fee stamp|fee stamps]] and ${ph} [[1:photo|photos]].`}
    case 'copyshop':{const n=docs.filter(isOriginalCopyable).length;return n?L`${n} [[0:original|originals]] you could copy.`:L`You have no originals to copy.`}
    case 'counter':{const n=docs.filter(canReissue).length,old=docs.filter(c=>canReissue(c)&&docAge(c)>=4).length;return n?(old?L`${n} of your papers could be re-issued, ${old} of them 4+ days old.`:L`${n} of your papers could be re-issued.`):L`All your papers are fresh.`}
    case 'shred':return L`Your deck has ${S.deck.length} [[0:card|cards]].`;
    case 'cousin':return S.relics.length?L`You already have ${S.relics.length} [[0:connection|connections]].`:L`You have no connections yet.`;
    case 'drawer':{const n=bagDocs().length;return L`You hold ${n} [[0:strange paper|strange papers]].`}
    case 'attic':return L`Something you can keep for good, plus a pocket item.`;
    case 'event':return L`A small choice. Could go either way.`;
  }
  return '';
}
function pickReward(uid){if(uid){if(STRANGE.includes(C(uid).doc))S.bag.push(uid);else addToDeck(C(uid))}if(S.chapterEnd){S.screen='chapter';return}S.officeIdx++;S.screen='map'}
function nodeDone(){if(S.screen!=='end')S.screen='map'}
function resolveNode(k){
  const n=NODES[k],h=n.name;S.screen='map';
  switch(k){
    case 'cafe':heal(10);S.tired=-1;say(h,L`+10 patience`,L`A coffee, a glass of water, and nobody asks you for a paper.`+' '+L`You draw 1 card more on your first turn at the next window.`);break;
    case 'kafana':heal(20);gainFavour(1);S.tired=1;say(h,L`+20 patience`,L`Ćevapi, one rakija that became three, and a lot of opinions about the government. Tomorrow you start a little slow: 1 card less on your first turn.`+' '+L`+1 Favour.`);break;
    case 'kiosk':STAMPS.forEach(x=>addToDeck(mkDoc(x)));addToDeck(mkDoc('photo'));say(h,L`Stocked up`,L`One fee stamp of each kind, and four photos in which you look like you are being arrested. One joins your cards.`);break;
    case 'copyshop':S.screen='copyshop';break;
    case 'counter':S.screen='counter';S.counterLeft=2;break;
    case 'shred':S.screen='shred';break;
    case 'cousin':{gainFavour(1);const free=Object.keys(RELICS).filter(r=>!hasRelic(r));if(free.length){S.screen='relic';S.choices=shuffle(free).slice(0,2)}
      else{heal(10);say(h,L`+10 patience`,L`Your cousin has introduced you to everyone already. You drink coffee and complain together.`)}break}
    case 'drawer':{const pool=STRANGE.filter(x=>!ownedDocs().some(c=>c.doc===x)&&OFFICES.slice(S.officeIdx).some(o=>o.ft1p===x));const x=pool.length?rnd(pool):rnd(STRANGE);
      S.bag.push(mkDoc(x,'original',{issued:S.day-3}).uid);say(h,L`Found`,L`Between old phone bills and a 1987 calendar: your ${DOCS[x].name}. It goes in your bag, ready for the clerk who asks for it.`);break}
    case 'bus':loseP(6);if(S.screen==='end')return;say(h,L`−6 patience`,L`The timetable says every 12 minutes. The timetable is a work of fiction.`);break;
    case 'reno':loseP(5);if(S.screen==='end')return;S.tired=1;say(h,L`−5 patience`,L`The neighbour is "almost done" with the bathroom. He has been almost done since March. 1 card less on your first turn at the next window.`);break;
    case 'flood':{loseP(2);if(S.screen==='end')return;const ds=S.deck.map(C).filter(c=>dated(c)&&!c.noexp);
      if(ds.length){const c=rnd(ds);c.issued=S.day-30;say(h,L`Smudged`,L`Water from upstairs drips onto your ${docName(c.doc,c.form)}. The date is unreadable, so it counts as old. Re-issue it before anyone asks for a fresh one. −2 patience.`)}
      else say(h,L`−2 patience`,L`Water everywhere, but your papers are laminated. Small victories.`);break}
    case 'inlaw':loseP(8);if(S.screen==='end')return;say(h,L`−8 patience`,L`She has opinions about your apartment, your job and your posture.`);addPocket('pita');break;
    case 'strike':loseP(5);if(S.screen==='end')return;say(h,L`−5 patience`,L`A handwritten sign: "Closed due to strike. Or illness. Come back tomorrow."`);break;
    case 'event':S.ev=rnd(Object.keys(EVENTS));S.screen='event';break;
    case 'attic':{const locked=Object.keys(TRINKETS).filter(t=>!META.unlocked.includes(t));
      if(!(locked.length&&unlock(rnd(locked)))){heal(10);say(h,L`+10 patience`,L`Nothing new up here, but you find grandpa's old radio. It still works.`)}
      addPocket(rnd(Object.keys(POCKET)));break}
  }
}
function eventPick(opt){
  const k=S.ev,h=EVENTS[k].title;S.screen='map';
  if(opt==='b'){
    if(k==='wedding'){loseP(2);if(S.screen==='end')return;say(h,L`−2 patience`,L`You send an envelope. Your aunt will still mention it at every family lunch.`)}
    else if(k==='classmate'){heal(5);say(h,L`+5 patience`,L`You talk about who got fat and who moved to Germany. It is surprisingly nice.`)}
    else say(h,L`Nothing`,L`You keep walking. Nothing happens, which today counts as a win.`);
    return}
  switch(k){
    case 'petition':loseP(3);if(S.screen==='end')return;say(h,L`Signed`,L`She writes your name in a notebook with 600 other names. "I won't forget this."`);addPocket(rnd(Object.keys(POCKET)));break;
    case 'wedding':{loseP(6);if(S.screen==='end')return;const free=Object.keys(RELICS).filter(r=>!hasRelic(r));
      if(free.length){const r=rnd(free);S.relics.push(r);say(h,RELICS[r].name,L`At 3 a.m., between two kolo dances, you meet exactly the right person.`+' '+RELICS[r].text+' '+L`It lasts the whole run.`)}
      else say(h,L`−6 patience`,L`You already know everyone here. You dance anyway.`);break}
    case 'classmate':addToDeck(mkAct('backdoor'));say(h,ACTIONS.backdoor.name,L`"My husband is a notary. Tell him I sent you." A Notary Owes You card joins your deck.`);break;
    case 'scratch':if(Math.random()<.5){say(h,L`Winner`,L`You win a bottle of homemade rakija. The kiosk lady is visibly upset.`);addPocket('rakija')}
      else{loseP(3);if(S.screen==='end')return;say(h,L`−3 patience`,L`"Almost," says the kiosk lady. It is never almost.`)}break;
    case 'wallet':newDay();heal(8);say(h,L`+8 patience`,L`The officer takes it, looks at you suspiciously, then thanks you. It takes the whole day (now day ${S.day}), but you feel good.`);break;
  }
}
// Pocket items (single use). Some only make sense at a counter.
function usePocket(i){const k=S.pocket[i];if(!k)return;const p=POCKET[k],o=S.screen==='office'?S.office:null;
  if(p.office&&!o){S.log=L`Save that for the counter.`;return}
  S.pocket.splice(i,1);
  if(k==='pita'){heal(8);say(L`From your pocket`,p.name,L`Still warm, somehow. +8 patience.`)}
  if(k==='rakija'){o.skipN=(o.skipN||0)+2;say(L`Under the counter`,p.name,L`${clerkName(cur())} pretends not to see it, and puts it away very quickly. The next 2 actions are skipped.`)}
  if(k==='ticket'){startSwap('ticket');S.log=L`Someone else's priority number. Tap the cards you want to swap, then Swap.`}
}
