// ---------- pause menu (☰ in the top bar, or Esc / P) ----------
// Pausing freezes the run: no input reaches the counter and the gossip waits. "End run" asks once, then drops the run and goes to the title.
let pauseDropped=false;
function pauseHTML(){
  if(!S.paused){pauseDropped=false;return ''}
  let body;
  const back=closeX('pauseMenu',L`Back to the menu`);
  if(S.paused==='rules')body=`${back}<span class="kicker">${L`How it works`}</span><h2>${L`Rules`}</h2>${rulesBody()}`;
  else if(S.paused==='cards')body=back+deckBody();
  else if(S.paused==='options')body=back+optionsBody()+`<div class="pm-btns"><button class="btn primary" data-act="pauseMenu">${L`Done`}</button></div>`;
  else if(S.paused==='confirm')body=S.tut?`<span class="kicker">${L`How to play`}</span><h2>${L`Leave the practice office?`}</h2>
    <p class="lead">${L`You can come back to it any time from the title screen.`}</p>
    <div class="pm-btns"><button class="btn primary danger" data-act="endRunYes">${L`Leave`}</button><button class="btn" data-act="pauseMenu">${L`Stay`}</button></div>`
    :`<span class="kicker">${L`End run`}</span><h2>${L`Give up this run?`}</h2>
    <p class="lead">${L`You walk out of the ${esc(cur().full)}. Everything from this run is lost. Trinkets you've already earned stay in the Vitrina.`}</p>
    <div class="pm-btns"><button class="btn primary danger" data-act="endRunYes">${L`Yes, end the run`}</button><button class="btn" data-act="pauseMenu">${L`Keep queuing`}</button></div>`;
  else if(S.paused==='feedback')body=feedbackHTML();
  else if(S.paused==='thanks')body=`<span class="kicker">${L`Feedback`}</span><h2>${L`Stamped and filed`}</h2>
    <p class="lead">${L`Thanks! Your note went straight into the inbox. Unlike everything else in this game, nobody will ask you for another paper.`}</p>
    <div class="pm-btns"><button class="btn primary" data-act="resume">${L`Resume`}</button><button class="btn" data-act="pauseMenu">${L`Back to menu`}</button></div>`;
  else body=`<span class="kicker">${S.tut?L`Paused · practice office`:L`Paused · ${esc(cur().full)}, office ${S.officeIdx+1} of ${OFFICES.length}`}</span><h2>${L`Back in a minute`}</h2>
    <p class="lead">${L`The clerk puts up a little sign. Nothing happens until you come back.`}</p>
    <div class="pm-btns"><button class="btn primary" data-act="resume">${L`Resume`}</button>
      <button class="btn" data-act="pauseCards">${L`Your cards (${S.deck.length})`}</button>
      <button class="btn" data-act="pauseRules">${L`Rules`}</button>
      <button class="btn" data-act="pauseOptions">${L`Language`} · ${esc(langName(LANG))}</button>
      <button class="btn" data-act="music">${musicOn?L`Music: on`:L`Music: off`}</button>
      <button class="btn" data-act="pauseFeedback">${L`Send feedback`}</button>
      <button class="btn quiet danger" data-act="endRun">${S.tut?L`Leave the tutorial`:L`End run`}</button></div>`;
  const drop=!pauseDropped;pauseDropped=true; // drop only when the menu opens, not on every redraw
  return `<div class="panel pause ${drop?'enter':''}" role="dialog" aria-modal="true" aria-label="${L`Paused`}"><div class="pause-sign ${drop?'drop':''}" aria-hidden="true"><div class="ps-swing"><b>Pauza</b><small>${L`Game paused`}</small></div></div><div class="panel-in pm-in">${body}</div></div>`;
}
// ---------- feedback (pause menu → Send feedback) ----------
// Sends one row to a Google Sheet through a small Google Apps Script web app (see feedback-apps-script.gs).
// Paste the web app URL (ends in /exec) below. Empty = the form explains that feedback isn't set up yet.
const FEEDBACK_URL='https://script.google.com/macros/s/AKfycbwBAsc8Gc7MfPPNxapbWeuUjqVaIxRsbG0MS5LpWdepPP2ktRaDieTRA0ErXAOhInsbzg/exec';
// GAME_BUILD is rewritten automatically on every commit by .githooks/pre-commit (don't edit by hand):
// n = the commit's number in the repo history, date = when it was committed.
const versionLabel=()=>`${GAME_VERSION} · build ${GAME_BUILD.n}`;
const FB={type:'Bug',text:'',name:'',sending:false,err:''};
try{FB.name=localStorage.getItem('ft1p.fbname')||''}catch(_){}
function feedbackHTML(){
  const TL={Bug:L`Bug`,Idea:L`Idea`,Other:L`Other`};
  const types=['Bug','Idea','Other'].map(t=>`<button class="btn" data-act="fbType" data-t="${t}" aria-pressed="${FB.type===t}">${TL[t]}</button>`).join('');
  return `${closeX('pauseMenu',L`Back to the menu`)}<span class="kicker">${L`Feedback`}</span><h2>${L`Fill in the form`}</h2>
    <p class="lead">${L`Something broke, felt unfair, or made you laugh? Tell us. We'll also note which office you're in.`}</p>
    <div class="fb-types" role="group" aria-label="${L`What kind of feedback`}">${types}</div>
    <textarea id="fbText" class="fb-in" maxlength="3000" placeholder="${L`What happened? What did you expect?`}" aria-label="${L`Your feedback`}">${esc(FB.text)}</textarea>
    <input id="fbName" class="fb-in" maxlength="60" placeholder="${L`Your name (optional)`}" aria-label="${L`Your name, optional`}" value="${esc(FB.name)}">
    ${FB.err?`<p class="fb-err" role="alert">${esc(FB.err)}</p>`:''}
    <div class="pm-btns"><button class="btn primary" data-act="fbSend" ${FB.sending?'disabled':''}>${FB.sending?L`Sending…`:L`Send`}</button></div>
    <p class="fb-note">${L`Sends your message, name, game version, office and device type. Nothing else.`}</p>`;
}
// The pause menu redraws from scratch, so typing is saved as you go and survives a redraw.
document.addEventListener('input',e=>{
  if(e.target.id==='fbText')FB.text=e.target.value;
  if(e.target.id==='fbName'){FB.name=e.target.value;try{localStorage.setItem('ft1p.fbname',FB.name)}catch(_){}}
});
function sendFeedback(){
  if(FB.sending)return;
  const msg=FB.text.trim();
  if(!msg){FB.err=L`The form is empty. Even the clerk wants at least one line.`;render();return}
  if(!FEEDBACK_URL){FB.err=L`Feedback isn't connected yet in this build.`;render();return}
  FB.sending=true;FB.err='';render();
  const o=S.tut||['intro','rules','closed','end','vitrina','who','chapter','options','tutdone'].includes(S.screen)?null:cur();
  const payload={type:FB.type,message:msg,name:FB.name.trim(),version:versionLabel()+' · '+LANG,
    where:S.tut?'tutorial':o?`${o.name} (office ${S.officeIdx+1} of ${OFFICES.length})`:S.screen,
    patience:`${S.patience}/${S.maxP}`,screen:S.screen,ua:navigator.userAgent};
  // text/plain + no-cors: Google's script server doesn't send CORS headers, so we can't read the reply.
  // A request that reaches it counts as sent; only a network failure lands in catch.
  fetch(FEEDBACK_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)})
    .then(()=>{FB.text='';FB.sending=false;if(S.paused==='feedback')S.paused='thanks';render()})
    .catch(()=>{FB.sending=false;FB.err=L`Couldn't send. Check your connection and try again.`;render()});
}
// ---------- side pages: run map and your cards ----------
function groupCards(uids){const m=new Map();uids.map(C).forEach(c=>{const k=c.kind==='doc'?c.doc+'|'+c.form:'a|'+c.key;if(!m.has(k))m.set(k,{c,n:0});m.get(k).n++});
  return [...m.values()].sort((a,b)=>(a.c.kind===b.c.kind?0:a.c.kind==='doc'?-1:1))}
function cardRow({c,n}){const src=ART[artKey(c)];const nm=c.kind==='doc'?DOCS[c.doc].name:ACTIONS[c.key].name;
  const sub=c.kind==='doc'?(DOCS[c.doc].single?L`Document`:FORM[c.form]+' · '+ageLabel(c)):(SHADY.has(c.key)?L`Shady action`:L`Action`)+' · '+L`${timeCost(c)} time`+(patCost(c)?' · '+L`−${patCost(c)} patience`:'');
  return `<li class="crow" style="--c:${CARD_BG[c.kind==='doc'?c.doc:c.key]||'#efe4cb'}">${src?`<img src="${src}" alt="" class="${c.kind==='doc'?c.form:''}">`:'<span class="noimg"></span>'}<span class="cn"><b>${esc(nm)}</b><small>${esc(sub)}</small>${c.kind==='act'?`<em>${esc(ACTIONS[c.key].text)}</em>`:''}</span>${n>1?`<span class="cq">×${n}</span>`:''}</li>`}
function section(title,uids){return `<h3>${title} <span>${uids.length}</span></h3>${uids.length?`<ul class="clist">${groupCards(uids).map(cardRow).join('')}</ul>`:`<p class="none">${L`Empty.`}</p>`}`}
function panelHTML(){
  if(!S.view)return '';
  let body='';
  if(S.view==='map'){
    body=`<h2>${L`Your route`}</h2><p class="lead">${L`Day ${S.day}. Five offices, each one hands you the paper the next one asks for. Every step between them is a day.`}</p>${mapHTML(false)}
      ${S.trinkets.length?`<h3>${L`From the Vitrina`}</h3><ul class="rel">${S.trinkets.map(k=>`<li><b>${esc(TRINKETS[k].name)}</b> · ${esc(TRINKETS[k].text)}</li>`).join('')}</ul>`:''}
      ${S.relics.length?`<h3>${L`Connections`}</h3><ul class="rel">${S.relics.map(r=>`<li><b>${esc(RELICS[r].name)}</b> · ${esc(RELICS[r].text)}</li>`).join('')}</ul>`:''}
      ${S.pocket.length?`<h3>${L`Pocket`}</h3><ul class="rel">${S.pocket.map(k=>`<li><b>${esc(POCKET[k].name)}</b> · ${esc(POCKET[k].text)}</li>`).join('')}</ul>`:''}`;
  } else body=deckBody();
  return `<div class="panel" role="dialog" aria-modal="true"><div class="panel-in">${closeX('view',L`Close`)}${body}</div></div>`;
}
function closeX(act,label){return `<button class="sheet-x" data-act="${act}" ${act==='view'?'data-v=""':''} aria-label="${esc(label)}" title="${esc(label)} (Esc)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></button>`}
function deckBody(){
    const o=S.office&&(S.screen==='office'||S.screen==='errand')?S.office:null;
    return `<span class="kicker">${L`Your deck · ${S.deck.length} cards`}</span><h2>${L`Your cards`}</h2><p class="lead">${L`Every document and action you own.`} ${o?L`This office splits them into your hand, the draw pile and the used pile.`:''}</p>`+
      (o?section(L`In your hand`,o.hand)+section(L`Draw pile`,o.draw)+section(L`Used`,[...o.discard,...o.exhaust]):section(L`All cards`,S.deck));
}
