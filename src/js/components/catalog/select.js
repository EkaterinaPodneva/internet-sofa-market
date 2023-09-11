// Show/hide filter params
const filterCategoryButton = document.querySelector('.js-filter-category-btn');
const filterPriceButton = document.querySelector('.js-filter-price-btn');
const filterDiscountButton = document.querySelector('.js-filter-discount-btn');
const filterColorButton = document.querySelector('.js-filter-color-btn');
const filterCategoryOptions = document.querySelector('.js-filter-category-options');
const filterPriceOptions = document.querySelector('.js-filter-price-options');
const filterDiscountOptions = document.querySelector('.js-filter-discount-options');
const filterColorOptions = document.querySelector('.js-filter-color-options');

function toggleFilterOption(button, option) {
    const activeButton = document.querySelector('.param__btn--active');
    const activeOption = document.querySelector('.param__options--active');
    if (activeButton && activeButton !== button)
        activeButton.classList.remove('param__btn--active');
    if (activeOption && activeOption !== option)
        activeOption.classList.remove('param__options--active');
    button.classList.toggle('param__btn--active');
    option.classList.toggle('param__options--active');
}

filterCategoryButton.addEventListener('click', function() {
    return toggleFilterOption(filterCategoryButton, filterCategoryOptions);
});
filterPriceButton.addEventListener('click', function() {
    return toggleFilterOption(filterPriceButton, filterPriceOptions);
});
filterDiscountButton.addEventListener('click', function() {
    return toggleFilterOption(filterDiscountButton, filterDiscountOptions);
});
filterColorButton.addEventListener('click', function() {
    return toggleFilterOption(filterColorButton, filterColorOptions);
});
