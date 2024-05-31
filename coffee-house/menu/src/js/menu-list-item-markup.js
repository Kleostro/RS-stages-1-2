const getMenuListItemMarkup = (currentCategory, index, item) => `
<article class="menu__card">
  <h2 class="visually-hidden">card</h2>
  <div class="menu__card-top">
    <img class="menu__card-img" src="../img/webp/${currentCategory}-${index + 1}.webp" alt="${item.name}">
  </div>
  <div class="menu__card-bottom">
    <strong class="menu__card-title">${item.name}</strong>
    <p class="menu__card-descr">${item.description}</p>
    <span class="menu__card-price">$${item.price}</span>
  </div>
</article>
`;

export default getMenuListItemMarkup;
