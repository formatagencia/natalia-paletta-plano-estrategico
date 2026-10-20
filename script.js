const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const bar=document.querySelector('#progressBar');
const header=document.querySelector('#topbar');
let lastY=0;
const updateProgress=()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=`${max?scrollY/max*100:0}%`;
  header.classList.toggle('hidden',scrollY>lastY&&scrollY>180);
  lastY=Math.max(0,scrollY);
};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
}),{threshold:.12,rootMargin:'0px 0px -5%'});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;observer.observe(el)});
const trigger=document.querySelector('.nav-trigger');
const nav=document.querySelector('#navLinks');
trigger.addEventListener('click',()=>{const open=nav.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open))});
$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');trigger.setAttribute('aria-expanded','false')}));
const toast=document.querySelector('#toast');let toastTimer;
function say(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
$$('.palette button').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.hex);say(`${btn.dataset.hex} copiado`)}catch{say(btn.dataset.hex)}}));
document.querySelector('#fullscreen').addEventListener('click',async()=>{try{if(!document.fullscreenElement){await document.documentElement.requestFullscreen();say('Modo apresentação ativado')}else{await document.exitFullscreen()}}catch{say('Tela cheia indisponível neste navegador')}});
const sections=$$('main > section');
function go(delta){const y=scrollY+innerHeight*.28;let idx=sections.findIndex(s=>s.offsetTop+s.offsetHeight>y);if(idx<0)idx=sections.length-1;sections[Math.max(0,Math.min(sections.length-1,idx+delta))].scrollIntoView({behavior:'smooth',block:'start'})}
addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','BUTTON','A'].includes(document.activeElement.tagName))return;if(e.key==='PageDown'||e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='PageUp'||e.key==='ArrowLeft'){e.preventDefault();go(-1)}if(e.key==='Home'){e.preventDefault();sections[0].scrollIntoView({behavior:'smooth'})}if(e.key==='End'){e.preventDefault();sections.at(-1).scrollIntoView({behavior:'smooth'})}});
