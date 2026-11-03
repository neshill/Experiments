// ---------- v22: the Vitrina (grandma's glass cabinet): permanent trinkets that carry across runs ----------
const TRINKETS={
  thermos:{name:'Thermos of coffee',text:'+3 patience every morning.',how:'You start with it.'},
  stampbox:{name:'Tin of fee stamps',text:'Start each run with one extra fee stamp of each kind.',how:'Get through the Municipal Registry.'},
  notebook:{name:"Grandpa's notebook",text:'At every office you already know one thing the clerk will ask for.',how:'Get through the Tax Office.'},
  partycard:{name:'Old party card',text:'Once per run, a new rule simply doesn\'t apply to you.',how:'Run out of patience once.'},
  folder:{name:'Plastic folder with sleeves',text:'Keep up to 4 cards at the end of a turn instead of 3.',how:'Open the salary account (win a run).'},
  laminator:{name:'Laminated papers',text:'The documents you start with never get too old.',how:"Found in grandpa's attic."},
  // v30
  rolodex:{name:'Rolodex',text:'Start every chapter with 1 Favour.',how:'Finish a chapter as Braco.'},
  calendar:{name:'Wall calendar from 1984',text:'Closing time costs 3 less patience.',how:'Sit through 6 closing times in one run.'},
  flask:{name:"Grandpa's flask",text:'Start every chapter with a bottle of rakija in your pocket.',how:'Finish chapter 2.'},
  medal:{name:'Medal for Labour',text:'+10 maximum patience.',how:'Get your first pension (win a run).'},
  dmbill:{name:'Old Deutschmark note',text:'The first Small Envelope of each chapter costs no patience.',how:'Hand over 8 envelopes, all runs together.'},
  bookmark:{name:'Bookmark from the law library',text:'Start every run with Cite the Law.',how:'Beat a boss as Amra.'}
};
const START_TRINKETS=['thermos'];
// Pocket items: single-use, like potions. You hold up to 2.
const POCKET={
  rakija:{name:'Bottle of rakija',text:'The clerk skips their next 2 actions.',office:true},
  pita:{name:"Grandma's pita",text:'Recover 8 patience.'},
  ticket:{name:'Priority ticket',text:'+2 time this turn.',office:true}
};
const POCKET_MAX=2;
