import"./modulepreload-polyfill-3cfb730f.js";const t=document.querySelector(".burger");if(t){const s=document.querySelector(".nav"),c=s.querySelectorAll(".nav__list-link");t.addEventListener("click",()=>{t.classList.toggle("burger--active"),s.classList.toggle("nav--active"),document.body.classList.toggle("stop-scroll")}),c.forEach(e=>{e.addEventListener("click",()=>{t.classList.toggle("burger--active"),s.classList.toggle("nav--active"),document.body.classList.remove("stop-scroll")})}),document.addEventListener("click",e=>{!e.target.classList.contains("burger")&&!e.target.closest(".nav__list")&&(t.classList.remove("burger--active"),s.classList.remove("nav--active"),document.body.classList.remove("stop-scroll"))}),document.addEventListener("keydown",e=>{e.keyCode===27&&(t.classList.remove("burger--active"),s.classList.remove("nav--active"),document.body.classList.remove("stop-scroll"))})}
//# sourceMappingURL=main-4739afdc.js.map
