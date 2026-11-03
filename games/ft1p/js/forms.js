function rollMoods(){
  const keys=Object.keys(MOODS);let best=null;
  for(let n=0;n<300;n++){
    const used=new Set(),run=OFFICES.map((d,i)=>{
      // the Registry is the gentle start: half the time no mood, otherwise a friendly or a mild one
      // (v30: later chapters and Reform 4 skip the gentle start; a boss always starts with its signature mood)
      const gentle=i===0&&!S.chapter&&!reformOn(4);
      if(gentle&&Math.random()<.5)return [];
      const pool=gentle?keys.filter(k=>MOODS[k].good||MOODS[k].mild):keys,out=[];
      const B=OFFICES[i].boss&&BOSSES[OFFICES[i].boss];if(B){out.push(B.sig);used.add(B.sig)}
      const want=MOOD_COUNT[i]+(B&&reformOn(10)?1:0);
      while(out.length<want){const k=rnd(pool);if(used.has(k)||MOOD_CLASH.some(([a,b])=>out.includes(a)&&k===b||out.includes(b)&&k===a))continue;used.add(k);out.push(k)}
      return out});
    const all=run.flat().filter((k,j)=>true),hurt=s=>all.filter(k=>MOODS[k].hurts===s).length;
    best=run;
    if(all.some(k=>MOODS[k].good)&&hurt('book')<=2&&hurt('shady')<=1&&hurt('all')<=2)break;
  }
  return best;
}
// v29: random forms. Every run rolls each office's form: the chain line (the paper the office before hands you) stays,
// the rest is drawn from all ordinary papers with a random form (original / copy / original-or-certified) and sometimes
// a date limit, until the form's difficulty is close to the office's target. Moods count toward it.
// Surprises share one budget per office: each is either an "Ah, I almost forgot" line (an ordinary paper you can draw)
// or the FT1P (a strange paper you can't draw). Everything is decided at the start, so tips are always true.
const FORM_LINES=[4,4,4,4,5],FORM_TARGET=[4.6,5.8,6.2,6.0,8.6],SURPRISES=[1,2,2,2,3],FT1P_OFFICE=0.4;
// v30: which ordinary papers a form can ask for depends on the chapter (CHAPTER.plain).
const PLAIN_DOCS_ALL=['id','birth','rental','utility','joboffer','photo'],FEES=['fee_mun','fee_fed','fee_adm'];
const datedDoc=doc=>!DOCS[doc].single&&!DOCS[doc].fee&&doc!=='id';
function lineCost([doc,form,max],moods){
  let c=form==='copy'?1.6:form==='alt'?1.4:1;
  if(max!=null)c+=max<=4?1:.6;
  const m=moods||[];
  if(form==='copy'&&(m.includes('nocopier')||m.includes('originals')))c+=.8;
  if(m.includes('fresh')&&datedDoc(doc))c+=.4;
  return c}
function randLine(doc,chain){
  if(DOCS[doc].fee||DOCS[doc].single)return [doc,'original'];
  const form=doc==='id'?rnd(['original','original','copy']):rnd(['original','copy','copy','alt']);
  return datedDoc(doc)&&Math.random()<(chain?.5:.3)?[doc,form,rnd([4,5,6])]:[doc,form]}
function rollForms(moods){
  const ft=OFFICES.map(()=>Math.random()<FT1P_OFFICE);if(!ft.some(Boolean))ft[1+Math.floor(Math.random()*(OFFICES.length-1))]=true;
  const used=new Set();
  return OFFICES.map((d,i)=>{
    const pool=[...CHAPTER.plain,...OFFICES.slice(0,Math.max(0,i-1)).map(o=>o.reward)],m=(moods&&moods[i])||[];
    let best=null,bestErr=1e9;
    for(let n=0;n<300;n++){
      const rows=i>0?[randLine(OFFICES[i-1].reward,true)]:[];
      for(const doc of shuffle(pool)){if(rows.length>=FORM_LINES[i]+(reformOn(3)?1:0))break;rows.push(randLine(doc==='fee'?rnd(FEES):doc))}
      // later chapters ask for a little more (v30)
      const err=Math.abs(rows.reduce((s,r)=>s+lineCost(r,m),0)-(FORM_TARGET[i]+(S.chapter||0)*.5+(reformOn(3)?1:0)));
      if(err<bestErr){best=rows;bestErr=err}if(err<=.3)break}
    // one fee per office at most (on the form or as a remembered rule)
    const rest=pool.filter(doc=>!best.some(r=>r[0]===doc||doc==='fee'&&DOCS[r[0]].fee)),nr=SURPRISES[i]-(ft[i]?1:0);
    const rules=shuffle(rest).slice(0,nr).map(doc=>{const r=randLine(doc==='fee'?rnd(FEES):doc);if(r[1]==='alt')r[1]='original';return r});
    let paper=null;if(ft[i]){paper=rnd(STRANGE.filter(x=>!used.has(x)));used.add(paper)}
    return {rows:best,rules,ft1p:paper}})}
// The rolled forms are written into the office table for this run (everything else reads them from there).
function applyForms(){if(!S.forms)return;OFFICES.forEach((d,i)=>{const f=S.forms[i];d.rows=f.rows;d.rules=f.rules;d.ft1p=f.ft1p});S.ftPlan=S.forms.map(f=>!!f.ft1p)}
// Papers later offices will ask for (fees as their stamps): what a reward or a stop should offer.
function futureWants(){const out=[];OFFICES.slice(S.officeIdx+1).forEach(d=>[...d.rows,...d.rules].forEach(([doc])=>{
  if(OFFICES.some(o=>o.reward===doc))return;out.push(DOCS[doc].fee||doc)}));return out}
// Strange papers never go into your cards: they wait in your bag and are handed over straight from the form.
const bagDocs=()=>(S.bag||[]).map(C);
const bagHas=doc=>bagDocs().some(c=>c.doc===doc);
// v31: the run-wide redraw supply is gone (see canBagSwap/startSwap in js/run.js).
// Is mood k on at the window you are at? (never in the practice office)
function moodOn(k){return !!(S&&!S.tut&&S.office&&S.moods&&(S.moods[S.officeIdx]||[]).includes(k)&&!(S.office.cancelled||[]).includes(k))}
// The moods you can know about for office idx: all of them once you are there; on the way, the Bank's second one stays hidden unless you heard it.
function moodsKnown(idx){const m=(S.moods&&S.moods[idx])||[];const here=idx===S.officeIdx&&S.screen!=='map'&&S.office;
  return m.filter((k,j)=>here||j===0||S.heard[idx].includes('m'))}
const moodHidden=idx=>moodsKnown(idx).length<((S.moods&&S.moods[idx])||[]).length;
// date limit under the "new circular" mood
function moodMax(doc,max){if(!moodOn('fresh')||DOCS[doc].single||DOCS[doc].fee||doc==='id')return max;return max==null?7:Math.max(0,max-2)}
