// Gossip: C = clerk, K = colleague at the next window.
const GOSSIP_LIFE={
  Vesna:[
    [['C','My son-in-law wants to open a café. In this economy.'],['K','Mine wants to start a podcast.']],
    [['C','I told the doctor I don\'t have stress. I work at the municipality.'],['K','What did he say?'],['C','He laughed for a long time.']],
    [['K','Did you see Mira\'s new car?'],['C','On her salary? I\'m saying nothing. Nothing.']],
    [['C','The burek at the bakery got smaller again.'],['K','And the price got bigger. Like this queue.']],
    [['C','My neighbor\'s dog only barks when I\'m on the balcony.'],['K','It knows.']],
    [['K','Are you going to the wedding on Saturday?'],['C','Which one?'],['K','Exactly.']],
    [['C','Thirty-one years at this window.'],['K','Feels like more.'],['C','It is more. I stopped counting.']],
    [['C','My daughter says I should try yoga.'],['K','You already stretch for the stamp all day.']]
  ],
  Dragan:[
    [['C','The fish weren\'t biting on Sunday.'],['K','Neither are we, today.']],
    [['K','Did you fix the printer?'],['C','I unplugged it and plugged it back in. Now it has a different problem.']],
    [['C','My wife wants to redo the bathroom again.'],['K','Again?'],['C','She saw a new tile.']],
    [['K','Watching the match tonight?'],['C','Only the second half. The first half I\'m here.']],
    [['C','My cousin got a job in Austria.'],['K','Doing what?'],['C','Not this.']],
    [['C','Eleven years until retirement.'],['K','Who\'s counting?'],['C','I am. In days.']],
    [['K','Is the heating on?'],['C','Officially, yes.']],
    [['C','My son wants a PlayStation for his birthday.'],['K','How old?'],['C','Thirty-four.']]
  ],
  Jasna:[
    [['C','My husband finally retired.'],['K','Congratulations.'],['C','Now he\'s home all day.'],['K','My condolences.']],
    [['K','Did you get the thirteenth salary?'],['C','I got a thirteenth form to fill out.']],
    [['C','My grandson says I should be on TikTok.'],['K','Doing what?'],['C','This. Apparently people would watch.']],
    [['C','Sarma or pita for Sunday?'],['K','Both. It\'s Sunday.']],
    [['K','The new software has a button I\'ve never seen.'],['C','Don\'t press it.']],
    [['C','Our neighbor built a third floor without a permit.'],['K','Brave.'],['C','Connected.']],
    [['K','Going to the seaside this year?'],['C','If my leave request gets approved.'],['K','Who approves it?'],['C','Me.']],
    [['C','My daughter-in-law makes the coffee too weak.'],['K','Did you tell her?'],['C','Every visit.']]
  ],
  Zoran:[
    [['C','My son finished economics.'],['K','Congratulations. Where does he work?'],['C','Here. Next month. Room 15.']],
    [['K','How many people did we place in jobs this year?'],['C','Including us?']],
    [['C','I planted tomatoes at the weekend house.'],['K','In October?'],['C','They don\'t know it\'s October.']],
    [['K','Did you see the new form M-4?'],['C','It replaces M-3.'],['K','And M-3?'],['C','Still required.']],
    [['C','My wife says I talk about work at home.'],['K','What do you say?'],['C','I say nothing. That\'s the job.']],
    [['K','The heating guy came.'],['C','And?'],['K','He needs a form.']],
    [['C','Ćevapi after work?'],['K','Ten or five?'],['C','Ten. It\'s been a week.']],
    [['C','Twenty-two years and I still don\'t know what Room 13 does.'],['K','Nobody does. It\'s locked.']]
  ],
  Ana:[
    [['C','He hasn\'t texted back since Tuesday.'],['K','Maybe his phone died.'],['C','For four days?']],
    [['K','Gym after work?'],['C','I\'m going to think about going to the gym.']],
    [['C','My mom keeps asking when I\'ll get married.'],['K','What did you say?'],['C','When the system is back online.']],
    [['K','The new manager is from head office.'],['C','So he\'ll be gone in a month.']],
    [['C','I ordered a dress online. It came in a different color.'],['K','Return it?'],['C','There\'s a form for that. I can\'t.']],
    [['K','Did you see the brunch place that opened?'],['C','Nine marks for two eggs.']],
    [['C','I\'m thinking about moving to Germany.'],['K','Everyone is thinking about moving to Germany.'],['C','Then who will work here?']],
    [['C','The system is slow today.'],['K','It\'s slow every day.'],['C','Today I can feel it.']]
  ]
};
/* ============ the story behind the counters ============
   One thread runs through all five offices: Vesna (Registry) and Zoran (Employment Bureau) are, it seems,
   more than colleagues. Nobody says it. Each office's pair of clerks picks it up from their own angle, so the
   player pieces it together across the run: the green umbrella, the Thursday "inventory", Makarska in July.
   Lines play continuously while you are at the window; null = a short pause between scenes.
   C = the clerk at your window, K = the colleague at the next window. */
const STORY={
  'Registry':[
    ['K',"That's a new scarf."],['C',"It's not new. I just never wore it."],['K','Green suits you. Like the umbrella.'],['C','What umbrella?'],
    ['K','The green one on your coat rack. Yours is red.'],['C','Someone lent it to me. It was raining.'],null,
    ['K','The Employment Bureau called again. Third time this week.'],['C','They had a question about a form.'],['K','Which form?'],
    ['C','A complicated one.'],['K','You were on the phone for forty minutes.'],['C','It is a very complicated form.'],null,
    ['K',"Are you coming to Biljana's name day on Thursday?"],['C',"I can't. Thursday is inventory."],['K',"We don't do inventory."],
    ['C','Then somebody has to start.'],null,
    ['K','You are humming.'],['C',"I'm not humming."],['K',"You've been humming since Tuesday."],
    ['C','That is the radiator.'],['K','Then tell the radiator Zlata says hello.']
  ],
  'Police':[
    ['K','Anything on the parking report?'],['C','Grey Zastava outside the Employment Bureau. Lunch hour. Again.'],['K','Whose?'],
    ['C','Registry permit. And fuzzy dice on the mirror.'],['K',"Vesna's car has fuzzy dice."],['C',"I didn't say Vesna. I said dice."],null,
    ['K',"You're not writing it up?"],['C',"Parking for ninety minutes isn't a crime."],['K','In a forty-five minute zone it is.'],
    ['C','Then the meter must be broken.'],null,
    ['C','Saw Zoran from the Bureau on Saturday. In the rain.'],['K','So?'],['C','No umbrella. Soaked through. Smiling like he won the lottery.'],
    ['K','Maybe he lent his umbrella to someone.'],['C',"That's what I'm afraid of."],null,
    ['K','My wife says the Registry choir rehearses on Thursdays now.'],['C','Vesna sings in a choir?'],
    ['K','Since spring. Funny thing. The choir has never heard of her.'],['C','Mirsad. Some things are not police business.'],
    ['K',"Everything is police business, Dragan. That's the job."],['C',"Then I'm on my break."]
  ],
  'Tax Office':[
    ['K','Holiday requests from the other offices came in.'],['C','And?'],['K','Bureau, Zoran: second week of July.'],
    ['K','Registry, Vesna: second week of July.'],['C','Lots of people like July.'],['K','Both wrote "Makarska". Same nervous handwriting.'],null,
    ['C',"We don't comment on other people's forms, Biljana."],["K","I'm not commenting. I'm cross-referencing."],['C','...Same hotel?'],
    ['K','Different hotels. Next door to each other.'],['C',"Well. That's practically a different city."],null,
    ['K','Zoran claimed a deduction for "flowers, office decoration".'],['C','The Bureau has no flowers. I was there in May.'],
    ['K','It has one vase now. On the counter where the Registry drops off the mail.'],['C','On Thursdays?'],['K','Only on Thursdays.'],null,
    ['K','Vesna skipped my name day. "Inventory," she said.'],["C","The Registry doesn't do inventory."],['K','It does now. Thursdays.'],null,
    ['C','Do you think anyone knows?'],['K',"Everyone knows. Nobody says. It's the most efficient system in this city."],
    ['C','If only the paperwork worked like that.']
  ],
  'Bureau':[
    ['K','Who are the flowers for?'],['C','The office. Morale.'],['K','Our morale has been fine for nineteen years.'],['C','Then it deserves flowers.'],null,
    ['C','Nedim, do people... talk? About me?'],['K','People talk about the weather, the prices, and you. In that order.'],['C','What do they say?'],
    ['K','That you walk differently. Like a man whose X-ray came back clean.'],null,
    ['K','Coffee at ten again?'],["C","It's just coffee."],['K','Every day at ten for four months is not a coffee. It is a schedule.'],
    ['C',"Then I'll put it in the schedule."],['K','Under what?'],['C','"Inter-office coordination."'],null,
    ['C','Have you seen my green umbrella? I lent it out.'],['K','To whom?'],['C','To someone who needed it more.'],
    ['K','It was raining on everyone, Zoran.'],['C','Not in the same way.'],['K','That is either very romantic or very bad meteorology.'],null,
    ['K','The Tax Office asked about your July request.'],['C','What did you tell them?'],['K','That you love the sea.'],
    ['C','I do love the sea.'],['K','You get seasick in the bathtub.']
  ],
  'Bank':[
    ['K','Did you see who came in this morning?'],['C','Mrs. Vesna from the Registry. Opening a savings account.'],['K','What for?'],
    ['C','The form says "travel".'],['K','For one?'],["C","The form doesn't ask. I checked twice."],null,
    ['K','And at noon, Zoran from the Bureau. Same counter.'],['C','He asked for the exchange rate. Dinars to "whatever they use at the seaside".'],
    ['K','We use dinars at the seaside, Ana.'],['C','I told him. He said, "Good. Then nothing has to change."'],null,
    ['K','Then a transfer. From her to him. A small amount.'],['C','What did the memo say?'],['K','"For the umbrella."'],
    ['C',"That's either a debt or a love letter."],['K','At this bank it is both. We charge a fee for each.'],null,
    ['C','Her husband came by after lunch. Asked if his wife had been in.'],['K','What did you say?'],['C','"Bank secrecy."'],
    ['K',"You've never said bank secrecy in your life."],['C','I was saving it for something worth it.'],null,
    ['K','So. Do you think they will?'],['C','Go to Makarska?'],['K','Go anywhere.'],
    ['C','Love in this city is like a building permit. Everyone talks about it, nobody sees it, and somehow it still happens.'],
    ['K','You should work at the Registry.'],['C','One clerk in love over there is enough.']
  ]
};
const GOSSIP_TELL={
  sigh:[[['C','How many more of them today?'],['K','You don\'t want to know.']],[['C','My back is killing me.'],['K','It\'s the chairs.']]],
  rule:[[['K','There was a new instruction this morning.'],['C','Oh? Let me see that.']],[['C','Wasn\'t there something about an extra form?'],['K','There\'s always an extra form.']]],
  reject:[[['K','Is that the old stamp design?'],['C','Hm. Let me look again.']],[['C','These new copies are so faint.'],['K','A faint copy is not a copy.']]],
  break:[[['K','Coffee?'],['C','Give me two minutes.']],[['C','I haven\'t eaten since seven.'],['K','Bakery?'],['C','Bakery.']]],
  phone:[[['C','My sister is supposed to call about the wedding.'],['K','Which wedding?']],[['C','If my phone rings, I have to take it.'],['K','It always rings.']]]
};
