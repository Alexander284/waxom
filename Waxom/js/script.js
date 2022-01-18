'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Меню бургер
  const iconMenu = document.querySelector('.header__icon-menu')

    if (iconMenu) {
      const menu = document.querySelector('.header__main-menu')
      iconMenu.addEventListener('click', () => {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menu.classList.toggle('_active')
      })

    }


  // Первый слайдер Full screen
  $(document).ready(function() {
    $('.main-screen__slider').slick({
      arrows: true,
      dots: true,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,                   // по умолчанию 300
      easing: 'linear',             // по умолчанию linear
      infinite: true,
      initialSlide: 0,
      autoplay: false,
      autoplaySpeed: 3000,           // по умолчанию 3000
      pauseOnFocus: true,            // по умолчанию true
      pauseOnHover: true,            // по умолчанию true
      pauseOnDotsHover: true,        // по умолчанию true
      draggable: false,              // свайп мышкой на ПК
      swipe: true,
      touchThreshold: 6,             // сколько надо тянуть, чтобы сменить слайд (по умолчанию - кол-во слайдов)
      touchMove: true,
      waitForAnimate: true,
      centerMode: false,
      variableWidth: false,          // ширина между слайдами true/false
      rows: 1,
      slidesPerRow: 1,
    })

    // Второй слайдер тройной
    $('.recent__slider').slick({
      adaptiveHeight: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: false,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 1139,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ] 
    })
  })

  // Спойлеры для footer
  $(document).ready(function() {
    $('.footer__title').click(function(event) {
      if($('.footer__row').hasClass('one')) {
        $('.footer__title').not($(this)).removeClass('active')
        $('.footer__spoiler').not($(this).next()).slideUp(300)
      }
      $(this).toggleClass('active').next().slideToggle(300)
    })
  })

})