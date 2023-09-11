const selector = document.querySelector('.js-choices')

  const choices = new Choices(selector, {
    searchEnabled: false,
    itemSelectText: "",
    classNames: {
      containerOuter: 'choices header_choices',
     },
  });

const element = document.querySelector('.choices__furniture')

  const choicesFurniture = new Choices(element, {
    searchEnabled: false,
    itemSelectText: "",
    classNames: {
      containerOuter: 'choices header_choices',
     },
  });
