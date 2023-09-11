const swiperBanner = new Swiper('.banner__container', {
  loop: true, //Цикличность
  speed: 600, //Скорость

  //Пагинация
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}',
  }
});
