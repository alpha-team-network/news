        const $sliderContainer = $('.b-teaser-articles');
        $sliderContainer.slick({
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 1,
          arrows: false,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
        });

        sliderContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          console.log(currentSlide);
          currentSlide.addClass('is-current');
        });

        sliderContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          console.log(currentSlide);
          currentSlide.removeClass('is-current');
        });

        sliderContainer.on('afterChange', function(event, slick, currentSlide, nextSlide){
          console.log(currentSlide);
          currentSlide.addClass('is-current');
        });