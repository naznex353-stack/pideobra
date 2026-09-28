(function(){
  const c=document.createElement("canvas");c.id="hexfondo";c.setAttribute("aria-hidden","true");document.body.prepend(c);
  const R=s=>()=>(s=(s*16807)%2147483647)/2147483647;
  let lw=0,lh=0;
  function draw(){
    const W=innerWidth,H=innerHeight;if(W===lw&&Math.abs(H-lh)<120)return;lw=W;lh=H;
    const d=Math.min(devicePixelRatio||1,2),x=c.getContext("2d"),r=R(7);
    c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
    x.fillStyle="#06070a";x.fillRect(0,0,W,H);
    for(let i=0;i<7;i++){const gx=W*(.45+r()*.55),gy=H*(.3+r()*.7),g=x.createRadialGradient(gx,gy,0,gx,gy,Math.max(W,H)*.35);
      g.addColorStop(0,"rgba(110,55,18,.07)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,W,H);}
    const s=Math.max(24,Math.min(W,H)/15),hw=Math.sqrt(3)*s;
    for(let row=-1;row*s*1.5<H+s*2;row++)for(let col=-1;col*hw<W+hw;col++){
      const cx=col*hw+(row%2?hw/2:0),cy=row*s*1.5,u=cx/W,v=cy/H;
      const p=Math.min(1,Math.max(0,Math.max(v*.95+u*.55-.8,u*1.15-.62+(v-.5)*.25)*1.7));
      if(r()>p)continue;
      const k=s*(.55+r()*.4),al=.25+p*.75*r();
      x.beginPath();for(let a=0;a<6;a++){const t=Math.PI/3*a+Math.PI/6;x.lineTo(cx+k*Math.cos(t),cy+k*Math.sin(t));}x.closePath();
      x.fillStyle="rgba(22,14,9,"+(.45*al)+")";x.fill();
      x.shadowColor="rgba(255,120,30,.9)";x.shadowBlur=10*al;x.lineWidth=1+al*1.3;
      x.strokeStyle="rgba(230,"+(120+r()*50|0)+",50,"+(al*.75)+")";x.stroke();x.shadowBlur=0;}
    for(let i=0;i<130;i++){const px=r()*W,py=r()*H,q=Math.max(0,px/W*.8+py/H*.6-.5);if(r()>q*1.4)continue;
      x.fillStyle="rgba(255,"+(140+r()*80|0)+",60,"+(.25+r()*.5)+")";x.beginPath();x.arc(px,py,.6+r()*1.8,0,7);x.fill();}
    const g=x.createLinearGradient(0,0,W,0);g.addColorStop(0,"rgba(4,6,9,.5)");g.addColorStop(.55,"rgba(4,6,9,.3)");g.addColorStop(1,"rgba(4,6,9,.05)");
    x.fillStyle=g;x.fillRect(0,0,W,H);
  }
  draw();let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(draw,150)});
})();
/* Colores del logo en verde oliva (a juego con la web) */
(function(){var s=document.createElement("style");s.textContent=".top .brand-txt .bn{color:#4f5a3a}.top .brand-txt .bo{color:#8a9668}.top .brand-txt .bl{color:#4f5a3a}.top .brand-txt .bl::before,.top .brand-txt .bl::after{background:#9aa67a}";document.head.appendChild(s)})();
/* Sellos propios en el pie: Empresas verificadas + Presupuesto gratis y sin compromiso */
(function(){
function poner(){
var logo=document.querySelector("footer .foot-logo");if(!logo||document.querySelector(".sellos"))return;
var C="#4f5a3a",C2="#6b7651";
var s1='<svg class="sello" viewBox="0 0 200 200" role="img" aria-label="Empresas verificadas"><defs><path id="sArc" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>'
+'<circle cx="100" cy="100" r="94" fill="none" stroke="'+C+'" stroke-width="6"/><circle cx="100" cy="100" r="56" fill="none" stroke="'+C+'" stroke-width="4"/>'
+'<text font-family="Montserrat,Arial,sans-serif" font-weight="800" font-size="17" fill="'+C+'"><textPath href="#sArc" startOffset="0" textLength="458" lengthAdjust="spacing">EMPRESAS VERIFICADAS • NEXTNIVEL LCH •</textPath></text>'
+'<path d="M74 102 l18 19 l36 -42" fill="none" stroke="'+C+'" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var s2='<svg class="sello sello-t" viewBox="0 0 240 150" role="img" aria-label="Presupuesto gratis y sin compromiso"><defs><filter id="sTin"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.75"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>'
+'<g transform="rotate(-8 120 75)" filter="url(#sTin)" fill="'+C2+'" stroke="'+C2+'"><rect x="14" y="26" width="212" height="98" rx="6" fill="none" stroke-width="6"/><rect x="24" y="36" width="192" height="78" rx="3" fill="none" stroke-width="2"/>'
+'<text x="120" y="76" text-anchor="middle" stroke="none" font-family="Montserrat,Arial,sans-serif" font-weight="900" font-size="27" textLength="172" lengthAdjust="spacingAndGlyphs">PRESUPUESTO</text>'
+'<text x="120" y="100" text-anchor="middle" stroke="none" font-family="Montserrat,Arial,sans-serif" font-weight="700" font-size="13.5" textLength="172" lengthAdjust="spacingAndGlyphs">GRATIS · SIN COMPROMISO</text></g></svg>';
var st=document.createElement("style");
st.textContent="footer.wrap>.sellos{display:flex;align-items:center;justify-content:center;gap:clamp(48px,11vw,150px);margin:0 auto 12px;font:inherit;color:inherit}.sellos .foot-logo{margin:0}.sello{width:112px;height:auto;display:block;flex:none;opacity:.92}.sello-t{width:150px}@media(max-width:560px){.sellos{gap:22px}.sello{width:74px}.sello-t{width:98px}.sellos .foot-logo{height:86px}}";
document.head.appendChild(st);
var w=document.createElement("div");w.className="sellos";logo.parentNode.insertBefore(w,logo);
w.insertAdjacentHTML("beforeend",s1);w.appendChild(logo);w.insertAdjacentHTML("beforeend",s2);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",poner);else poner();
})();
/* Servicio de garantía */
(function(){var s=document.createElement("script");s.src="garantia.js?v=1";s.defer=true;document.head.appendChild(s)})();
