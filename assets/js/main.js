(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  // Header
  const header = $('[data-header]');
  const menu = $('.menu-toggle');
  const mobile = $('#mobile-menu');
  const syncHeader = () => header?.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', syncHeader, {passive:true}); syncHeader();
  menu?.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  $$('.mobile-nav a').forEach(a => a.addEventListener('click', () => {
    mobile?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  // Navbar search returns to the homepage search and focuses its input.
  const scrollToSearch = () => {
    const box = $('[data-search-box]');
    const input = $('[data-search-input]', box || document);
    if (!box) return;
    box.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    window.setTimeout(() => input?.focus({preventScroll:true}), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450);
  };
  $$('[data-search-link]').forEach(link => link.addEventListener('click', event => {
    const homePath = new URL(link.href, location.href).pathname.replace(/\/$/, '') || '/';
    const currentPath = location.pathname.replace(/\/$/, '') || '/';
    if (homePath !== currentPath) return;
    event.preventDefault();
    mobile?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    scrollToSearch();
  }));
  if (location.hash === '#busca') requestAnimationFrame(() => window.setTimeout(scrollToSearch, 80));

  // Keep the search field docked below the header after it reaches the viewport top.
  $$('[data-search-frame]').forEach(frame => {
    const box = $('[data-search-box]', frame);
    if (!box) return;
    let frameTop = frame.getBoundingClientRect().top + scrollY;
    const offset = () => matchMedia('(max-width: 700px)').matches ? 94 : 86;
    const syncStickySearch = () => {
      if (!box.classList.contains('is-sticky')) frameTop = frame.getBoundingClientRect().top + scrollY;
      const shouldStick = scrollY + offset() >= frameTop;
      if (shouldStick && !box.classList.contains('is-sticky')) {
        frame.style.height = `${frame.getBoundingClientRect().height}px`;
        box.classList.add('is-sticky');
      } else if (!shouldStick && box.classList.contains('is-sticky')) {
        box.classList.remove('is-sticky');
        frame.style.height = '';
      }
    };
    addEventListener('scroll', syncStickySearch, {passive:true});
    addEventListener('resize', syncStickySearch);
    syncStickySearch();
  });

  // Card light + subtle tilt, disabled for coarse pointers.
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer) {
    $$('.js-tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX-r.left)/r.width)*100, y=((e.clientY-r.top)/r.height)*100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
        const rx=(50-y)/13, ry=(x-50)/13;
        card.style.transform=`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px) translateY(-8px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform='');
    });
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.style.setProperty('--mx','70%'); e.target.style.setProperty('--my','25%');
        setTimeout(()=>{e.target.style.setProperty('--mx','30%');e.target.style.setProperty('--my','70%')},700);
      }
    }), {threshold:.45});
    $$('.js-tilt').forEach(c=>io.observe(c));
  }

  // Carousels
  $$('.carousel').forEach(carousel => {
    const track=$('.carousel__track',carousel), prev=$('.carousel__arrow--prev',carousel), next=$('.carousel__arrow--next',carousel);
    if(!track) return;
    const firstCards=[...track.children];
    const baseCount=Math.floor(firstCards.length/2);
    const baseCards=firstCards.slice(0,baseCount);
    if(!baseCards.length) return;
    const cycleWidth=()=>{
      const start=track.children[0], repeat=track.children[baseCount];
      return start&&repeat ? repeat.offsetLeft-start.offsetLeft : 0;
    };
    const fillVisibleLoop=()=>{
      let width=cycleWidth(), copies=0;
      while(width>0 && track.scrollWidth < track.clientWidth+width && copies<24){
        baseCards.forEach(card=>{
          const clone=card.cloneNode(true);
          clone.tabIndex=-1;
          clone.setAttribute('aria-hidden','true');
          track.append(clone);
        });
        copies++;
      }
    };
    fillVisibleLoop();
    addEventListener('resize',fillVisibleLoop,{passive:true});
    const step=202;
    let hovered=false, focused=false, dragging=false, resumeAt=0;
    const canHover=matchMedia('(hover:hover) and (pointer:fine)').matches;
    const speed=matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.018 : 0.045;
    const pauseAfterInteraction = (duration=2600) => { resumeAt=performance.now()+duration; };
    prev?.addEventListener('click',()=>{pauseAfterInteraction();track.scrollBy({left:-step,behavior:'smooth'})});
    next?.addEventListener('click',()=>{pauseAfterInteraction();track.scrollBy({left:step,behavior:'smooth'})});
    if(canHover){
      carousel.addEventListener('pointerenter',()=>{hovered=true});
      carousel.addEventListener('pointerleave',()=>{hovered=false});
    }
    let activePointerId=null;
    carousel.addEventListener('pointerdown',e=>{dragging=true;activePointerId=e.pointerId;resumeAt=Infinity});
    const releasePointer = () => {dragging=false;pauseAfterInteraction()};
    addEventListener('pointerup',e=>{if(e.pointerId===activePointerId){activePointerId=null;releasePointer()}});
    addEventListener('pointercancel',e=>{if(e.pointerId===activePointerId){activePointerId=null;releasePointer()}});
    carousel.addEventListener('touchstart',()=>{dragging=true;resumeAt=Infinity},{passive:true});
    carousel.addEventListener('touchend',releasePointer,{passive:true});
    carousel.addEventListener('touchcancel',releasePointer,{passive:true});
    carousel.addEventListener('wheel',()=>pauseAfterInteraction(3200),{passive:true});
    carousel.addEventListener('focusin',()=>{focused=true});
    carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))focused=false});
    carousel.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key))pauseAfterInteraction()});
    let last=performance.now();
    const loop=(now)=>{
      if(!hovered && !focused && !dragging && now>=resumeAt) {
        const loopWidth=cycleWidth();
        if(loopWidth>0 && track.scrollWidth>=track.clientWidth+loopWidth) {
          const dt=Math.min(32,now-last); track.scrollLeft += dt*speed;
          if(track.scrollLeft>=loopWidth) track.scrollLeft-=loopWidth;
        }
      }
      last=now; requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  // Static search index generated from Jekyll content.
  const normalize = s => (s||'').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const compact = s => normalize(s).replace(/[^a-z0-9\s]/g,' ');
  const distance = (a,b) => {
    if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;
    const prev=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=0;i<a.length;i++){let cur=[i+1];for(let j=0;j<b.length;j++)cur[j+1]=Math.min(cur[j]+1,prev[j+1]+1,prev[j]+(a[i]===b[j]?0:1));prev.splice(0,prev.length,...cur)}
    return prev[b.length];
  };
  const score=(q,item)=>{
    const query=compact(q); if(!query)return 0;
    const title=compact(item.title), aliases=(item.aliases||[]).map(compact), tags=(item.tags||[]).map(compact);
    if(title===query)return 100;
    if(aliases.includes(query))return 96;
    if(title.includes(query))return 88;
    if(aliases.some(x=>x.includes(query)))return 82;
    const words=query.split(/\s+/).filter(Boolean);
    let s=0;
    words.forEach(w=>{
      if(title.includes(w))s+=22;
      if(aliases.some(x=>x.includes(w)))s+=18;
      if(tags.some(x=>x.includes(w)))s+=12;
      const d=distance(w,title.split(/\s+/)[0]||title);
      if(d<=Math.max(1,Math.floor(w.length/4)))s+=12;
    });
    return s;
  };

  const searchBoxes=$$('[data-search-box]');
  if(searchBoxes.length){
    fetch(`${window.CARTORIO_BASE_URL || ''}/search/index.json`).then(r=>r.json()).then(index=>{
      searchBoxes.forEach(box=>{
        const input=$('[data-search-input]',box), results=$('[data-search-results]',box), button=$('[data-search-button]',box), sector=box.dataset.sector;
        const render=()=>{
          const q=input.value.trim(); if(!q){results.hidden=true;results.innerHTML='';return}
          const ranked=index.filter(x=>x.enabled && (!sector||x.setor===sector)).map(x=>({...x,s:score(q,x)})).filter(x=>x.s>10).sort((a,b)=>b.s-a.s).slice(0,8);
          results.innerHTML=ranked.length?ranked.map(x=>`<a class="result" href="${x.url}"><div><small>${x.setor}</small><strong>${x.title}</strong><p>${x.description||''}</p></div></a>`).join(''):`<div class="result"><div><strong>Nenhum resultado encontrado</strong><p>Tente outra palavra ou expressão.</p></div></div>`;
          results.hidden=false;
        };
        input.addEventListener('input',render); button.addEventListener('click',render);
        input.addEventListener('keydown',e=>{if(e.key==='Escape'){results.hidden=true;input.blur()}});
        document.addEventListener('click',e=>{if(!box.contains(e.target))results.hidden=true});
      });
    }).catch(()=>{});
  }
})();
