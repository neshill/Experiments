
/* ============ boot (keeps an in-progress run across page updates) ============ */
function boot(data){
  // v22 changed the save format (days, map, Vitrina), so a v21 run in progress can't continue: it starts fresh.
  if(data&&data.S&&data.S.cards&&data.S.v===12){S=data.S;if(data.META)META=data.META}else{newRun()}
  S.v=12;if(S.chapter!=null)setChapter(S.chapter);if(S.forms)applyForms();S.bag=S.bag||[];if(S.redraws==null)S.redraws=0;setLang(detectLang(),false);render();
}
window.claude?.hot?.snapshot?.(()=>({S,META}));
window.claude?.hot?.ready?window.claude.hot.ready(boot):boot(window.claude?.hot?.data??{});
