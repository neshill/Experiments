// v28: clerk moods. Each run every clerk is in a mood (Registry: maybe one, mild; Bank: two, the second one hidden).
// A mood is a rule for that whole office. hurts = the way of playing it makes harder (book: papers and copies,
// shady: envelopes and favours, all: everyone); good moods help. Rolled once per run in rollMoods().
const MOODS={
  nocopier:{title:'The copier is broken.',text:"Photocopy can't be played here. Bring your copies with you.",hurts:'book'},
  originals:{title:"Doesn't trust copies today.",text:"Plain copies don't count here. Certified copies still do.",hurts:'book'},
  fresh:{title:'Read a new circular this morning.',text:'Every date limit here is 2 days shorter. Lines with no limit want papers at most 7 days old.',hurts:'book'},
  wetink:{title:'Suspicious of fresh ink.',text:"Papers dated today don't count here, fresh certified copies included. Backdated papers are fine.",hurts:'book'},
  picky:{title:'Checks everything twice.',text:'Rejects papers twice as often.',hurts:'book'},
  camera:{title:'Knows the camera is on.',text:'Shady cards cost double patience here.',hurts:'shady'},
  noenvelope:{title:'Just had a talk with the director.',text:"Small Envelope can't be played here.",hurts:'shady'},
  early:{title:'Wants to leave early.',text:'The window closes one turn earlier each day.',hurts:'all'},
  lunch:{title:'Hungry. Lunch is at 11.',text:"On the 3rd turn of each day the window is shut: you can't hand in papers, only play actions.",hurts:'all'},
  ticket:{title:'Strict about the queue.',text:'First turn of each day: draw 1 card less.',hurts:'all',mild:true},
  nosleep:{title:"Didn't sleep.",text:'Sighs and coffee breaks hit 2 harder.',hurts:'all',mild:true},
  memo:{title:'Got a new memo.',text:'Remembers new rules twice as often.',hurts:'all'},
  coffee:{title:'Dying for a coffee.',text:'Coffee for the Clerk costs no patience here and draws 1.',good:true},
  prepared:{title:'Loves a tidy file.',text:'Every line you tick with a document: +2 patience.',good:true},
  birthday:{title:"It's [[his|her]] birthday.",text:'Sighs and coffee breaks hit 2 softer.',good:true},
  friday:{title:'Friday feeling.',text:'First turn of each day: draw 1 card more.',good:true}
};
const MOOD_COUNT=[1,1,1,1,2],MOOD_CLASH=[['early','lunch'],['camera','noenvelope'],['camera','coffee'],['nosleep','birthday'],['ticket','friday']];
