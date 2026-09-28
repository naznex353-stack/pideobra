/* Servicio opcional "Garantía NEXTNIVEL LCH" (350 €, 12 meses). Se inserta antes del pie. */
(function(){
var C="#4f5a3a";
function sello(id){
  var pts=[];for(var i=0;i<32;i++){var r=i%2?50:58,a=Math.PI*2*i/32-Math.PI/2;pts.push((100+r*Math.cos(a)).toFixed(1)+","+(100+r*Math.sin(a)).toFixed(1));}
  return '<svg class="gar-sello" viewBox="0 0 200 200" role="img" aria-label="Sello Garantía NEXTNIVEL LCH"><defs><path id="'+id+'" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs>'
  +'<circle cx="100" cy="100" r="96" fill="none" stroke="'+C+'" stroke-width="7"/><circle cx="100" cy="100" r="88" fill="none" stroke="'+C+'" stroke-width="1.5"/>'
  +'<text font-family="Montserrat,Arial,sans-serif" font-weight="800" font-size="15" fill="'+C+'"><textPath href="#'+id+'" textLength="472" lengthAdjust="spacing">GARANTÍA • NEXTNIVEL LCH • OBRA REVISADA •</textPath></text>'
  +'<polygon points="'+pts.join(" ")+'" fill="'+C+'"/><circle cx="100" cy="100" r="38" fill="#f5efe6"/>'
  +'<path d="M82 101 l12 13 l25 -29" fill="none" stroke="'+C+'" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
window.nnSelloGarantia=sello;
var css=`
.garantia{padding-block:56px 30px;position:relative;z-index:1;border-top:1px solid var(--line)}
.gar-top{display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:center;margin-bottom:28px}
.gar-sello{width:150px;height:auto;display:block}
.gar-eyebrow{font:700 12px var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--oliva,#6b7651);margin:0 0 6px}
.garantia h2{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:clamp(30px,3.4vw,40px);margin:0 0 8px;line-height:1.1}
.garantia h2 span{color:var(--oliva,#6b7651);font-style:italic}
.gar-sub{color:var(--muted);margin:0;max-width:66ch;line-height:1.6}
.gar-pasos{list-style:none;margin:0 0 22px;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;counter-reset:gp}
.gar-pasos li{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px 18px 20px;box-shadow:0 8px 22px rgba(70,58,40,.06);counter-increment:gp}
.gar-pasos li::before{content:counter(gp);display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--oliva,#6b7651);color:#fff;font:700 14px var(--body);margin-bottom:10px}
.gar-pasos b{display:block;font-family:var(--serif,Georgia,serif);font-size:20px;line-height:1.15;margin-bottom:6px;color:var(--ink)}
.gar-pasos p{margin:0;color:var(--muted);font-size:14px;line-height:1.5}
.gar-caja{display:grid;grid-template-columns:1.4fr 1fr;gap:18px}
.gar-inc,.gar-precio{background:#fff;border:1px solid var(--line);border-radius:20px;padding:22px 24px}
.gar-inc h3,.gar-precio h3{font-family:var(--serif,Georgia,serif);font-weight:600;font-size:22px;margin:0 0 10px}
.gar-inc ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}
.gar-inc li{padding-left:26px;position:relative;color:var(--ink);font-size:14.5px;line-height:1.5}
.gar-inc li::before{content:"✓";position:absolute;left:0;top:0;color:var(--oliva,#6b7651);font-weight:800}
.gar-inc li.no::before{content:"–";color:var(--muted)}
.gar-inc li.no{color:var(--muted)}
.gar-precio{background:var(--oliva,#6b7651);border-color:var(--oliva,#6b7651);color:#fff;display:flex;flex-direction:column;gap:10px}
.gar-precio h3{color:#fff}
.gar-cifra{font-family:var(--serif,Georgia,serif);font-weight:700;font-size:52px;line-height:1}
.gar-cifra small{font:600 14px var(--body);opacity:.85;margin-left:6px}
.gar-precio p{margin:0;color:rgba(255,255,255,.88);font-size:14px;line-height:1.5}
.gar-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:6px}
.gar-btns .btn{background:#fff!important;color:var(--oliva-osc,#4f5a3a)!important;box-shadow:none!important}
.gar-btns a.gar-link{color:#fff;font-weight:600;align-self:center;text-underline-offset:3px}
.gar-nota{font-size:12.5px;color:var(--muted);margin:14px 0 0;line-height:1.5}
@media (max-width:900px){.gar-pasos{grid-template-columns:repeat(2,minmax(0,1fr))}.gar-caja{grid-template-columns:1fr}}
@media (max-width:600px){.gar-top{grid-template-columns:1fr;gap:16px;justify-items:start}.gar-sello{width:110px}.gar-pasos{grid-template-columns:1fr}.gar-cifra{font-size:44px}}
`;
function poner(){
  if(document.getElementById("garantia"))return;
  var foot=document.querySelector("footer.wrap");if(!foot)return;
  var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
  var s=document.createElement("section");s.className="garantia wrap";s.id="garantia";s.setAttribute("aria-labelledby","gar-tit");
  s.innerHTML='<div class="gar-top">'+sello("garArc")+'<div><p class="gar-eyebrow">Servicio opcional</p><h2 id="gar-tit">Garantía <span>NEXTNIVEL LCH</span></h2>'
  +'<p class="gar-sub">Además de conseguirte presupuestos, podemos estar a tu lado durante toda la obra. Firmamos un contrato entre tú, la empresa o autónomo que hace la reforma y NEXTNIVEL LCH. Al terminar, revisamos el trabajo y, si algo falla después, nos aseguramos de que se arregle.</p></div></div>'
  +'<ol class="gar-pasos">'
  +'<li><b>Acuerdo y contrato</b><p>Cuando aceptas un presupuesto, eliges si quieres la garantía. Si la quieres, las tres partes firmamos un contrato con el precio y el trabajo acordados.</p></li>'
  +'<li><b>Precio protegido</b><p>El precio del contrato es el que se paga. Cualquier cambio tiene que estar por escrito y aceptado por ti antes de hacerse.</p></li>'
  +'<li><b>Revisión final</b><p>Al terminar la obra, un técnico de NEXTNIVEL LCH la revisa contigo. Si todo está bien, damos la aprobación y te entregamos el certificado con nuestro sello.</p></li>'
  +'<li><b>12 meses cubiertos</b><p>Si aparece un fallo del trabajo, la empresa lo repara. Si no responde en el plazo acordado, NEXTNIVEL LCH se encarga de que se arregle, según el contrato.</p></li>'
  +'</ol><div class="gar-caja"><div class="gar-inc"><h3>Qué incluye</h3><ul>'
  +'<li>Contrato firmado por las tres partes, con el presupuesto aceptado</li>'
  +'<li>Mediación si hay desacuerdos durante la obra</li>'
  +'<li>Revisión presencial al terminar y certificado de aprobación</li>'
  +'<li>12 meses de garantía sobre los fallos del trabajo realizado</li>'
  +'<li>Si la empresa no responde, NEXTNIVEL LCH gestiona la reparación</li>'
  +'<li class="no">No cubre el mal uso, el desgaste normal ni daños ajenos a la obra</li>'
  +'</ul></div><div class="gar-precio"><h3>Precio de la garantía</h3><div class="gar-cifra">350 €<small>pago único</small></div>'
  +'<p>Es opcional. Se contrata al aceptar el presupuesto y antes de empezar la obra.</p>'
  +'<div class="gar-btns"><button type="button" class="btn primary" id="gar-pedir">La quiero en mi reforma</button><a class="gar-link" href="/contrato-garantia.html" target="_blank" rel="noopener">Ver ejemplo de contrato →</a></div></div></div>'
  +'<p class="gar-nota">Las condiciones exactas (plazos de respuesta, límites y exclusiones) figuran en el contrato que firman las tres partes.</p>';
  foot.parentNode.insertBefore(s,foot);
  document.getElementById("gar-pedir").addEventListener("click",function(){
    var d=document.getElementById("desc"),t="Me interesa la Garantía NEXTNIVEL LCH (350 €).";
    if(d&&d.value.indexOf(t)<0)d.value=(t+" "+d.value).trim();
    var p1=document.getElementById("p1");
    if(p1&&p1.hidden){var b2=document.getElementById("back2"),b3=document.getElementById("back3");if(!document.getElementById("p2").hidden)b2&&b2.click();else{b3&&b3.click();b2&&b2.click();}}
    setTimeout(function(){var p=document.getElementById("p1");p&&p.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});},60);
  });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",poner);else poner();
})();
