import"./modulepreload-polyfill-3cfb730f.js";const n={burgerActive:"burger--active",menuActive:"header__left--active",navActive:"nav--active",stopScroll:"stop-scroll",favoriteSliderPaginationLineActive:"favorite__slider-pagination-line--active"},v=document.querySelector(".burger");if(v){const e=document.querySelector(".header__left"),t=document.querySelector(".nav"),k=e.querySelectorAll(".nav__list-link"),f=()=>{v.classList.toggle(n.burgerActive),e.classList.toggle(n.menuActive),t.classList.toggle(n.navActive),document.body.classList.toggle(n.stopScroll)};v.addEventListener("click",()=>{f()}),k.forEach(c=>{c.addEventListener("click",()=>{v.classList.contains(n.burgerActive)&&(f(),document.body.classList.remove(n.stopScroll))})}),document.addEventListener("click",c=>{!c.target.classList.contains("burger")&&!c.target.closest(".header__left")&&v.classList.contains(n.burgerActive)&&f()}),document.addEventListener("keydown",c=>{c.keyCode===27&&f()})}const L=document.querySelector(".favorite__slider-line"),i=document.querySelectorAll(".slider-pagination-line"),h=document.querySelector(".slider-navigation-next"),S=document.querySelector(".slider-navigation-prev"),p=document.querySelectorAll(".slider-slide"),_=getComputedStyle(L);let o=p[0].clientWidth,y=parseInt(_.getPropertyValue("gap"),10),g=o+y,s=0,a=0,l=0,r=0,w,b;const E=e=>{i.forEach(t=>{t.classList.remove(n.favoriteSliderPaginationLineActive)}),i[e].classList.add(n.favoriteSliderPaginationLineActive)},A=()=>{a-=1,s===0?(a=i.length-1,s-=(i.length-1)*g):s+=g,i.forEach((e,t)=>{e.classList.contains(n.favoriteSliderPaginationLineActive)?i[t].style.transformOrigin="left":i[t].style.transformOrigin="right"}),L.style.transform=`translateX(${s}px)`,h.disabled=!0,setTimeout(()=>{h.disabled=!1},1e3),E(a)},m=()=>{a+=1,s===-(i.length-1)*g?(a=0,s=0):s-=g,i.forEach((e,t)=>{e.classList.contains(n.favoriteSliderPaginationLineActive)?i[t].style.transformOrigin="right":i[t].style.transformOrigin="left"}),L.style.transform=`translateX(${s}px)`,S.disabled=!0,setTimeout(()=>{S.disabled=!1},1e3),E(a)};window.addEventListener("resize",()=>{window.innerWidth!==b&&(s=0,a=0,o=p[0].clientWidth,y=parseInt(_.getPropertyValue("gap"),10),g=o+y,L.style.transform="translateX(0px)",E(a),b=window.innerWidth)});const d=()=>{clearInterval(w)},u=()=>{d(),w=setInterval(()=>{m()},7e3)};h.addEventListener("click",()=>{d(),u(),A()});S.addEventListener("click",()=>{d(),u(),m()});const q=e=>{l=e.offsetX},X=e=>{r=e.offsetX,l<r&&r-l>o/4?A():l>r&&l-r>o/4&&m(),u()},I=e=>{d(),l=e.touches[0].clientX},P=e=>{r=e.changedTouches[0].clientX,r-l>o/2?A():l-r>o/2&&m(),d(),u()};p.forEach(e=>{e.addEventListener("mouseover",d),e.addEventListener("mouseout",u),e.addEventListener("mousedown",t=>q(t)),e.addEventListener("mouseup",t=>X(t)),e.addEventListener("touchstart",I),e.addEventListener("touchend",P)});u();
//# sourceMappingURL=main-f92d0cbe.js.map
