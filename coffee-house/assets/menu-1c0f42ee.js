import"./modulepreload-polyfill-3cfb730f.js";const t=document.querySelector(".burger");if(t){const s=document.querySelector(".header__left"),c=document.querySelector(".nav"),o=s.querySelectorAll(".nav__list-link");t.addEventListener("click",()=>{t.classList.toggle("burger--active"),s.classList.toggle("header__left--active"),c.classList.toggle("nav--active"),document.body.classList.toggle("stop-scroll")}),o.forEach(e=>{e.addEventListener("click",()=>{t.classList.toggle("burger--active"),s.classList.toggle("header__left--active"),c.classList.toggle("nav--active"),document.body.classList.remove("stop-scroll")})}),document.addEventListener("click",e=>{!e.target.classList.contains("burger")&&!e.target.closest(".header__left")&&(t.classList.remove("burger--active"),s.classList.remove("header__left--active"),c.classList.remove("nav--active"),document.body.classList.remove("stop-scroll"))}),document.addEventListener("keydown",e=>{e.keyCode===27&&(t.classList.remove("burger--active"),s.classList.remove("header__left--active"),c.classList.remove("nav--active"),document.body.classList.remove("stop-scroll"))})}
//# sourceMappingURL=menu-1c0f42ee.js.map