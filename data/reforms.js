// v30: Reform levels, the difficulty ladder (like Ascension in Slay the Spire). Each character climbs on their own:
// winning a full run at level N opens level N+1 for that character. Every level keeps all the ones below it.
const REFORMS=[
  null, // level 0: no reform
  {name:'Austerity',text:'You start with 10 less patience.'},
  {name:'Streamlining',text:'Clerks hit 1 harder.'},
  {name:'New forms',text:'Every form has one more line.'},
  {name:'Customer focus',text:'Every clerk is in a mood, the first Registry too.'},
  {name:'Digitalisation',text:'You start each chapter with 1 less redraw.'},
  {name:'Working hours',text:'Closing time costs 10 patience instead of 5.'},
  {name:'Harmonisation',text:'Between chapters you recover only 10 patience.'},
  {name:'Transparency',text:'Shady cards cost 1 more patience.'},
  {name:'Efficiency',text:'Rewards offer one card less.'},
  {name:'The Big Reform',text:'Bosses are in a third mood.'}
];
const REFORM_MAX=REFORMS.length-1;
const reformOn=n=>!!S&&(S.reform||0)>=n;
