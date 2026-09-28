/* carga las ofertas destacadas (ofertas.js) */
(function(){var s=document.createElement("script");s.src="ofertas.js";document.body.appendChild(s);})();
/* Guía de precios orientativa (precios medios publicados para Sevilla/España, 2026) */
(function(){
const P=[
 ["Reforma de baño","3.500 – 7.500 €","Baño de 4 a 6 m², calidad media.","Reformas de baños"],
 ["Bañera por plato de ducha","1.200 – 3.500 €","Según plato, mampara y alicatado.","Cambio de bañera por plato de ducha"],
 ["Reforma de cocina","4.500 – 11.000 €","Cocina de 7 a 10 m², con muebles.","Reformas de cocinas"],
 ["Reforma integral de piso","400 – 1.000 €/m²","Un piso de 80 m² ronda 32.000 – 64.000 €.","Reformas integrales de viviendas"],
 ["Pintar el piso completo","350 – 1.100 €","Piso de 70 a 100 m², paredes y techos.","Pintura de pisos y casas"],
 ["Cambio de suelo","45 – 80 €/m²","Material y colocación incluidos.","Cambio de suelos y pavimentos"],
 ["Cambio de ventanas","3.000 – 10.000 €","Todas las ventanas de un piso.","Cambio de ventanas"],
 ["Impermeabilizar terraza o azotea","20 – 50 €/m²","Según el sistema y el estado del soporte.","Impermeabilización de terrazas y azoteas"],
 ["Aire acondicionado","desde 600 €","Un split instalado. Conductos, bastante más.","Instalación de aire acondicionado"]
];
const css=`
.precios{padding-block:8px 48px;position:relative;z-index:1}
.precios h2{font-size:clamp(22px,3vw,30px);margin-bottom:6px}
.precios h2 span{color:var(--gold)}
.precios .sub{color:var(--muted);margin:0 0 20px;max-width:62ch}
.pr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.pr{position:relative;display:flex;flex-direction:column;gap:6px;padding:16px 18px;border-radius:14px;background:rgba(8,12,22,.72);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(4px);transition:border-color .2s,transform .2s}
.pr:hover{border-color:var(--gold);transform:translateY(-2px)}
.pr h3{font-size:16px;font-family:var(--body);font-weight:700;color:var(--ink)}
.pr .cifra{font-family:var(--display);font-weight:800;font-size:24px;color:var(--gold);font-variant-numeric:tabular-nums;line-height:1.15}
.pr p{margin:0;font-size:14px;color:var(--muted)}
.pr button{text-align:left;margin-top:auto;align-self:flex-start;background:none;border:0;padding:6px 0 0;color:var(--ink);font:700 14px var(--body);cursor:pointer;text-decoration:underline;text-decoration-color:var(--gold);text-underline-offset:4px}
.pr button:hover{color:var(--gold)}
.pr-nota{margin:18px 0 0;padding:12px 14px;border-left:3px solid var(--gold);background:rgba(201,162,75,.1);border-radius:0 10px 10px 0;font-size:14px;color:var(--muted);max-width:760px}
.pr-nota b{color:var(--ink)}
.precios .btn{margin-top:18px}
.pr-det>summary{list-style:none;cursor:pointer;display:flex;flex-direction:column;gap:4px;padding:18px 56px 18px 20px;border:1px solid rgba(200,160,82,.45);border-radius:12px;background:rgba(8,12,22,.72);position:relative;transition:border-color .2s,background .2s;max-width:760px}
.pr-det>summary::-webkit-details-marker{display:none}
.pr-det>summary::after{content:"";position:absolute;right:22px;top:50%;width:10px;height:10px;border-right:2px solid var(--gold);border-bottom:2px solid var(--gold);transform:translateY(-70%) rotate(45deg);transition:transform .25s}
.pr-det[open]>summary::after{transform:translateY(-30%) rotate(-135deg)}
.pr-det>summary:hover{border-color:var(--gold);background:rgba(200,160,82,.08)}
.pr-det>summary:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.pr-sum-t{font-family:var(--display);font-weight:800;font-size:clamp(19px,2.4vw,24px);color:var(--ink)}
.pr-sum-t span{color:var(--gold)}
.pr-sum-s{font-size:14.5px;color:var(--muted)}
.pr-cuerpo{padding-top:22px}
@media (max-width:900px){.pr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:560px){.pr-grid{grid-template-columns:1fr}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const s=document.createElement("section");s.className="precios wrap";s.id="precios";
s.innerHTML=`<details class="pr-det"><summary><span class="pr-sum-t" id="pr-tit">Guía de precios <span>orientativa</span></span><span class="pr-sum-s">¿Cuánto cuesta tu reforma? Pulsa para ver precios aproximados</span></summary>
<div class="pr-cuerpo">
<p class="sub">Para que te hagas una idea antes de pedir presupuesto. Son precios medios del mercado en Sevilla para 2026.</p>
<div class="pr-grid">${P.map((p,i)=>`<article class="pr"><h3>${p[0]}</h3><div class="cifra">${p[1]}</div><p>${p[2]}</p><button type="button" data-i="${i}">Pedir presupuesto →</button></article>`).join("")}</div>
<p class="pr-nota"><b>Precios aproximados, no son un presupuesto.</b> El precio final depende de los metros, los materiales, el estado de la obra y si el IVA va incluido. El precio exacto te lo dan los profesionales tras ver la obra, y con hasta 3 presupuestos puedes comparar.</p>
<a class="btn primary" href="#p1">Pedir mis 3 presupuestos gratis</a>
</div></details>`;
const main=document.querySelector("main.wrap");
(main?main.parentNode:document.body).insertBefore(s,main?main.nextSibling:null);
s.addEventListener("click",e=>{
  const b=e.target.closest(".pr button");if(!b)return;
  const nombre=P[+b.dataset.i][3];
  const todos=document.querySelector('.chip[data-c="Todos"]');
  if(todos&&todos.getAttribute("aria-pressed")!=="true")todos.click();
  const q=document.getElementById("q");if(q&&q.value){q.value="";q.dispatchEvent(new Event("input"));}
  const p1=document.getElementById("p1");
  if(p1&&p1.hidden){const back=document.getElementById("back2");if(back&&!document.getElementById("p2").hidden)back.click();else{const b3=document.getElementById("back3");if(b3){b3.click();back&&back.click();}}}
  setTimeout(()=>{
    const svc=[...document.querySelectorAll(".svc")].find(x=>x.getAttribute("aria-label")===nombre);
    if(svc&&svc.getAttribute("aria-pressed")!=="true")svc.click();
    document.getElementById("p1").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  },60);
});
})();
