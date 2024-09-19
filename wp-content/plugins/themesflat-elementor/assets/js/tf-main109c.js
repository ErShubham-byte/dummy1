;(function($) {
    "use strict";
    var responsive_menu = function() {        
        $('.tf-nav-menu').each(function(){
            var $this = $(this).data('id_random'),
            $tf_nav_menu = $('.'+$this),
            $btn_menu_mobile = $('.'+$this).find('.btn-menu-mobile'),
            $close_menu_panel_style_default = $('.'+$this).find('.close-menu-panel-style-default'),
            $btn_menu_only = $('.'+$this).find('.btn-menu-only'),
            $mobile_menu_overlay = $('.'+$this).find('.mobile-menu-overlay');
            $('.'+$this).find('.btn-submenu').remove();
            var hasChildMenu = $tf_nav_menu.find('.mainnav-mobi').find('li:has(ul)');
            hasChildMenu.children('ul').hide();                                    
            hasChildMenu.children('a').after('<span class="btn-submenu"><i class="fa fa-angle-down" aria-hidden="true"></i></span>');
            var menuType = 'desktop';
            $(window).on('load resize', function() {
                var currMenuType = 'desktop';
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {                
                    currMenuType = 'mobile';
                }
                if ( currMenuType !== menuType ) {
                    menuType = currMenuType;
                } else {                             
                    $('.'+$this).find('.mobile-menu-overlay').removeClass('active');
                    $('.'+$this).find('.nav-panel').removeClass('active');      
                }
            });
            $(document).on('click', '.mainnav-mobi li .btn-submenu', function(e) {
                $(this).toggleClass('active').next('ul').slideToggle(300);
                e.stopImmediatePropagation();
                e.preventDefault();
            }); 
            //Open Nav
            $($btn_menu_mobile).on('click', function() {                
                $(this).addClass('active');
                $(this).siblings().addClass('active');
            });             
            //Close Nav
            $($close_menu_panel_style_default).on('click', function() {             
                $(this).closest('.nav-panel').removeClass('active');             
                $(this).closest('.nav-panel').siblings().removeClass('active');           
            });
            $($mobile_menu_overlay).on('click', function() {             
                $(this).siblings().removeClass('active');            
                $(this).removeClass('active');            
            }); 
            $($btn_menu_only).on('click', function() { 
                $(this).siblings().addClass('active');
            });            
        });             
    }    
    var carousel_Box = function() {
        if ( $().owlCarousel ) {
            $('.tf-carousel-box').each(function(){
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                spacer = Number($this.data("spacer")),
                prev_icon = $this.data("prev_icon"),
                next_icon = $this.data("next_icon");
                var loop = false;
                if ($this.data("loop") == 'yes') {
                    loop = true;
                }
                var arrow = false;
                if ($this.data("arrow") == 'yes') {
                    arrow = true;
                } 
                var auto = false;
                if ($this.data("auto") == 'yes') {
                    auto = true;
                }                
                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: spacer,
                    nav: true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    autoplayHoverPause: true,
                    navText : ["<i class=\""+prev_icon+"\"></i>","<i class=\""+next_icon+"\"></i>"],
                    responsive: {
                        0:{
                            items:item3
                        },
                        768:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    }
    var onepage_nav = function () {
        $('.tf-nav-menu.has-one-page .mainnav > ul > li > a').on('click',function(e) {
            var anchor = $(this).attr('href').split('#')[1];            
            var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
            var headerHeight = 0;
            headerHeight = $('.header').height();        
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                   if ( $('.header-shadow').length > 0 ) {
                        headerHeight = headerHeight;
                   } else {
                        headerHeight = 0;
                   }                   
                   var target = $('#'+anchor).offset().top - headerHeight;
                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            e.preventDefault();
        });
    } 
    var search_form = function(){
        $('.tf-widget-search').each(function(){
            $(this).find('.tf-icon-search').on('click' , function(){
                $(this).siblings('.tf-modal-search-panel').addClass('show');
            });
        });
        $(document).on('click', '.tf-widget-search .tf-modal-search-panel', function() {
            $(this).removeClass('show');
        });
        $(document).on('click', '.tf-widget-search .tf-search-form', function(e) {
            e.stopImmediatePropagation();
        });
    };
    var blogPostsOwl = function() {
        if ( $().owlCarousel ) {
            $('.tf-posts-wrap.has-carousel').each(function(){
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                spacer = Number($this.data("spacer")),
                prev_icon = $this.data("prev_icon"),
                next_icon = $this.data("next_icon");
                var loop = false;
                if ($this.data("loop") == 'yes') {
                    loop = true;
                }
                var arrow = false;
                if ($this.data("arrow") == 'yes') {
                    arrow = true;
                } 
                var auto = false;
                if ($this.data("auto") == 'yes') {
                    auto = true;
                }                
                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: spacer,
                    nav: true,
                    pagination: false,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    navText : ["<i class=\""+prev_icon+"\"></i>","<i class=\""+next_icon+"\"></i>"],
                    responsive: {
                        0:{
                            items:item3
                        },
                        768:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    } 
    var blogPostsGallery = function() {
        $(".featured-image-gallery").each(function() {
            var $this = $(this);
            var animation = $this.data('animation_images'),
                autoplay = $this.data('autoplay'),
                slideshowSpeed = $this.data('slideshowSpeed'),
                controlNav = $this.data('controlnav'),
                directionNav = $this.data('directionnav'),
                prevText = $this.data('prevtext'),
                nextText = $this.data('nexttext');
            $this.flexslider({
                animation: animation,
                slideshow: autoplay,
                slideshowSpeed: slideshowSpeed,
                animationSpeed: 1000,
                animationLoop: true,
                controlNav: controlNav,
                directionNav: directionNav,
                prevText: '<i class="' + prevText + '" aria-hidden="true"></i>',
                nextText: '<i class="' + nextText + '" aria-hidden="true"></i>',
                useCCS: false
            });
        });
    }    
    var blogLoadMore = function() {
        var $container_wrap = $('.tf-posts-wrap'); 
        var $container = $('.tf-posts-wrap').find('.tf-posts');  
        $('.navigation.loadmore a').on('click', function(e) {
            e.preventDefault(); 
            $container.after('<div class="tfpost-loading"><span></span></div>');
            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                dataType: "html",
                success: function( out ) {
                    var result = $(out).find('.column');  
                    var nextlink = $(out).find('.navigation.loadmore a').attr('href');
                    result.css({ opacity: 0 , visibility: 'hidden' });
                    if ($container.hasClass('masonry')) {
                        $container.append(result).imagesLoaded(function () {
                            result.css({ opacity: 1 , visibility: 'visible' });
                            $container.isotope('appended', result);
                        });
                    }
                    else {
                        $container.append(result).imagesLoaded(function () {
                            result.css({ opacity: 1 , visibility: 'visible' });
                            $container.isotope('appended', result);
                        });                         
                    }
                    if ( nextlink != undefined ) {
                        $('.navigation.loadmore a').attr('href', nextlink);
                        $container_wrap.find('.tfpost-loading').remove();
                    } else {
                        $container_wrap.find('.tfpost-loading').addClass('no-ajax').text('All posts loaded').delay(2000).queue(function() {$(this).remove();});
                        $('.navigation.loadmore a').remove();
                    }
                }
            });
        });             
    }
    var blogMasonry = function() {
        $('.tf-posts-wrap .tf-posts').each(function(){
            var $this = $(this);
            if ($this.hasClass('masonry')) {
                var $grid = $this.isotope({
                    itemSelector: '.column',
                    percentPosition: true,
                    masonry: {
                    columnWidth: '.grid-sizer'
                    }
                });
                
                $grid.imagesLoaded().progress( function() {
                    $grid.isotope('layout');
                });
            } 
        });            
    } 
    var tftabs = function() {
        $('.tf-tabs').each( function() {
            
            $(this).find('.tf-tabnav ul > li').filter(':first').addClass('active').removeClass('inactive');
            $(this).find('.tf-tabcontent').children().filter(':first').addClass('active');
            
            if ( $(this).find('.tf-tabnav ul > li').hasClass('set-active-tab') ) {
                $(this).find('.tf-tabnav ul > li').siblings().removeClass('active');                
            }
            if ( $(this).find('.tf-tabcontent').children().hasClass('set-active-tab') ) {
                $(this).find('.tf-tabcontent').children().siblings().removeClass('active');
            }
            $(this).find('.tf-tabnav ul > li').on('click', function(){
                var tab_id = $(this).attr('data-tab');
                $(this).siblings().removeClass('active').removeClass('set-active-tab').addClass('inactive');
                $(this).closest('.tf-tabs').find('.tf-tabcontent').children().removeClass('active').removeClass('set-active-tab').addClass('inactive');
                $(this).addClass('active').removeClass('inactive');
                $(this).closest('.tf-tabs').find('.tf-tabcontent').children('#'+tab_id).addClass('active').removeClass('inactive');
            });
        });
    }
    var vegasSlider = function() {
        $(".hero-section").each(function() {            
            var            
            contentTopMargin = 0,
            heroHeight = 0,
            customHeight = 0,
            hero = $(this),
            windowHeight = $(window).height(),
            heroContent = hero.find('.vegas-content'),
            contentHeight = heroContent.height(),
            delay = Number(hero.data('delay')),
            spacing = hero.data('content'),
            slide_type = hero.data('slide_type'),
            customHeight = hero.data('height');
            var customHeightTablet = hero.data('height_tablet');
            var customHeightMobile = hero.data('height_mobile');

            if ( slide_type == 'full-height' ) {                
                heroHeight = windowHeight;
            }else {                
                heroHeight = customHeight;
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                    heroHeight = customHeightTablet;
                }
                if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                    heroHeight = customHeightMobile;
                }
            }
            
            if ( slide_type == 'full-height' ) {
                hero.css({ height: heroHeight + "px" });
                contentTopMargin = ((heroHeight - contentHeight) / 2) + spacing;
                heroContent.css("padding-top", (contentTopMargin) + "px");
            }else {                    
                hero.css({ height: heroHeight + "px" });
                contentTopMargin = ((heroHeight - contentHeight) / 2) + spacing;
                heroContent.css("padding-top", (contentTopMargin) + "px");
            }
            
            if ( $().vegas ) {
                $(".hero-section.slidehero").each(function() {
                    var
                    $this = $(this),
                    count = $this.data('count'),
                    count = parseInt(count,10),
                    effect = $this.data('effect'),
                    images = $this.data('image'),
                    cOverlay = $this.data('overlay'),
                    pOverlay = $this.data('poverlay'),
                    i = 0,
                    slides = [],
                    imgs = images.split('|');
                    while ( i < count ) {
                        slides.push( {src:imgs[i]} );
                        i++;
                    }
                    $this.vegas({
                        slides: slides,
                        overlay: true,
                        transition: effect,
                        delay: delay,
                    });
                    var overlay = $('<div />', {
                        class: 'overlay',
                        style: 'background:' + cOverlay
                    });                   
                    $(this).append(overlay).find('.vegas-overlay').addClass(pOverlay);
                });
            }        
            if ( $().YTPlayer ) {
                $(".hero-section.slidevideo").each(function() {
                    var
                    $this = $(this),
                    cOverlay = $this.data('overlay'),
                    overlay = $('<div />', {
                        class: 'overlay',
                        style: 'position: absolute; width: 100%; height: 100%; background:' + cOverlay
                    });
                    $this.YTPlayer().append(overlay);
                });
            }
            if ( $('.slide-fancy-text').is('.scroll') ) {
                $('.slide-fancy-text.scroll').each(function() {
                    var
                    $this = $(this),
                    current = 1,
                    height = $this.children('.heading').height(),
                    numberDivs = $this.children().length,
                    first = $this.children('.heading:nth-child(1)');
                    $this.height(height);
                    $this.siblings('.prefix-text, .suffix-text').height(height);
                    setInterval(function() {                                    
                        var number = current * -height;                   
                        first.css('margin-top', number + 'px');
                        if ( current === numberDivs ) {
                            first.css('margin-top', '0px');
                            current = 1;
                        } else current++;
                    }, delay);
                });
            }       
            if ( $('.slide-fancy-text').is('.typed') ) {
                if ( $().typed ) {
                    $('.slide-fancy-text.typed').each(function() {
                        var
                        $this = $(this),
                        texts = $this.data('fancy').split(',');
                        $this.find('.text').typed({
                            strings: texts,
                            typeSpeed: 40,
                            loop:true,
                            backDelay: delay
                        });
                    });
                }
            }
        });
        $(".hero-section").each(function() {
            var $this = $(this);
            $this.find('.scroll-target').on('click',function() {
                var anchor = $(this).attr('href').split('#')[1];
                if ( anchor ) {
                    if ( $('#'+anchor).length > 0 ) {
                        var headerHeight = 0;
                        if ( $('body').hasClass('header-sticky') ) {
                            headerHeight = $('#site-header').height();
                        }
                        var target = $('#' + anchor).offset().top - headerHeight;
                        if ( $('body').hasClass('admin-bar') ) {
                            var wpadminbar = $('#wpadminbar').height();
                            target = $('#' + anchor).offset().top - headerHeight - wpadminbar;
                        }
                        $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                   }
                }
                return false;
            });
        });
    };
    var flexSlider = function() {
        $(".flexslider").each(function() {
            var $this = $(this),
            adminBarHeight = 0,
            topBarHeight = 0,
            contentTopMargin = 0,
            adminBar = $('#wpadminbar'),
            topBar = $('#top-bar'),
            headerHeight = $('header').height(),            
            flexsliderHeight = $this.data('height'),
            flexsliderHeightTablet = $this.data('height_tablet'),
            flexsliderHeightMobile = $this.data('height_mobile'),
            flexSliderContent = $this.find('.flex_caption'),            
            contentHeight = flexSliderContent.outerHeight();            
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                flexsliderHeight = flexsliderHeightTablet;
            }
            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ) {
                flexsliderHeight = flexsliderHeightMobile;
            }
            $this.find('.item-slide').height(flexsliderHeight);
            if (topBar.length) topBarHeight = topBar.height();
            if (adminBar.length) adminBarHeight = adminBar.height();          
            
            if (contentHeight == 0) {
                contentHeight = (flexsliderHeight * 0.5);                
            }
            if ( $this.hasClass('header-absolute') ) {
                contentTopMargin = ((flexsliderHeight + topBarHeight + headerHeight - contentHeight ) / 2);
                flexSliderContent.css("margin-top", (contentTopMargin) + "px");
            } else {
                contentTopMargin = ((flexsliderHeight - contentHeight ) / 2);
                flexSliderContent.css("margin-top", (contentTopMargin) + "px");
            }
            var animation = $this.data('animation_images'),
                autoplay = $this.data('autoplay'),
                slideshowSpeed = $this.data('slideshowSpeed'),
                controlNav = $this.data('controlnav'),
                directionNav = $this.data('directionnav'),
                prevText = $this.data('prevtext'),
                nextText = $this.data('nexttext');
            $this.flexslider({
                animation: 'fade',
                slideshow: autoplay,
                slideshowSpeed: slideshowSpeed,
                animationSpeed: 1000,
                animationLoop: true,
                controlNav: controlNav,
                directionNav: directionNav,
                prevText: '<i class="' + prevText + '" aria-hidden="true"></i>',
                nextText: '<i class="' + nextText + '" aria-hidden="true"></i>',
                useCCS: false
            });
        });
    }  
    var postFormatIziModal = function(){
        if ($('body').find('div').hasClass('izimodal')) {
            $(".izimodal").iziModal({
                width: 850,
                top: null,
                bottom: null,
                borderBottom: false,
                padding: 0,
                radius: 3,
                zindex: 999999,
                iframe: false,
                iframeHeight: 400,
                iframeURL: null,
                focusInput: false,
                group: '',
                loop: false,
                arrowKeys: true,
                navigateCaption: true,
                navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
                history: false,
                restoreDefaultContent: true,
                autoOpen: 0, // Boolean, Number
                bodyOverflow: false,
                fullscreen: false,
                openFullscreen: false,
                closeOnEscape: true,
                closeButton: true,
                appendTo: 'body', // or false
                appendToOverlay: 'body', // or false
                overlay: true,
                overlayClose: true,
                overlayColor: 'rgba(0, 0, 0, .7)',
                timeout: false,
                timeoutProgressbar: false,
                pauseOnHover: false,
                timeoutProgressbarColor: 'rgba(255,255,255,0)',
                transitionIn: 'comingIn',
                transitionOut: 'comingOut',
                transitionInOverlay: 'fadeIn',
                transitionOutOverlay: 'fadeOut',
                onFullscreen: function(){},
                onResize: function(){},
                onOpening: function(){},
                onOpened: function(){},
                onClosing: function(){},
                onClosed: function(){},
                afterRender: function(){}
            });
            $(document).on('click', '.trigger', function (event) {
                event.preventDefault();
                $('.izimodal').iziModal('setZindex', 99999999);
                $('.izimodal').iziModal('open', { zindex: 99999999 });
                $('.izimodal').iziModal('open');
            });
        }
    }   
    /* Sticky
    ------------------------------------*/
    var TF_Sticky = function() {
        var wpadminbar = $('#wpadminbar').outerHeight(); 
        $('.tf-sticky-section').each(function() { 
            var section =  $(this),
                section_id =  section.data('id');                                         
                
            if (section.hasClass('tf-sticky-yes')) {
                var class_section = $('.elementor-element-'+section_id+'.tf-sticky-yes'),
                    section_height = $(class_section).outerHeight(),
                    section_width = $(class_section).outerWidth(),         
                    injectSpace = $('<div />', { height: section_height }).insertAfter($(class_section));   
                    injectSpace.hide();
                var element_class_sticky = '.elementor-element-'+section_id,
                    tfsticky = $(element_class_sticky+'.tf-sticky-yes'),
                    offset = tfsticky.offset(),
                    tfsticky_offset_top = offset.top;   
                    $(element_class_sticky+'.elementor-inner-section.tf-sticky-yes').css({'width':section_width});                 
                    if ($('body').hasClass('admin-bar')) {    
                        var tfsticky_offset_top = tfsticky_offset_top - wpadminbar;
                    }
                $(window).on('scroll', function() { 
                    if ( $(window).scrollTop() >=  tfsticky_offset_top  ) {                             
                        tfsticky.addClass('tf-element-sticky');
                        injectSpace.show();
                    } else {  
                        tfsticky.removeClass('tf-element-sticky');
                        injectSpace.hide();
                    }
                }); 
            }
        })              
    }  
    /* Preloader
    ------------------------------------*/
    var tfRemovePreloader = function() {    
        $(".tf-preloader").fadeOut('slow',function(){
            setTimeout(function() {
                $(this).remove(); 
            });
        }); 
    };
    var widgetPortfolioIsotope = function() { 
        if ( $( '.tf-portfolio-wrap' ).hasClass('grid-styles-default') ) {
            $('.tf-portfolio-wrap.grid-styles-default').each(function() { 
                var $this = $(this);
                if ( $().isotope ) {           
                    var $container = $this.find('.tf-portfolio');
                    $container.imagesLoaded(function(){
                        $container.isotope({
                            itemSelector: '.column',
                            transitionDuration: '1s'
                        });
                    });  
                    $this.find('.portfolio-filter li').on('click',function() {                           
                        var selector = $(this).find("a").attr('data-filter');
                        $this.find('.portfolio-filter li').removeClass('active');
                        $(this).addClass('active');
                        $container.isotope({ filter: selector });
                        return false;
                    });            
                };
            });
        };        
    };
    var testimonial_Carousel = function() {
        if ( $().owlCarousel ) {
            $('.tf-testimonial-carousel').each(function(){
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                spacer = Number($this.data("spacer")),
                prev_icon = $this.data("prev_icon"),
                next_icon = $this.data("next_icon");
                var loop = false;
                if ($this.data("loop") == 'yes') {
                    loop = true;
                }
                var arrow = false;
                if ($this.data("arrow") == 'yes') {
                    arrow = true;
                } 
                var auto = false;
                if ($this.data("auto") == 'yes') {
                    auto = true;
                }                
                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: spacer,
                    nav: true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    smartSpeed: 850,
                    autoplayHoverPause: true,
                    navText : ["<i class=\""+prev_icon+"\"></i>","<i class=\""+next_icon+"\"></i>"],
                    responsive: {
                        0:{
                            items:item3
                        },
                        768:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    }
    var widget_header_modal_Right = function() {
        const body = $('body');
        const modalMenu = $('.header-style3 .modal-menu-right');
        const modalMenuBody = modalMenu.children('.modal-menu__body');
        if (modalMenu.length) {
            const open = function() {
                modalMenu.addClass('modal-menu--open');
            };
            const close = function() {
                modalMenu.removeClass('modal-menu--open');
            };
            $('.modal-menu-right-btn').on('click', function() {
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
        $('.header-style3 #mainnav').attr('id', 'mainnav-mobi');
        $('.header-style3 .modal-menu__body #mainnav-mobi .menu li').each(function(n) {
            if ($('.header-style3 .modal-menu__body #mainnav-mobi .menu li:has(ul)').find(">span").length == 0) {
               $('.header-style3 .modal-menu__body #mainnav-mobi .menu li:has(ul)').append('<span class="fa fa-angle-right"></span>');
             }
            $(this).find('.sub-menu').css({display: 'none'});
        });
        $('.header-style3 .modal-menu__body  #mainnav-mobi .menu li:has(ul) > span').on('click', function (e) {
            e.preventDefault();
            $(this).closest('li').children('.sub-menu').slideToggle();
            $(this).closest('li').toggleClass('opened');
        });
    };
    var widget_headerSticky = function() { 
        if ( $('.tf-widget-header').hasClass('header_sticky_yes') ) {
            var header = $('.tf-widget-header'),
            hd_height = $('.tf-widget-header').outerHeight(),
            injectSpace = $('<div />', { height: hd_height }).insertAfter($('.tf-widget-header.header_sticky_yes'));   
            injectSpace.hide();
            $(window).on('load scroll resize', function() {
                var wpadminbar = $('#wpadminbar').outerHeight(); 
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
                        if ( $(window).scrollTop() >= hd_height ) { 
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
        if ( $('.tf-widget-header').hasClass('header_fixed_yes') ) {
            $(window).on('load resize', function() {
                var wpadminbar = $('#wpadminbar').outerHeight();
                $('.header_fixed_yes').css('top',wpadminbar);
            })
        }        
    }
    var fancy_text = function(){
        if ( $('.fancy-text').is('.scroll') ) {
                $('.fancy-text.scroll').each(function() {
                    var
                    $this = $(this),
                    current = 1,
                    height = $this.children('.heading').outerHeight(),
                    numberDivs = $this.children().length,
                    first = $this.children('.heading:nth-child(1)');
                    $this.height(height);
                    $this.siblings('.prefix-text, .suffix-text').height(height);
                    setInterval(function() {                                    
                        var number = current * -height;                   
                        first.css('margin-top', number + 'px');
                        if ( current === numberDivs ) {
                            first.css('margin-top', '0px');
                            current = 1;
                        } else current++;
                    }, 3000);
                });
            }       
            if ( $('.fancy-text').is('.typed') ) {
                if ( $().typed ) {
                    $('.fancy-text.typed').each(function() {
                        var
                        $this = $(this),
                        texts = $this.data('fancy').split(',');
                        $this.find('.text-fancy').typed({
                            strings: texts,
                            typeSpeed: 100,
                            loop:true,
                            backDelay: 3000
                        });
                    });
                }
            }
    }
    var pagepiling = function(){
        if ($('#pagepiling').length > 0){
            let  anchors=[];
            let allSection = $('#pagepiling > .pagepiling-section');
            if(allSection.length> 0 ){
                allSection.each(function(){                    
                    let dataId = $(this).data('pagehash').replace(/\s/g, '').toLowerCase();
                    anchors.push(dataId);
                });
            }            
            $('#pagepiling').pagepiling({
                scrollingSpeed: 280,
                navigation:false,
                menu: '.pagepiling-menu',
                anchors: anchors,
                afterRender: function(anchorLink, index){                   
                    MenuColor();
                },
                afterLoad: function(anchorLink, index){
                    $('.pp-section .inner-pagepiling-section').removeClass('animate');
                    $('.active .inner-pagepiling-section').addClass('animate');
                    MenuColor();
                }
            });
            function MenuColor(){
                if ($('.pp-section.active').hasClass('section-bg-white')){
                    $('.page-template-page-piling header').addClass('is-section-white');
                }else{
                    $('.page-template-page-piling header').removeClass('is-section-white');
                }
            }

            if( $('.pagepiling-menu li').length>0){
                $('.pagepiling-menu li:first a').addClass('active');
            }
        }
    }
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-nav-menu.default', responsive_menu );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfcarousel.default', carousel_Box );        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-nav-menu.default', onepage_nav );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-search.default', search_form );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfposts.default', blogPostsOwl );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfposts.default', blogPostsGallery );        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfposts.default', blogLoadMore );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfposts.default', blogMasonry );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfposts.default', postFormatIziModal );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tftabs.default', tftabs );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/vegas-slider.default', vegasSlider );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/flex-slider.default', flexSlider ); 
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-preload.default', tfRemovePreloader );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tfportfolio.default', widgetPortfolioIsotope );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-testimonial-carousel.default', testimonial_Carousel );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-header-widget.default', widget_header_modal_Right ); 
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-header-widget.default', widget_headerSticky );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-title-section.default', fancy_text );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-load-pagepiling.default', pagepiling );
    });
    $(window).on('load resize', function() {
        responsive_menu();
        onepage_nav();
        search_form();      
    });
    // Dom Ready
    $(function() {
        flexSlider();
        vegasSlider();
        postFormatIziModal();  
        TF_Sticky();
    });
    $(window).on('resize', function() {
        flexSlider();
        vegasSlider();      
    });
})(jQuery);