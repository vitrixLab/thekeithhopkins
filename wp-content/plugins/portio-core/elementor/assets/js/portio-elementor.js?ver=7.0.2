/*
Template Name: Portio
Author: wpoceans
Version: 1.0
*/

(function ($) {
    'use strict';

    /*------------------------------------------
        = Header search toggle
    -------------------------------------------*/
    if ($(".global-header__search-wrapper").length) {
        var searchToggleBtn = $(".global-search__toggle-btn");
        var searchToggleBtnIcon = $(".global-search__toggle-btn i");
        var searchContent = $(".global_header__search-form");
        var body = $("body");

        searchToggleBtn.on("click", function (e) {
            searchContent.toggleClass("global_header__content-toggle");
            searchToggleBtnIcon.toggleClass("fi ti-close");
            e.stopPropagation();
        });

        body.on("click", function () {
            searchContent.removeClass("global_header__content-toggle");
        }).find(searchContent).on("click", function (e) {
            e.stopPropagation();
        });
    }

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation__collapse");
        var openBtn = $(".mobile__navigation .open__navbar");
        var xbutton = $(".mobile__navigation .navbar-toggler");

        openBtn.on("click", function (e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            xbutton.toggleClass("x-close");
            return false;
        })
    }

    toggleMobileNavigation();

    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();

    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation__collapse");
        var smallNav = $(".navigation__collapse > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function (e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.toggleClass("rotate");
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();

    $("body").on("click", function () {
        $('.navigation__collapse').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.navigation__collapse').removeClass('slideInn');
    });
    $(".menu-close").on("click", function () {
        $('.open-btn').removeClass('x-close');
    });


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.global-header__navigation .global__navigation').length) {
        cloneNavForSticyMenu($('.global-header__navigation .global__navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.global-header__navigation .global__navigation');

        if ($(window).scrollTop() > 500) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.addClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;


    }

    /*==========================================================================
       WHEN WINDOW SCROLL
   ==========================================================================*/
    $(window).on("scroll", function () {

        if ($(".global-header__navigation").length) {
            stickyMenu($('.global-header__navigation .global__navigation'), "sticky-on");
        }


    });

    /*=========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {

        toggleMobileNavigation();

    });


    /*==========================================================================
       WHEN WINDOW RESIZE
   ==========================================================================*/
    $(window).on("resize", function () {
        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function () {
            smallNavFunctionality();
        }, 200));
    });


    /*----- ELEMENTOR LOAD FUNTION CALL ---*/

    $(window).on('elementor/frontend/init', function () {

        var hero_slider = function () {
            /* hero-image-slider */
            $('.hero-image-slider').slick({
                dots: false,
                arrows: false,
                speed: 500,
                fade: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            });


        }; // end


        var hero_slider_two = function () {

            /* hero-slider */
            $('.hero-slider').slick({
                autoplay: true,
                speed: 1000,
                lazyLoad: 'progressive',
                arrows: false,
                dots: true,
            }).slickAnimation();


        }; // end

        var hero_slider_three = function () {

            /* volunteer-slider js */
            const swiper = new Swiper('.swiper-container', {
                centeredSlides: true,
                longSwipesMs: 0,
                loopPreventsSlide: false,
                longSwipes: true,
                longSwipesRatio: 0,
                threshold: 0,
                slideToClickedSlide: true,
                slidesPerView: 5,
                speed: 900,
                loop: true,
                loopedSlides: 1,
                spaceBetween: 0,
                autoplay: {
                    delay: 3000,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });



        }; // end

        var hero_slider_four = function () {
            /* hero-text-slider-s2 */
            $('.hero-text-slider-s2').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 1,
                speed: 8000,
                dots: false,
                cssEase: 'linear',
                waitForAnimate: false,
                pauseOnFocus: false,
                pauseOnHover: false,
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });

        }; // end

        var hero_odometer = function () {

            /*------------------------------------------
              = FUNFACT
              -------------------------------------------*/
            if ($(".odometer").length) {
                $('.odometer').appear();
                $(document.body).on('appear', '.odometer', function (e) {
                    var odo = $(".odometer");
                    odo.each(function () {
                        var countNumber = $(this).attr("data-count");
                        $(this).html(countNumber);
                    });
                });
            }

        }; // end


        var progess_bar = function () {
            /* progresbar js */
            const block = document.querySelectorAll('.block');
            window.addEventListener('load', function () {
                block.forEach(item => {
                    let numElement = item.querySelector('.num');
                    let num = parseInt(numElement.innerText);
                    let count = 0;
                    let time = 2000 / num;
                    let circle = item.querySelector('.circle');
                    setInterval(() => {
                        if (count == num) {
                            clearInterval();
                        } else {
                            count += 1;
                            numElement.innerText = count;
                        }
                    }, time)
                    circle.style.strokeDashoffset
                        = 503 - (503 * (num / 100));

                })
            });


        }; // end



        var testimonials_slider = function () {

            /* testimonial - slider */
            $('.testimonial-slider').slick({
                dots: false,
                arrows: true,
                fade: true,
                slidesToShow: 1,
                slidesToShow: 1,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        dots: true,
                        arrows: false,
                    }
                },

                ]
            });

        }; // end

        var testimonials_slider2 = function () {
            /* testimonial-slider-s2 */
            $('.testimonial-slider-s2').slick({
                dots: false,
                infinite: true,
                arrows: true,
                speed: 500,
                loop: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });

        }; // end




        var odometer = function () {

            /*------------------------------------------
             = FUNFACT
             -------------------------------------------*/
            if ($(".odometer").length) {
                $('.odometer').appear();
                $(document.body).on('appear', '.odometer', function (e) {
                    var odo = $(".odometer");
                    odo.each(function () {
                        var countNumber = $(this).attr("data-count");
                        $(this).html(countNumber);
                    });
                });
            }



        }; // end




        var partners_slider = function () {

            if ($(".sponsor-slider").length) {
                $('.sponsor-slider').slick({
                    dots: false,
                    arrows: false,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 757,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },

                    ]
                });
            }


        }; // end



        var event_date = function () {


            // Set the target elements with the same class
            var dateElements = $(".event-date");

            // Update each set of date elements
            dateElements.each(function () {
                updateClock($(this));
            });

            // Set interval to update every second
            setInterval(function () {
                dateElements.each(function () {
                    updateClock($(this));
                });
            }, 1000);

            function updateClock(dateElement) {
                var eventDate = new Date(dateElement.data("event-date")); // Get the date from data attribute
                var currentDate = new Date();

                var difference = Math.abs(eventDate - currentDate);
                var days = Math.floor(difference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                var mins = Math.floor((difference / (1000 * 60)) % 60);
                var seconds = Math.floor((difference / 1000) % 60);

                // Select elements within the dateElement
                var getday = dateElement.find(".days");
                var gethour = dateElement.find(".hours");
                var getmins = dateElement.find(".mins");
                var getsec = dateElement.find(".sec");

                getday.text(checkZero(days));
                gethour.text(checkZero(hours));
                getmins.text(checkZero(mins));
                getsec.text(checkZero(seconds));
            }

            function checkZero(mytime) {
                return mytime < 10 ? "0" + mytime : mytime;
            }



        }; // end


        var eventSlider_active = function () {


            if ($(".event-active").length) {
                $(".event-active").slick({
                    autoplay: false,
                    autoplaySpeed: 6000,
                    pauseOnHover: true,
                    arrows: true,
                    dots: false,
                    fade: true,
                    cssEase: 'linear',
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            arrows: false,
                            dots: true
                        }
                    }]

                });
            }

        }; // end


        var event_slider = function () {

            if ($(".event-slider").length) {
                $('.event-slider').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            dots: true,
                            arrows: false,
                        }
                    },
                    ]
                });

            }

        }; // end


        //hero_slider
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_hero.default', function ($scope, $) {
            hero_slider();
        });
        //hero_slider_two
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_slider.default', function ($scope, $) {
            hero_slider_two();
        });
        //hero_slider_three
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_slider.default', function ($scope, $) {
            hero_slider_three();
        });

        //hero_slider_four
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_marquee.default', function ($scope, $) {
            hero_slider_four();
        });

        //hero_odometer
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_hero.default', function ($scope, $) {
            hero_odometer();
        });

        //testimonial
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_testimonial.default', function ($scope, $) {
            testimonials_slider();
        });

        //testimonial
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_testimonial.default', function ($scope, $) {
            testimonials_slider2();
        });

        //progess_bar
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_about.default', function ($scope, $) {
            progess_bar();
        });

        //odometer
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_funfact.default', function ($scope, $) {
            odometer();
        });

        //partners_slider
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_client.default', function ($scope, $) {
            partners_slider();
        });

        //prayer_slide
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_gallery.default', function ($scope, $) {
            prayer_slide();
        });

        //event_date
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_event.default', function ($scope, $) {
            event_date();
        });

        //eventSlider_active
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_event.default', function ($scope, $) {
            eventSlider_active();
        });

        //event_slider
        elementorFrontend.hooks.addAction('frontend/element_ready/wpo-portio_event.default', function ($scope, $) {
            event_slider();
        });

    });


})(jQuery);  