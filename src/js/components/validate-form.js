
document.addEventListener("DOMContentLoaded", function () {
  const validation = new JustValidate('.form', {

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
    .addField('.email', [{
        rule: 'required',
        errorMessage: 'Введите Email!',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат!',
      }
    ])
    .addField('.checkbox', [{
      rule: 'required',
      errorMessage: 'Необходимо поставить согласие',
    }
    ])

    document.getElementById('order__form').addEventListener('submit', (e) => {
      e.preventDefault();
      e.target.reset();
    })
  });
