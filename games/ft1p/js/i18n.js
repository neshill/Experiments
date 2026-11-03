
/* ============ languages (v25) ============
   Every piece of text the player reads goes through one of two doors:
   - text written in the code goes through L`...` (a "tagged template"): L`${who} sighs loudly` looks up the
     English sentence "{0} sighs loudly" in the current language's table and puts the values back in;
   - text stored in the content tables below (cards, offices, gossip...) is swapped in place by localizeData()
     when the language changes. The English originals are kept in EN_DATA, so switching back is lossless.
   Translations live in I18N (filled at the bottom of the page): one table per language, English sentence -> translation.
   Inside a sentence, [[he|she]] picks a word by the clerk's gender and [[0:day|days]] picks a plural form for value {0}
   (Bosnian/Serbian use three forms: [[0:dan|dana|dana]] = 1 dan, 3 dana, 5 dana). A sentence with no translation stays in English.
   Serbian is written in Latin script in the table and turned into Cyrillic on screen (toCyr), names and all. */
const LANGS=[['en','English'],['bs','Bosanski / Hrvatski'],['sr','Српски (ћирилица)'],['de','Deutsch'],['es','Español'],['fr','Français']];
const I18N={};
let LANG='en',GCTX=null;
const LOCALE={en:'en',bs:'bs',sr:'sr',de:'de',es:'es',fr:'fr'};
// whose gender [[he|she]] follows: an office passed in explicitly (GCTX), else the clerk at the current window
function heIs(){const d=GCTX||(typeof S!=='undefined'&&S&&(S.tut?TUT_OFFICE:S.office?OFFICES[S.officeIdx]:null));return !!(d&&d.male)}
const PLR={};
function plForm(n,forms){if(forms.length<2)return forms[0];
  let cat='other';try{cat=(PLR[LANG]||(PLR[LANG]=new Intl.PluralRules(LOCALE[LANG]))).select(Math.abs(+n||0))}catch(e){cat=+n===1?'one':'other'}
  if(cat==='one')return forms[0];if(cat==='few'&&forms.length>2)return forms[1];return forms[forms.length-1]}
function fillT(s,vals){
  s=s.replace(/\[\[(\d+):([^\]]*)\]\]/g,(_,i,f)=>plForm(vals[+i],f.split('|')));
  s=s.replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g,(_,m,f)=>heIs()?m:f);
  return s.replace(/\{(\d+)\}/g,(m,i)=>vals[+i]!==undefined?vals[+i]:m)}
function trKey(k){const d=I18N[LANG];return d&&d[k]!=null&&d[k]!==''?d[k]:k}
// L`text ${a}` or L('text {0}',a)
function L(str,...vals){const key=Array.isArray(str)?str.slice(1).reduce((a,s,i)=>a+'{'+i+'}'+s,str[0]):String(str);return fillT(trKey(key),vals)}
// L with the gender taken from office d (for sentences about a clerk who isn't at your window)
const T=(k,...v)=>L(String(k),...v); // same as L, for places where a local variable is called L
function LG(d,fn){const g=GCTX;GCTX=d;try{return fn()}finally{GCTX=g}}
