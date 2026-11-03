/* ============ scroll debug readout (only with ?debug in the link) ============
   Shows screen size, zoom and, for every swipe, what the finger landed on and whether the office/checklist moved.
   Read-only: it never blocks touches (pointer-events:none) and changes nothing in the game. */
if(/[?&]debug\b/.test(location.search)){(()=>{
  const box=document.createElement('pre');
  box.style.cssText='position:fixed;z-index:9999;left:4px;right:4px;top:max(4px,env(safe-area-inset-top,0px));margin:0;padding:6px 8px;'+
    'font:10px/1.3 ui-monospace,Menlo,monospace;white-space:pre-wrap;word-break:break-all;color:#0f0;background:rgba(0,0,0,.82);border-radius:6px;pointer-events:none;max-height:46vh;overflow:hidden';
  document.body.appendChild(box);
  const log=[],q=s=>{log.unshift(s);log.length=6;draw()};
  const nm=el=>!el||!el.tagName?'-':el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(el.classList.length?'.'+[...el.classList].slice(0,3).join('.'):'');
  const chain=el=>{const a=[];for(let e=el;e&&e!==document.documentElement&&a.length<6;e=e.parentElement){const ta=getComputedStyle(e).touchAction;a.push(nm(e)+(ta!=='auto'?'['+ta+']':''))}return a.join(' < ')};
  const sc=()=>document.querySelector('main');
  function info(){
    const m=sc(),vv=visualViewport,d=document.documentElement,cs=m&&getComputedStyle(m);
    return `${typeof GAME_VERSION!=='undefined'?GAME_VERSION:'?'} b${typeof GAME_BUILD!=='undefined'?GAME_BUILD.n:'?'}  ${innerWidth}x${innerHeight} dpr${devicePixelRatio} zoom${vv?vv.scale.toFixed(2):'?'} `+
      `${navigator.standalone?'HOMESCREEN':'browser'} font${getComputedStyle(document.body).fontSize}\n`+
      `page ${d.scrollWidth}x${d.scrollHeight} scroll ${scrollX},${scrollY}\n`+
      (m?`main.${m.className||'-'} h${m.clientHeight}/${m.scrollHeight} top${Math.round(m.scrollTop)} ovf ${cs.overflowY} ta ${cs.touchAction}`:'no main');
  }
  function draw(){box.textContent=info()+'\n—\n'+log.join('\n')}
  let t=null;
  document.addEventListener('touchstart',e=>{const p=e.touches[0],m=sc();
    const top=document.elementFromPoint(p.clientX,p.clientY);
    t={x:p.clientX,y:p.clientY,st:m?m.scrollTop:0,sy:scrollY,n:0,prev:0};
    q(`START ${Math.round(p.clientX)},${Math.round(p.clientY)} hit ${chain(top)}`);
  },{capture:true,passive:true});
  document.addEventListener('touchmove',e=>{if(!t)return;t.n++;if(e.defaultPrevented)t.prev++},{capture:false,passive:true});
  document.addEventListener('touchend',e=>{if(!t)return;const p=e.changedTouches[0],m=sc();
    q(`END dy${Math.round(p.clientY-t.y)} moves${t.n} blocked${t.prev} main moved ${Math.round((m?m.scrollTop:0)-t.st)} page moved ${Math.round(scrollY-t.sy)} cancel? ${e.cancelable}`);t=null},{passive:true});
  document.addEventListener('touchcancel',()=>{q('CANCEL (iOS took the gesture)');t=null},{passive:true});
  addEventListener('resize',draw);setInterval(draw,1000);draw();
})()}
