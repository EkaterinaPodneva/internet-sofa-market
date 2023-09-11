//Slider big foto sofa
let productSwiper = new Swiper('.slider-block', {
  loop: true,
  speed: 600,
  slidersPerView: 1,

  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}',
  }
});

//Slider big foto sofa modal
let productModalSwiper = new Swiper('.product__modal', {
  loop: true,
  speed: 600,
  slidersPerView: 1,

  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}',
  }
});

//slider nav (small foto sofa)
const productNavSwiper = new Swiper('.product__slider-nav', {
  loop: true,
  speed: 600,
  //direction: 'horizontal',
  //slidersPerView: 4,
  //spaceBetween: 38,
  breakpoints: {
    320: {
      direction: 'horizontal',
    },
      992: { // when window width is >= 992px
        slidesPerView: 4,
        direction: 'vertical',

      },
      1024: { // when window width is >= 1024px
        slidesPerView: 3,
        spaceBetween: 38,
        direction: 'horizontal',
      },
      1352: {
        slidesPerView: 4,
        spaceBetween: 38,
        direction: 'horizontal',

      }
    }
});

//slider nav (small foto sofa)
const productNavSwiperModal = new Swiper('.product__slider-nav--modal', {
  loop: true,
  speed: 600,
  autoHeight: false,
  spaceBetween: 38,
  slidesPerGroup: 1,
  slidesPerView: 1,
  breakpoints: {
      992: { // when window width is >= 992px
        slidesPerView: 2,

      },
      1024: { // when window width is >= 1024px
        slidesPerView: 3,

      },
      1352: {
        slidesPerView: 4,

      }
    },
  navigation: {
    nextEl: '.swiper__btn-next--sofa',
    prevEl: '.swiper__btn-prev--sofa'
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}',
  }
});


//Slider похожие товары
const productsSwiper = new Swiper('.product-slide__swiper', {
  loop: false,
  speed: 600,
  spaceBetween: 32,
  slidesPerGroup: 1,
  slidesPerView: 1,
  autoHeight: false,
  breakpoints: {
    320: {
      spaceBetween: 16,
    },
      992: { // when window width is >= 992px
        slidesPerView: 2
      },
      1024: { // when window width is >= 1024px
        slidesPerView: 3,
      },
      1352: {
        slidesPerView: 4
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

//modal
document.addEventListener('DOMContentLoaded', function() {
  const modal = new GraphModal ({
    isOpen: (modal) => {
      console.log('opened');
    }, isClose: () => {gulpIf
      console.log('closed');
    }
  });

  //function open modal product
  const modalProduct = document.querySelector('.slider-block');
  modalProduct.addEventListener('click', () => {
    new GraphModal().open('first');
  });

  //Присваиваем tab-index
  const sliderNavItems = document.querySelectorAll('.slider-nav__item');
  //const index = parseInt(e.currentTarget.dataset.index);
  sliderNavItems.forEach((el, index) => {
    el.setAttribute('data-index', index);

    el.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      console.log(index);
      productSwiper.slideTo(index);
    });
  });
  //modal
  const sliderNavModal = document.querySelectorAll('.slider-nav__item--modal');
  sliderNavModal.forEach((el, index) => {
    el.setAttribute('data-index', index);

    el.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      console.log(index);
      productModalSwiper.slideTo(index);
    })
  })
});

//validation
document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.order-modal__form', {

     errorFieldCssClass: 'just-validate-error-field',
      errorLabelStyle: {
        color: '#FF6972'
      },

      successFieldCssClass: 'just-validate-success-field',
      focusInvalidField: true,
      validateBeforeSubmitting: true,
      lockForm: true
  });

  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  const checkbox = document.querySelector('.custom__checkbox');

  validation
    .addField('.name', [{

        rule: 'minLength',
        value: 3,
        errorMessage: "Не достаточное количество символов!",
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните имя!'
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/,
        errorMessage: 'Недопустимый формат!'
      }
    ])

    .addField('.tel', [{
      rule: 'function',
      validator: function (name, value) {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10
      },

        errorMessage: 'Вы не ввели телефон',
      },
    ])

    .addField('.checkbox', [{
      rule: 'required',
      errorMessage: 'Необходимо поставить согласие',
    }
    ])

  .onSuccess((e) => {
    document.getElementById('order__form-modal').submit();
    e.preventDefault();
    e.target.reset();
    document.querySelector('.modal-open').classList.remove('animate-open');
    document.querySelector('.modal-open').classList.remove('false');
    document.querySelector('.modal-open').classList.remove('modal-open');
    new GraphModal().open('success');
  });
});



