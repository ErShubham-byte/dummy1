/**
* isMobile
* headerFixed
* responsiveMenu
* themesflatSearch
* detectViewport
* blogLoadMore
* commingsoon
* goTop
* retinaLogos
* customizable_carousel
* parallax
* iziModal
* bg_particles
* pagetitleVideo
* toggleExtramenu
* removePreloader
*/

;(function($) {

    "use strict";

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var Modal_Right = function() {
        const body = $('body');
        const modalMenu = $('.modal-menu-left');
        const modalMenuBody = modalMenu.children('.modal-menu__body');

        if (modalMenu.length) {
            const open = function() {
                modalMenu.addClass('modal-menu--open');
            };
            const close = function() {
                modalMenu.removeClass('modal-menu--open');
            };

            $('.modal-menu-left-btn').on('click', function() {
                open();
            });
            $('.modal-menu__backdrop, .modal-menu__close').on('click', function() {
                close();
            });
        }

        modalMenu.on('click', function(event) {
            const trigger = $(this);
            const item = trigger.closest('[data-modal-menu-item]');
            let panel = item.data('panel');

            if (!panel) {
                panel = item.children('[data-modal-menu-panel]').children('.modal-menu__panel');

                if (panel.length) {
                    modalMenuBody.append(panel);
                    item.data('panel', panel);
                    panel.width(); // force reflow
                }
            }

            if (panel && panel.length) {
                event.preventDefault();
            }
        });
        $('.modal-menu__body #mainnav-secondary .menu li').each(function(n) {
            if ($('.modal-menu__body #mainnav-secondary .menu li:has(ul)').find(">span").length == 0) {
               $('.modal-menu__body #mainnav-secondary .menu li:has(ul)').append('<span class="fa fa-angle-right"></span>');
             }
            $(this).find('.sub-menu').css({display: 'none'});
        });
        $('.modal-menu__body  #mainnav-secondary .menu li:has(ul) > span').on('click', function (e) {
            e.preventDefault();
            $(this).closest('li').children('.sub-menu').slideToggle();
            $(this).closest('li').toggleClass('opened');
        });
    };

    var menu_Modal_Left = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';
            var adminbar = $('#wpadminbar').height();

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {                
                currMenuType = 'mobile';                              
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').hide();
                    var hasChildMenu = $('#mainnav_canvas').find('li:has(ul)');
                    hasChildMenu.children('ul').hide();
                    if (hasChildMenu.find(">span").length == 0) {
                        hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    }
                    $('.btn-menu').removeClass('active');
                    $('.canvas-nav-wrap .inner-canvas-nav').css({'padding-top': adminbar});
                    $('.canvas-nav-wrap .canvas-menu-close').css({'top': (adminbar + 30)});
                } else {
                    var $mobileMenu = $('#mainnav').show();
                    $('.canvas-nav-wrap .inner-canvas-nav').css({'padding-top': adminbar});
                    $('.canvas-nav-wrap .canvas-menu-close').css({'top': (adminbar + 30)}); 
                    $('#header').find('.canvas-nav-wrap').removeClass('active');            
                }
            }
        });

        $('.btn-menu').on('click', function() {
            $(this).closest('#header').find('.canvas-nav-wrap').toggleClass('active');
        });

        $('.canvas-nav-wrap .overlay-canvas-nav').on('click', function(e) {
            $(this).closest('#header').find('.canvas-nav-wrap').toggleClass('active');
        });

        $(document).on('click', '#mainnav_canvas li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation();
        });        
    };

    var headerFixed = function() {         
        if ( $('body').hasClass('header_sticky') ) {
            var header = $('.themesflat_header_wrap.themesflat_header_wrap_theme'),
            hd_height = $('.themesflat_header_wrap.themesflat_header_wrap_theme').outerHeight(),
            injectSpace = $('<div />', { height: hd_height }).insertAfter($('.themesflat_header_wrap.themesflat_header_wrap_theme'));   
            injectSpace.hide();            
            $(window).on('load scroll resize', function() {
                var top_height = $('.themesflat-top').outerHeight(),
                wpadminbar = $('#wpadminbar').outerHeight();
                if (top_height == undefined ) {
                    top_height = 0;
                } 
                if (wpadminbar == undefined ) {
                    wpadminbar = 0;
                }

                if ( matchMedia( 'only screen and (max-width: 600px)' ).matches ) {                
                    if ( $(window).scrollTop() >=  hd_height ) { 
                        header.addClass('header-sticky'); 
                        $('.header-sticky').removeAttr('style');                                      
                        injectSpace.show();
                    } else { 
                        $('.header-sticky').removeAttr('style'); 
                        header.removeClass('header-sticky');
                        injectSpace.hide();
                    }                            
                }else {
                    if ( $(window).scrollTop() >=  hd_height + top_height + wpadminbar ) { 
                        header.addClass('header-sticky');  
                        $('.header-sticky').css('top',wpadminbar);                                     
                        injectSpace.show();
                    } else { 
                        $('.header-sticky').removeAttr('style'); 
                        header.removeClass('header-sticky');
                        injectSpace.hide();
                    }
                }
            })
        }      
    }

    var themesflatSearch = function () {
       $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID != 's' ) ) {
                $('.top-search').removeClass('show');   
                $('.show-search').removeClass('active');             
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (e) {           
            if( !$( this ).hasClass( "active" ) )
                $( this ).addClass( 'active' );
            else
                $( this ).removeClass( 'active' );
             e.preventDefault();

            if( !$('.top-search' ).hasClass( "show" ) )
                $( '.top-search' ).addClass( 'show' );
            else
                $( '.top-search' ).removeClass( 'show' );
        });
    };

    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax').parallax("50%", -0.5);           
        }
    };

    var pagetitleVideo = function(){
        if ( $('.page-title').hasClass('video') ) {
            jQuery(function () {          
               jQuery("#ptbgVideo").YTPlayer();     
            });
        }
    };

    var blogLoadMore = function() { 
        var $container = $('.wrap-blog-article'),
        $container_faq = $('.wrap-faq');
        if ( $('body').hasClass('page-template') ) {
            var $container = $('.wrap-blog-article');
        }   

        $('.navigation.loadmore a').on('click', function(e) {
            e.preventDefault(); 
            var $item = '.item';
            if ($(this).parents('nav').hasClass("faq")) {
                $container = $container_faq;
                $item = '.item';
            }

            $('<span/>', {
                class: 'infscr-loading',
                text: 'Loading...',
            }).appendTo($container);

            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                dataType: "html",
                success: function( out ) {
                    var result = $(out).find($item);  
                    var nextlink = $(out).find('.navigation.loadmore a').attr('href');

                    result.css({ opacity: 0 });
                    if ($container.hasClass('blog-masonry')) {
                        $container.append(result).imagesLoaded(function () {
                            result.css({ opacity: 1 });
                            $container.masonry('appended', result);
                        });
                    }
                    else {
                        result.css({ opacity: 1 });
                        $container.append(result);
                    }

                    if ( nextlink != undefined ) {
                        $('.navigation.loadmore a').attr('href', nextlink);
                        $container.find('.infscr-loading').remove();
                    } else {
                        $container.find('.infscr-loading').addClass('no-ajax').text('All posts loaded.').delay(2000).queue(function() {$(this).remove();});
                        $('.navigation.loadmore a').remove();
                    }
                    customizable_carousel();
                    iziModal();
                }
            })
        })       
    } 

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 500 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        });

        $('.go-top').on('click', function(event) { 
            event.preventDefault();           
            $("html, body").animate({ scrollTop: 0 }, 1000);            
        });
    };

    var customizable_carousel_div = function() {
        var owl_carousel = $("div.customizable-carousel");
        if (owl_carousel.length > 0) {
            owl_carousel.each(function() {
                var $this = $(this),
                    $items = ($this.data('items')) ? $this.data('items') : 1,
                    $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                    $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                    $navarrows = ($this.data('nav-arrows')) ? $this.data('nav-arrows') : false,
                    $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : false,
                    $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 3500,
                    $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 950,
                    $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                    $space = ($this.attr('data-space')) ? $this.data('space') : 15;

                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                        0: {
                            items: ($this.data('xs-items')) ? $this.data('xs-items') : 1,
                            nav: false
                        },
                        600: {
                            items: ($this.data('sm-items')) ? $this.data('sm-items') : 2,
                            nav: false
                        },
                        1000: {
                            items: ($this.data('md-items')) ? $this.data('md-items') : 3
                        },
                        1240:{
                            items: $items
                        }
                    },
                    dots: $navdots,
                    autoplayTimeout: $autospeed,
                    smartSpeed: $smartspeed,
                    autoHeight: $autohgt,
                    margin: $space,
                    nav: $navarrows,
                    navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
                    autoplay: $autoplay,
                    autoplayHoverPause: true
                });
            });
        }
    }; 

    var bg_bottom = function() {
        $(window).on('load resize', function() {
            var width_span = $('.copyright span').outerWidth()+100;
            $('.bottom .bg_copyright').css('min-width',width_span);
        })
    } 

    var onepage_nav = function () {
        $('.anchor-menu .mainnav > ul > li > a').on('click',function() {           
            var anchor = $(this).attr('href').split('#')[1];           
            var headerHeight = $('.header').outerHeight();
            var wpadminbar = $('#wpadminbar').outerHeight();
            if (wpadminbar == undefined ) {
                wpadminbar = 0;
            }
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                    var target = $('#'+anchor).offset().top - (headerHeight + wpadminbar);

                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            return false;
        })

        $('.anchor-menu .mainnav ul > li > a').on( 'click', function() {
            $( this ).addClass('active').parent().siblings().children().removeClass('active');
            $(this).parents('#mainnav-mobi').hide();                        
        });

        $('.anchor-menu #mainnav_canvas ul > li > a').on( 'click', function() {            
            $(this).parents('.canvas-nav-wrap').removeClass('active');            
        });
    } 

    var removePreloader = function() {
        $("#preloader").fadeOut('slow',function(){
            setTimeout(function() {
                $("#preloader").remove();
            }, 1000);
        });
    };

// Dom Ready
$(function() {
    Modal_Right();
    menu_Modal_Left();
    headerFixed();
    themesflatSearch(); 
    parallax();
    pagetitleVideo();
    blogLoadMore();
    goTop();
    customizable_carousel_div(); 
    bg_bottom(); 
    onepage_nav();
    removePreloader();
});
})(jQuery);