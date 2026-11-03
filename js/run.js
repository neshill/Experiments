
/* ============ state ============ */
// META = what survives between runs (stored in this browser's localStorage, so it lives on this device only):
// unlocked trinkets in the Vitrina, which ones you equip, and how many slots you have.
let S, META=loadMeta();
function loadMeta(){let m=null;try{m=JSON.parse(localStorage.getItem('ft1p.meta'))}catch(e){}
  m=m&&typeof m==='object'?m:{};
  m.unlocked=Array.isArray(m.unlocked)?m.unlocked.filter(k=>TRINKETS[k]):[];
  START_TRINKETS.forEach(k=>{if(!m.unlocked.includes(k))m.unlocked.push(k)});
  m.slots=m.slots||1;m.runs=m.runs||0;m.wins=m.wins||0;
  // v30: characters, reform levels, cards that joined the reward pool, lifetime counters
  m.best=m.best||0;m.char=m.char||'student';m.level=m.level||0;m.reform=m.reform&&typeof m.reform==='object'?m.reform:{};
  m.cards=Array.isArray(m.cards)?m.cards.filter(k=>LOCKED_CARDS.includes(k)):[];m.bribes=m.bribes||0;
  m.equipped=Array.isArray(m.equipped)?m.equipped.filter(k=>m.unlocked.includes(k)).slice(0,m.slots):m.unlocked.slice(0,1);
  return m}
function saveMeta(){try{localStorage.setItem('ft1p.meta',JSON.stringify(META))}catch(e){}}
const rnd=a=>a[Math.floor(Math.random()*a.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function reg(c){S.cards[c.uid]=c;return c}
// Every document remembers the day it was issued (copies keep the date of their original; notarizing dates them today).
function mkDoc(doc,form='original',extra={}){return reg({uid:S.uid++,kind:'doc',doc,form,issued:S.day,...extra})}
function mkAct(key){return reg({uid:S.uid++,kind:'act',key})}
function addToDeck(c){S.deck.push(c.uid);return c}
function hasRelic(k){return S.relics.includes(k)}
function hasTrinket(k){return (S.trinkets||[]).includes(k)}
const keepMax=()=>(hasTrinket('folder')?4:KEEP_MAX)+(S.office&&S.office.keepBonus||0);
// ---------- v22: days and freshness ----------
const dated=c=>c.kind==='doc'&&!DOCS[c.doc].single;          // documents with a date (stamps and photos don't age)
function docAge(c){return Math.max(0,S.day-(c.issued??S.day))}
function tooOld(r,c){return r.max!=null&&dated(c)&&!c.noexp&&docAge(c)>r.max}
function ageLabel(c){if(c.noexp)return L`Never too old`;const a=docAge(c);return a===0?L`Issued today`:L`${a} [[0:day|days]] old`}
function maxLabel(m){return m===0?L`issued today`:L`max ${m} [[0:day|days]] old`}
const canReissue=c=>dated(c)&&!c.noexp&&docAge(c)>0;
const canBackdate=c=>dated(c)&&!c.noexp;
// A new day: morning comes, papers age. (Thermos: +3 patience every morning.)
function newDay(){S.day++;if(hasTrinket('thermos'))S.patience=Math.min(S.maxP,S.patience+3)}
function heal(n){S.patience=Math.min(S.maxP,S.patience+n)}
function say(head,stamp,text){S.overlays.push({head,stamp,violet:true,text})}
function unlock(k){if(!TRINKETS[k]||META.unlocked.includes(k))return false;META.unlocked.push(k);saveMeta();S.unlockedNow.push(k);
  S.overlays.push({head:L`New in the Vitrina`,stamp:TRINKETS[k].name,violet:true,text:L`${TRINKETS[k].text} It stays in grandma's glass cabinet for good. Equip it before a run.`});return true}
function runEnded(){if(S.ended)return;S.ended=true;META.runs++;META.bribes+=S.stats.bribes||0;
  if(S.result==='win'){META.wins++;unlock('medal');if(META.slots<3){META.slots=3;S.unlockedNow.push('slot3')}
    // a win at your highest reform level opens the next one for this character
    const k=S.char;if((S.reform||0)>=reformOpen(k)&&reformOpen(k)<REFORM_MAX){META.reform[k]=(S.reform||0)+1;S.unlockedNow.push('reform')}}
  else unlock('partycard');
  if(META.bribes>=8)unlock('dmbill');
  if((S.stats.closings||0)>=6)unlock('calendar');
  // one new card joins the reward pool for good, every run
  const lockedNow=LOCKED_CARDS.filter(k=>!META.cards.includes(k));if(lockedNow.length&&(S.chapter>0||S.officeIdx>=2)){const k=rnd(lockedNow);META.cards.push(k);S.newCard=k}
  saveMeta()}
function addPocket(k){if(S.pocket.length>=POCKET_MAX){say(L`Pockets full`,POCKET[k].name,L`Your pockets are full, so it stays behind.`);return}
  S.pocket.push(k);say(L`Into your pocket`,POCKET[k].name,L`${POCKET[k].text} Use it any time from the top of the screen. One use.`)}
function cur(){return S.tut?TUT_OFFICE:OFFICES[S.officeIdx]}
const clerkName=d=>d.title?L`${d.title} ${d.clerk}`:d.clerk;
function C(uid){return S.cards[uid]}
// v31: time per turn is gone; kept as a stub so old callers read 0.
function timeCost(c){return 0}
function patCost(c){if(c.kind==='doc')return 0;if(c.key==='coffee'&&moodOn('coffee'))return 0;
  if(c.key==='cousin'&&isChar('fixer')&&(S.favours||0)>0)return 0;
  if(c.key==='envelope'&&hasTrinket('dmbill')&&!S.dmUsed)return 0;
  let p=ACTIONS[c.key].pat||0;p=p&&hasRelic('policeuncle')?p-1:p;
  if(p&&isChar('returnee')&&(c.key==='envelope'||c.key==='bigenvelope'))p=Math.max(0,p-3);
  if(p&&SHADY.has(c.key)&&reformOn(8))p++;
  return SHADY.has(c.key)&&moodOn('camera')?p*2:p}
// German nouns keep their capital letter
const lc=x=>LANG==='de'?x:x.toLowerCase();
function docName(doc,form){return DOCS[doc].single?DOCS[doc].name:L`${DOCS[doc].name} (${lc(FORM[form])})`}
const isFeeRow=r=>!!DOCS[r.doc].fee;
const STAMPS=['stamp_mun','stamp_fed','stamp_adm'];
// A certified copy also counts where a plain copy is asked for. A document past the line's max age doesn't count.
function formOk(r,c){if(r.form==='copy'&&c.form==='copy'&&moodOn('originals'))return false;return r.form===c.form||(r.form==='alt'&&(c.form==='original'||c.form==='certified'))||(r.form==='copy'&&c.form==='certified')}
const wetInk=c=>moodOn('wetink')&&dated(c)&&!c.noexp&&docAge(c)===0;
function accepts(r,c){if(isFeeRow(r))return c.kind==='doc'&&c.doc===DOCS[r.doc].fee;return c.kind==='doc'&&r.doc===c.doc&&formOk(r,c)&&!tooOld(r,c)&&!wetInk(c)}
function staleFor(r){return !r.done&&!isFeeRow(r)&&pileCards().some(c=>c.kind==='doc'&&c.doc===r.doc&&formOk(r,c)&&tooOld(r,c))}
// Clerk keeps: copies, certified copies, stamps, photos, and any original handed in for an "original or certified copy" item.
function keeps(c,r){return c.form!=='original'||!!DOCS[c.doc].single||r.form==='alt'}

function newRun(){
  S={v:12,chapter:0,char:META.char||'student',reform:0,favours:0,traces:0,bag:[],redrawing:null,swapSrc:null,citySeed:Math.floor(Math.random()*2**31),mapSel:null,keeping:null,paused:null,screen:'intro',patience:80,maxP:80,relics:[],trinkets:[],pocket:[],day:1,tired:0,partyUsed:false,unlockedNow:[],ended:false,
     cards:{},deck:[],uid:1,officeIdx:0,office:null,map:null,
     overlays:[],target:null,confirm:null,log:'',choices:null,result:null,pending:null,stats:{turns:0,detours:0,bribes:0,paid:0},
     ftPlan:[],heard:[]};
  setChapter(0);S.ftPlan=OFFICES.map(()=>false);S.heard=OFFICES.map(()=>[]);
}
// v30: the run is built once you have picked who you are (character select) and what to take (Vitrina).
function buildRun(){
  const ch=CHARACTERS[META.char]&&charOpen(META.char)?META.char:'student';
  S.char=ch;S.reform=Math.min(META.level||0,reformOpen(ch));
  S.trinkets=META.equipped.filter(k=>META.unlocked.includes(k)).slice(0,META.slots);
  S.maxP=curChar().patience+(hasTrinket('medal')?10:0)-(reformOn(1)?10:0);S.patience=S.maxP;
  S.favours=curChar().favours||0;S.traces=0;
  setChapter(0);rollChapter();
  startingDeck(ch);chapterPapers();chapterPerks();
  // Starting papers were issued a few days before the run starts.
  const want=S.forms.map(f=>f.ft1p).filter(Boolean);
  S.bag.push(mkDoc(want.length&&Math.random()<.5?rnd(want):rnd(STRANGE),'original',{issued:1-Math.floor(Math.random()*4),start:true}).uid);
}
// After the Vitrina: equip trinkets, apply their start-of-run effects, go to the first window.
function beginRun(){
  buildRun();
  if(hasTrinket('stampbox'))STAMPS.forEach(x=>addToDeck(mkDoc(x)));
  if(hasTrinket('laminator'))S.deck.map(C).forEach(c=>{if(c.start&&dated(c))c.noexp=true});
  enterOffice();
  S.overlays.unshift({head:L`Chapter 1: ${CHAPTER.title}`,stamp:CHAPTER.goal,violet:true,text:L(CHAPTER.intro)+' '+L`Five offices, the last one is the hardest. Then years pass and life goes on.`});
  if(S.trinkets.length)S.overlays.unshift({head:L`From the Vitrina`,stamp:L`Packed`,violet:true,
    text:S.trinkets.map(k=>`${TRINKETS[k].name}: ${TRINKETS[k].text}`).join(' ')+' '+L`You can check it any time on the map.`});
}

/* ============ office loop ============ */
function enterOffice(){
  const d=cur();
  S.office={rows:d.rows.map(([doc,form,max])=>({doc,form,max,done:false})),rulesLeft:d.rules.slice(),ft1pFired:false,
    turnsLeft:0,turn:0,draw:shuffle(S.deck),hand:[],discard:[],exhaust:[],handBonus:Math.max(0,-(S.tired||0)),handPenalty:Math.max(0,S.tired||0),closings:0,bagUsed:false,
    intent:null,skipIntent:false,skipN:0,story:0,usedGossip:[]};
  S.tired=0;
  S.screen='office';S.target=null;S.confirm=null;S.office.turnsLeft=officeTurns();
  S.office.rows.forEach(r=>{r.max=moodMax(r.doc,r.max)});
  const mk=S.tut?[]:moodsKnown(S.officeIdx);
  if(mk.length)LG(d,()=>S.overlays.push({head:L`${clerkName(d)} today`,stamp:mk.length>1?L`Two moods`:L`Mood`,violet:true,
    text:mk.map(k=>`${L(MOODS[k].title)} ${L(MOODS[k].text)}`).join(' ')+' '+L`It's on a note at the top of the form.`}));
  if(isBoss(d)&&!S.tut)LG(d,()=>S.overlays.unshift({head:L`Last office of the chapter`,stamp:L`Boss`,violet:true,
    text:L`${clerkName(d)} is the final word on your ${d.goal}. Always: ${L(MOODS[BOSSES[d.boss].sig].title)}`+' '+L(BOSSES[d.boss].warn)}));
  if(isChar('student')&&!S.tut&&d.rules.length&&!S.heard[S.officeIdx].includes('r0')){S.heard[S.officeIdx].push('r0');const [doc,form]=d.rules[0];
    LG(d,()=>S.overlays.push({head:L`Highlighter`,stamp:L`Tip`,violet:true,text:L`You read up on the ${d.full} last night. ${clerkName(d)} will "suddenly remember" [[he|she]] needs your ${needLabel(doc,form)}. Keep it on you.`}))}
  S.log=L`${clerkName(d)} looks up from [[his|her]] screen. Then back down.`;
  S.office.intent=rollIntent();
  startTurn();
  if(hasTrinket('notebook')){const t=nextTip();if(t&&t.idx===S.officeIdx)hearTip()}
}
const blockedNext=()=>!!(S.office&&(S.office.skipIntent||S.office.skipN>0));
const RULEISH=new Set(['rule','reject','certify','stale']);
const certOk=x=>!x.done&&x.form==='copy'&&!isFeeRow(x)&&!DOCS[x.doc].single&&!x.ft1p;
const staleOk=x=>!x.done&&!isFeeRow(x)&&!DOCS[x.doc].single&&x.doc!=='id'&&!x.ft1p&&(x.max==null||x.max>0);
// The line a clerk's "stricter" move hits: the one shown in the preview, or another one if that line got done meanwhile.
function intentRow(it,f){const o=S.office;let r=o.rows[it.row];if(!r||!f(r)){const rs=o.rows.filter(f);r=rs.length?rnd(rs):null}return r}
function officeTurns(){return Math.max(2,cur().turns-(moodOn('early')?1:0)-(reformOn(5)&&!S.tut?1:0))}
function startTurn(){
  const o=S.office;o.turn++;S.stats.turns++;
  const mig=o.migrate>0?(o.migrate--,1):0;
  // v31: no time. What used to give or take time now changes how many cards you draw up to this turn.
  const hs=Math.max(2,HAND_SIZE+(o.handBonus||0)-(o.handPenalty||0)-mig-(o.turn===1&&moodOn('ticket')?1:0)+(o.turn===1&&moodOn('friday')?1:0));o.handBonus=0;o.handPenalty=0;
  o.lunch=o.turn===3&&moodOn('lunch');
  if(o.lunch)S.overlays.push({head:L`11:00`,stamp:L`Lunch break`,violet:true,text:L`A sign goes up: "Pauza". The window is shut this turn: you can't hand in papers, but you can still play actions.`});
  drawN(Math.max(0,hs-o.hand.length));if(S.tut)tutEnsure();rollGossip();
}
function drawN(n){
  const o=S.office;
  for(let i=0;i<n;i++){
    if(o.hand.length>=12)break;
    if(!o.draw.length){if(!o.discard.length)break;o.draw=shuffle(o.discard);o.discard=[]}
    o.hand.push(o.draw.pop());
  }
}
// Each turn, sometimes the clerks drop a hint about what the clerk does next (queued between story scenes).
function rollGossip(){
  const o=S.office;
  GB.tell=Math.random()<.45&&GOSSIP_TELL[o.intent.type]?rnd(GOSSIP_TELL[o.intent.type]).slice():null;
}
function rollIntent(){
  if(S.tut)return tutIntent();
  const o=S.office,dmg=cur().dmg+Math.floor(o.turn/2)+(reformOn(2)?1:0);
  const opts=[{type:'sigh',w:3},{type:'break',w:1.5},{type:'phone',w:1.2}];
  if(o.rulesLeft.length&&o.turn>=1)opts.push({type:'rule',w:moodOn('memo')?6:3});
  if(o.turn>=1&&o.rows.some(r=>r.done&&!r.ft1p&&!r.bribed))opts.push({type:'reject',w:moodOn('picky')?3.2:1.6});
  const ex=cur().intents||{};
  if(ex.certify&&o.turn>=1&&o.rows.some(certOk))opts.push({type:'certify',w:ex.certify});
  if(ex.stale&&o.turn>=1&&o.rows.some(staleOk))opts.push({type:'stale',w:ex.stale});
  if(ex.system)opts.push({type:'system',w:ex.system});
  // v30: Traces make clerks ask around about you (not at the very first office)
  if((S.traces||0)>0&&(S.chapter>0||S.officeIdx>0))opts.push({type:'askaround',w:.9*S.traces});
  let t=Math.random()*opts.reduce((s,x)=>s+x.w,0),pick=opts[0];
  for(const x of opts){t-=x.w;if(t<=0){pick=x;break}}
  const it={type:pick.type,dmg};
  if(it.type==='break')it.dmg=Math.max(1,dmg-1);
  if(it.type==='sigh'||it.type==='break'){if(moodOn('nosleep'))it.dmg+=2;if(moodOn('birthday'))it.dmg=Math.max(1,it.dmg-2)}
  if(it.type==='askaround')it.dmg=2*S.traces;
  if(it.type==='certify'){const r=rnd(o.rows.filter(certOk));it.row=o.rows.indexOf(r);it.doc=r.doc}
  if(it.type==='stale'){const r=rnd(o.rows.filter(staleOk));it.row=o.rows.indexOf(r);it.doc=r.doc;it.max=r.max==null?4:Math.max(0,r.max-2)}
  return it;
}
// The words for a clerk's next move, worked out when shown (so they follow the language setting).
function intentLabel(it){
  const o=S.office;let name='',effect='';
  switch(it.type){
    case 'sigh':name=L`Sighs loudly`;effect=L`−${it.dmg} patience`;break;
    case 'rule':{const d=cur(),i=d.rules.length-o.rulesLeft.length,told=S.heard[S.officeIdx]&&S.heard[S.officeIdx].includes('r'+i);
      name=L`Remembers a new rule`;effect=told?L`+1 item on the form (you heard about it)`:L`+1 item on the form, −1 patience`;break}
    case 'reject':name=L`"This one is not valid"`;effect=L`Un-ticks one item`;break;
    case 'break':name=L`Coffee break`;effect=L`−${it.dmg} patience, −1 time next turn`;break;
    case 'phone':name=L`Personal phone call`;effect=L`Nothing happens`;break;
    case 'certify':name=L`"This must be certified"`;effect=L`${DOCS[it.doc].name}: a plain copy won't do`;break;
    case 'stale':name=L`"This one is too old"`;effect=L`${DOCS[it.doc].name}: ${maxLabel(it.max)}`;break;
    case 'system':name=L`"The system is down"`;effect=L`−1 time next turn`;break;
    case 'askaround':name=L`Asks around about you`;effect=L`−${2*(S.traces||0)} patience (2 per Trace), then −1 Trace`;break;
    case 'yawn':name=L`Yawns loudly`;effect=L`−${it.dmg} patience`;break;
    case 'tail':name=L`Chases his own tail`;effect=L`Nothing happens`;break;
  }
  return {name,effect};
}
function loseP(n){if(S.tut)n=Math.min(n,S.patience-1);if(n<=0)return;S.patience=Math.max(0,S.patience-n);if(S.patience<=0&&S.screen!=='end'){S.screen='end';S.result='lose';S.overlays=[];S.target=null;S.confirm=null;runEnded()}}
function hit(n){if(hasRelic('thickskin'))n=Math.max(0,n-1);loseP(n);return n}
function pileCards(){const o=S.office;return [...o.hand,...o.draw,...o.discard].map(C)}
function inFolder(r){return pileCards().some(c=>accepts(r,c))}
function rowFor(c){const rs=S.office.rows.filter(r=>!r.done&&accepts(r,c));return rs.find(r=>r.form===c.form)||rs[0]}
function argueRow(){const rs=S.office.rows.filter(r=>r.added&&!r.done);return rs[rs.length-1]}
function handHas(f){return S.office.hand.some(u=>f(C(u)))}
const isOriginalCopyable=c=>c.kind==='doc'&&c.form==='original'&&!DOCS[c.doc].single;
const isCopy=c=>c.kind==='doc'&&c.form==='copy';
// Which cards in your hand an armed action can be used on.
function tgtOk(tg,c){if(tg.type==='original')return isOriginalCopyable(c);if(tg.type==='copy')return isCopy(c);
  if(tg.type==='dated')return C(tg.src).key==='reissue'?canReissue(c):canBackdate(c);return false}

function canPlay(c){
  const o=S.office;
  if(c.kind==='doc')return !o.lunch&&!!rowFor(c);
  if(patCost(c)>=S.patience)return false;
  switch(c.key){
    case 'photocopy':if(moodOn('nocopier'))return false;return handHas(isOriginalCopyable);
    case 'backdoor':return handHas(isOriginalCopyable);
    case 'notary':return handHas(isCopy);
    case 'reissue':return handHas(canReissue);
    case 'backdate':return handHas(canBackdate);
    case 'envelope':return !moodOn('noenvelope')&&o.rows.some(r=>!r.done);
    case 'argue':return !!argueRow();
    case 'friend':return !!nextTip();
    case 'citelaw':return (S.moods[S.officeIdx]||[]).some(k=>!sigMood(k)&&!(o.cancelled||[]).includes(k));
    case 'tabbed':return true;
    case 'callfavour':return (S.favours||0)>=3&&!moodOn('noenvelope')&&o.rows.some(r=>!r.done);
    case 'knowsme':return (S.favours||0)>=2&&o.rows.some(r=>!r.done);
    case 'bigenvelope':return !moodOn('noenvelope')&&o.rows.some(r=>!r.done);
    case 'lostmail':return !!argueRow();
    case 'cleanrecord':return (S.traces||0)>0;
    case 'burek':case 'smalltalk':return (S.favours||0)<FAVOUR_MAX||c.key==='smalltalk';
  }
  return true;
}
function whyNot(c){
  if(c.kind==='doc'&&S.office.lunch)return L`Lunch break: the window is shut. Papers next turn.`;
  if(c.kind==='doc'&&wetInk(c)&&S.office.rows.some(r=>!r.done&&r.doc===c.doc))return L`"The ink is still wet." ${DOCS[c.doc].name} is dated today, and today that doesn't count here.`;
  if(c.kind==='doc'&&c.form==='copy'&&moodOn('originals')&&S.office.rows.some(r=>!r.done&&r.doc===c.doc))return L`"A copy? Today? No." Only a certified copy counts here.`;
  if(c.kind==='doc')return L`Nobody here asked for ${docName(c.doc,c.form)}.`;
  if(c.key==='photocopy'&&moodOn('nocopier'))return L`"The copier is broken." No photocopies at this office.`;
  if(c.key==='envelope'&&moodOn('noenvelope'))return L`Not today. [[He|She]] just came back from the director's office.`;
  if(patCost(c)>=S.patience)return L`You don't have the nerves for that right now.`;
  if(c.key==='photocopy'||c.key==='backdoor')return L`You need an original document in your hand first.`;
  if(c.key==='notary')return L`You need a copy in your hand to notarize.`;
  if(c.key==='reissue')return L`You need a document in your hand that was issued before today.`;
  if(c.key==='backdate')return L`You need a dated document in your hand.`;
  if(c.key==='argue')return L`There is no new rule to argue about.`;
  if(c.key==='friend')return L`Your friend has told you everything there is to know.`;
  if(c.key==='citelaw')return L`There is no mood here the law can cancel.`;
  if((c.key==='callfavour'||c.key==='bigenvelope')&&moodOn('noenvelope'))return L`Not today. [[He|She]] just came back from the director's office.`;
  if(c.key==='callfavour')return L`You need at least 3 Favours.`;
  if(c.key==='knowsme')return L`You need at least 2 Favours.`;
  if(c.key==='lostmail')return L`No new rule to lose in the mail.`;
  if(c.key==='cleanrecord')return L`Your record is already clean.`;
  if(c.key==='burek')return L`Everyone already owes you all they can.`;
  return L`Not now.`;
}
function removeFromHand(uid){const o=S.office;o.hand.splice(o.hand.indexOf(uid),1)}
function handIn(c,r){
  const o=S.office,d=cur();removeFromHand(c.uid);r.done=true;o.fresh=o.rows.indexOf(r);if(moodOn('prepared'))heal(2);
  if(o.completeFile&&++o.fileTicks%3===0)heal(5);
  if(keeps(c,r)){S.deck=S.deck.filter(u=>u!==c.uid);
    S.log=r.form==='alt'&&c.form==='original'?L`${clerkName(d)} files your original ${DOCS[c.doc].name}. It's gone for good.`:L`${clerkName(d)} files your ${docName(c.doc,c.form)}. You won't see it again.`}
  else{o.discard.push(c.uid);S.log=L`${clerkName(d)} glances at your ${DOCS[c.doc].name} and hands it back.`}
  afterRows();
}
function useAction(c,tgt){
  const o=S.office,d=cur(),a=ACTIONS[c.key];
  const pc=patCost(c);if(c.key==='cousin'&&isChar('fixer')&&!pc)gainFavour(-1);if(c.key==='envelope'&&hasTrinket('dmbill'))S.dmUsed=true;
  removeFromHand(c.uid);loseP(pc);if(S.screen==='end')return;
  if(TRACE_COST[c.key])addTraces(TRACE_COST[c.key]);
  if(a.burn)S.deck=S.deck.filter(u=>u!==c.uid);else (a.once?o.exhaust:o.discard).push(c.uid);
  switch(c.key){
    case 'wait':{let n=0;while(n<3){const b=o.hand.length;drawN(1);if(o.hand.length===b)break;n++;const x=C(o.hand[o.hand.length-1]);if(x.kind==='doc'&&rowFor(x))break}
      loseP(1);S.log=L`The queue moves. Barely. You dig until something useful turns up.`;break}
    case 'breath':S.patience=Math.min(S.maxP,S.patience+3);S.log=L`In for four. Out for four.`;break;
    case 'smile':drawN(1);o.keepBonus=(o.keepBonus||0)+2;S.log=L`${clerkName(d)} does not smile back. You use the moment to dig through your papers.`;break;
    case 'rulebook':if(RULEISH.has(o.intent.type)){o.skipIntent=true;S.log=L`You quote the regulation, article and paragraph. [[He|She]] lets it go.`}else{o.guard=true;S.log=L`You keep the rulebook open on the counter.`}break;
    case 'photocopy':{const sp=o.stampCopies>0?(o.stampCopies--,true):false;const n=addToDeck(mkDoc(tgt.doc,sp?'certified':'copy',{issued:sp?S.day:tgt.issued,noexp:tgt.noexp}));o.hand.push(n.uid);S.log=L`Copy of ${DOCS[tgt.doc].name} added to your hand. It stays in your cards.`;break}
    case 'backdoor':{const n=addToDeck(mkDoc(tgt.doc,'certified'));o.hand.push(n.uid);S.log=L`The notary owes you one. Certified copy of ${DOCS[tgt.doc].name}, dated today, no questions.`;break}
    case 'notary':tgt.form='certified';tgt.issued=S.day;if(hasRelic('notaryneighbor'))tgt.noexp=true;S.log=L`Your copy of ${DOCS[tgt.doc].name} is now certified, dated today.`;break;
    case 'reissue':tgt.issued=S.day;S.log=L`A fresh ${DOCS[tgt.doc].name}, dated today. Same paper, new date, new fee.`;break;
    case 'backdate':tgt.noexp=true;S.log=L`Someone adjusts the date on your ${DOCS[tgt.doc].name}. It will never be too old again.`;break;
    case 'envelope':tgt.done=true;tgt.bribed=true;o.fresh=o.rows.indexOf(tgt);S.stats.bribes++;S.log=L`A small envelope changes hands. Your wallet feels lighter. Your conscience too, somehow.`;return afterRows();
    case 'coffee':o.skipIntent=true;if(moodOn('coffee'))drawN(1);S.log=L`${clerkName(d)} accepts the coffee. "Just this once."`;break;
    case 'cousin':o.skipIntent=true;drawN(2);S.log=L`Your cousin knows a guy who knows [[his|her]] supervisor.`;break;
    case 'argue':{const r=argueRow();o.rows.splice(o.rows.indexOf(r),1);loseP(4);S.log=L`You win the argument. It costs you.`;if(S.screen==='end')return;return afterRows()}
    case 'number':o.turnsLeft++;S.log=L`Ticket 247. Now serving: 231. The window stays open one turn longer for you today.`;break;
    case 'friend':drawN(1);hearTip();break;
    case 'citelaw':{const ks=(S.moods[S.officeIdx]||[]).filter(k=>!sigMood(k));o.cancelled=[...(o.cancelled||[]),...ks];S.log=L`You cite the law, article and paragraph. Today's mood no longer applies to you.`;break}
    case 'tabbed':{let got=false;const want=x=>x.kind==='doc'&&!!rowFor(x);
      for(const f of [want,x=>x.kind==='doc'])for(const pile of [o.draw,o.discard])for(let i=pile.length-1;i>=0&&!got;i--)if(f(C(pile[i]))){o.hand.push(pile.splice(i,1)[0]);got=true}
      S.redrawing=[];S.swapSrc='tabbed';S.log=L`Colour-coded tabs. Now tap the cards you want to swap, then Swap.`;break}
    case 'stamppad':o.stampCopies=(o.stampCopies||0)+2;S.log=L`You ink your own stamp pad. Do not ask where you got it.`;break;
    case 'completefile':o.completeFile=true;o.fileTicks=0;S.log=L`Everything in order, in plastic sleeves. The clerk is unsettled.`;break;
    case 'smalltalk':gainFavour(1);drawN(1);S.log=L`You ask about the clerk's son in Germany. You now owe each other.`;break;
    case 'burek':gainFavour(2);S.log=L`A warm burek on the counter. The whole office knows your name now.`;break;
    case 'callfavour':gainFavour(-3);tickFree(tgt,'favour');S.stats.favours=(S.stats.favours||0)+1;S.log=L`One phone call. "Of course, for you."`;return afterRows();
    case 'knowsme':{const n=Math.floor((S.favours||0)/2);gainFavour(-(S.favours||0));shuffle(o.rows.filter(r=>!r.done)).slice(0,n).forEach(r=>tickFree(r,'favour'));S.log=L`Everyone here knows you. Items tick themselves.`;return afterRows()}
    case 'bigenvelope':{S.stats.bribes++;const rs=shuffle(o.rows.filter(r=>!r.done)).slice(0,2);rs.forEach(r=>tickFree(r,'bribed'));S.log=L`A thick envelope. The clerk weighs it in [[his|her]] hand and nods twice.`;return afterRows()}
    case 'lostmail':{const r=argueRow();o.rows.splice(o.rows.indexOf(r),1);S.log=L`That new rule? The memo seems to have been lost in the mail.`;return afterRows()}
    case 'cleanrecord':addTraces(-2);S.log=L`A friend in the archive loses a folder. Your record looks cleaner.`;break;
  }
}
/* ============ tips: "My Friend Went Last Week" ============
   Each office has hidden needs: its "Ah, I almost forgot" rules (in a fixed order) and maybe an FT1P paper.
   S.heard[officeIndex] lists what you've been told: 'r0','r1' = rule 1/2, 'ft' = the FT1P paper (or that there is none). */
const needLabel=(doc,form)=>DOCS[doc].fee?DOCS[DOCS[doc].fee].name:docName(doc,form);
function rulesUsed(idx){return idx===S.officeIdx&&S.office?OFFICES[idx].rules.length-S.office.rulesLeft.length:0}
// The next thing a friend can tell you: this office first, then the next one.
function nextTip(){
  for(const idx of [S.officeIdx,S.officeIdx+1]){
    const d=OFFICES[idx];if(!d)continue;const h=S.heard[idx],here=idx===S.officeIdx&&S.office;
    if(!here&&moodHidden(idx))return {idx,key:'m'};
    for(let i=rulesUsed(idx);i<d.rules.length;i++)if(!h.includes('r'+i))return {idx,key:'r'+i};
    if(!h.includes('ft')&&!(here&&S.office.ft1pRolled))return {idx,key:'ft'};
  }
  return null;
}
// What you've heard about an office and that hasn't happened yet: [{doc,form,key}] (+{none:true} for "no strange paper").
function heardPending(idx){
  const d=OFFICES[idx],here=idx===S.officeIdx&&S.office;
  return S.heard[idx].map(k=>{
    if(k==='m')return null;
    if(k==='ft'){if(here&&S.office.ft1pRolled)return null;return S.ftPlan[idx]?{doc:d.ft1p,form:'original',key:k,ft1p:true}:{none:true,key:k}}
    const i=+k.slice(1);if(i<rulesUsed(idx))return null;const [doc,form]=d.rules[i];return {doc,form,key:k};
  }).filter(Boolean);
}
// A card in your hand is worth keeping if a friend said this clerk will ask for it.
function isHeardCard(c){return c.kind==='doc'&&!!S.office&&heardPending(S.officeIdx).some(x=>!x.none&&accepts(x,c))}
function hearTip(){
  const t=nextTip();if(!t)return;
  S.heard[t.idx].push(t.key);
  const d=OFFICES[t.idx],here=t.idx===S.officeIdx,who=clerkName(d);
  let text;
  LG(d,()=>{
  if(t.key==='m'){const k=S.moods[t.idx][S.moods[t.idx].length-1];text=L`"Watch out at the ${d.full}. ${who}: ${L(MOODS[k].title)}" ${L(MOODS[k].text)}`}
  else if(t.key==='ft')text=S.ftPlan[t.idx]
    ?L`"Right at the end, when [[he|she]] was nearly done, ${who} asked my friend for a ${DOCS[d.ft1p].name}. Nobody had ever heard of it. Get one before [[he|she]] asks."`
    :L`"No strange papers at the ${d.full}. Just the usual. ${who} is strict, but normal."`;
  else{const [doc,form]=d.rules[+t.key.slice(1)];
    text=here?L`"My friend was at ${d.window} last week. Suddenly ${who} 'remembered' [[he|she]] also needs your ${needLabel(doc,form)}. Keep it on you."`
             :L`"Going to the ${d.full} next? ${who} will want your ${needLabel(doc,form)} as well. Don't use up your last one here."`}});
  S.overlays.push({head:here?L`Heard in the queue`:L`Heard about the ${d.full}`,stamp:L`Tip`,violet:true,text});
  S.log=L`A friend of a friend knows how it goes here.`;
}

// Copies you made this office stay in your hand until you use them; everything else is discarded at end of turn.
function ownedDocs(){return [...S.deck,...(S.bag||[])].map(C).filter(c=>c.kind==='doc')}
// End of turn: you always pick which cards to keep (0 to KEEP_MAX); the rest are discarded. Keeping none redraws a fresh hand.
function requestEndTurn(){
  const o=S.office;S.target=null;S.confirm=null;S.redrawing=null;
  if(!o.hand.length)return endTurn([]);
  S.keeping=[];
}
function toggleSwap(uid){const k=S.redrawing,i=k.indexOf(uid);if(i>=0)k.splice(i,1);else k.push(uid)}
// v31: swapping cards comes from Grandma's shopping bag (once per office), Tabbed Folder or the priority ticket.
const canBagSwap=()=>!!S.office&&!S.tut&&hasTrinket('bag')&&!S.office.bagUsed;
function startSwap(src){S.redrawing=[];S.swapSrc=src;S.target=null;S.confirm=null}
function cancelSwap(){S.redrawing=null;S.swapSrc=null}
function doRedraw(){const o=S.office,sel=S.redrawing.filter(u=>o.hand.includes(u)),src=S.swapSrc;S.redrawing=null;S.swapSrc=null;if(!sel.length)return;
  if(src==='bag'){if(!canBagSwap())return;o.bagUsed=true}
  o.hand=o.hand.filter(u=>!sel.includes(u));S.stats.redraws=(S.stats.redraws||0)+1;drawN(sel.length);o.discard.push(...sel);
  S.log=L`You dig through your bag and swap ${sel.length} [[0:card|cards]].`}
function toggleKeep(uid){const k=S.keeping,i=k.indexOf(uid);if(i>=0)k.splice(i,1);else if(k.length<keepMax())k.push(uid)}
function afterRows(){
  const o=S.office,d=cur(),left=o.rows.filter(r=>!r.done).length;
  if(left===0)return officeDone();
  bossCheck();
  if(left===1&&!o.ft1pRolled){
    o.ft1pRolled=true;
    if(!S.ftPlan[S.officeIdx])return;
    const told=S.heard[S.officeIdx].includes('ft');
    o.ft1pFired=true;S.stats.ft1p=(S.stats.ft1p||0)+1;o.rows.push({doc:d.ft1p,form:'original',ft1p:true});
    S.overlays.push({stamp:'Fali ti jedan papir',text:told?L`"You're missing one paper." ${clerkName(d)} also needs your ${DOCS[d.ft1p].name}. Exactly like your friend said.`:L`"You're missing one paper." ${clerkName(d)} also needs your ${DOCS[d.ft1p].name}. You have never heard of this document.`,
      hint:L`Tap "Go get it" next to it on the form, or slip [[him|her]] a Small Envelope.`});
    if(hasRelic('insider')){drawN(2);o.turnsLeft++;S.log=L`Your friend inside slips you a tip. The window stays open one turn longer today.`}
  }
}
function endTurn(keep){
  const o=S.office,d=cur();
  S.target=null;S.confirm=null;S.keeping=null;S.redrawing=null;S.swapSrc=null;
  keep=(keep||[]).filter(u=>o.hand.includes(u)).slice(0,keepMax());o.keepBonus=0;
  o.discard.push(...o.hand.filter(u=>!keep.includes(u)));o.hand=keep;
  if(o.pendingPaper){o.hand.push(o.pendingPaper);o.pendingPaper=null}
  const it=o.intent;
  if(o.guard&&RULEISH.has(it.type))o.skipIntent=true;
  o.guard=false;
  const who=clerkName(d),head=L`${who}'s turn`;let ann;
  if(o.skipIntent){o.skipIntent=false;ann={head,stamp:L`Blocked`,violet:true,text:L`${who} was about to act (${lc(intentLabel(it).name)}), but didn't.`}}
  else if(o.skipN>0){o.skipN--;ann={head,stamp:L`Blocked`,violet:true,text:L`${who} is in a very good mood after the rakija.`+' '+(o.skipN?L`One more turn of peace.`:L`It is wearing off.`)}}
  else if(it.type==='rule'&&hasTrinket('partycard')&&!S.partyUsed&&o.rulesLeft.length){S.partyUsed=true;o.rulesLeft.shift();
    ann={head,stamp:L`Blocked`,violet:true,text:L`${who} starts on a new rule. You lay your old party card on the counter. ${who} looks at it for a long time, and the rule quietly doesn't apply to you.`}}
  else switch(it.type){
    case 'sigh':{const t=hit(it.dmg);ann={head,stamp:L`−${t} patience`,text:L`${who} sighs loudly, looks at the clock, and sighs again.`};break}
    case 'rule':{const i=d.rules.length-o.rulesLeft.length,told=S.heard[S.officeIdx].includes('r'+i);const [doc,form,max]=o.rulesLeft.shift();o.rows.push({doc,form,max:moodMax(doc,max),added:true,told});
      if(told)ann={head,stamp:L`New rule`,violet:true,text:L`"Ah, I almost forgot. You also need: ${docName(doc,form)}." "I know," you say. Your friend warned you, so it doesn't get to you. It's on the form now.`};
      else{loseP(1);ann={head,stamp:L`New rule`,violet:true,text:L`"Ah, I almost forgot." You also need: ${docName(doc,form)}. It's on the form now. −1 patience.`}}
      break}
    case 'reject':{const rs=o.rows.filter(r=>r.done&&!r.ft1p&&!r.bribed&&!r.paid);if(rs.length){const r=rnd(rs);r.done=false;ann={head,stamp:L`Un-ticked`,violet:true,text:(isFeeRow(r)?L`"This fee stamp is from the old series."`:L`"This ${DOCS[r.doc].name} is the old format."`)+' '+L`That item is no longer ticked. Hand in another one.`}}else ann={head,stamp:L`Nothing`,violet:true,text:L`${who} looks for a problem and, for once, finds none.`};break}
    case 'break':{const t=hit(it.dmg);o.handPenalty=1;ann={head,stamp:L`−${t} patience`,text:L`"Back in fifteen minutes." It takes forty. You also draw 1 card less next turn.`};break}
    case 'phone':ann={head,stamp:L`Nothing`,violet:true,text:L`A long phone call about a cousin's wedding. You wait. Nothing else happens.`};break;
    case 'certify':{const r=intentRow(it,certOk);if(r){r.form='certified';r.stricter=true;
      ann={head,stamp:L`Stricter`,violet:true,text:L`"A plain copy? No, no. ${DOCS[r.doc].name}, certified." That line now needs a certified copy.`}}
      else ann={head,stamp:L`Nothing`,violet:true,text:L`${who} looks for something to make stricter and, for once, finds nothing.`};break}
    case 'stale':{const r=intentRow(it,staleOk);if(r){r.max=r.max==null?4:Math.max(0,r.max-2);r.stricter=true;
      ann={head,stamp:L`Stricter`,violet:true,text:L`"This ${DOCS[r.doc].name} is too old." That line now wants one ${maxLabel(r.max)}.`}}
      else ann={head,stamp:L`Nothing`,violet:true,text:L`${who} squints at the dates and, for once, finds nothing.`};break}
    case 'yawn':{const t=hit(it.dmg);ann={head,stamp:L`−${t} patience`,text:L`Žućko yawns so wide that his hat falls off. He puts it back on, very officially.`};break}
    case 'tail':ann={head,stamp:L`Nothing`,violet:true,text:L`Žućko chases his own tail around the swivel chair. Three times. Then he sits down as if nothing happened.`};break;
    case 'askaround':{const t=hit(2*(S.traces||0));addTraces(-1);ann={head,stamp:L`−${t} patience`,text:L`${who} makes a phone call about you, looking straight at you. Someone has been talking. One Trace fades.`};break}
    case 'system':o.handPenalty=1;ann={head,stamp:L`System down`,violet:true,text:L`The screen freezes. Everyone waits for "the IT guy". You draw 1 card less next turn.`};break;
  }
  ann.clerk=true;
  S.log=`${ann.stamp}: ${ann.text}`;
  if(S.screen==='end')return;
  ann.itype=it.type;S.overlays.push(ann);
  o.turnsLeft--;
  if(o.turnsLeft<=0){closeDay();if(S.screen==='end')return;
    S.overlays.push({head:L`End of the day`,stamp:L`Closed`,violet:true,text:L`The window closes at 15:00 sharp. Come back tomorrow (day ${S.day}). −${S.lastClose} patience. Ticked items still count, but all your papers are a day older.`+' '+L`Another day here will cost ${closeCost()}.`});
  }
  if(S.screen==='end')return;
  o.intent=rollIntent();startTurn();
}
// v31: closing time grows the longer you linger at one office: −5, −8, −11… (Working hours +5, wall calendar −3).
function closeCost(){const o=S.office;return Math.max(0,5+3*((o&&o.closings)||0)+(reformOn(6)?5:0)-(hasTrinket('calendar')?3:0))}
function closeDay(){const o=S.office,close=closeCost();S.lastClose=close;S.stats.closings=(S.stats.closings||0)+1;o.closings=(o.closings||0)+1;
  o.turnsLeft=officeTurns();o.turn=0;loseP(close);if(S.screen==='end')return;newDay()}
function officeDone(){
  if(S.tut)return tutFinish();
  const d=cur();S.target=null;S.confirm=null;
  S.deck=S.deck.filter(u=>!C(u).temp);
  if(d.name==='Registry')unlock('stampbox');
  if(d.name==='Tax Office')unlock('notebook');
  if(isChar('fixer'))gainFavour(1);
  addTraces(-1); // people forget a little between offices
  if(isBoss(d)){
    if(lastChapter()){S.screen='end';S.result='win';runEnded();return}
    chapterCleared();S.chapterEnd=true;
    S.screen='reward';S.choices=rewardCards(3);return}
  addToDeck(mkDoc(d.reward,'original'));
  const notOwned=STRANGE.filter(x=>!ownedDocs().some(c=>c.doc===x)&&OFFICES.slice(S.officeIdx+1).some(o=>o.ft1p===x));
  const docPick=notOwned.length&&Math.random()<0.6?mkDoc(rnd(notOwned)):mkDoc(rnd(futureWants().length?futureWants():[...STAMPS,'photo','birth','utility']));
  S.screen='reward';S.choices=[...rewardCards(2),docPick.uid];
}
// v30: reward cards lean on play styles: one from your character's style, the others from the rest, all different.
// Cards still locked (LOCKED_CARDS not yet in META.cards) are never offered.
function rewardCards(n){
  if(reformOn(9))n=Math.max(1,n-1);
  const pool=REWARD_POOL.filter(k=>!LOCKED_CARDS.includes(k)||META.cards.includes(k)),mine=curChar().style,out=[];
  const pick=f=>{const k=shuffle(pool.filter(x=>!out.includes(x)&&f(x)))[0];if(k)out.push(k)};
  pick(k=>CARD_STYLE[k]===mine);
  ['book','conn','shady'].filter(x=>x!==mine).sort(()=>Math.random()-.5).forEach(st=>{if(out.length<n)pick(k=>CARD_STYLE[k]===st)});
  while(out.length<n)pick(()=>true);
  return out.slice(0,n).map(k=>mkAct(k).uid);
}
const sigMood=k=>{const d=cur();return !!(d&&d.boss&&BOSSES[d.boss].sig===k)};

/* ============ strange papers: straight from your bag ============ */
function fromBag(i){const o=S.office,r=o.rows[i];if(!r||r.done)return;const c=bagDocs().find(c=>c.doc===r.doc);if(!c)return;
  S.bag=S.bag.filter(u=>u!==c.uid);r.done=true;o.fresh=i;S.target=null;S.confirm=null;S.redrawing=null;if(moodOn('prepared'))heal(2);
  S.log=L`You pull the ${DOCS[r.doc].name} out of your bag. ${clerkName(cur())} looks at it for a long time, then files it.`;afterRows()}
/* ============ paying a fee at the bank (costs the rest of your turn) ============ */
function payAtBank(i){
  const o=S.office,r=o.rows[i];if(!r||r.done||!isFeeRow(r))return;
  r.done=true;r.paid=true;o.fresh=i;S.stats.paid++;S.target=null;S.confirm=null;
  S.overlays.push({head:L`Bank, two streets away`,stamp:L`Paid`,violet:true,text:L`You queue at the bank, pay the fee, and come back with a stamped payment slip. The rest of your turn is gone.`});
  afterRows();
  if(S.screen==='office')requestEndTurn();
}

/* ============ errands (leaving the window) ============ */
function errandFor(r){
  const key=r.ft1p?r.doc:DOCS[r.doc].single?r.doc:r.form==='original'?'any':'copy';
  const getForm=r.form==='alt'||(r.form==='copy'&&moodOn('originals'))?'certified':r.form;
  return {...PLACES[key]||PLACES.any,get:docName(r.doc,getForm),doc:r.doc,form:getForm};
}
// v31: an errand takes the rest of the day. You come back tomorrow with the paper: closing time hits
// (patience, growing each day) and every paper you own is a day older. The clerk doesn't act: you weren't there.
function goErrand(){
  const o=S.office,r=o.rows[S.pending];if(!r||r.done){S.screen='office';return}
  const e=errandFor(r);
  S.target=null;S.confirm=null;S.keeping=null;S.redrawing=null;S.swapSrc=null;
  closeDay();if(S.screen==='end')return;
  const strange=STRANGE.includes(e.doc),c=mkDoc(e.doc,e.form,moodOn('wetink')?{issued:S.day-1}:{});
  S.stats.detours++;if(strange)S.bag.push(c.uid);else{addToDeck(c);o.hand.push(c.uid)}S.screen='office';
  S.overlays.push({head:e.place,stamp:L`Obtained`,violet:true,text:e.text+' '+L`By the time you're back, the window is closed. You return the next morning (day ${S.day}). −${S.lastClose} patience, and all your papers are a day older.`+' '+(strange?L`${e.get} is in your bag: hand it over from the form.`:L`${e.get} is in your hand.`)});
  o.intent=rollIntent();startTurn();
}
function backToWindow(){const o=S.office,d=cur();o.intent=rollIntent();startTurn();S.screen='office';S.log=L`Next morning, back at ${d.window}. ${clerkName(d)} does not remember you.`}
