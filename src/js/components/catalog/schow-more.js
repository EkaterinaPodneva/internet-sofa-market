const backMore = document.querySelector('.catalog-page__btn1');
const nextMore = document.querySelector('.catalog-page__btn2');
const nextMore2 = document.querySelector('.catalog-page__btn3');
const productsLength = document.querySelectorAll('.catalog-page__item').length;
const array = Array.from(document.querySelector('.catalog-page__list').children);

function createTabDesktop() {
  let items = 9;
  items += 9;
  const visibleItems = array.slice(9, items);
  const inVisibleItems = array.slice(0, 9);

  nextMore.addEventListener('click', () => {
    visibleItems.forEach(el => el.classList.add('is-visible'));
    inVisibleItems.forEach(el => el.classList.add('in-visible'));

    backMore.classList.remove('catalog-page__btn--active');
    nextMore.classList.add('catalog-page__btn--active');
    nextMore.blur();
  });

  backMore.addEventListener('click', () => {
    visibleItems.forEach(el => el.classList.remove('is-visible'));
    inVisibleItems.forEach(el => el.classList.remove('in-visible'));
    nextMore.classList.remove('catalog-page__btn--active');
    backMore.classList.add('catalog-page__btn--active');
    backMore.blur();
  });
};

function createTabTablet() {
  let items = 18;
  items += 6;
  const visibleItems = array.slice(6, 12);
  const inVisibleItems = array.slice(0, 6);
  const visibleItemsMore = array.slice(12, items);

  nextMore.addEventListener('click', () => {
    visibleItems.forEach(el => el.classList.add('is-visible'));//6, 12 - видно
    inVisibleItems.forEach(el => el.classList.add('in-visible'));//0, 6 - не видно
    visibleItemsMore.forEach(el => el.classList.add('in-visible'));//12, 18 - не видно

    backMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.remove('catalog-page__btn--active');
    nextMore.classList.add('catalog-page__btn--active');
    nextMore.blur();
  });

  nextMore2.addEventListener('click', () => {
    visibleItemsMore.forEach(el => el.classList.remove('in-visible'));
    visibleItemsMore.forEach(el => el.classList.add('is-visible'));
    visibleItems.forEach(el => el.classList.remove('is-visible'));

    nextMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.add('catalog-page__btn--active');
    nextMore2.blur();
  })

  backMore.addEventListener('click', () => {
    visibleItems.forEach(el => el.classList.remove('is-visible'));
    inVisibleItems.forEach(el => el.classList.remove('in-visible'));
    visibleItemsMore.forEach(el => el.classList.add('in-visible'));

    nextMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.remove('catalog-page__btn--active');
    backMore.classList.add('catalog-page__btn--active');
    backMore.blur();
  });
};

const screenWidth = window.screen.width;
if (screenWidth > 992) {
  createTabDesktop();
} else {
  createTabTablet();
}









