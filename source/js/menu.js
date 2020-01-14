      var mainnav = document.querySelector('.main-nav');
      var navtoggle = document.querySelector('.main-nav__toggle');

      mainnav.classList.remove('main-nav--no-js');

      navtoggle.addEventListener('click', function() {
        if (mainnav.classList.contains('main-nav--closed')) {
          mainnav.classList.remove('main-nav--closed');
          mainnav.classList.add('main-nav--opened');
        } else {
          mainnav.classList.add('main-nav--closed');
          mainnav.classList.remove('main-nav--opened');
          }
      });
