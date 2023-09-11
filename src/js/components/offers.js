const swiperOffers = new Swiper('.offers__swiper', {
  loop: false,
  speed: 600,
  autoHeight: false,
  spaceBetween: 32,
  breakpoints: {
      320: {
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 12
      },
      768: {
          slidesPerGroup: 2,
          slidesPerView: 2
      },
      1024: {
          slidesPerGroup: 3,
          slidesPerView: 3
      },
      1200: {
          slidesPerGroup: 3,
          slidesPerView: 3
      }
  },
  navigation: {
    nextEl: '.swiper__btn-next',
    prevEl: '.swiper__btn-prev'
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}',
  }
});


