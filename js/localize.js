
// The English content, kept for switching languages. localizeData() rewrites the visible text fields from it.
const EN_DATA=JSON.parse(JSON.stringify({DOCS,FORM,ACTIONS,CHAPTERS,PLACES,TRINKETS,POCKET,NODES,EVENTS,RELICS,GOSSIP_LIFE,STORY,GOSSIP_TELL}));
function localizeData(){
  const t=trKey,E=EN_DATA,each=(o,f)=>Object.keys(o).forEach(k=>f(k,o[k])),fields=(dst,src,fs)=>fs.forEach(f=>{if(src[f]!=null)dst[f]=t(src[f])});
  each(E.DOCS,(k,v)=>fields(DOCS[k],v,['name']));
  each(E.FORM,(k,v)=>{FORM[k]=t(v)});
  each(E.ACTIONS,(k,v)=>fields(ACTIONS[k],v,['name','text']));
  each(E.CHAPTERS,(k,v)=>{const c=CHAPTERS[k];fields(c,v,['title','goal','intro']);
    v.offices.forEach((o,i)=>{fields(c.offices[i],o,['short','full','window','goal','title']);c.offices[i].label=t(o.name)})});
  each(E.PLACES,(k,v)=>fields(PLACES[k],v,['place','text']));
  each(E.TRINKETS,(k,v)=>fields(TRINKETS[k],v,['name','text','how']));
  each(E.POCKET,(k,v)=>fields(POCKET[k],v,['name','text']));
  each(E.NODES,(k,v)=>fields(NODES[k],v,['name','text']));
  each(E.EVENTS,(k,v)=>{fields(EVENTS[k],v,['title','text']);['a','b'].forEach(x=>fields(EVENTS[k][x],v[x],['label','text']))});
  each(E.RELICS,(k,v)=>fields(RELICS[k],v,['name','text']));
  const lines=(dst,src)=>src.forEach((ln,i)=>{if(ln)dst[i][1]=t(ln[1])});
  each(E.GOSSIP_LIFE,(k,v)=>v.forEach((sc,i)=>lines(GOSSIP_LIFE[k][i],sc)));
  each(E.STORY,(k,v)=>lines(STORY[k],v));
  each(E.GOSSIP_TELL,(k,v)=>v.forEach((sc,i)=>lines(GOSSIP_TELL[k][i],sc)));
  each(KIND_TAG_EN,(k,v)=>{KIND_TAG[k]=t(v)});
  if(typeof TUT_OFFICE!=='undefined')TUT_OFFICE.localize();
}

// ---------- Serbian: written in Latin in the table, shown in Cyrillic ----------
// After every redraw the visible text (and labels for screen readers) is transliterated letter by letter.
// Anything inside translate="no" (the build number, language names, the FT1P tag) and anything you type stays as it is.
const CYR={A:'А',B:'Б',C:'Ц','Č':'Ч','Ć':'Ћ',D:'Д','Đ':'Ђ',E:'Е',F:'Ф',G:'Г',H:'Х',I:'И',J:'Ј',K:'К',L:'Л',M:'М',N:'Н',O:'О',P:'П',R:'Р',S:'С','Š':'Ш',T:'Т',U:'У',V:'В',Z:'З','Ž':'Ж',Q:'К',W:'В',X:'Кс',Y:'Ј'};
const CYR_DI={Lj:'Љ',LJ:'Љ',lj:'љ',Nj:'Њ',NJ:'Њ',nj:'њ','Dž':'Џ','DŽ':'Џ','dž':'џ'};
function toCyr(s){return String(s).replace(/Lj|LJ|lj|Nj|NJ|nj|Dž|DŽ|dž|[A-Za-zČĆĐŠŽčćđšž]/g,m=>{if(CYR_DI[m])return CYR_DI[m];
  const u=m.toUpperCase(),c=CYR[u];if(!c)return m;return m===u?c:c.toLowerCase()})}
function cyrTree(root){if(!root)return;
  const skip=el=>el.closest&&el.closest('[translate="no"],textarea,input,script,style');
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while((n=w.nextNode())){if(/[A-Za-z]/.test(n.nodeValue)&&!skip(n.parentElement))n.nodeValue=toCyr(n.nodeValue)}
  const els=root.querySelectorAll?[root,...root.querySelectorAll('[aria-label],[title],[placeholder]')]:[];
  els.forEach(el=>{if(!el.getAttribute||skip(el))return;['aria-label','title','placeholder'].forEach(a=>{const v=el.getAttribute(a);if(v&&/[A-Za-z]/.test(v))el.setAttribute(a,toCyr(v))})})}
const langName=k=>(LANGS.find(l=>l[0]===k)||LANGS[0])[1];
// First open on a device: the phone's language if the game speaks it, otherwise English. After that, the player's choice.
function detectLang(){
  try{const s=localStorage.getItem('ft1p.lang');if(s&&LANGS.some(l=>l[0]===s))return s}catch(e){}
  const pref=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']).map(x=>String(x).toLowerCase());
  for(const x of pref){
    if(/^(bs|hr|sh|cnr|sr-latn)/.test(x))return 'bs';
    if(/^sr/.test(x))return 'sr';
    for(const l of ['de','es','fr','en'])if(x===l||x.startsWith(l+'-'))return l;
  }
  return 'en'}
function setLang(k,save){
  if(!LANGS.some(l=>l[0]===k))k='en';
  LANG=k;if(save){try{localStorage.setItem('ft1p.lang',k)}catch(e){}}
  localizeData();
  const root=document.documentElement;root.lang=k==='sr'?'sr-Cyrl':k;
  const kp=L`KEEP`;root.style.setProperty('--t-keep',JSON.stringify(k==='sr'?toCyr(kp):kp));
  const sw=L`SWAP`;root.style.setProperty('--t-swap',JSON.stringify(k==='sr'?toCyr(sw):sw));
  const rb=document.querySelector('#rotate b'),rs=document.querySelector('#rotate span');
  if(rb)rb.textContent=L`Turn your phone upright`;if(rs)rs.textContent=L`The counter only serves people standing straight.`;
  if(k==='sr')cyrTree(document.getElementById('rotate'));
  if(typeof cityCache!=='undefined')cityCache=null;
}
// Options: language and music. Opened from the title screen, and from the pause menu during a run.
function optionsBody(){
  return `<span class="kicker">${L`Options`}</span><h2>${L`Language`}</h2>
    <div class="langs" role="group" aria-label="${L`Language`}">${LANGS.map(([k,n])=>`<button class="btn lang" data-act="lang" data-l="${k}" aria-pressed="${LANG===k}" lang="${k==='sr'?'sr-Cyrl':k}" translate="no">${n}</button>`).join('')}</div>
    <h2 class="opt-h">${L`Sound`}</h2>
    <div class="langs"><button class="btn" data-act="music" aria-pressed="${musicOn}">${musicOn?L`Music: on`:L`Music: off`}</button></div>`}
