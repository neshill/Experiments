
/* ============ tutorial: the practice office (v25) ============
   "How to play" on the title screen (and a one-time invitation on a device's first open) opens a practice office.
   The regular clerk is on sick leave; the window is staffed by Žućko, a temporary worker: a puppy in a hat folded
   from an old form. It is a real office running on the normal rules, but with a fixed deck and a fixed clerk, and
   a coach (Žućko's speech bubble plus a ring around the thing being explained) that walks through one turn and a bit:
   hand in a document, photocopy, the clerk's next action, ending the turn and keeping cards, a new rule, a fee stamp
   and a Small Envelope. While a step waits for you to do something, only that thing can be tapped.
   Nothing here touches the Vitrina, the run counter or the trinkets, and Patience can't drop to zero. */
const TUT_EN={short:'Practice',full:'Practice Office',window:'Window 0',goal:'Certificate of Completed Training',label:'Practice'};
const TUT_OFFICE={name:'Practice',tut:true,clerk:'Žućko',title:'',pal:'',turns:6,dmg:1,tier:0,male:true,
  rows:[['id','original'],['birth','copy'],['fee_mun','original']],rules:[['photo','original']],ft1p:null,reward:null,intents:{},
  ...TUT_EN,localize(){Object.keys(TUT_EN).forEach(k=>{this[k]=trKey(TUT_EN[k])})}};
// Žućko, drawn by layers like the other clerks: body, head, and two small patches on top of the head (closed eyes, open mouth)
// that are switched on for a blink or while he talks, so only the eyes or mouth change and the rest of the face stays the same picture.
// Facial animation only: the head tilts a little, the torso just breathes.
const ZK_HEAD=`<span class="zk-hd"><img class="zk-l" src="${ART.zk_head}" alt=""><img class="zk-p zk-blink" style="left:25.46%;top:28.82%;width:47.41%;height:22.08%" src="${ART.zk_blink}" alt=""><img class="zk-p zk-talk" style="left:31.94%;top:47.57%;width:35.56%;height:18.75%" src="${ART.zk_talk}" alt=""></span>`;
const PUPPY_SVG=`<span class="zk" aria-hidden="true"><img class="zk-l zk-bust" src="${ART.zk_bust}" alt="">${ZK_HEAD}</span>`;
// head only (coach bubble, invitation, pop-ups): the same layers, cropped to the head
const PUPPY_HEAD=`<span class="zk-crop" aria-hidden="true"><span class="zk">${ZK_HEAD}</span></span>`;
// asleep (end of the tutorial): eyes stay shut
const PUPPY_NAP=`<span class="zk-crop nap" aria-hidden="true"><span class="zk">${ZK_HEAD}</span></span>`;
const tutSeen=()=>{try{return !!localStorage.getItem('ft1p.tut')}catch(e){return true}};
function tutMark(v){try{if(v!=='started'||!localStorage.getItem('ft1p.tut'))localStorage.setItem('ft1p.tut',v)}catch(e){}}
// The deck is fixed so the lesson always goes the same way. Turn 1: ID, Birth Certificate, Photocopy, Small Envelope, Deep Breath.
function tutStart(){
  newRun();tutMark('started');
  S.tut={step:0,shown:-1,talk:false,u:{}};S.ftPlan=S.ftPlan.map(()=>false);S.cards={};S.deck=[];S.uid=1;S.trinkets=[];
  const u=S.tut.u,mk=(k,c)=>{u[k]=c.uid;addToDeck(c);return c.uid};
  const first=[mk('id',mkDoc('id','original',{start:true})),mk('birth',mkDoc('birth','original',{issued:0})),mk('pc',mkAct('photocopy')),mk('env',mkAct('envelope')),mk('breath',mkAct('breath'))];
  const later=[mk('stamp',mkDoc('stamp_mun')),mk('smile',mkAct('smile')),mk('wait',mkAct('wait')),mk('rulebook',mkAct('rulebook'))];
  const d=TUT_OFFICE;
  S.office={rows:d.rows.map(([doc,form,max])=>({doc,form,max,done:false})),rulesLeft:d.rules.slice(),ft1pFired:false,ft1pRolled:true,
    turnsLeft:d.turns,turn:0,draw:[...later.slice().reverse(),...first.slice().reverse()],hand:[],discard:[],exhaust:[],
    intent:null,skipIntent:false,skipN:0,story:0,usedGossip:[]};
  S.screen='office';S.target=null;S.confirm=null;S.log=L`Žućko looks up from the counter and wags his tail.`;
  S.office.intent=rollIntent();startTurn();
}
// Žućko's moves: first he "remembers" a rule (the lesson needs it), then he yawns, then he chases his tail.
function tutIntent(){const n=S.office.turn;
  if(n===0)return {type:'rule',dmg:1};
  return n%2?{type:'yawn',dmg:1}:{type:'tail',dmg:0}}
// Turn 2 always has the fee stamp and the envelope in hand, whatever you kept.
function tutEnsure(){const o=S.office,u=S.tut.u;if(o.turn<2)return;
  [u.stamp,u.env].forEach(id=>{if(!S.deck.includes(id)||o.hand.includes(id))return;
    for(const pile of [o.draw,o.discard,o.exhaust]){const i=pile.indexOf(id);if(i>=0){pile.splice(i,1);o.hand.unshift(id);return}}})}
function tutFinish(){S.target=null;S.confirm=null;tutMark('done');try{localStorage.setItem('ft1p.tut','done')}catch(e){}S.screen='tutdone'}
const tutRow=doc=>S.office.rows.findIndex(r=>r.doc===doc);
const tutCard=id=>`.lane.fan .card[data-uid="${id}"]`;
const tutCopyUid=()=>S.office.hand.find(x=>{const c=C(x);return c.kind==='doc'&&c.doc==='birth'&&c.form!=='original'});
// Steps: t = what Žućko says, at = what gets the ring, done = when the step is finished (no done: a Next button),
// allow = what can be tapped meanwhile.
const TUT_STEPS=[
  {t:()=>L`Woof! I mean: welcome. I'm Žućko, the temporary worker. The real clerk is on sick leave until 2031, so today this window is mine. Let me show you how it works.`,at:()=>'.stage .pupwrap'},
  {t:()=>L`This is the form. Every line is a paper the clerk wants from you. Tick off every line and you get what you came for.`,at:()=>'.check'},
  {t:()=>L`This is your Patience. Clerks wear it down: sighs, coffee breaks, rules they suddenly remember. At zero you give up and the run is over.`,at:()=>'.tile.pat'},
  {t:()=>L`This is the clock. There's no limit on how many cards you play in a turn: play everything that helps. But every turn moves the clock, and at 15:00 the window closes. Then it costs you patience, and every paper gets a day older.`,at:()=>'.tile.day'},
  {t:()=>L`These are your cards. Tap your ID Card to hand it in. (Hold a card to see it up close.)`,at:()=>tutCard(S.tut.u.id),
    done:()=>S.office.rows[tutRow('id')].done,allow:(a,uid)=>a==='card'&&uid===S.tut.u.id},
  {t:()=>L`Received! I looked at your original and gave it back: originals come back to your cards. Copies, stamps and photos the clerk keeps.`,at:()=>'.rows li:first-child'},
  {t:()=>S.target?L`Now tap your Birth Certificate. The copy goes straight into your hand.`:L`The next line wants a COPY of your Birth Certificate, and you only have the original. Tap Photocopy.`,
    at:()=>S.target?tutCard(S.tut.u.birth):tutCard(S.tut.u.pc),done:()=>!!tutCopyUid()||S.office.rows[tutRow('birth')].done,
    allow:(a,uid)=>a==='cancel'||a==='card'&&(uid===S.tut.u.pc||uid===S.tut.u.birth)},
  {t:()=>L`There's your copy. Hand it in.`,at:()=>tutCard(tutCopyUid()),done:()=>S.office.rows[tutRow('birth')].done,allow:(a,uid)=>a==='card'&&uid===tutCopyUid()},
  {t:()=>L`Up here you always see what the clerk will do when you end your turn. Right now I am about to "remember" a new rule. Clerks love that one.`,at:()=>'.stage .intent'},
  {t:()=>L`The last line is a fee. Fees take a fee stamp, and there's none in your hand. You could pay at the bank, but that costs the rest of your turn. Better: end the turn and draw new cards.`,at:()=>`.rows li:nth-child(${tutRow('fee_mun')+1})`},
  {t:()=>L`Tap End turn. The red lights around it are the turns left before the window closes for the day.`,at:()=>'.endbtn',done:()=>!!S.keeping||S.office.turn>1,allow:a=>a==='end'},
  {t:()=>L`Before your turn ends, you can keep up to 3 cards for the next one. The rest go to the Used pile. Tap the Small Envelope to keep it, then tap Keep.`,at:()=>'.lane.fan',
    done:()=>S.office.turn>1,allow:a=>a==='card'||a==='end'},
  {t:()=>L`"Ah, I almost forgot!" See? A new line on the form: a Photo 3×4. In a real run, the card My Friend Went Last Week can warn you before a clerk does this.`,at:()=>`.rows li:nth-child(${tutRow('photo')+1})`},
  {t:()=>L`New turn, new cards: a Municipal Fee Stamp is in your hand. Hand it in for the fee line.`,at:()=>tutCard(S.tut.u.stamp),
    done:()=>S.office.rows[tutRow('fee_mun')].done,allow:(a,uid)=>a==='card'&&uid===S.tut.u.stamp},
  {t:()=>S.target?L`Now tap the Photo 3×4 line on the form. Nobody saw anything.`:L`No photo on you? There's another way. Cards with a dashed border are shady: they also cost Patience (the red heart). Tap the Small Envelope.`,
    at:()=>S.target?`.rows li:nth-child(${tutRow('photo')+1})`:tutCard(S.tut.u.env),done:()=>S.screen!=='office',
    allow:(a,uid)=>a==='cancel'||a==='row'||a==='card'&&uid===S.tut.u.env}
];
// Move past every step whose condition is already met.
function tutSync(){const T_=S.tut;if(!T_||S.screen!=='office')return;
  let st=TUT_STEPS[T_.step];while(st&&st.done&&st.done()){T_.step++;st=TUT_STEPS[T_.step]}
  // a line on the form just got ticked: Žućko stamps it
  const dn=S.office.rows.map(r=>!!r.done);if(T_.rows)dn.forEach((v,i)=>{if(v&&!T_.rows[i])requestAnimationFrame(()=>tutPaw(i))});T_.rows=dn;
  if(T_.shown!==T_.step){T_.shown=T_.step;T_.talk=true;T_.scroll=true;clearTimeout(tutSync.t);tutSync.t=setTimeout(()=>{if(S.tut){S.tut.talk=false;
    $app.querySelectorAll('.pupwrap,.coach').forEach(e=>e.classList.remove('talk'))}},1900)}}
const TUT_FREE=['pause','resume','pauseMenu','pauseRules','pauseOptions','pauseCards','pauseFeedback','fbType','fbSend','lang','music','endRun','endRunYes','dismiss','tutNext','tutSkip'];
function tutAllow(a,b){
  if(!S.tut||S.screen!=='office')return true;
  if(TUT_FREE.includes(a))return true;
  if(a==='view')return !!b&&b.dataset.v!=='map';
  const st=TUT_STEPS[S.tut.step];
  const ok=!!(st&&st.allow&&st.allow(a,b?+b.dataset.uid:0));
  if(!ok)S.tut.nudge=Date.now();
  return ok}
function tutHTML(){
  const T_=S.tut;if(!T_||S.screen!=='office'||S.overlays.length||S.view||S.paused||S.pocketAsk!=null)return '';
  const st=TUT_STEPS[T_.step];if(!st)return '';
  const nudge=T_.nudge&&Date.now()-T_.nudge<600;
  return `<div class="tut-ring" aria-hidden="true"></div><div class="coach ${T_.talk?'talk':''} ${nudge?'nudge':''}" role="status">
    <span class="coach-pup">${PUPPY_HEAD}</span><div class="coach-b"><b>${L`Žućko · temporary worker`}</b><p>${st.t()}</p>
    <div class="coach-btns">${st.done?`<span class="coach-do">${L`Your move`}</span>`:`<button class="btn primary" data-act="tutNext">${L`Next`}</button>`}
    <button class="coach-skip" data-act="tutSkip">${L`Skip tutorial`}</button><span class="coach-n">${T_.step+1}/${TUT_STEPS.length}</span></div></div></div>`}
// Ring + coach placement: follows its target every frame (hand cards move on springs); the coach sits on the other half of the screen.
function tutPlace(){
  const ring=$app.querySelector('.tut-ring'),coach=$app.querySelector('.coach');if(!ring||!coach||!S.tut)return;
  const st=TUT_STEPS[S.tut.step],sel=st&&st.at();const el=sel&&$app.querySelector(sel);
  if(!el){ring.style.display='none';coach.classList.remove('top');return}
  // a line further down the form: scroll it into the middle first (the hand covers the bottom of the screen)
  if(S.tut.scroll){S.tut.scroll=false;if(el.closest('.rows')&&el.scrollIntoView)el.scrollIntoView({block:'center'})}
  const r=el.getBoundingClientRect(),z=parseFloat($app.style.zoom)||1,p=6;
  // positions inside the zoomed game area (big landscape screens) are in unzoomed pixels
  ring.style.display='';Object.assign(ring.style,{left:(r.left/z-p)+'px',top:(r.top/z-p)+'px',width:(r.width/z+2*p)+'px',height:(r.height/z+2*p)+'px'});
  coach.classList.toggle('top',r.top+r.height/2>innerHeight*.5);
}
// Žućko's paw stamp lands on the thing you just did
function tutPaw(i){const li=$app.querySelector(`.rows li:nth-child(${i+1})`);if(!li||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const r=li.getBoundingClientRect(),e=document.createElement('img');e.className='tut-paw';e.src=ART.tut_paw;e.alt='';
  e.style.left=(r.left+r.width*.72)+'px';e.style.top=(r.top+r.height/2)+'px';e.style.setProperty('--r',(Math.random()*30-15).toFixed(0)+'deg');document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}
function tutLoop(){if(typeof S!=='undefined'&&S&&S.tut&&S.screen==='office')tutPlace();requestAnimationFrame(tutLoop)}
requestAnimationFrame(tutLoop);
function tutInviteHTML(){if(tutSeen()||S.screen!=='intro')return '';
  return `<div class="tut-scrim" aria-hidden="true"></div><div class="tut-invite" role="dialog" aria-label="${L`First time at the counter?`}"><span class="ti-pup">${PUPPY_HEAD}</span><div class="ti-b">
    <b>${L`First time at the counter?`}</b><p>${L`Žućko, our temporary worker, will walk you through one practice office. It takes about three minutes.`}</p>
    <div class="btnrow"><button class="btn primary" data-act="tutorial">${L`Show me`}</button><button class="btn quiet" data-act="tutNo">${L`Not now`}</button></div></div></div>`}
function tutDoneHTML(){
  return `<main><div class="sheet tutdone"><span class="tdcert"><img src="${ART.tut_cert}" alt=""><span class="tdnap">${PUPPY_NAP}</span></span><span class="big-stamp">${L`Trained`}</span><h2>${L`Certificate of Completed Training`}</h2>
    <p>${L`That's the job. Žućko stamps your certificate with his paw and goes back to his nap.`}</p>
    <span class="kicker">${L`In a real run you'll also meet`}</span>
    <ul class="rules">
      <li>${L`<b>Five offices</b>, one after another. Each one hands you the paper the next one wants.`}</li>
      <li>${L`<b>Fali ti jedan papir.</b> When you're one line from done, a clerk may ask for a strange paper nobody has heard of. Tap <b>Go get it</b> or slip them an envelope.`}</li>
      <li>${L`<b>Days.</b> Papers get older every day, and some lines want a fresh one.`}</li>
      <li>${L`<b>The city map</b> between offices: pick a stop on the way, and watch out for trouble.`}</li>
      <li>${L`<b>The Vitrina</b>: grandma's glass cabinet keeps the trinkets you earn, for good.`}</li>
    </ul>
    <div class="btnrow"><button class="btn primary" data-act="tutRun">${L`Start a real run`}</button><button class="btn quiet" data-act="toTitle">${L`Title screen`}</button></div></div></main>`}
