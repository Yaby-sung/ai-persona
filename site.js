/* 換頁一律從頂端開始（避免瀏覽器沿用上一頁的捲動位置） */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (!location.hash) {
  window.scrollTo(0, 0);
  window.addEventListener('load', function () {
    if (!location.hash) window.scrollTo(0, 0);
  });
}

const nav = document.getElementById('nav');
const navCta = document.getElementById('navCta');
const onScroll = () => {
  const y = window.scrollY;
  if(y > 24){ nav.classList.add('scrolled'); navCta.style.display='inline-flex'; }
  else { nav.classList.remove('scrolled'); navCta.style.display='none'; }
};
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

const mb = document.getElementById('menuBtn');
const mm = document.getElementById('mobileMenu');
mb.addEventListener('click',()=>{ mb.classList.toggle('open'); mm.classList.toggle('open'); });
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{ mb.classList.remove('open'); mm.classList.remove('open'); }));

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:.1, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* 首頁最上方輪播 */
(function(){
  var c = document.querySelector('.promo-carousel');
  if (!c) return;
  var track  = c.querySelector('.pc-track');
  var slides = [].slice.call(c.querySelectorAll('.pc-slide'));
  var dots   = [].slice.call(c.querySelectorAll('.pc-dots button'));
  if (slides.length < 2) return;

  var i = 0, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function size(){ var h = slides[i].offsetHeight; if (h > 0) track.style.height = h + 'px'; }

  function go(n){
    i = (n + slides.length) % slides.length;
    slides.forEach(function(s,k){ s.classList.toggle('is-on', k === i); });
    dots.forEach(function(d,k){
      d.classList.toggle('is-on', k === i);
      d.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    size();
  }
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }
  function play(){ stop(); if (!reduce) timer = setInterval(function(){ go(i+1); }, 6500); }

  dots.forEach(function(d,k){ d.addEventListener('click', function(){ go(k); play(); }); });
  /* 只有滑到「點點」或用鍵盤聚焦時才暫停；整條橫幅不暫停，
     否則游標停在頂端就等於永遠不會換下一張 */
  var dotsBox = c.querySelector('.pc-dots');
  if (dotsBox) {
    dotsBox.addEventListener('mouseenter', stop);
    dotsBox.addEventListener('mouseleave', play);
  }
  c.addEventListener('focusin', stop);
  c.addEventListener('focusout', play);
  window.addEventListener('resize', size);

  /* 手機滑動切換 */
  var x0 = null;
  c.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; stop(); }, {passive:true});
  c.addEventListener('touchend', function(e){
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) go(dx < 0 ? i+1 : i-1);
    x0 = null; play();
  }, {passive:true});

  /* 圖片載入後重算高度 */
  c.querySelectorAll('img').forEach(function(im){
    if (im.complete) size(); else im.addEventListener('load', size);
  });

  go(0); play();
})();
