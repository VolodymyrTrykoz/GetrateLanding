$(document).ready(function () {
    const $offer = $('.offer');
    let isMapShown = false;
    let parallaxObj = () => {
        if (window.innerWidth >= 768) {
            let winTop = $(window).scrollTop();
            TweenMax.to('.mob', 3, {
                'top': ((0 - (winTop / 8)) + 'px'),
                ease: Circ.easeOut
            }, '-=0.5');
            TweenMax.to('.tab', 3, {
                'top': ((45 - (winTop / 20)) + '%'),
                ease: Circ.easeOut
            });
        }
    };

    $(window).on('scroll', parallaxObj);
    let smoothScroll = () => {
        let $window = $(window);
        let scrollTime = 0.7;
        let scrollDistance = 300;
        $window.on("mousewheel DOMMouseScroll", (event) => {
            event.preventDefault();
            let delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            let scrollTop = $window.scrollTop();
            let finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to($window, scrollTime, {
                scrollTo: {y: finalScroll, autoKill: true},
                ease: Power1.easeOut,
                autoKill: true,
                overwrite: 5
            });
        });
    };
    smoothScroll();


    $('.menu').on('click', () => {
        let ltMenu = new TimelineLite();
        $('.menu').toggleClass('menu-js-opened');
        if ($('.menu').hasClass('menu-js-opened')) {
            $('.menu__text').addClass('invisible');
            ltMenu.to('.hidden-menu', 0.5, {top: '0'})
                  .staggerTo('.menu__nav a', .7, {x: '0', autoAlpha: 1}, 0.1);
            $('body').addClass('body-blured');
        }
        else {
            closeMenu();
        }
    });

    $(document).on("mouseup", (e) => {
        if($('.body-blured').is(e.target)){
            closeMenu();
        }
    });

    closeMenu = () => {
        let ltMenu = new TimelineLite();
        ltMenu.staggerTo('.menu__nav a', 0, {x: '-20', autoAlpha: 0}, 0)
            .to('.hidden-menu', 0.1, {
                top: '-100%', onCompleate: function () {
                    $('body').removeClass('body-blured');
                }
            }, '-=0.1');
        $('.menu__text').removeClass('invisible');
        $('.menu').removeClass('menu-js-opened');
    };

    $(document).on("click", '.menu__nav a, .btn__wrapper a, .first a, .logo a, .register a', goToLink);

    function goToLink(e) {
        e.preventDefault();
        let id = $(this).attr('href');
        let top;
        if (window.innerWidth <= 768) {
            top = $(id).offset().top;
        } else {
            top = $(id).offset().top;
        }
        $('body,html').stop(true).animate({scrollTop: top}, 1000);

        let tlMenu = new TimelineMax();
        tlMenu.to('.hidden-menu', 0.3, {top: '-100%'}, "-=0.3");
        $('.menu').removeClass('menu-js-opened');
        $('body').removeClass('body-blured');
        $('.menu__text').removeClass('invisible');
    };


    let slickSlider = () => {
        let mobile = false;
        if (window.innerWidth <= 750) {
            mobile = true;
        }
        $('.whyYouNeedThat__slider').slick({
            infinite: true,
            slidesToShow: mobile ? 1 : 2,
            slidesToScroll: mobile ? 1 : 2,
            rtl: false,
            rows: mobile ? 2 : 1,
            autoplay: true,
            autoplaySpeed: 3000,
        });
    };
    slickSlider();

    $('.offer label').on('click', (e)=>{
        let el =  $(e.target).closest('label');
        if((el).is('.label1')){
            activateStageOne();
        }
        if((el).is('.label2')){
            activateStageTwo();
        }
        if((el).is('.label3')){
            activateStageThree();
        }
    });



    function activateStageOne() {
        $offer.removeClass('active');
        $('.offer.active .app').removeClass('topShift');
        $('.fir').addClass('active');
        $('.sec').removeClass('active');
        $('.th').removeClass('active');
    }

    function activateStageTwo(){
        $offer.addClass('active');
        $('.offer.active .app').removeClass('topShift');
        $('.fir').removeClass('active');
        $('.sec').addClass('active');
        $('.th').removeClass('active');
    }

    function activateStageThree(){
        $offer.addClass('active');
        $('.offer.active .app').addClass('topShift');
        $('.fir').removeClass('active');
        $('.sec').removeClass('active');
        $('.th').addClass('active');
    }

    let controller = new ScrollMagic.Controller();


    $(window).on('scroll', () => {
        const topOffset = $('#offer')[0].getBoundingClientRect().top;
        if((window.innerHeight / 2) > topOffset && !isMapShown){
            activateStageOne();
            setTimeout(activateStageTwo, 1000);
            setTimeout(activateStageThree, 3000);
            isMapShown = true;
        }

        if((window.innerHeight / 2) <= topOffset && isMapShown){
            activateStageOne();
            isMapShown = false;
        }
    });

    let sceneChange = new ScrollMagic.Scene({triggerElement: '.change', reverse: false, offset: 0});
    let ltChange = new TimelineLite();
    sceneChange.setTween(ltChange).addTo(controller);

    let sceneWTT = new ScrollMagic.Scene({triggerElement: '#whatIsThat', reverse: false, offset: 200});
    let ltWTT = new TimelineLite();
    sceneWTT.setTween(ltWTT).addTo(controller);

    let sceneWYNT = new ScrollMagic.Scene({triggerElement: '#whyYouNeedThat', reverse: false, offset: 200});
    let ltWYNT = new TimelineLite();
    sceneWYNT.setTween(ltWYNT).addTo(controller);

    let sceneBus = new ScrollMagic.Scene({triggerElement: '#business', reverse: false, offset: 200});
    let ltBus = new TimelineLite();
    sceneBus.setTween(ltBus).addTo(controller);

    let sceneFirs = new ScrollMagic.Scene({triggerElement: '#first', reverse: false, offset: 200});
    let ltFirst = new TimelineLite();
    sceneFirs.setTween(ltFirst).addTo(controller);
    if (window.innerWidth >= 768) {
        ltChange
            .from('.change__left', 0.8, {yPercent: 30, ease: Power1.easeInOut, autoAlpha: 0, offset: 200});

        ltWTT
            .from('.whatIsThat__right', 0.8, {yPercent: 20, ease: Power1.easeInOut, autoAlpha: 0, offset: 200});

        ltWYNT
            .from('.whyYouNeedThat__left', 0.8, {yPercent: 20, ease: Power1.easeInOut, autoAlpha: 0, offset: 200});


        ltBus
            .from('.business__left', 0.8, {yPercent: 20, ease: Power1.easeInOut, autoAlpha: 0, offset: 200});

        ltFirst
            .from('.first__left', 0.8, {yPercent: 20, ease: Power1.easeInOut, autoAlpha: 0, offset: 200})
    }

    let prevScrollpos = window.pageYOffset;
    $(window).on('scroll', () => {
        if (window.innerWidth <= 768) {
            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                TweenMax.to($(".menu"), 0.5, {y: '0%'});
            } else {
                TweenMax.to($(".menu"), 0.5, {y: '-150%'});
            }
            prevScrollpos = currentScrollPos;
        }
    });

    //form validation starts here
    let input = {
        valField: function () {
            let success = () => {
                $(this).removeClass('invalid');
            };
            let fail = () => {
                $(this).addClass('invalid');
            };
            let length = () => {
                return ($(this).attr('id') === 'InputPhone') ? 19 : 2
            };
            ($(this).val().length >= length()) ? success() : fail();
        },
        valEmail: function () {
            let regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
            $(this).on('keyup', function(){
                regExp.test($(this).val()) ? $(this).removeClass('invalid') : $(this).addClass('invalid');
            });
        }
    };

    $('#InputPhone').mask('+38 (099) 999 99 99');
    $('#InputPhone').on('keyup', input.valField);
    $('#InputName').on('keyup', input.valField);
    $('#InputEmail').on('keyup', input.valEmail);
  $('#InputPhone, #InputName, #InputEmail').on('keyup', function () {
    $(this).val().length ? $(this).addClass('isntEmpty') : $(this).removeClass('isntEmpty')
  });


    $('#form').on('submit', function(e){
        let formValid = true;
        e.preventDefault();
        const userData = {};
        let result = $(this).serializeArray();
        result.forEach((item) => {
            userData[item.name] = (item.name === 'mobileNumber') ? item.value.replace(/ /g, '') : item.value;
        });
        $('form input').each(((ind, elem) => {
            if(elem.classList.contains('invalid')) formValid = false;
        }));

        if(formValid){
            $.post(
                "https://dekurs.com.ua/api/mail/send",
                userData,
                onAjaxSuccess,
            );
            function onAjaxSuccess(data) {
                console.log(data);
            }
            $('form input').each((function(ind, elem){
                elem.value ='';
            }));
        }
    });
    //form validation ends here

    // language switch logic goes here
    let language = localStorage.getItem('language') || 'ru';
    $(`.${language}`).addClass('active');
    $('.langSwitcher button').each(function(ind, elem){
      let lang = $(this).attr('class').substr(0, 2);

      $(elem).on('click' , function() {
        $('.langSwitcher button').removeClass('active');
        $(this).addClass('active');
        localStorage.setItem('language', `${lang}`);
        location.reload();
      });
    });

  $('body').removeClass('readyState');


    //dom-i18n starts here
    let i18n = domI18n({
        selector: '[data-translatable]',
        separator: ' // ',
        languages: ['ru', 'ua', 'en'],
        defaultLanguage: 'ru',
        currentLanguage: `${language}`
    });
});

