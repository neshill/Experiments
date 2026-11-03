// v30: a run is a life in three chapters. Each chapter is 4 offices and a boss office (the 5th, boss:true).
// The paper one office hands you (reward) is what the next one asks for first (the chain line).
// Rows and rules here are only defaults: every run rolls fresh forms (see js/forms.js); turns, dmg, tier and intents stay.
// look = whose clerk picture, office backdrop and small talk a placeholder office borrows until it gets its own art.
// tier = how strict the clerk is; intents = extra clerk moves (certify: demand certified copies, stale: tighten a date
// limit, system: the system is down).
const CHAPTER_ORDER=['youth','job','old'];
const CHAPTERS={
 youth:{title:'Youth',goal:'Student ID',age:'Age 18',
  intro:'You passed the entrance exam. Now the university wants proof that you exist, that you are healthy, and that you went to school.',
  // papers the random forms can ask for in this chapter (besides the chain); 'fee' = a fee stamp of some kind
  plain:['id','birth','school','utility','photo','fee'],
  // papers you get at the start of this chapter
  start:[['school','original'],['school','original']],
  offices:[
  {name:'Registry',short:'Registry',full:'Municipal Registry',window:'Window 3',clerk:'Vesna',title:'Mrs.',pal:'Zlata',goal:'Citizenship Certificate',turns:5,dmg:2,tier:1,
   rows:[['id','original'],['birth','copy'],['photo','original'],['fee_mun','original']],rules:[['birth','alt']],ft1p:'alive',reward:'citizenship',intents:{}},
  {name:'Health',look:'Bureau',short:'Health',full:'Health Centre',window:'Clinic 4',clerk:'Senad',title:'Dr.',male:true,pal:'Nedim',goal:'Medical Certificate',turns:5,dmg:3,tier:2,
   rows:[['id','original'],['citizenship','copy'],['photo','original'],['fee_adm','original']],rules:[['birth','copy']],ft1p:'nodebt',reward:'medical',intents:{stale:.6}},
  {name:'School',look:'Tax Office',short:'School',full:'Grammar School Office',window:'Secretariat',clerk:'Mira',title:'Mrs.',pal:'Biljana',goal:'School Transcript',turns:5,dmg:3,tier:2,
   rows:[['id','copy'],['school','original'],['medical','copy'],['fee_mun','original']],rules:[['birth','original']],ft1p:'diploma',reward:'transcript',intents:{certify:.8}},
  {name:'Police',short:'Police',full:'Police Station',window:'Counter 2',clerk:'Dragan',title:'Mr.',pal:'Mirsad',goal:'Certificate of Residence',turns:5,dmg:3,tier:3,
   rows:[['id','original'],['transcript','copy'],['utility','original',6],['photo','original']],rules:[['fee_adm','original']],ft1p:'landlord',reward:'residence',intents:{certify:.8,stale:.8,system:.8}},
  {name:'Admissions',look:'Bank',boss:'reprint',short:'University',full:'University Admissions',window:'Student Service',clerk:'Ljiljana',title:'Mrs.',pal:'Lejla',goal:'Student ID',turns:6,dmg:4,tier:4,
   rows:[['id','original'],['residence','copy'],['transcript','alt'],['medical','copy'],['photo','original']],rules:[['citizenship','copy'],['fee_fed','original']],ft1p:'salary',reward:null,intents:{certify:1.2,stale:1.2,system:.8}}
  ]},
 job:{title:'First job',goal:'Salary account',age:'Age 27',
  intro:'You got the job. Your employer pays salaries only into a local bank account, and your first payday is soon.',
  plain:['id','birth','rental','utility','joboffer','photo','fee'],
  start:[['rental','original'],['joboffer','original'],['utility','original']],
  offices:[
  {name:'Registry',short:'Registry',full:'Municipal Registry',window:'Window 3',clerk:'Vesna',title:'Mrs.',pal:'Zlata',goal:'Citizenship Certificate',turns:5,dmg:3,tier:1,
   rows:[['id','original'],['birth','copy'],['photo','original'],['fee_mun','original']],
   rules:[['birth','alt'],['utility','copy']],ft1p:'alive',reward:'citizenship',intents:{}},
  {name:'Police',short:'Police',full:'Police Station',window:'Counter 2',clerk:'Dragan',title:'Mr.',pal:'Mirsad',goal:'Certificate of Residence',turns:5,dmg:3,tier:2,
   rows:[['id','original'],['rental','copy'],['citizenship','copy'],['utility','original',6]],
   rules:[['fee_adm','original'],['photo','original']],ft1p:'landlord',reward:'residence',intents:{certify:.7,stale:.6,system:.8}},
  {name:'Tax Office',short:'Tax',full:'Tax Office',window:'Counter 7',clerk:'Jasna',title:'Mrs.',pal:'Biljana',goal:'Tax Number',turns:5,dmg:4,tier:3,
   rows:[['id','copy'],['residence','alt',6],['joboffer','copy'],['fee_fed','original']],
   rules:[['birth','original'],['utility','copy',5]],ft1p:'nodebt',reward:'taxno',intents:{certify:1,stale:1,system:1}},
  {name:'Bureau',short:'Bureau',full:'Employment Bureau',window:'Room 14',clerk:'Zoran',title:'Mr.',pal:'Nedim',goal:'Employment Registration',turns:5,dmg:4,tier:4,
   rows:[['id','copy'],['taxno','copy',5],['joboffer','original'],['photo','original']],
   rules:[['residence','copy',6],['fee_adm','original']],ft1p:'diploma',reward:'workreg',intents:{certify:1.3,stale:1.3,system:1}},
  {name:'Bank',boss:'migration',short:'Bank',full:'Bank',window:'Desk 2',clerk:'Ana',title:'Ms.',pal:'Lejla',goal:'Salary Account',turns:6,dmg:5,tier:5,
   rows:[['id','original'],['residence','copy',4],['taxno','alt'],['workreg','copy',4],['joboffer','original']],
   rules:[['citizenship','copy'],['fee_fed','original']],ft1p:'salary',reward:null,intents:{certify:1.5,stale:1.6,system:1.2}}
  ]},
 old:{title:'Old age',goal:'First pension',age:'Age 65',
  intro:'Forty years of work. Now the state wants proof of every one of them before it pays you a single dinar.',
  plain:['id','birth','marriage','utility','rental','photo','fee'],
  start:[['marriage','original'],['marriage','original']],
  offices:[
  {name:'Pension',look:'Bureau',short:'Pension Fund',full:'Pension Fund',window:'Counter 11',clerk:'Hamid',title:'Mr.',male:true,pal:'Nedim',goal:'Work Record Book',turns:5,dmg:4,tier:3,
   rows:[['id','original'],['birth','copy'],['workreg','copy'],['fee_adm','original']],rules:[['taxno','copy']],ft1p:'salary',reward:'workbook',intents:{stale:1,system:1}},
  {name:'Insurance',look:'Registry',short:'Insurance',full:'Health Insurance Fund',window:'Window 6',clerk:'Rada',title:'Mrs.',pal:'Zlata',goal:'Health Insurance Card',turns:5,dmg:4,tier:3,
   rows:[['id','copy'],['workbook','copy'],['marriage','original'],['photo','original']],rules:[['residence','copy',6]],ft1p:'alive',reward:'insurance',intents:{certify:1,stale:1}},
  {name:'Court',look:'Police',short:'Court',full:'Municipal Court',window:'Registry Office',clerk:'Branko',title:'Mr.',pal:'Mirsad',goal:'Ownership Certificate',turns:5,dmg:5,tier:4,
   rows:[['id','original'],['insurance','copy'],['rental','original'],['fee_fed','original']],rules:[['birth','alt']],ft1p:'landlord',reward:'ownership',intents:{certify:1.3,stale:1.2,system:1}},
  {name:'Cadastre',look:'Tax Office',short:'Cadastre',full:'Land Registry',window:'Counter 3',clerk:'Snježana',title:'Mrs.',pal:'Biljana',goal:'Land Registry Extract',turns:5,dmg:5,tier:4,
   rows:[['id','copy'],['ownership','copy',5],['utility','original'],['fee_mun','original']],rules:[['marriage','copy']],ft1p:'nodebt',reward:'landreg',intents:{certify:1.3,stale:1.4,system:1.2}},
  {name:'Commission',look:'Bank',boss:'newchair',short:'Commission',full:'Pension Commission',window:'Room 1',clerk:'Muhamed',title:'Chairman',male:true,pal:'Lejla',goal:'First Pension',turns:6,dmg:6,tier:5,
   rows:[['id','original'],['workbook','copy'],['landreg','alt'],['insurance','copy',4],['birth','original']],rules:[['marriage','copy'],['fee_adm','original']],ft1p:'diploma',reward:null,intents:{certify:1.6,stale:1.6,system:1.2}}
  ]}
};
// The offices of the chapter you are in. setChapter() refills this array in place, so code that reads OFFICES keeps working.
let CHAPTER=CHAPTERS[CHAPTER_ORDER[0]];
const OFFICES=CHAPTER.offices.slice();
// male: grammatical gender of the clerk ([[he|she]] in sentences); label: the office name as shown (name stays the art key)
CHAPTER_ORDER.forEach(k=>CHAPTERS[k].offices.forEach(d=>{if(d.male==null)d.male=d.title==='Mr.';d.label=d.name}));
// look: the existing office whose art a placeholder office uses
const lookOf=d=>d.look||d.name;
// FT1P is an unforeseen complication: it happens when one line is left, at some offices. Which offices is decided at the start
// of each chapter (S.ftPlan), so "My Friend Went Last Week" can tell you the truth about it. At least one office always does it.
const FT1P_CHANCE=0.45;
// Hand rules: at end of turn you keep at most KEEP_MAX cards; each turn you draw back up to HAND_SIZE.
const KEEP_MAX=3, HAND_SIZE=5;
