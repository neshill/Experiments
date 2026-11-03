// ---------- v22: the map between offices ----------
// Every step on the map is one day. Good stops help, bad ones hurt, ? is a small choice.
const NODES={
  cafe:{kind:'good',name:'Café across the street',text:'Sit down. Have a coffee. Recover 10 patience.'},
  kafana:{kind:'good',name:'Kafana',text:'Recover 20 patience. Tomorrow you start with 1 less time.'},
  kiosk:{kind:'good',name:'Kiosk & photo booth',text:'Get one fee stamp of each kind and 1 Photo 3×4.'},
  copyshop:{kind:'good',name:'Copy shop',text:'Pick an original. Get 2 copies of it.'},
  counter:{kind:'good',name:'Citizen service centre',text:'Re-issue up to 2 documents: they are dated today.'},
  cousin:{kind:'good',name:'Visit your cousin',text:'Coffee, gossip, and a useful connection.'},
  shred:{kind:'good',name:'Clean out your cards',text:'Throw away one card.'},
  drawer:{kind:'good',name:"Your aunt's drawer",text:'She keeps every paper ever issued. Take one strange paper.'},
  bus:{kind:'bad',name:"The bus doesn't come",text:'You wait 50 minutes in the rain. −6 patience.'},
  reno:{kind:'bad',name:"Neighbour's renovation",text:'Drilling from 7:00. −5 patience, and 1 less time on your first turn tomorrow.'},
  flood:{kind:'bad',name:'Burst pipe upstairs',text:'Water on your papers. One document is smudged and counts as old. −2 patience.'},
  inlaw:{kind:'bad',name:'Mother-in-law visits',text:'−8 patience. She leaves you a pita.'},
  strike:{kind:'bad',name:'Post office strike',text:'Nobody tells you until you get there. −5 patience.'},
  event:{kind:'event',name:'Something comes up',text:'A small choice. Could go either way.'},
  attic:{kind:'rare',name:"Grandpa's attic",text:'Dusty boxes. Something in here is worth keeping, for good.'}
};
const GOOD_NODES=['cafe','kafana','kiosk','copyshop','counter','cousin','shred','drawer'],BAD_NODES=['bus','reno','flood','inlaw','strike'];
const EVENTS={
  petition:{title:'A neighbour with a petition',text:'"For the new playground. Just a signature. And your ID number. And your father\'s name."',
    a:{label:'Sign it',text:'−3 patience. She owes you one: a pocket item.'},b:{label:'Walk past',text:'Nothing happens.'}},
  wedding:{title:"Your cousin's wedding",text:'Four hundred guests, a brass band, and everyone wants to know when you\'re getting married.',
    a:{label:'Go',text:'−6 patience. You meet someone useful: a connection.'},b:{label:'Send an envelope',text:'−2 patience.'}},
  classmate:{title:'An old classmate',text:'She works at the municipality now. She remembers you copied her homework.',
    a:{label:'Ask a favour',text:'Get a Notary Owes You card.'},b:{label:'Just chat',text:'Recover 5 patience.'}},
  scratch:{title:'Scratch card at the kiosk',text:'The kiosk lady swears the last winner was here last week.',
    a:{label:'Buy one',text:'Half the time: a bottle of rakija. Otherwise −3 patience.'},b:{label:'Skip it',text:'Nothing happens.'}},
  wallet:{title:'A wallet on the pavement',text:'Inside: an ID card, three receipts and a photo of a dog.',
    a:{label:'Take it to the police',text:'Recover 8 patience. Good karma.'},b:{label:'Leave it at the kiosk',text:'Nothing happens.'}}
};
const RELICS={
  notaryneighbor:{name:'Neighbor who is a notary',text:'Notarize costs 1 time.'},
  policeuncle:{name:'Uncle in the police',text:'Shady actions cost 1 less patience.'},
  thickskin:{name:'Thick skin',text:'Clerk sighs and coffee breaks cost you 1 less patience.'},
  insider:{name:'Friend on the inside',text:'When a clerk says FT1P, draw 2 and gain 1 time.'}
};
