const getModalMarkup = (listItem, item) => `
  <div class="menu__modal-left">
    <div class="menu__modal-img-wrapper">
      <img class="menu__modal-img" src="${listItem.querySelector('img').getAttribute('src')}" alt="${listItem.querySelector('img').getAttribute('alt')}">
    </div>
  </div>
  <div class="menu__modal-right">
    <h3 class="menu__modal-title">${listItem.querySelector('strong').textContent}</h3>
    <p class="menu__modal-descr">${listItem.querySelector('p').textContent}</p>
    <div class="menu__modal-size">
      <span class="menu__modal-size-text">Size</span>
      <div class="menu__modal-size-btns">
        <button class="btn-reset menu__modal-size-btn menu__modal-size-btn--active"><span class="menu__modal-size-name menu__modal-size-name--active">${Object.keys(item.sizes)[0].toUpperCase()}</span>${Object.values(item.sizes)[0].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(item.sizes)[1].toUpperCase()}</span>${Object.values(item.sizes)[1].size}</button>
        <button class="btn-reset menu__modal-size-btn"><span class="menu__modal-size-name">${Object.keys(item.sizes)[2].toUpperCase()}</span>${Object.values(item.sizes)[2].size}</button>
      </div>
    </div>
    <div class="menu__modal-additives">
      <span class="menu__modal-additives-text">Additives</span>
      <div class="menu__modal-additives-btns">
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">1</span>${item.additives[0].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">2</span>${item.additives[1].name}</button>
        <button class="btn-reset menu__modal-additives-btn"><span class="menu__modal-additives-index">3</span>${item.additives[2].name}</button>
      </div>
    </div>
    <div class="menu__modal-total">
      <strong class="menu__modal-total-text">Total:</strong>
      <strong class="menu__modal-total-sum">$${item.price}</strong>
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
  `;

export default getModalMarkup;
