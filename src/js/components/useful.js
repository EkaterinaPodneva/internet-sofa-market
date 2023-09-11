const swiperUseful = new Swiper('.useful__swiper', {
  loop: false,
  speed: 600,
  spaceBetween: 32,
  slidesPerGroup: 1,
  slidesPerView: 2,
  autoHeight: false,
  breakpoints: {
      320: { // when window width is >= 320px
        slidesPerView: 1
      },
      992: { // when window width is >= 992px
        slidesPerView: 2
      },
      1024: { // when window width is >= 1024px
        slidesPerView: 3,
      },
      1352: {
        slidesPerView: 2
      }
    },
  navigation: {
    nextEl: '.swiper__btn-next',
    prevEl: '.swiper__btn-prev'
  },
});


