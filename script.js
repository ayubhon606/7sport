/* ========= SOZLAMALAR: kontaktlarni shu yerda o'zgartiring ========= */
const CFG = {
  telegram: 'sport7_kokand',
  instagram: '7sport_kokand',
  phones: ['+998 90 123 45 67', '+998 91 234 56 78'],
  address: "Qo'qon shahri, Farg'ona viloyati",
  hours: 'Har kuni 09:00 – 20:00',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=7+Sport+Qo%27qon'
};

/* ========= Ranglar va SVG rasmlar ========= */
const COL = {
  black:'#16181D', white:'#F4F5F7', blue:'#23408E', grey:'#6E7480',
  olive:'#58623A', sand:'#BBA77C', red:'#9E2F2B'
};
const lum = h => { const n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255; return (0.299*r+0.587*g+0.114*b)/255; };
const shade = (h,k) => { const n=parseInt(h.slice(1),16); const f=v=>Math.max(0,Math.min(255,Math.round(v*k))); return '#'+[n>>16&255,n>>8&255,n&255].map(f).map(v=>v.toString(16).padStart(2,'0')).join(''); };
const ST = 'stroke="rgba(0,0,0,.28)" stroke-width="1.6" stroke-linejoin="round"';
let uid = 0;
const mark = (x,y,s,ink) => `<text x="${x}" y="${y}" font-family="Archivo,Arial Black,sans-serif" font-weight="900" font-size="${s}" text-anchor="middle" fill="${ink}">7</text>`;

const ART = {
  tshirt:(c,d,ink,o)=>`
    <path d="M62 30 L84 22 Q100 40 116 22 L138 30 L172 64 L150 86 L138 74 L138 174 L62 174 L62 74 L50 86 L28 64 Z" fill="${c}" ${ST}/>
    <path d="M62 30 L28 64 L50 86 L62 74Z" fill="${d}" opacity=".35"/><path d="M138 30 L172 64 L150 86 L138 74Z" fill="${d}" opacity=".35"/>
    ${o.stripe?`<path d="M62 108 H138 V124 H62Z" fill="${o.stripe}"/>`:''}
    <path d="M84 22 Q100 52 116 22 Q100 40 84 22Z" fill="${d}" ${ST}/>
    ${mark(100,o.stripe?100:98,o.stripe?20:24,ink)}
    <path d="M62 164 H138" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>`,
  tank:(c,d,ink)=>`
    <path d="M72 24 L88 24 Q100 62 112 24 L128 24 Q130 58 142 78 L138 174 L62 174 L58 78 Q70 58 72 24Z" fill="${c}" ${ST}/>
    <path d="M58 78 Q70 58 72 24 L66 30 Q64 60 58 78Z" fill="${d}" opacity=".4"/>
    ${mark(100,122,26,ink)}
    <path d="M62 164 H138" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>`,
  hoodie:(c,d,ink)=>`
    <path d="M66 58 L134 58 L178 152 L154 164 L138 122 L138 178 L62 178 L62 122 L46 164 L22 152 Z" fill="${c}" ${ST}/>
    <path d="M66 58 L22 152 L46 164 L62 122Z" fill="${d}" opacity=".3"/><path d="M134 58 L178 152 L154 164 L138 122Z" fill="${d}" opacity=".3"/>
    <path d="M68 60 Q64 12 100 10 Q136 12 132 60 Q100 82 68 60Z" fill="${d}" ${ST}/>
    <path d="M80 56 Q100 22 120 56 Q100 70 80 56Z" fill="rgba(0,0,0,.5)"/>
    <path d="M92 72 V102 M108 72 V102" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M72 140 H128 L134 170 H66Z" fill="${d}" opacity=".4" ${ST}/>
    ${mark(100,128,18,ink)}`,
  jacket:(c,d,ink)=>`
    <path d="M66 52 L134 52 L178 152 L154 164 L138 122 L138 178 L62 178 L62 122 L46 164 L22 152 Z" fill="${c}" ${ST}/>
    <path d="M66 52 L22 152 L46 164 L62 122Z" fill="${d}" opacity=".3"/><path d="M134 52 L178 152 L154 164 L138 122Z" fill="${d}" opacity=".3"/>
    <path d="M62 62 L28 146 M138 62 L172 146" stroke="${ink}" stroke-width="5" stroke-linecap="round" opacity=".9"/>
    <path d="M78 34 L122 34 L126 58 L100 70 L74 58Z" fill="${d}" ${ST}/>
    <path d="M100 70 V178" stroke="${ink}" stroke-width="2.6"/><circle cx="100" cy="82" r="4" fill="${ink}"/>
    ${mark(120,100,15,ink)}`,
  pants:(c,d,ink,o)=>{const w=o.wide?10:0; return `
    <path d="M${62-w} 22 H${138+w} L${146+w*2} 178 H108 L100 80 L92 178 H${54-w*2} Z" fill="${c}" ${ST}/>
    <rect x="${62-w}" y="22" width="${76+w*2}" height="16" fill="${d}" opacity=".45"/>
    <path d="M92 38 V54 M108 38 V54" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M${66-w} 42 L${58-w*2} 168 M${134+w} 42 L${142+w*2} 168" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M${54-w*2} 166 H93 V178 H${54-w*2}Z M107 166 H${146+w*2} V178 H107Z" fill="${d}" opacity=".55"/>`},
  shorts:(c,d,ink)=>`
    <path d="M60 40 H140 L154 146 H108 L100 96 L92 146 H46 Z" fill="${c}" ${ST}/>
    <rect x="60" y="40" width="80" height="14" fill="${d}" opacity=".45"/>
    <path d="M92 54 V70 M108 54 V70" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M62 62 L52 142 M138 62 L148 142" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
    ${mark(76,120,16,ink)}`,
  leggings:(c,d,ink)=>`
    <path d="M66 22 H134 L130 178 H106 L100 66 L94 178 H70 Z" fill="${c}" ${ST}/>
    <rect x="66" y="22" width="68" height="16" fill="${d}" opacity=".55"/>
    <path d="M70 150 H94 M106 150 H130" stroke="${ink}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M73 156 H93 M107 156 H127" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"/>
    ${mark(100,60,13,ink)}`,
  set:(c,d,ink)=>`<g transform="translate(0 24) scale(.7)">${ART.jacket(c,d,ink)}</g><g transform="translate(80 24) scale(.7)">${ART.pants(c,d,ink,{})}</g>`,
  sneakers:(c,d,ink)=>`
    <ellipse cx="100" cy="166" rx="78" ry="5" fill="rgba(0,0,0,.2)"/>
    <path d="M26 140 L28 112 Q30 96 52 94 L78 90 Q92 70 108 86 L122 104 Q172 108 180 140Z" fill="${c}" ${ST}/>
    <path d="M140 112 Q172 114 178 138 L136 138 Z" fill="${d}" opacity=".4"/>
    <path d="M78 90 Q92 70 108 86 L100 100Z" fill="${d}" ${ST}/>
    <path d="M30 140 L28 112 Q30 98 44 95 L60 94 Q56 118 62 140Z" fill="${d}" opacity=".3"/>
    <path d="M90 94 L102 108 M102 88 L114 102 M110 98 L120 106" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M54 132 Q92 112 130 134" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M22 140 H182 Q184 160 164 160 H40 Q22 160 22 140Z" fill="#F4F5F7" ${ST}/>
    <path d="M30 150 H172" stroke="rgba(0,0,0,.12)" stroke-width="2"/>`,
  cap:(c,d,ink)=>`
    <path d="M42 120 Q40 54 100 54 Q160 54 158 120Z" fill="${c}" ${ST}/>
    <path d="M100 56 V120 M70 62 Q64 90 66 120 M130 62 Q136 90 134 120" stroke="rgba(0,0,0,.2)" fill="none" stroke-width="1.6"/>
    <circle cx="100" cy="54" r="5" fill="${d}"/>
    <path d="M40 120 H158 Q192 124 188 140 Q150 150 40 134Z" fill="${d}" ${ST}/>
    ${mark(100,102,28,ink)}`,
  bag:(c,d,ink)=>`
    <path d="M82 36 Q100 8 118 36" fill="none" stroke="${d}" stroke-width="7" stroke-linecap="round"/>
    <path d="M48 62 Q26 96 38 156" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round"/>
    <path d="M152 62 Q174 96 162 156" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round"/>
    <rect x="48" y="32" width="104" height="142" rx="28" fill="${c}" ${ST}/>
    <path d="M48 80 H152" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    <rect x="64" y="104" width="72" height="54" rx="12" fill="${d}" opacity=".5" ${ST}/>
    <path d="M70 120 H130" stroke="${ink}" stroke-width="2.6" stroke-dasharray="6 5" stroke-linecap="round"/>
    ${mark(100,68,24,ink)}`,
  ball:(c,d,ink)=>{const id='cl'+(++uid); return `
    <defs><clipPath id="${id}"><circle cx="100" cy="100" r="70"/></clipPath></defs>
    <circle cx="100" cy="100" r="70" fill="#F4F5F7" ${ST}/>
    <g clip-path="url(#${id})">
      <polygon points="100,78 120.9,93.2 113,117.8 87,117.8 79.1,93.2" fill="${c}"/>
      <path d="M100 78 L100 44 M120.9 93.2 L152 82 M113 117.8 L132 144 M87 117.8 L68 144 M79.1 93.2 L48 82" stroke="${c}" stroke-width="2.4" fill="none"/>
      <polygon points="100,22 118,34 112,54 88,54 82,34" fill="${c}"/>
      <polygon points="166,70 176,92 160,106 142,94 146,74" fill="${c}"/>
      <polygon points="34,70 54,74 58,94 40,106 24,92" fill="${c}"/>
      <polygon points="140,150 160,152 166,172 148,184 130,170" fill="${c}"/>
      <polygon points="60,150 70,170 52,184 34,172 40,152" fill="${c}"/>
    </g>
    <circle cx="100" cy="100" r="70" fill="none" ${ST}/>`}
};
function art(type,colorKey,o={}){
  const c = COL[colorKey], d = shade(c,.72), ink = lum(c)>.56 ? '#14161A' : '#FFFFFF';
  return `<svg viewBox="0 0 200 200" role="img" aria-hidden="true" focusable="false">${ART[type](c,d,ink,o)}</svg>`;
}



const artG = (type,key,o={}) => { const c=COL[key], d=shade(c,.72), ink=lum(c)>.56?'#14161A':'#FFFFFF'; return ART[type](c,d,ink,o); };

/* photo: bo'sh. Haqiqiy rasm manzilini yozsangiz, chizma o'rniga foto chiqadi. */
const P = [
 {n:'Core futbolka',t:'tshirt',c:'black',cat:'Futbolka',who:'Erkaklar',p:129,s:'S–XXL'},
 {n:'Dry-Fit futbolka',t:'tshirt',c:'blue',cat:'Futbolka',who:'Erkaklar',p:149,s:'S–XXL',f:'Yangi'},
 {n:'Oversayz futbolka',t:'tshirt',c:'grey',cat:'Futbolka',who:'Unisex',p:139,s:'M–XXL'},
 {n:'Retro futbolka',t:'tshirt',c:'white',cat:'Futbolka',who:'Unisex',p:135,s:'S–XL',f:'Hit',o:{stripe:'#23408E'}},
 {n:'Run mayka',t:'tank',c:'red',cat:'Futbolka',who:'Erkaklar',p:99,s:'S–XL'},
 {n:'Flex top',t:'tank',c:'sand',cat:'Futbolka',who:'Ayollar',p:109,s:'XS–L',f:'Yangi'},
 {n:'Classic kostyum',t:'set',c:'black',cat:'Kostyum',who:'Erkaklar',p:429,s:'M–XXL',f:'Hit'},
 {n:'Sprint kostyum',t:'set',c:'blue',cat:'Kostyum',who:'Erkaklar',p:459,s:'M–XXL'},
 {n:'Team kostyum',t:'set',c:'grey',cat:'Kostyum',who:'Unisex',p:419,s:'S–XXL'},
 {n:'Street hudi',t:'hoodie',c:'black',cat:'Hudi va kurtka',who:'Unisex',p:289,s:'S–XXL',f:'Hit'},
 {n:'Cloud hudi',t:'hoodie',c:'white',cat:'Hudi va kurtka',who:'Ayollar',p:299,s:'XS–L',f:'Yangi'},
 {n:'Shamolkesar',t:'jacket',c:'olive',cat:'Hudi va kurtka',who:'Erkaklar',p:349,s:'M–XXL'},
 {n:'Track kurtka',t:'jacket',c:'blue',cat:'Hudi va kurtka',who:'Unisex',p:329,s:'S–XL'},
 {n:'Daily jogger',t:'pants',c:'black',cat:'Shim',who:'Erkaklar',p:219,s:'S–XXL'},
 {n:'Cargo jogger',t:'pants',c:'olive',cat:'Shim',who:'Erkaklar',p:239,s:'M–XXL',f:'Yangi'},
 {n:'Wide keng shim',t:'pants',c:'grey',cat:'Shim',who:'Unisex',p:229,s:'S–XL',o:{wide:1}},
 {n:'Run shorti',t:'shorts',c:'black',cat:'Shim',who:'Erkaklar',p:119,s:'S–XXL'},
 {n:'Basket shorti',t:'shorts',c:'white',cat:'Shim',who:'Erkaklar',p:129,s:'M–XXL'},
 {n:'Active leggins',t:'leggings',c:'black',cat:'Shim',who:'Ayollar',p:159,s:'XS–L',f:'Hit'},
 {n:'Soft leggins',t:'leggings',c:'blue',cat:'Shim',who:'Ayollar',p:165,s:'XS–L'},
 {n:'Runner krossovka',t:'sneakers',c:'white',cat:'Poyabzal',who:'Unisex',p:489,s:'36–45',f:'Hit'},
 {n:'Street krossovka',t:'sneakers',c:'black',cat:'Poyabzal',who:'Erkaklar',p:519,s:'39–45'},
 {n:"Kepka «7»",t:'cap',c:'black',cat:'Aksessuar',who:'Unisex',p:79,s:'Bitta o‘lcham'},
 {n:'Gym ryukzak',t:'bag',c:'blue',cat:'Aksessuar',who:'Unisex',p:199,s:'25 L'}
];
/* Och, tinch fon: oq kiyim uchun to'qroq, qolganlari uchun yengil ranglar */
const LIGHT = {black:['--c1','--c2','--c4','--c3'], other:['--c1','--c3','--c2','--c4']};
P.forEach((p,i)=>{ p.bg = p.c==='white' ? '--c5' : (p.c==='black' ? LIGHT.black : LIGHT.other)[i%4]; });
const CATS = ['Futbolka','Kostyum','Hudi va kurtka','Shim','Poyabzal','Aksessuar'];
const money = n => (n*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ') + " so‘m";
const tgUrl = 'https://t.me/' + CFG.telegram;
const digits = s => s.replace(/[^\d+]/g,'');

/* ---- Peshtoq tenti va vitrina ---- */
(() => {
  const cols = ['#3A3B3E','#CFC9BE']; let a = '';
  for (let i=0;i<10;i++){ const x=60+i*52; a += `<rect x="${x}" y="96" width="52" height="34" fill="${cols[i%2]}"/><circle cx="${x+26}" cy="130" r="26" fill="${cols[i%2]}"/>`; }
  document.getElementById('awn').innerHTML = a;
  document.getElementById('win').innerHTML =
    `<g transform="translate(92 196) scale(.7)">${artG('hoodie','black')}</g>` +
    `<g transform="translate(246 200) scale(.7)">${artG('tshirt','blue')}</g>` +
    `<g transform="translate(180 262) scale(.42)">${artG('sneakers','black')}</g>`;
})();

/* ---- Toifalar ro'yxati ---- */
document.getElementById('cats').innerHTML = CATS.map(c=>{
  const n = P.filter(p=>p.cat===c).length;
  return `<li><button type="button" data-cat="${c}"><b>${c}</b><span>${n} model</span><i aria-hidden="true">→</i></button></li>`;
}).join('');

/* ---- Katalog ---- */
const filters = document.getElementById('filters'), grid = document.getElementById('grid');
let active = 'Hammasi';
function renderFilters(){
  filters.innerHTML = ['Hammasi',...CATS].map(c=>{
    const n = c==='Hammasi' ? P.length : P.filter(p=>p.cat===c).length;
    return `<button class="chip" type="button" data-cat="${c}" aria-pressed="${c===active}">${c}<sup>${n}</sup></button>`;
  }).join('');
}
function renderGrid(){
  const list = active==='Hammasi' ? P : P.filter(p=>p.cat===active);
  grid.innerHTML = list.map(p=>`
    <article class="card">
      <div class="tile" style="--cb:var(${p.bg})">
        ${p.photo ? `<img class="photo" src="${p.photo}" alt="${p.n}" loading="lazy">` : art(p.t,p.c,p.o||{})}
        ${p.f?`<span class="flag">${p.f}</span>`:''}
      </div>
      <div class="info">
        <h3>${p.n}</h3>
        <div class="meta">${p.who} · ${p.s}</div>
        <div class="buy"><span class="price">${money(p.p)}</span>
          <a class="ask" href="${tgUrl}" target="_blank" rel="noopener" aria-label="${p.n} uchun Telegramda yozish">Buyurtma</a></div>
      </div>
    </article>`).join('');
}
function setFilter(c, scroll){
  active = c; renderFilters(); renderGrid();
  if(scroll) document.getElementById('katalog').scrollIntoView({behavior:'smooth'});
}
filters.addEventListener('click',e=>{const b=e.target.closest('.chip'); if(b) setFilter(b.dataset.cat,false);});
document.getElementById('cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]'); if(b) setFilter(b.dataset.cat,true);});
renderFilters(); renderGrid();

/* ---- Manzil ---- */
document.getElementById('addr').textContent = CFG.address;
document.getElementById('hours').textContent = CFG.hours;
document.getElementById('mapBtn').href = CFG.mapUrl;
document.getElementById('topTg').href = tgUrl;
document.getElementById('quick').innerHTML =
  `<span class="mono">Tezkor aloqa</span>
   <a href="${tgUrl}" target="_blank" rel="noopener">Telegram ↗</a>
   <a href="tel:${digits(CFG.phones[0])}">${CFG.phones[0]}</a>`;

/* ---- Aloqa qatorlari ---- */
const rows = [
  ['Telegram', `<a class="val" href="${tgUrl}" target="_blank" rel="noopener">@${CFG.telegram}</a>`, '@'+CFG.telegram],
  ['Instagram', `<a class="val" href="https://instagram.com/${CFG.instagram}" target="_blank" rel="noopener">@${CFG.instagram}</a>`, '@'+CFG.instagram],
  ['Telefon 1', `<a class="val" href="tel:${digits(CFG.phones[0])}">${CFG.phones[0]}</a>`, CFG.phones[0]],
  ['Telefon 2', `<a class="val" href="tel:${digits(CFG.phones[1])}">${CFG.phones[1]}</a>`, CFG.phones[1]]
];
const lines = document.getElementById('lines');
lines.innerHTML = rows.map(r=>`<li class="line"><span class="mono">${r[0]}</span>${r[1]}<button class="cp" type="button" data-copy="${r[2]}">Nusxalash</button></li>`).join('');
lines.addEventListener('click',e=>{
  const b = e.target.closest('[data-copy]'); if(!b) return;
  const old = b.textContent;
  const done = () => { b.textContent = 'Nusxalandi'; setTimeout(()=>b.textContent=old,1600); };
  const fallback = () => { const v=b.closest('.line').querySelector('.val'); const r=document.createRange(); r.selectNodeContents(v); const s=getSelection(); s.removeAllRanges(); s.addRange(r); };
  try{ navigator.clipboard.writeText(b.dataset.copy).then(done,fallback); }catch(_){ fallback(); }
});

/* ---- Faol bo'lim belgisi ---- */
const links = document.querySelectorAll('[data-nav]');
const setActive = id => links.forEach(a => a.setAttribute('aria-current', a.dataset.nav===id ? 'true' : 'false'));
setActive('bosh');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver(es => { es.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }); }, {rootMargin:'-35% 0px -55% 0px'});
  ['bosh','katalog','dokon','boglanish'].forEach(id => io.observe(document.getElementById(id)));
}
