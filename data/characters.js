// v30: who you play. Each character leans into one play style: a different starting deck, a signature keepsake
// (always with them, on top of what they take from the Vitrina) and a starting patience.
// deck: cards added to / removed from the shared starting deck (see startingDeck() in js/campaign.js).
// unlock: what opens the character (null = available from the start).
const CHARACTERS={
  student:{name:'Amra',role:'The Student',style:'book',patience:80,
    blurb:'Top of her class. Has read every regulation, twice, and highlighted the important parts.',
    perk:'Highlighter',perkText:'At every office you hear in advance the first thing the clerk will "almost forget". Starts with 2 extra redraws.',redraws:2,
    add:['notary','rulebook','tabbed'],remove:['envelope'],unlock:null},
  fixer:{name:'Braco',role:'The Fixer',style:'conn',patience:80,favours:1,
    blurb:'Knows everyone. Everyone owes him. He owes everyone.',
    perk:'Address book',perkText:'Start with 1 Favour and get 1 more after every office. Call Your Cousin costs 1 Favour instead of patience.',
    add:['cousin','smalltalk','callfavour'],remove:['notary','rulebook'],unlock:'Finish chapter 1 once.'},
  returnee:{name:'Dado',role:'The Returnee',style:'shady',patience:70,
    blurb:'Back from Germany with a Golf, a wallet of Deutschmarks and no patience for queues.',
    perk:'Deutschmarks',perkText:'Small Envelopes and Big Envelopes cost 3 less patience.',
    add:['envelope','backdate','coffee'],remove:['photocopy','friend'],unlock:'Finish chapter 2 once.'}
};
const CHAR_ORDER=['student','fixer','returnee'];
