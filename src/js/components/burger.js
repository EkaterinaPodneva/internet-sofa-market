document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('burger').addEventListener('click', function() {
    document.querySelector('.header__middle').classList.toggle('open');
  })
})
