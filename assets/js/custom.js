jQuery(document).ready(function($) {

  //localStorage.setItem("mode", "lightTheme");

  $('#loaderVideo').on('ended',function(){
    $('.loader').fadeOut();
  });
    // jQuery(window).load(function(){
    //   $('.loader').fadeOut();
    // })
    
    $('#nav-icon3').click(function(){
        $('body').toggleClass('menuOpen');
        $(this).toggleClass('open');
    });

    function lightMode(){
        $('html').removeClass('darkTheme');
        $('html').addClass('lightTheme');

        $('img').each(function(){
            let defaultdata = $(this).attr('src');;
            $(this).attr('data-dark', defaultdata);
            let darkdata = $(this).attr('data-dark');
            let lightdata = $(this).attr('data-light');
            if(lightdata){
                $(this).attr('src', lightdata);
            }
            
        })
        $('video').each(function(){
            let defaultdata = $(this).find('source').attr('src');
            let defaultdataPoster = $(this).attr('poster');
            
            $(this).attr('data-dark', defaultdata);
            $(this).attr('data-dark-poster', defaultdataPoster);
            let darkdata = $(this).find('source').attr('data-dark');
            let lightdata = $(this).find('source').attr('data-light');

            let darkdataPster = $(this).attr('data-dark-poster');
            let lightdataPoster = $(this).attr('data-light-poster');

            if(lightdata){
                $(this).attr('src', lightdata);
                $(this).attr('poster', lightdataPoster);
            }
            
        });
        localStorage.setItem("mode", "lightTheme");
        //$('.loader').fadeOut();
    }

    function darkMode(){
        $('html').removeClass('lightTheme');
        $('html').addClass('darkTheme');

        $('img').each(function(){
            
            let darkdata = $(this).attr('data-dark');
            if(darkdata){
                $(this).attr('src', darkdata);
            }
            
        })
        $('video').each(function(){

            let darkdata = $(this).attr('data-dark');

            let darkdataPster = $(this).attr('data-dark-poster');

            if(darkdata){
                $(this).attr('src', darkdata);
                $(this).attr('poster', darkdataPster);
            }
            
        });
        localStorage.setItem("mode", "darkTheme");
        //$('.loader').hide();
    }

    
    let mode = localStorage.getItem("mode");
    
    if(mode == "lightTheme"){
        lightMode();
    }
    else if(mode == "darkTheme"){
        darkMode();
    }
    else{
      lightMode();
    }

    $('span.mode').click(function(){
        let mode = $('html').hasClass('darkTheme');

        if(mode){
            lightMode();
        }
        else{
            darkMode();
        }
    });

    $('ul.nav li a').click(function(e){
        let target = $(this).attr('href');

        $('ul.nav li a').removeClass('active');
        $(this).addClass('active');

        let leftPos = $(this).offset().left - $('ul.nav').offset().left;
        
        $('span.menuPointer').css('left', leftPos);

        let topPos = $(target).offset().top;
        //alert(topPos);

        $('html, body').animate({
            scrollTop: topPos - $('.topHeader').height() - 50
        }, 600);

        $('body').removeClass('menuOpen');
        $('#nav-icon3').removeClass('open')

        return false
    })
    $('a.contact').click(function(e){
        let target = $(this).attr('href');
        let topPos = $(target).offset().top;
        //alert(topPos);

        $('html, body').animate({
            scrollTop: topPos - $('.topHeader').height() - 50
        }, 600);

        $('body').removeClass('menuOpen');
        $('#nav-icon3').removeClass('open')

        return false
    });
    $('.theteam .teamSlider .item').click(function(e){
        let target = $(this).attr('data-rel');
        $('.theteam .teamSlider .item').removeClass('active');
        $(this).addClass('active');

        $('.teamBioSlider .item').hide()
        
        $('#' + target).fadeIn();
    });

    

    

    $('.homeSlider').slick({
        infinite: true,
        
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                dots: true
              }
            },
            
          ]
    });

   

    $('.teamSlider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows:false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows:false,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });

    

    $(".theteam .teamSlider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var winWidth = $(window).width();
      if(winWidth <= 480){
      console.log(nextSlide);
      let target = $('.theteam .teamSlider .item[data-slick-index="'+nextSlide+'"]').attr('data-rel');
        $('.theteam .teamSlider .item').removeClass('active');
        $('.theteam .teamSlider .item[data-slick-index="'+nextSlide+'"]').addClass('active');

        $('.teamBioSlider .item').hide()
        
        $('#' + target).fadeIn();
    
      }
    });
  
    


    //open menu drawer

    $('.sidebarToggle span.icon').click(function(){
        $('body').toggleClass('menuActive')
       
    });


    const slider = $('.verticalSlider');
  
  function onSliderAfterChange(event, slick, currentSlide) {
    $(event.target).data('current-slide', currentSlide);
  }
  
  function onSliderWheel(e) {
    var deltaY = e.originalEvent.deltaY,
      $currentSlider = $(e.currentTarget),
      currentSlickIndex = $currentSlider.data('current-slide') || 0;
    
    if (
      // check when you scroll up
      (deltaY < 0 && currentSlickIndex == 0) ||
      // check when you scroll down
      (deltaY > 0 && currentSlickIndex == $currentSlider.data('slider-length') - 1)
    ) {
      return;
    }

    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
      $currentSlider.slick('slickPrev');
    } else {
      $currentSlider.slick('slickNext');
    }
  }
  
  slider.each(function(index, element) {
    var $element = $(element);
    // set the length of children in each loop
    // but the better way for performance is to set this data attribute on the div.slider in the markup
    $element.data('slider-length', $element.children().length);
  })
  .slick({
    vertical: true,
    arrows:false,
    adaptiveHeight: true,
    infinite: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: true,
            arrows:false,
            autoplay: true,
            autoplaySpeed: 3000,

          }        
        }
       
      ]
})
  .on('afterChange', onSliderAfterChange)
  .on('wheel', onSliderWheel);

  var maxHeight = -1;
  $('.verticalSlider .item').each(function() {
  if ($(this).height() > maxHeight) {
      maxHeight = $(this).height();
  }
  });
  $('.verticalSlider .slick-slide').each(function() {
    if ($(this).height() < maxHeight) {
        $(this).css('margin', '0px 0 ' + Math.ceil((maxHeight-$(this).height())) + 'px 0');
    }
  });





  var direction = 0;
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > direction) { 
        $('.steps').find('.step').removeClass('active'); 
        $('.steps').find('.step').eq(
            
        $('.steps').find('.step').filter(function(index) {
          return this.getBoundingClientRect().y <= (window.innerHeight / 2) && this.getBoundingClientRect().y + this.getBoundingClientRect().height > window.innerHeight / 2;

        }).index()
      ).addClass('active');
      
      direction = $(window).scrollTop();
  
    } else { 
        $('.steps').find('.step').removeClass('active'); 
        $('.steps').find('.step').eq(
            $('.steps').find('.step').filter(function(index) {
          return this.getBoundingClientRect().y < (window.innerHeight / 2) && this.getBoundingClientRect().y + this.getBoundingClientRect().height > window.innerHeight / 2;
        }).index()
      ).addClass('active');
      
      direction = $(window).scrollTop();
    }
  });
  let wWidth = $(window).width();
  if(wWidth <= 767){

  $('.processSection .col.span_9 .step h5').click(function(){
        $(this).parents('.step').toggleClass('open');
  })
  $('.processSection .col.span_9 .step').each(function(){
    $(this).find('h5').siblings().wrapAll('<div class="stepContent"></div>')
  })
  $('body').find('.stepContent').prepend('<span class="close">&times;</span>');
}
  $('body').on('click', '.stepContent .close', function(){
    
    $('.processSection .col.span_9 .step').removeClass('open');
  })




    $("#submit").click(function(){
        var email = $("#email").val();
        // Returns successful data submission message when the entered information is stored in database.
        var dataString = 'email='+email;
        if(email=='')
        {
            $("#email").addClass('error');
            $('.message').empty().html('Email field require');
        }
        else
        {
            // AJAX Code To Submit Form.
            //alert(email);
            $(this).text("Sending...");
            $.ajax({
                type: "POST",
                url: "form.php",
                data: dataString,
                cache: false,
                success: function(result){
                    $("#submit").text('Register')
                    $('.message').empty().html(result);
                    
                    setTimeout(function(){
                        $("#email").val('');
                        $('.message').empty()
                    }, 8000);
                }
            });
        }
        return false;
    });


});

