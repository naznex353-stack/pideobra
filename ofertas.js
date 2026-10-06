/* doynfbhywegkxyhgtees
sb_publishable_A0nss09RkHXJnLDgXTYTeQ__z6BGcB4: se gestionan desde el panel (tabla "ofertas" en Supabase) */
(function(){
const SB="https://doynfbhywegkxyhgtees.supabase.co/rest/v1/ofertas";
const KEY="sb_publishable_A0nss09RkHXJnLDgXTYTeQ__z6BGcB4";
const css=`
.ofertas{padding-block:56px 20px;position:relative;z-index:1;border-top:1px solid var(--line)}
.of-eyebrow{font:700 12px var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--oliva,#6b7651);margin:0 0 6px}
.ofertas h2{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:clamp(30px,3.4vw,40px);margin:0 0 6px}
.ofertas h2 span{color:var(--oliva,#6b7651);font-style:italic}
.of-sub{color:var(--muted);margin:0 0 24px;max-width:62ch}
.of-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.of-card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:0 10px 26px rgba(70,58,40,.08);transition:transform .25s,box-shadow .25s}
.of-card:hover{transform:translateY(-3px);box-shadow:0 18px 36px rgba(70,58,40,.14)}
.of-img{position:relative;aspect-ratio:4/3;background:var(--arena,#e9dfcf) center/cover no-repeat}
.of-tag{position:absolute;top:14px;left:14px;background:var(--oliva,#6b7651);color:#fff;font:700 11px var(--body);letter-spacing:.1em;text-transform:uppercase;padding:6px 11px;border-radius:999px;box-shadow:0 4px 12px rgba(0,0,0,.18)}
.of-body{display:flex;flex-direction:column;gap:8px;padding:18px 20px 20px;flex:1}
.of-body h3{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:24px;line-height:1.1;margin:0;color:var(--ink)}
.of-precio{font-family:var(--serif,Georgia,serif);font-weight:700;font-size:34px;line-height:1;color:var(--oliva-osc,#4f5a3a)}
.of-precio small{font:600 13px var(--body);color:var(--muted);margin-right:6px;vertical-align:middle}
.of-body p{margin:0;color:var(--muted);font-size:14.5px;line-height:1.5}
.of-body .btn{margin-top:auto;align-self:flex-start}
.of-cta{justify-content:center;align-items:flex-start;padding:28px;background:var(--oliva,#6b7651);border-color:var(--oliva,#6b7651);color:#fff;gap:12px}
.of-cta h3{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:28px;line-height:1.1;margin:0;color:#fff}
.of-cta p{margin:0;color:rgba(255,255,255,.85)}
.of-cta .btn{background:#fff!important;color:var(--oliva-osc,#4f5a3a)!important;box-shadow:none!important}
.of-nota{font-size:13px;color:var(--muted);margin:16px 0 0}
@media (max-width:900px){.of-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.of-grid{grid-template-columns:1fr}.of-precio{font-size:30px}}
`;
const esc=t=>String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=u=>/^https:\/\//.test(u||"")?u.replace(/["'()\\\s]/g,encodeURIComponent):"";
const SERV=[[/ba[ñn]o|ducha/i,"Reformas de baños"],[/cocina/i,"Reformas de cocinas"],[/pint/i,"Pintura de pisos y casas"],[/suelo|tarima/i,"Cambio de suelos y pavimentos"],[/ventana/i,"Cambio de ventanas"],[/integral|piso completo/i,"Reformas integrales de viviendas"],[/terraza|azotea|imperme/i,"Impermeabilización de terrazas y azoteas"],[/aire|clima/i,"Instalación de aire acondicionado"]];

fetch(SB+"?select=id,titulo,precio,descripcion,imagen_url&activo=eq.true&order=orden.asc,created_at.desc&limit=12",{headers:{apikey:KEY}})
 .then(r=>r.ok?r.json():[]).catch(()=>[]).then(pintar);

function pintar(lista){
  if(!Array.isArray(lista)||!lista.length)return;
  const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
  const s=document.createElement("section");s.className="ofertas wrap";s.id="ofertas";s.setAttribute("aria-labelledby","of-tit");
  const cards=lista.map((o,i)=>`<article class="of-card"><div class="of-img"${safeUrl(o.imagen_url)?` style="background-image:url('${safeUrl(o.imagen_url)}')"`:""} role="img" aria-label="${esc(o.titulo)}"><span class="of-tag">Oferta</span></div>
    <div class="of-body"><h3>${esc(o.titulo)}</h3><div class="of-precio"><small>por</small>${esc(o.precio)}</div>${o.descripcion?`<p>${esc(o.descripcion)}</p>`:""}
    <button type="button" class="btn primary" data-of="${i}">Quiero esta oferta</button></div></article>`);
  const huecos=(3-lista.length%3)%3;
  if(huecos) cards.push(`<article class="of-card of-cta"><h3>¿Buscas otra reforma?</h3><p>Cuéntanos qué necesitas y te conseguimos hasta 3 presupuestos gratis.</p><a class="btn primary" href="#p1">Pedir presupuesto</a></article>`);
  s.innerHTML=`<p class="of-eyebrow">Ofertas destacadas</p><h2 id="of-tit">Reformas con <span>precio de oferta</span></h2>
  <p class="of-sub">Trabajos completos con precio de partida. Pulsa en la oferta que te interese y te llamamos para confirmarla.</p>
  <div class="of-grid">${cards.join("")}</div>
  <p class="of-nota">El precio final se confirma tras la visita, según medidas y estado de la obra.</p>`;
  const main=document.querySelector("main.wrap");
  (main?main.parentNode:document.body).insertBefore(s,main?main.nextSibling:null);
  s.addEventListener("click",e=>{
    const b=e.target.closest("[data-of]");if(!b)return;
    const o=lista[+b.dataset.of];
    const desc=document.getElementById("desc");
    if(desc){const t="Me interesa la oferta: "+o.titulo+" ("+o.precio+").";if(!desc.value.includes(t))desc.value=(t+" "+desc.value).trim();}
    const m=SERV.find(([re])=>re.test(o.titulo));
    const todos=document.querySelector('.chip[data-c="Todos"]');if(todos&&todos.getAttribute("aria-pressed")!=="true")todos.click();
    const q=document.getElementById("q");if(q&&q.value){q.value="";q.dispatchEvent(new Event("input"));}
    const p1=document.getElementById("p1");
    if(p1&&p1.hidden){const b2=document.getElementById("back2"),b3=document.getElementById("back3");if(!document.getElementById("p2").hidden)b2&&b2.click();else{b3&&b3.click();b2&&b2.click();}}
    setTimeout(()=>{
      if(m){const svc=[...document.querySelectorAll(".svc")].find(x=>x.getAttribute("aria-label")===m[1]);if(svc&&svc.getAttribute("aria-pressed")!=="true")svc.click();}
      document.getElementById("p1").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    },60);
  });
}
})();
