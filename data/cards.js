
/* ============ content ============ */
const DOCS={
  id:{name:'ID Card'}, birth:{name:'Birth Certificate'}, rental:{name:'Rental Contract'}, utility:{name:'Electricity Bill'},
  joboffer:{name:'Job Offer Letter'}, citizenship:{name:'Citizenship Certificate'}, residence:{name:'Certificate of Residence'},
  taxno:{name:'Tax Number'}, alive:{name:'Proof of Being Alive'}, landlord:{name:"Landlord's Statement"},
  nodebt:{name:'No Tax Debt Certificate'}, salary:{name:'Salary Certificate'},
  workreg:{name:'Employment Registration'}, diploma:{name:'High School Diploma'},
  photo:{name:'Photo 3×4',single:true}, stamp:{name:'Fee Stamp',single:true},
  stamp_mun:{name:'Municipal Fee Stamp',single:true}, stamp_fed:{name:'Federal Fee Stamp',single:true}, stamp_adm:{name:'Admin Fee Stamp',single:true},
  school:{name:'Primary School Certificate'}, medical:{name:'Medical Certificate'}, transcript:{name:'School Transcript'},
  marriage:{name:'Marriage Certificate'}, workbook:{name:'Work Record Book'}, insurance:{name:'Health Insurance Card'},
  ownership:{name:'Ownership Certificate'}, landreg:{name:'Land Registry Extract'},
  fee_mun:{name:'Municipal fee',single:true,fee:'stamp_mun',level:'municipal'}, fee_fed:{name:'Federal fee',single:true,fee:'stamp_fed',level:'federal'}, fee_adm:{name:'Administrative fee',single:true,fee:'stamp_adm',level:'administrative'}
};
const FORM={original:'Original',copy:'Copy',certified:'Certified copy',alt:'Original or certified copy'};
// Every card costs time (3 per turn). Shady actions also cost patience: you pay with your nerves.
const ACTIONS={
  wait:{name:'Wait in Line',time:0,text:'Draw 3 cards. Lose 1 patience.'},
  breath:{name:'Deep Breath',time:1,text:'Recover 3 patience.'},
  smile:{name:'Polite Smile',time:0,text:'Draw 2 cards.'},
  rulebook:{name:'Know the Rulebook',time:1,text:'Block the clerk\'s next new rule or rejection.'},
  photocopy:{name:'Photocopy',time:1,target:'original',text:'Copy an original in your hand. The copy joins your cards, with the same date as the original.'},
  notary:{name:'Notarize',time:2,target:'copy',text:'A copy in your hand becomes a certified copy, dated today.'},
  reissue:{name:'Re-issue',time:1,target:'dated',text:'A document in your hand is issued again: dated today.'},
  backdate:{name:'Backdate',time:1,pat:3,target:'dated',text:'A document in your hand never gets too old again.'},
  argue:{name:'Argue',time:1,text:'Strike the newest added rule. Lose 4 patience.'},
  number:{name:'Take a Number',time:0,once:true,text:'+2 time next turn. Once per office.'},
  coffee:{name:'Coffee for the Clerk',time:1,pat:2,text:'The clerk skips their next action.'},
  envelope:{name:'Small Envelope',time:1,pat:6,burn:true,target:'row',text:'Tick off any one item. Used up: removed from your deck.'},
  cousin:{name:'Call Your Cousin',time:1,pat:2,once:true,text:'Cancel the next action and draw 2. Once per office.'},
  backdoor:{name:'Notary Owes You',time:1,pat:2,target:'original',text:'An original in your hand gets a certified copy dated today, no copy needed.'},
  friend:{name:'My Friend Went Last Week',time:1,text:'Draw 1. Hear one thing this clerk will ask for later. Nothing left? Hear about the next office.'},
  // v30 By the book
  citelaw:{name:'Cite the Law',time:1,once:true,text:"Cancel this clerk's mood for the rest of this office. Once per office."},
  tabbed:{name:'Tabbed Folder',time:1,text:'Draw 2 documents from your draw pile.'},
  stamppad:{name:'Stamp Pad',time:1,text:'Your next 2 photocopies this office come out certified.'},
  completefile:{name:'Complete File',time:1,once:true,text:'For the rest of this office, every 3rd line you tick with a document gives +5 patience.'},
  // v30 Connections (Favours)
  smalltalk:{name:'Small Talk',time:1,text:'+1 Favour. Draw 1.'},
  burek:{name:'Bring a Burek',time:1,text:'+2 Favours.'},
  callfavour:{name:'Call in a Favour',time:0,fav:3,target:'row',text:'Spend 3 Favours: tick any one item. Stays in your cards.'},
  knowsme:{name:'Everyone Knows Me',time:2,text:'Spend all your Favours: tick 1 item for every 2.'},
  // v30 Shady (Traces)
  bigenvelope:{name:'Big Envelope',time:1,pat:10,burn:true,traces:2,text:'Tick any 2 items. Used up. Leaves 2 Traces.'},
  lostmail:{name:'Lost in the Mail',time:0,text:'Remove the newest item a rule added to the form.'},
  cleanrecord:{name:'Clean Record',time:1,text:'Remove 2 Traces.'}
};
// v30: play styles. A card's style shows on its label; the reward screen offers one of each.
const CARD_STYLE={photocopy:'book',notary:'book',reissue:'book',rulebook:'book',citelaw:'book',tabbed:'book',stamppad:'book',completefile:'book',
  cousin:'conn',friend:'conn',smalltalk:'conn',burek:'conn',callfavour:'conn',knowsme:'conn',smile:'conn',
  envelope:'shady',coffee:'shady',backdoor:'shady',backdate:'shady',bigenvelope:'shady',lostmail:'shady',cleanrecord:'shady',argue:'shady'};
const STYLE_NAME={book:'By the book',conn:'Connections',shady:'Shady'};
const FAVOUR_MAX=5,TRACE_MAX=6;
// Cards a reward can offer. Cards in LOCKED_CARDS join the pool for good as you play (see js/meta.js).
const REWARD_POOL=['smile','photocopy','notary','rulebook','argue','number','coffee','envelope','cousin','backdoor','breath','friend','friend','reissue','reissue','backdate',
  'citelaw','tabbed','smalltalk','callfavour','bigenvelope','cleanrecord','burek','knowsme','lostmail','stamppad','completefile'];
const LOCKED_CARDS=['burek','knowsme','lostmail','stamppad','completefile'];
