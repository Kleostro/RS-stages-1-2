import"./modulepreload-polyfill-3cfb730f.js";const e={burgerActive:"burger--active",menuActive:"header__left--active",navActive:"nav--active",stopScroll:"stop-scroll",menuBtnAddVisible:"menu__btn-add--visible",menuListItemHidden:"menu__list-item--hidden",menuModalSizeBtnActive:"menu__modal-size-btn--active",menuModalSizeNameActive:"menu__modal-size-name--active",menuModalAdditivesBtnActive:"menu__modal-additives-btn--active",menuModalAdditivesIndexActive:"menu__modal-additives-index--active",menuTabsBtnActive:"menu__tabs-btn--active",modalVisible:"modal--visible",modalOverlayVisible:"modal__overlay--visible",modalContentVisible:"modal__content--visible"},l=document.querySelector(".burger");if(l){const i=document.querySelector(".header__left"),a=document.querySelector(".nav"),s=i.querySelectorAll(".nav__list-link"),n=()=>{l.classList.toggle(e.burgerActive),i.classList.toggle(e.menuActive),a.classList.toggle(e.navActive),document.body.classList.toggle(e.stopScroll)};l.addEventListener("click",()=>{n()}),s.forEach(d=>{d.addEventListener("click",()=>{l.classList.contains(e.burgerActive)&&(n(),document.body.classList.remove(e.stopScroll))})}),document.addEventListener("click",d=>{!d.target.classList.contains("burger")&&!d.target.closest(".header__left")&&l.classList.contains(e.burgerActive)&&n()}),document.addEventListener("keydown",d=>{d.keyCode===27&&n()})}const E=[{name:"Irish coffee",description:"Fragrant black coffee with Jameson Irish whiskey and whipped milk",price:"7.00",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Kahlua coffee",description:"Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",price:"7.00",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Honey raf",description:"Espresso with frothed milk, cream and aromatic honey",price:"5.50",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Ice cappuccino",description:"Cappuccino with soft thick foam in summer version with ice",price:"5.00",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Espresso",description:"Classic black coffee",price:"4.50",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Latte",description:"Espresso coffee with the addition of steamed milk and dense milk foam",price:"5.50",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Latte macchiato",description:"Espresso with frothed milk and chocolate",price:"5.50",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Coffee with cognac",description:"Fragrant black coffee with cognac and whipped cream",price:"6.50",category:"coffee",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Cinnamon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Moroccan",description:"Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",price:"4.50",category:"tea",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Lemon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Ginger",description:"Original black tea with fresh ginger, lemon and honey",price:"5.00",category:"tea",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Lemon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Cranberry",description:"Invigorating black tea with cranberry and honey",price:"5.00",category:"tea",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Lemon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Sea buckthorn",description:"Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",price:"5.50",category:"tea",sizes:{s:{size:"200 ml","add-price":"0.00"},m:{size:"300 ml","add-price":"0.50"},l:{size:"400 ml","add-price":"1.00"}},additives:[{name:"Sugar","add-price":"0.50"},{name:"Lemon","add-price":"0.50"},{name:"Syrup","add-price":"0.50"}]},{name:"Marble cheesecake",description:"Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",price:"3.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Red velvet",description:"Layer cake with cream cheese frosting",price:"4.00",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Cheesecakes",description:"Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",price:"4.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Creme brulee",description:"Delicate creamy dessert in a caramel basket with wild berries",price:"4.00",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Pancakes",description:"Tender pancakes with strawberry jam and fresh strawberries",price:"4.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Honey cake",description:"Classic honey cake with delicate custard",price:"4.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Chocolate cake",description:"Cake with hot chocolate filling and nuts with dried apricots",price:"5.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]},{name:"Black forest",description:"A combination of thin sponge cake with cherry jam and light chocolate mousse",price:"6.50",category:"dessert",sizes:{s:{size:"50 g","add-price":"0.00"},m:{size:"100 g","add-price":"0.50"},l:{size:"200 g","add-price":"1.00"}},additives:[{name:"Berries","add-price":"0.50"},{name:"Nuts","add-price":"0.50"},{name:"Jam","add-price":"0.50"}]}],S=document.querySelector(".menu__modal"),k=document.querySelector(".menu__modal-overlay"),z=document.querySelector(".menu__modal-content");let g=!1;const h=()=>{g?(S.classList.remove(e.modalVisible),k.classList.remove(e.modalOverlayVisible),z.classList.remove(e.modalContentVisible),document.body.classList.remove(e.stopScroll),g=!1):(S.classList.add(e.modalVisible),k.classList.add(e.modalOverlayVisible),z.classList.add(e.modalContentVisible),document.body.classList.add(e.stopScroll),g=!0)};document.addEventListener("click",i=>{!i.target.closest(".menu__modal-content")&&!i.target.closest(".menu__list-item")&&z.classList.contains(e.modalContentVisible)&&h()});const M=(i,a)=>`
  <div class="menu__modal-left">
    <div class="menu__modal-img">
      <img src="${i.querySelector("img").getAttribute("src")}" alt="${i.querySelector("img").getAttribute("alt")}">
    </div>
  </div>
  <div class="menu__modal-right">
    <h3 class="menu__modal-title">${i.querySelector("strong").textContent}</h3>
    <p class="menu__modal-descr">${i.querySelector("p").textContent}</p>
    <div class="menu__modal-size">
      <span class="menu__modal-size-text">Size</span>
      <div class="menu__modal-size-btns">
        <button class="btn-reset menu__modal-size-btn menu__modal-size-btn--active"><span class="menu__modal-size-name menu__modal-size-name--active">${Object.keys(a.sizes)[0].toUpperCase()}</span>${Object.values(a.sizes)[0].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(a.sizes)[1].toUpperCase()}</span>${Object.values(a.sizes)[1].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(a.sizes)[2].toUpperCase()}</span>${Object.values(a.sizes)[2].size}</button>
      </div>
    </div>
    <div class="menu__modal-additives">
      <span class="menu__modal-additives-text">Additives</span>
      <div class="menu__modal-additives-btns">
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">1</span>${a.additives[0].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">2</span>${a.additives[1].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">3</span>${a.additives[2].name}</button>
      </div>
    </div>
    <div class="menu__modal-total">
      <strong class="menu__modal-total-text">Total:</strong>
      <strong class="menu__modal-total-sum">$${a.price}</strong>
    </div>
    <div class="menu__modal-info">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_268_9737)">
        <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_268_9737">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      <p class="menu__modal-info-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
    </div>
    <button class="btn-reset menu__modal-btn-close">Close</button>
  </div>
  `,$=(i,a,s)=>`
<article class="menu__card">
  <h2 class="visually-hidden">card</h2>
  <div class="menu__card-top">
    <img src="../img/jpg/${i}-${a+1}.jpg" alt="${s.name}">
  </div>
  <div class="menu__card-bottom">
    <strong class="menu__card-title">${s.name}</strong>
    <p class="menu__card-descr">${s.description}</p>
    <span class="menu__card-price">$${s.price}</span>
  </div>
</article>
`,w=document.querySelectorAll(".menu__tabs-btn"),t=document.querySelector(".menu__list"),r=document.querySelector(".menu__btn-add"),m=document.querySelector(".menu__modal-content");let b=[],y="coffee",A;window.innerWidth>1320&&r.classList.remove(e.menuBtnAddVisible);const _=(i,a)=>{const s=m.querySelector(".menu__modal-total-sum"),d=(i+a).toFixed(2);s.textContent=`$${d}`},q=(i,a)=>{m.innerHTML=M(i,a);const s=m.querySelectorAll(".menu__modal-size-btn"),n=m.querySelectorAll(".menu__modal-additives-btn");let d=parseFloat(a.price),f=Object.keys(a.sizes)[0].toUpperCase(),p=parseFloat(Object.values(a.sizes)[0]["add-price"]);m.querySelector(".menu__modal-btn-close").addEventListener("click",h),s.forEach(c=>{c.addEventListener("click",()=>{const u=c.querySelector(".menu__modal-size-name"),o=u.textContent;s.forEach(v=>{v.classList.remove(e.menuModalSizeBtnActive),v.querySelector(".menu__modal-size-name").classList.remove(e.menuModalSizeNameActive)}),c.classList.add(e.menuModalSizeBtnActive),u.classList.add(e.menuModalSizeNameActive),f!==o&&(f=o,p=parseFloat(a.sizes[o.toLowerCase()]["add-price"]),_(d,p))})}),n.forEach(c=>{c.addEventListener("click",()=>{const u=c.classList.contains(e.menuModalAdditivesBtnActive),o=c.querySelector(".menu__modal-additives-index"),v=Number(o.textContent)-1,L=parseFloat(a.additives[v]["add-price"]);c.classList.toggle(e.menuModalAdditivesBtnActive),o.classList.toggle(e.menuModalAdditivesIndexActive),u?d-=L:d+=L,_(d,p)})}),_(d,p)},x=(i,a)=>{const s=document.createElement("li");s.classList.add("menu__list-item"),s.innerHTML=$(y,a,i),s.addEventListener("click",()=>{h(),q(s,i)}),t.append(s)},C=i=>{t.innerHTML="",i.forEach((a,s)=>{x(a,s),window.innerWidth<1320&&(t.children.length>4?r.classList.add(e.menuBtnAddVisible):r.classList.remove(e.menuBtnAddVisible),Array.from(t.children).slice(4).forEach(n=>n.classList.add(e.menuListItemHidden)))})};window.addEventListener("resize",()=>{window.innerWidth!==A&&(window.innerWidth<1320?(t.children.length>4?r.classList.add(e.menuBtnAddVisible):r.classList.remove(e.menuBtnAddVisible),Array.from(t.children).slice(4).forEach(i=>i.classList.add(e.menuListItemHidden))):(r.classList.remove(e.menuBtnAddVisible),Array.from(t.children).forEach(i=>i.classList.remove(e.menuListItemHidden)))),A=window.innerWidth});r.addEventListener("click",()=>{r.classList.remove(e.menuBtnAddVisible),Array.from(t.children).forEach(i=>i.classList.remove(e.menuListItemHidden))});const B=()=>{b=E.filter(i=>i.category===y)};w.forEach(i=>{i.addEventListener("click",()=>{w.forEach(a=>a.classList.remove(e.menuTabsBtnActive)),i.classList.add(e.menuTabsBtnActive),y=i.innerText.replace(/\p{Emoji}/gu,"").trim().toLowerCase(),t.style.opacity=0,setTimeout(()=>{B(),C(b),t.style.opacity=1},500)})});B();C(b);
//# sourceMappingURL=menu-efd077e6.js.map