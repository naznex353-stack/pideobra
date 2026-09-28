/* Panel: pestaña "Ofertas" (se añade al panel existente). Guarda en la tabla "ofertas" y las fotos en el almacén "ofertas" de Supabase. */
(function(){
if(typeof VIEWS==='undefined'||typeof render!=='function')return;
let OF=null,cargando=false;
const idxRedes=VIEWS.findIndex(v=>v[0]==='redes');
VIEWS.splice(idxRedes<0?VIEWS.length:idxRedes,0,['ofertas','Ofertas']);

const st=document.createElement('style');
st.textContent=`.ofa-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.ofa-card{background:var(--panel);border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column}
.ofa-img{aspect-ratio:4/3;background:var(--chip) center/cover no-repeat;position:relative}
.ofa-img .chip{position:absolute;top:10px;left:10px}
.ofa-b{padding:14px 16px;display:flex;flex-direction:column;gap:6px;flex:1}
.ofa-b b{font-size:17px}.ofa-b .pr{font-size:22px;font-weight:800;color:var(--accent)}
.ofa-b p{margin:0;color:var(--muted);font-size:13.5px}
.ofa-acts{display:flex;gap:6px;flex-wrap:wrap;padding:0 16px 14px}
.ofa-prev{width:100%;aspect-ratio:4/3;border-radius:14px;border:1px dashed var(--line);background:var(--chip) center/cover no-repeat;display:grid;place-items:center;color:var(--muted);font-size:13px;text-align:center;padding:10px}
.ofa-chk{display:flex!important;align-items:center;gap:8px;grid-template-columns:none!important}
.ofa-chk input{width:auto!important}`;
document.head.appendChild(st);

async function cargarOfertas(){
  if(cargando)return;cargando=true;
  const r=await sb.from('ofertas').select('*').order('orden',{ascending:true}).order('created_at',{ascending:false});
  cargando=false;OF=r.error?[]:r.data;if(r.error)toast('No se pudieron cargar las ofertas');
  if(view==='ofertas')render();
}
function vOfertas(){
  if(OF===null){cargarOfertas();return `<div class="head"><div><h1>Ofertas</h1><p>Cargando…</p></div></div>`;}
  const act=OF.filter(o=>o.activo).length;
  const card=o=>`<div class="ofa-card"><div class="ofa-img" style="${o.imagen_url?`background-image:url('${esc(o.imagen_url)}')`:''}"><span class="chip ${o.activo?'st-aceptado':'st-presupuestado'}"><i></i>${o.activo?'Visible en la web':'Oculta'}</span></div>
    <div class="ofa-b"><b>${esc(o.titulo)}</b><span class="pr">${esc(o.precio)}</span>${o.descripcion?`<p>${esc(o.descripcion)}</p>`:''}<p>Orden: ${o.orden}</p></div>
    <div class="ofa-acts"><button class="btn sm pri" data-act="of-edit" data-id="${o.id}">Editar</button>
    <button class="btn sm" data-act="of-vis" data-id="${o.id}">${o.activo?'Ocultar':'Mostrar en la web'}</button>
    <button class="btn sm danger ghost" data-act="of-del" data-id="${o.id}">Eliminar</button></div></div>`;
  return `<div class="head"><div><h1>Ofertas</h1><p>Las ofertas visibles salen en la web, encima de la guía de precios, en filas de tres. Sube fotos reales de tus trabajos.</p></div>
    <div style="display:flex;gap:8px"><button class="btn" data-act="of-refresh">Actualizar</button><button class="btn pri" data-act="of-new">+ Nueva oferta</button></div></div>
    <div class="panel" style="margin-bottom:14px"><h3>En la web <span class="sub">${act} visible${act===1?'':'s'}</span></h3>
    ${act%3?`<p class="muted" style="margin:0 0 12px">Con ${act} oferta${act===1?'':'s'} visible${act===1?'':'s'}, la web completa la fila con un recuadro "¿Buscas otra reforma?". Para una fila completa, pon ${act+(3-act%3)}.</p>`:''}
    ${OF.length?`<div class="ofa-grid">${OF.map(card).join('')}</div>`:'<div class="empty">Todavía no hay ofertas. Pulsa "+ Nueva oferta".</div>'}</div>`;
}
const _render=render;
render=function(){if(view!=='ofertas')return _render();renderTabs();$('#app').innerHTML=vOfertas();};

let fotoNueva=null;
function formulario(o){
  o=o||{titulo:'',precio:'',descripcion:'',orden:(OF||[]).length+1,activo:true,imagen_url:''};fotoNueva=null;
  open(`<div class="mh"><div><h2>${o.id?'Editar oferta':'Nueva oferta'}</h2><p class="muted" style="margin:0">Se verá en la web tal como la escribas.</p></div><button class="iconbtn" data-act="close" aria-label="Cerrar">✕</button></div>
  <form class="form" id="ofForm">
    <label>Título<input id="ofT" maxlength="80" required value="${esc(o.titulo)}" placeholder="Ej. Cuarto de baño completo"></label>
    <label>Precio<input id="ofP" maxlength="30" required value="${esc(o.precio)}" placeholder="Ej. 8.700 €"></label>
    <label class="full">Descripción (qué incluye)<textarea id="ofD" rows="3" maxlength="300" placeholder="Ej. Demolición, fontanería, alicatado, plato de ducha y mampara…">${esc(o.descripcion||'')}</textarea></label>
    <label>Orden (1 sale primero)<input id="ofO" type="number" min="0" value="${+o.orden||0}"></label>
    <label class="ofa-chk"><input id="ofA" type="checkbox" ${o.activo?'checked':''}> Visible en la web</label>
    <label class="full">Foto (JPG, PNG o WEBP, máx. 5 MB)<input id="ofF" type="file" accept="image/jpeg,image/png,image/webp"></label>
    <div class="full"><div class="ofa-prev" id="ofPrev" style="${o.imagen_url?`background-image:url('${esc(o.imagen_url)}')`:''}">${o.imagen_url?'':'Sin foto todavía'}</div></div>
    <div class="full err" id="ofMsg" role="status"></div>
  </form>
  <div class="mfoot"><button class="btn" data-act="close">Cancelar</button><button class="btn pri" data-act="of-save" data-id="${o.id||''}">Guardar oferta</button></div>`);
  $('#ofF').addEventListener('change',async e=>{
    const f=e.target.files[0];if(!f)return;
    if(f.size>15*1024*1024){$('#ofMsg').textContent='La foto es demasiado grande.';return;}
    try{fotoNueva=await reducir(f);const u=URL.createObjectURL(fotoNueva);const p=$('#ofPrev');p.style.backgroundImage=`url('${u}')`;p.textContent='';}
    catch(_){$('#ofMsg').textContent='No se pudo leer la foto. Prueba con otra.';}
  });
}
function reducir(file){return new Promise((ok,ko)=>{const img=new Image();img.onload=()=>{const m=1400,k=Math.min(1,m/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);c.toBlob(b=>b?ok(b):ko(),'image/jpeg',.82);URL.revokeObjectURL(img.src)};img.onerror=ko;img.src=URL.createObjectURL(file);});}

async function guardar(id){
  const msg=t=>{const m=$('#ofMsg');if(m)m.textContent=t||''};
  const d={titulo:$('#ofT').value.trim(),precio:$('#ofP').value.trim(),descripcion:$('#ofD').value.trim()||null,orden:+$('#ofO').value||0,activo:$('#ofA').checked};
  if(d.titulo.length<2){msg('Escribe un título.');return}
  if(!d.precio){msg('Escribe el precio.');return}
  const b=document.querySelector('[data-act="of-save"]');b.disabled=true;b.textContent='Guardando…';
  try{
    if(fotoNueva){
      const ruta=Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.jpg';
      const up=await sb.storage.from('ofertas').upload(ruta,fotoNueva,{contentType:'image/jpeg',upsert:false});
      if(up.error)throw up.error;
      d.imagen_url=sb.storage.from('ofertas').getPublicUrl(ruta).data.publicUrl;
    }
    const r=id?await sb.from('ofertas').update(d).eq('id',+id):await sb.from('ofertas').insert(d);
    if(r.error)throw r.error;
    close();toast(id?'Oferta actualizada':'Oferta creada');OF=null;render();
  }catch(e){msg('No se pudo guardar: '+(e.message||'error'));b.disabled=false;b.textContent='Guardar oferta';}
}

document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,id=t.dataset.id;
  if(!a.startsWith('of-'))return;
  const o=(OF||[]).find(x=>x.id===+id);
  if(a==='of-new')formulario();
  else if(a==='of-edit'&&o)formulario(o);
  else if(a==='of-save')guardar(id);
  else if(a==='of-refresh'){OF=null;render();}
  else if(a==='of-vis'&&o){sb.from('ofertas').update({activo:!o.activo}).eq('id',o.id).then(r=>{if(r.error){toast('No se pudo cambiar');return}o.activo=!o.activo;render();toast(o.activo?'Oferta visible en la web':'Oferta ocultada')});}
  else if(a==='of-del'&&o){if(confirm('¿Eliminar la oferta "'+o.titulo+'"?')){sb.from('ofertas').delete().eq('id',o.id).then(r=>{if(r.error){toast('No se pudo eliminar');return}OF=OF.filter(x=>x.id!==o.id);render();toast('Oferta eliminada')});}}
});
try{const nav=document.querySelector('#tabs');if(nav&&nav.children.length)renderTabs();}catch(_){}
})();
