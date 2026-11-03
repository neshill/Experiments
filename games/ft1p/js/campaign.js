/* ============ v30: chapters, bosses, characters, Favours and Traces ============
   A run is three chapters (CHAPTER_ORDER). Each chapter has its own offices, forms, moods, map and tips; your cards,
   patience, bag, Favours and Traces carry over. Between chapters years pass: papers age, you get the new chapter's
   papers and recover some patience. */
function setChapter(i){
  S.chapter=i;CHAPTER=CHAPTERS[CHAPTER_ORDER[i]];
  OFFICES.length=0;OFFICES.push(...CHAPTER.offices);
}
// Rolls everything that is new each chapter. Called by newRun() and startNextChapter().
function rollChapter(){
  S.officeIdx=0;S.office=null;S.mapSel=null;
  S.ftPlan=OFFICES.map(()=>Math.random()<FT1P_CHANCE);S.heard=OFFICES.map(()=>[]);
  S.moods=rollMoods();S.forms=rollForms(S.moods);applyForms();
  S.citySeed=Math.floor(Math.random()*2**31);if(typeof cityCache!=='undefined')cityCache=null;
  S.map=makeMap();S.chapterEnd=false;
}
// The papers of a chapter, issued a few days before it starts.
function chapterPapers(){const old=()=>({issued:S.day-Math.floor(Math.random()*4),start:true});
  (CHAPTER.start||[]).forEach(([doc,form])=>addToDeck(mkDoc(doc,form,old())))}
// The starting deck: the shared one, changed by the character.
const BASE_DECK=['wait','wait','breath','smile','photocopy','photocopy','notary','reissue','rulebook','envelope','friend'];
function startingDeck(ch){
  const old=()=>({issued:1-Math.floor(Math.random()*4),start:true});
  [mkDoc('id','original',{start:true}),mkDoc('birth','original',old()),mkDoc('birth','original',old()),mkDoc('utility','original',old()),
   mkDoc('stamp_mun'),mkDoc('stamp_fed'),mkDoc('stamp_fed'),mkDoc('stamp_adm'),mkDoc('photo'),mkDoc('photo')].forEach(addToDeck);
  const acts=BASE_DECK.slice(),C_=CHARACTERS[ch]||CHARACTERS.student;
  (C_.remove||[]).forEach(k=>{const i=acts.indexOf(k);if(i>=0)acts.splice(i,1)});
  acts.push(...(C_.add||[]));if(hasTrinket('bookmark'))acts.push('citelaw');
  acts.forEach(k=>addToDeck(mkAct(k)));
}
const curChar=()=>CHARACTERS[S.char]||CHARACTERS.student;
const isChar=k=>S&&S.char===k;
const isBoss=d=>!!(d&&d.boss);
const lastChapter=()=>S.chapter>=CHAPTER_ORDER.length-1;

/* ---------- bosses ---------- */
// Halfway through the form (counting lines ticked), the boss's second phase starts. Once per boss office.
function bossCheck(){
  const o=S.office,d=cur();if(!isBoss(d)||o.phase2||S.tut)return;
  const base=o.rows.filter(r=>!r.ft1p),done=base.filter(r=>r.done).length;
  if(done<Math.ceil(base.length/2)||done>=base.length)return;
  o.phase2=true;const B=BOSSES[d.boss];
  if(d.boss==='reprint'){
    const have=new Set(o.rows.map(r=>r.doc)),pool=[...CHAPTER.plain,...OFFICES.slice(0,S.officeIdx).map(x=>x.reward).filter(Boolean)];
    const fresh=()=>{const opts=shuffle(pool).map(x=>x==='fee'?rnd(FEES):x).filter(x=>!have.has(x));const doc=opts[0]||rnd(PLAIN_DOCS_ALL);have.add(doc);const [dd,f,m]=randLine(doc);return {doc:dd,form:f,max:moodMax(dd,m),done:false,reprinted:true}};
    o.rows=o.rows.map(r=>r.done||r.ft1p?r:fresh());o.rows.push({...fresh(),added:true});
  }else if(d.boss==='migration'){
    o.migrate=2;o.rows.forEach(r=>{if(!r.done&&!isFeeRow(r)&&!DOCS[r.doc].single&&r.doc!=='id'){r.max=r.max==null?3:Math.min(r.max,3);r.stricter=true}});
  }else if(d.boss==='newchair'){
    const rs=o.rows.filter(r=>r.done&&!r.ft1p&&!r.bribed&&!r.paid);if(rs.length)rnd(rs).done=false;
    const have=S.moods[S.officeIdx],opts=Object.keys(MOODS).filter(k=>!MOODS[k].good&&!have.includes(k)&&!MOOD_CLASH.some(([a,b])=>have.includes(a)&&k===b||have.includes(b)&&k===a));
    if(opts.length){const k=rnd(opts);have.push(k);o.newMood=k}
  }
  const extra=o.newMood?' '+LG(d,()=>L`New mood: ${L(MOODS[o.newMood].title)} ${L(MOODS[o.newMood].text)}`):'';
  S.overlays.push({head:LG(d,()=>clerkName(d)),stamp:L`Second phase`,violet:true,text:L(B.text)+extra,clerk:true});
}

/* ---------- Favours (Connections) and Traces (Shady), both kept all run ---------- */
function gainFavour(n){const before=S.favours||0;S.favours=Math.max(0,Math.min(FAVOUR_MAX,before+n));return S.favours-before}
const TRACE_COST={envelope:1,coffee:1,backdoor:1,backdate:1,bigenvelope:2,lostmail:1};
function addTraces(n){S.traces=Math.max(0,Math.min(TRACE_MAX,(S.traces||0)+n))}
// Ticks one item without a document (envelopes, favours). Returns false when nothing is left to tick.
function tickFree(r,how){const o=S.office;if(!r||r.done)return false;r.done=true;r[how]=true;o.fresh=o.rows.indexOf(r);return true}

/* ---------- character select and reform level ---------- */
function charOpen(k){const u=CHARACTERS[k].unlock;if(!u)return true;return k==='fixer'?(META.best||0)>=1:k==='returnee'?(META.best||0)>=2:false}
function reformOpen(k){return Math.min(REFORM_MAX,(META.reform&&META.reform[k])||0)}
function pickChar(k){if(!charOpen(k))return;META.char=k;META.level=Math.min(META.level||0,reformOpen(k));saveMeta()}
function stepReform(dv){const k=META.char||'student';META.level=Math.max(0,Math.min(reformOpen(k),(META.level||0)+dv));saveMeta()}

/* ---------- between chapters ---------- */
// After a boss: unlocks, then the card reward, then the chapter screen.
function chapterCleared(){
  const n=S.chapter+1;META.best=Math.max(META.best||0,n);S.cleared=n;
  if(S.chapter===1){unlock('folder');unlock('flask');if(META.slots<2){META.slots=2;S.unlockedNow.push('slot')}}
  if(isChar('fixer'))unlock('rolodex');
  if(isChar('student'))unlock('bookmark');
  saveMeta();
}
function startNextChapter(){
  const heal_=reformOn(7)?10:25;
  setChapter(S.chapter+1);S.day+=7;heal(heal_);
  rollChapter();chapterPapers();chapterPerks();
  S.lastHeal=heal_;
  enterOffice();
}
// Things that happen at the start of every chapter.
function chapterPerks(){
  if(hasTrinket('rolodex'))gainFavour(1);
  if(hasTrinket('flask')&&S.pocket.length<POCKET_MAX)S.pocket.push('rakija');
  S.dmUsed=false;
}
