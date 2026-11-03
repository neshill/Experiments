/* ============ clerk puppets (v20) ============
   Each clerk is a layered puppet drawn on a canvas: the bust, the head, then swappable eye / brow / mouth
   patches, then the bust again with the neck cut out (so the collar sits over the neck when the head tilts).
   Patches: eyes 0 open 1 closed 2 squint 3 look left 4 look right 5 rolled up; brows 0 neutral 1 raised
   2 furrowed 3 one raised; mouth 0 closed 1 half 2 open 3 frown 4 smirk 5 "O".
   The face follows the game: the next action sets the mood, the clerk's mouth moves while her bubble is up,
   she glances at the next window when your neighbour talks, and she reacts to what you play and to her own turn. */
// ---------- translations (v25): English sentence -> translation, one table per language. Made from i18n/*.json ----------
const PUPPETS={"Registry":{"bust":[1444,1071],"crop":[-743,428],"head":[875,1087],"hs":0.87,"hx":343,"hy":-713,"pv":[450,930],"faceRight":0.663,"img":{"bust":"art/pup/Registry_img_bust.webp","front":"art/pup/Registry_img_front.webp","head":"art/pup/Registry_img_head.webp"},"ov":{"eyes":[["art/pup/Registry_ov_eyes_0_0.webp",272,444],["art/pup/Registry_ov_eyes_1_0.webp",272,444],["art/pup/Registry_ov_eyes_2_0.webp",272,444],["art/pup/Registry_ov_eyes_3_0.webp",272,444],["art/pup/Registry_ov_eyes_4_0.webp",272,444],["art/pup/Registry_ov_eyes_5_0.webp",272,444]],"brows":[["art/pup/Registry_ov_brows_0_0.webp",266,387],["art/pup/Registry_ov_brows_1_0.webp",266,387],["art/pup/Registry_ov_brows_2_0.webp",266,387],["art/pup/Registry_ov_brows_3_0.webp",266,387]],"mouth":[["art/pup/Registry_ov_mouth_0_0.webp",308,646],["art/pup/Registry_ov_mouth_1_0.webp",308,646],["art/pup/Registry_ov_mouth_2_0.webp",308,646],["art/pup/Registry_ov_mouth_3_0.webp",308,646],["art/pup/Registry_ov_mouth_4_0.webp",308,646],["art/pup/Registry_ov_mouth_5_0.webp",308,646]]}},"Police":{"bust":[1473,1012],"crop":[-725,404],"head":[652,985],"hs":0.88,"hx":440,"hy":-695,"pv":[333,890],"faceRight":0.658,"img":{"bust":"art/pup/Police_img_bust.webp","front":"art/pup/Police_img_front.webp","head":"art/pup/Police_img_head.webp"},"ov":{"eyes":[["art/pup/Police_ov_eyes_0_0.webp",160,334],["art/pup/Police_ov_eyes_1_0.webp",160,334],["art/pup/Police_ov_eyes_2_0.webp",160,334],["art/pup/Police_ov_eyes_3_0.webp",160,334],["art/pup/Police_ov_eyes_4_0.webp",160,334],["art/pup/Police_ov_eyes_5_0.webp",160,334]],"brows":[["art/pup/Police_ov_brows_0_0.webp",144,283],["art/pup/Police_ov_brows_1_0.webp",144,283],["art/pup/Police_ov_brows_2_0.webp",144,283],["art/pup/Police_ov_brows_3_0.webp",144,283]],"mouth":[["art/pup/Police_ov_mouth_0_0.webp",168,539],["art/pup/Police_ov_mouth_1_0.webp",168,539],["art/pup/Police_ov_mouth_2_0.webp",168,539],["art/pup/Police_ov_mouth_3_0.webp",168,539],["art/pup/Police_ov_mouth_4_0.webp",168,539],["art/pup/Police_ov_mouth_5_0.webp",168,539]]}},"Tax Office":{"bust":[1324,1007],"crop":[-750,402],"head":[939,1098],"hs":0.9,"hx":248,"hy":-720,"pv":[500,900],"faceRight":0.698,"img":{"bust":"art/pup/Tax-Office_img_bust.webp","front":"art/pup/Tax-Office_img_front.webp","head":"art/pup/Tax-Office_img_head.webp"},"ov":{"eyes":[["art/pup/Tax-Office_ov_eyes_0_0.webp",304,428],["art/pup/Tax-Office_ov_eyes_1_0.webp",304,428],["art/pup/Tax-Office_ov_eyes_2_0.webp",304,428],["art/pup/Tax-Office_ov_eyes_3_0.webp",304,428],["art/pup/Tax-Office_ov_eyes_4_0.webp",304,428],["art/pup/Tax-Office_ov_eyes_5_0.webp",304,428]],"brows":[["art/pup/Tax-Office_ov_brows_0_0.webp",306,360],["art/pup/Tax-Office_ov_brows_1_0.webp",306,360],["art/pup/Tax-Office_ov_brows_2_0.webp",306,360],["art/pup/Tax-Office_ov_brows_3_0.webp",306,360]],"mouth":[["art/pup/Tax-Office_ov_mouth_0_0.webp",366,611],["art/pup/Tax-Office_ov_mouth_1_0.webp",366,611],["art/pup/Tax-Office_ov_mouth_2_0.webp",366,611],["art/pup/Tax-Office_ov_mouth_3_0.webp",366,611],["art/pup/Tax-Office_ov_mouth_4_0.webp",366,611],["art/pup/Tax-Office_ov_mouth_5_0.webp",366,611]]}},"Bureau":{"bust":[1426,1101],"crop":[-595,440],"head":[625,885],"hs":0.85,"hx":481,"hy":-565,"pv":[319,780],"faceRight":0.681,"img":{"bust":"art/pup/Bureau_img_bust.webp","front":"art/pup/Bureau_img_front.webp","head":"art/pup/Bureau_img_head.webp"},"ov":{"eyes":[["art/pup/Bureau_ov_eyes_0_0.webp",134,263],["art/pup/Bureau_ov_eyes_1_0.webp",134,263],["art/pup/Bureau_ov_eyes_2_0.webp",134,263],["art/pup/Bureau_ov_eyes_3_0.webp",134,263],["art/pup/Bureau_ov_eyes_4_0.webp",134,263],["art/pup/Bureau_ov_eyes_5_0.webp",134,263]],"brows":[["art/pup/Bureau_ov_brows_0_0.webp",136,243],["art/pup/Bureau_ov_brows_1_0.webp",136,243],["art/pup/Bureau_ov_brows_2_0.webp",136,243],["art/pup/Bureau_ov_brows_3_0.webp",136,243]],"mouth":[["art/pup/Bureau_ov_mouth_0_0.webp",154,474],["art/pup/Bureau_ov_mouth_1_0.webp",154,474],["art/pup/Bureau_ov_mouth_2_0.webp",154,474],["art/pup/Bureau_ov_mouth_3_0.webp",154,474],["art/pup/Bureau_ov_mouth_4_0.webp",154,474],["art/pup/Bureau_ov_mouth_5_0.webp",154,474]]}},"Bank":{"bust":[1271,1052],"crop":[-654,420],"head":[1041,1078],"hs":0.9,"hx":197,"hy":-624,"pv":[515,800],"faceRight":0.71,"img":{"bust":"art/pup/Bank_img_bust.webp","front":"art/pup/Bank_img_front.webp","head":"art/pup/Bank_img_head.webp"},"ov":{"eyes":[["art/pup/Bank_ov_eyes_0_0.webp",376,324],["art/pup/Bank_ov_eyes_1_0.webp",376,324],["art/pup/Bank_ov_eyes_2_0.webp",376,324],["art/pup/Bank_ov_eyes_3_0.webp",376,324],["art/pup/Bank_ov_eyes_4_0.webp",376,324],["art/pup/Bank_ov_eyes_5_0.webp",376,324]],"brows":[["art/pup/Bank_ov_brows_0_0.webp",418,270],["art/pup/Bank_ov_brows_1_0.webp",418,270],["art/pup/Bank_ov_brows_2_0.webp",418,270],["art/pup/Bank_ov_brows_3_0.webp",418,270]],"mouth":[["art/pup/Bank_ov_mouth_0_0.webp",444,531],["art/pup/Bank_ov_mouth_1_0.webp",444,531],["art/pup/Bank_ov_mouth_2_0.webp",444,531],["art/pup/Bank_ov_mouth_3_0.webp",444,531],["art/pup/Bank_ov_mouth_4_0.webp",444,531],["art/pup/Bank_ov_mouth_5_0.webp",444,531]]}}};
const PUP_F=0.6,PUP_H=640;
const PUP_IMG={};
function pupImgs(office){
  if(PUP_IMG[office])return PUP_IMG[office];
  const p=PUPPETS[office],L=s=>{const i=new Image();i.decoding='async';i.src=s;return i};
  const r={bust:L(p.img.bust),front:L(p.img.front),head:L(p.img.head),ov:{}};
  for(const g in p.ov)r.ov[g]=p.ov[g].map(o=>L(o[0]));
  return PUP_IMG[office]=r;
}
function pupW(office){const p=PUPPETS[office];return Math.round(p.bust[0]*PUP_H/(p.crop[1]-p.crop[0]))}
// expressions: eyes, brows, mouth, head tilt (deg), head drop (px)
const EXPR={neutral:[0,0,0,0,0],nod:[0,0,0,0,0],bored:[2,0,0,1.5,3],smug:[2,0,4,2,-3],suspicious:[2,2,3,-3.5,5],annoyed:[0,2,3,-1,3],
  surprised:[0,1,5,0,-9],skeptical:[0,3,4,3,0],eyeroll:[5,3,3,2.5,-4],phone:[3,0,0,-2,0]};
// mood while waiting, from the clerk's next action
const INTENT_FACE={sigh:'bored',break:'bored',phone:'neutral',rule:'smug',reject:'suspicious',certify:'smug',stale:'suspicious',system:'annoyed'};
// reactions to your cards: [expression, ms, expression, ms, ...]
const PUP_REACT={envelope:['surprised',900,'smug',1700],coffee:['smug',1800],cousin:['surprised',1500],smile:['bored',1600],
  argue:['annoyed',2000],rulebook:['annoyed',1800],backdoor:['skeptical',1500],number:['eyeroll',1500],wait:['bored',1200],friend:['skeptical',1200]};
// reactions to her own turn
const PUP_ACT={sigh:['eyeroll',1300,'bored',1500],rule:['smug',2400],reject:['suspicious',2400],break:['bored',2400],phone:['phone',2800],certify:['smug',2400],stale:['suspicious',2400],system:['annoyed',2400]};
const PUP={office:null,feat:{eyes:{c:0,p:0,t:-9},brows:{c:0,p:0,t:-9},mouth:{c:0,p:0,t:-9}},react:[],
  blinkAt:2,blinkT:-9,dbl:false,glance:null,nextGlance:3,mouth:0,nextMouth:0,tilt:0,dy:0};
const PUP_CALM=matchMedia('(prefers-reduced-motion:reduce)');
function pupReact(seq){
  let t=performance.now()/1000;PUP.react=[];
  for(let i=0;i<seq.length;i+=2){PUP.react.push({e:seq[i],from:t,to:t+seq[i+1]/1000});t+=seq[i+1]/1000}
}
function pupSet(g,i,t){const f=PUP.feat[g];if(f.c===i)return;f.p=f.c;f.c=i;f.t=t}
// Work out the face for this frame (once per frame, shared by every canvas showing this clerk).
function pupState(office,t){
  if(PUP.fr&&PUP.fr.t===t&&PUP.office===office)return PUP.fr;
  const o=S.office,calm=PUP_CALM.matches;
  if(PUP.office!==office){PUP.office=office;PUP.react=[];PUP.glance=null;for(const g in PUP.feat)PUP.feat[g]={c:0,p:0,t:-9}}
  // ---- what the face is doing ----
  let ex=o?(o.skipIntent?'annoyed':INTENT_FACE[o.intent&&o.intent.type]||'neutral'):'neutral',rx=null;
  for(const r of PUP.react)if(t>=r.from&&t<r.to){rx=r;ex=r.e}
  if(PUP.react.length&&t>=PUP.react[PUP.react.length-1].to)PUP.react=[];
  const E=EXPR[ex];let eyes=E[0],brows=E[1],mouth=E[2];
  const ln=GB.line,talking=(ln&&ln[0]==='C'&&!S.paused)||ex==='phone',pal=ln&&ln[0]!=='C';
  if(talking){if(t>PUP.nextMouth){PUP.mouth=[0,1,2,1,2,5,1][Math.floor(Math.random()*7)];PUP.nextMouth=t+.07+Math.random()*.09}mouth=PUP.mouth;if(eyes===5)eyes=0}
  if(pal&&!rx&&eyes!==1)eyes=4;
  if(!pal&&!rx&&(eyes===0||eyes===2)){
    if(!PUP.glance&&t>PUP.nextGlance){PUP.glance={i:Math.random()<.5?3:4,until:t+.6+Math.random()};PUP.nextGlance=t+4+Math.random()*5}
    if(PUP.glance){if(t>PUP.glance.until)PUP.glance=null;else eyes=PUP.glance.i}
  }
  if(t>PUP.blinkAt){PUP.blinkT=t;PUP.dbl=Math.random()<.18;PUP.blinkAt=t+2.4+Math.random()*3.2}
  const bt=t-PUP.blinkT,blink=eyes!==5&&(bt<.12||(PUP.dbl&&bt>.24&&bt<.36));
  pupSet('eyes',eyes,t);pupSet('brows',brows,t);pupSet('mouth',mouth,t);
  // ---- pose ----
  PUP.tilt+=(E[3]-PUP.tilt)*.08;PUP.dy+=(E[4]-PUP.dy)*.08;
  const b=calm?0:Math.sin(t*2*Math.PI/4.4);
  let tilt=PUP.tilt+(calm?0:.9*Math.sin(t*.47)+.45*Math.sin(t*1.13+1)),dy=PUP.dy+(calm?0:2.5*Math.sin(t*.61+2));
  if(talking&&!calm){tilt+=.8*Math.sin(t*6.1);dy+=2*Math.sin(t*8.3)}
  if(rx&&rx.e==='nod'){const q=(t-rx.from)/(rx.to-rx.from);dy+=9*Math.sin(q*Math.PI*2)*Math.sin(q*Math.PI)}
  return PUP.fr={t,b,tilt,dy,blink,talking};
}
// view 'stage' = the bust down to the counter; 'face' = a close-up of the head (the clerk's-turn card)
function pupDraw(cv,office,t,view){
  const p=PUPPETS[office],I=pupImgs(office),ctx=cv.getContext('2d'),{b,tilt,dy,blink,talking}=pupState(office,t);
  const [bw,bh]=p.bust,[top,bot]=p.crop;
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);
  const img=(im,x,y)=>{if(im.complete&&im.naturalWidth)ctx.drawImage(im,x,y,im.naturalWidth/PUP_F,im.naturalHeight/PUP_F)};
  let base;
  if(view==='face'){const W=p.head[0]*p.hs,H=p.head[1]*p.hs,x0=p.hx+W*.14,y0=p.hy+H*.1,k=cv.width/(W*.72);base=new DOMMatrix().scale(k).translate(-x0,-y0)}
  else{const k=cv.height/(bot-top);base=new DOMMatrix().scale(k).translate(0,-top)}
  const body=base.translate(bw/2,bh).scale(1+.003*b,1+.009*b).translate(-bw/2,-bh).translate(0,-2*b);
  const head=body.translate(p.hx,p.hy).scale(p.hs).translate(0,dy/p.hs).translate(p.pv[0],p.pv[1]).rotate(tilt).translate(-p.pv[0],-p.pv[1]);
  ctx.setTransform(body);img(I.bust,0,0);
  ctx.setTransform(head);img(I.head,0,0);
  const feat=(g,show,prev,a)=>{const L=p.ov[g],J=I.ov[g];
    if(a<1&&prev!==show)img(J[prev],L[prev][1],L[prev][2]);
    ctx.globalAlpha=a;img(J[show],L[show][1],L[show][2]);ctx.globalAlpha=1};
  const fade=(f,d)=>Math.min(1,(t-f.t)/d),F=PUP.feat;
  feat('eyes',blink?1:F.eyes.c,F.eyes.p,blink?1:fade(F.eyes,.07));
  feat('brows',F.brows.c,F.brows.p,fade(F.brows,.12));
  feat('mouth',F.mouth.c,F.mouth.p,fade(F.mouth,talking?.04:.1));
  ctx.setTransform(body);img(I.front,0,0);
}
function pupLoop(ms){
  requestAnimationFrame(pupLoop);
  if(!S||!S.office)return;
  for(const cv of $app.querySelectorAll('canvas[data-office]'))if(PUPPETS[cv.dataset.office])pupDraw(cv,cv.dataset.office,ms/1000,cv.classList.contains('ovface')?'face':'stage');
}
requestAnimationFrame(pupLoop);
// Hook the clerk's reactions onto the game's own functions (the game rules themselves are unchanged).
{const f=useAction;useAction=function(c){const k=c.key,r=f.apply(this,arguments);if(PUP_REACT[k])pupReact(PUP_REACT[k]);return r}}
{const f=handIn;handIn=function(){const r=f.apply(this,arguments);pupReact(['nod',900]);return r}}
{const f=endTurn;endTurn=function(){const o=S.office,it=o&&o.intent,
  blocked=o&&(o.skipIntent||(o.guard&&it&&(it.type==='rule'||it.type==='reject')));
  const r=f.apply(this,arguments);if(it)pupReact(blocked?['annoyed',2200]:PUP_ACT[it.type]||['neutral',100]);return r}}
