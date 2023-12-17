import CLASS_LIST from './class-list';

const burger = document.querySelector('.burger');

if (burger) {
  const menu = document.querySelector('.header__left');
  const nav = document.querySelector('.nav');
  const menuLinks = menu.querySelectorAll('.nav__list-link');

  const changeBurger = () => {
    burger.classList.toggle(CLASS_LIST.burgerActive);
    menu.classList.toggle(CLASS_LIST.menuActive);
    nav.classList.toggle(CLASS_LIST.navActive);
    document.body.classList.toggle(CLASS_LIST.stopScroll);
  };

  burger.addEventListener('click', () => {
    changeBurger();
  });

  menuLinks.forEach((el) => {
    el.addEventListener('click', () => {
      if (burger.classList.contains(CLASS_LIST.burgerActive)) {
        changeBurger();
        document.body.classList.remove(CLASS_LIST.stopScroll);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('burger') && !e.target.closest('.header__left') && burger.classList.contains(CLASS_LIST.burgerActive)) {
      changeBurger();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      changeBurger();
    }
  });
}
