import"./modulepreload-polyfill-3cfb730f.js";const h=document.querySelector(".burger");if(h){const e=document.querySelector(".header__left"),l=document.querySelector(".nav"),k=e.querySelectorAll(".nav__list-link"),v=()=>{h.classList.toggle("burger--active"),e.classList.toggle("header__left--active"),l.classList.toggle("nav--active"),document.body.classList.toggle("stop-scroll")};h.addEventListener("click",v),k.forEach(a=>{a.addEventListener("click",v)}),document.addEventListener("click",a=>{!a.target.classList.contains("burger")&&!a.target.closest(".header__left")&&v()}),document.addEventListener("keydown",a=>{a.keyCode===27&&v()})}const g=document.querySelector(".favorite__slider-line"),c=document.querySelectorAll(".slider-pagination-line"),m=document.querySelector(".slider-navigation-next"),L=document.querySelector(".slider-navigation-prev"),y=document.querySelectorAll(".slider-slide"),w=getComputedStyle(g);let r=y[0].clientWidth,p=parseInt(w.getPropertyValue("gap"),10),u=r+p,t=0,i=0,s=0,n=0,b,_;const E=e=>{c.forEach(l=>{l.classList.remove("favorite__slider-pagination-line--active")}),c[e].classList.add("favorite__slider-pagination-line--active")},S=()=>{i-=1,t===0?(i=c.length-1,t-=(c.length-1)*u):t+=u,g.style.transform=`translateX(${t}px)`,m.disabled=!0,setTimeout(()=>{m.disabled=!1},2e3),E(i)},f=()=>{i+=1,t===-(c.length-1)*u?(i=0,t=0):t-=u,g.style.transform=`translateX(${t}px)`,L.disabled=!0,setTimeout(()=>{L.disabled=!1},2e3),E(i)};window.addEventListener("resize",()=>{window.innerWidth!==_&&(t=0,i=0,r=y[0].clientWidth,p=parseInt(w.getPropertyValue("gap"),10),u=r+p,g.style.transform="translateX(0px)",E(i),_=window.innerWidth)});const o=()=>{clearInterval(b)},d=()=>{o(),b=setInterval(()=>{f()},7e3)};m.addEventListener("click",()=>{o(),d(),S()});L.addEventListener("click",()=>{o(),d(),f()});const q=e=>{s=e.offsetX},X=e=>{n=e.offsetX,s<n&&n-s>r/4?S():s>n&&s-n>r/4&&f(),d()},I=e=>{o(),s=e.touches[0].clientX},W=e=>{n=e.changedTouches[0].clientX,n-s>r/2?S():s-n>r/2&&f(),o(),d()};y.forEach(e=>{e.addEventListener("mouseover",o),e.addEventListener("mouseout",d),e.addEventListener("mousedown",l=>q(l)),e.addEventListener("mouseup",l=>X(l)),e.addEventListener("touchstart",I),e.addEventListener("touchend",W)});d();
//# sourceMappingURL=main-4b732906.js.map
