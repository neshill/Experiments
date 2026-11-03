// v30: boss offices, the last office of each chapter. A boss clerk is always in their signature mood (shown on the map,
// so you can prepare) plus one rolled mood, and halfway through the form something changes: the second phase.
const BOSSES={
  reprint:{sig:'originals',title:'A new rulebook',
    warn:'Halfway through, the rules change.',
    text:'The Rector has just signed a new rulebook. Every item you have not ticked yet is reprinted as a different paper, and one more is added.'},
  migration:{sig:'fresh',title:'System migration',
    warn:'Halfway through, the bank changes computer systems.',
    text:'The bank moves to a new computer system, today of all days. For the next 2 turns you get 1 less time, and every item you have not ticked yet wants a paper at most 3 days old.'},
  newchair:{sig:'memo',title:'A new chairman',
    warn:'Halfway through, the commission changes chairman.',
    text:'The chairman retires on the spot. The new one un-ticks one item "to check it again himself" and comes in with a mood of his own.'}
};
