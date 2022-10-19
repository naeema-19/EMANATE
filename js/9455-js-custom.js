var w = 0;
$(function(){
    "use strict";

    /*----- Page Loader Start ----- */
    $(window).on("load", function() {
        $('#preloader').delay(2000).fadeOut(500);
    });
    /*----- Page Loader End ----- */

    /*----- Sticky Header Start ----- */
    $(window).on("scroll", function() {
		if ($(this).scrollTop() > 0){  
	    	$('.header').addClass("sticky");
	  	}
	  	else{
	    	$('.header').removeClass("sticky");
	  	}
	});
	/*----- Sticky Header End ----- */

	$(document).ready(function() {
		/*----- Menu Toggle Start ----- */
        $(".menu-toggle").on("click", function(){
            $(this).toggleClass("active");
            $(".main-menu").slideToggle();
            $(".nav-menu > ul ul").slideUp(200);
            $("li.menu-dropdwon a").removeClass("active");
        });
        /*----- Menu Toggle End ----- */

        /*----- Submenu Drop Down Start ----- */
        $("li.menu-dropdwon a").on("click", function() {
            if ( $(window).width() < 1025 ){
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).siblings(".nav-menu > ul ul").slideUp(200);
                } else {
                    $("li.menu-dropdwon a").removeClass("active");
                    $(this).addClass("active");
                    $(".menu-in").slideUp(200);
                    $(this).siblings(".nav-menu > ul ul").slideDown(200);
                };
            };
        });
        /*----- Submenu Drop Down End ----- */

        /*----- Roadmap Slider Start ----- */
        if ($(".roadmap-slider").length > 0){
            $('.roadmap-slider').owlCarousel({
                loop:true,
                nav: false,
                dots: false,
                items: 4,
                margin: 30,
                autoplay:true,
                autoplayTimeout:5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    1025: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    },
                }
            });
        }
        /*----- Roadmap Slider End ----- */

        /*----- Blog Slider Start ----- */
        if ($(".blog-slider").length > 0){
            $('.blog-slider').owlCarousel({
                loop:true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay:true,
                autoplayTimeout:5000,
                autoplaySpeed: 1000,
                responsive: {
                    0: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    1024: {
                        items: 3,
                    },
                }
            });
        }
        /*----- Blog Slider End ----- */

        /*----- FAQ According Start ----- */
        $(function() {
            $('.faq-title').on("click", function(j) {
                var dropDown = $(this).closest('.faq-box').find('.faq-panel');
                $(this).closest('.faq-content').find('.faq-panel').not(dropDown).slideUp();
            
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).closest('.faq-content').find('.faq-title.active').removeClass('active');
                    $(this).addClass('active');
                }
                dropDown.stop(false, true).slideToggle();
                j.preventDefault();
          });
        });
        /*----- FAQ According End ----- */

        /* -------- Countdown Timer ------- */
        if ($(".coins-counter-loop").length > 0) {
            var your_date = '2022-10-31 00:00:00';
            var second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;
            var countDown = new Date(your_date.replace(/-/g, "/")).getTime();
            setInterval(function() {    
                var now = new Date().getTime(),
                    distance = countDown - now;
                    document.getElementById('days').innerText = Math.floor(distance / (day));
                    document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
                    document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
                    document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
            }, second);
        }
        /* -------- Countdown Timer End ------- */

        /* -------- Coins Progress Start --------*/
        if ($(".coins-progress").length > 0) {
            setTimeout(coins_progress, 3000);
            function coins_progress() {
                $(".coins-progress span").each(function () {
                    $(this).animate({
                        width: $(this).attr("data-progress") + "%",
                    },1000
                    );
                    $(this).text($(this).attr("data-progress") + "%");
                });
            };
        }
        /* -------- Coins Progress End --------*/

        /* -------- Contact Form SMS Start --------*/
        $('.contactfrm').on('submit',function(e){
            e.preventDefault();
            $('.contactfrmmsg').slideDown('slow');
        /* -------- Contact Form SMS Start --------*/
        });
    });
/* -------- Countdown Timer ------- */
    (function($){
        // Number of seconds in every time division
        var days    = 24*60*60,
            hours   = 60*60,
            minutes = 60;
        // Creating the plugin
        $.fn.countdown = function(prop){
            var options = $.extend({
                callback    : function(){},
                timestamp   : 0
            },prop);
            var left, d, h, m, s, positions;
            // Initialize the plugin
            init(this, options);
            positions = this.find('.position');
            (function tick(){
                // Time left
                left = Math.floor((options.timestamp - (new Date())) / 1000);
                if(left < 0){
                    left = 0;
                }
                // Number of days left
                d = Math.floor(left / days);
                updateDuo(0, 1, d);
                left -= d*days;
                // Number of hours left
                h = Math.floor(left / hours);
                updateDuo(2, 3, h);
                left -= h*hours;
                // Number of minutes left
                m = Math.floor(left / minutes);
                updateDuo(4, 5, m);
                left -= m*minutes;
                // Number of seconds left
                s = left;
                updateDuo(6, 7, s);
                // Calling an optional user supplied callback
                options.callback(d, h, m, s);
                // Scheduling another call of this function in 1s
                setTimeout(tick, 1000);
            })();
            // This function updates two digit positions at once
            function updateDuo(minor,major,value){
                switchDigit(positions.eq(minor),Math.floor(value/10)%10);
                switchDigit(positions.eq(major),value%10);
            }
            return this;
        };
        function init(elem, options){
            elem.addClass('countdownHolder');
        }
        // Creates an animated transition between the two numbers
        function switchDigit(position,number){
            var digit = position.find('.digit')
            if(digit.is(':animated')){
                return false;
            }
            if(position.data('digit') == number){
                // We are already showing this number
                return false;
            }
            position.data('digit', number);
            var replacement = $('<span>',{
                'class':'digit',
                css:{
                    top:'-2.1em',
                    opacity:0
                },
                html:number
            });
            // The .static class is added when the animation
            // completes. This makes it run smoother.
            digit
                .before(replacement)
                .removeClass('static')
                .animate({top:'2.5em',opacity:0},'fast',function(){
                    digit.remove();
                })

            replacement
                .delay(100)
                .animate({top:0,opacity:1},'fast',function(){
                    replacement.addClass('static');
                });
        }
    })(jQuery);
    /* initialization main script */
    $(function(){
        var note = $('#note'),
            ts = new Date(2022,9,31),
            newYear = true;
        if((new Date()) > ts){
            // The new year is here! Count towards something else.
            // Notice the *1000 at the end - time must be in milliseconds
            ts = (new Date()).getTime() + 10*24*60*60*1000;
            newYear = false;
        }
        $('#countdown').countdown({
            timestamp   : ts,
            callback    : function(days, hours, minutes, seconds){
                var message = "";
                message += days + " day" + ( days==1 ? '':'s' ) + ", ";
                message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
                message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
                message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
                if(newYear){
                    message += "left until the new year!";
                }
                else {
                    message += "left to 10 days from now!";
                }
                note.html(message);
            }
        });
    });
    /* -------- Countdown Timer End ------- */
    

    /* -------- Roadmap Equal height Start ------- */
    var matchHeight = function () {
        function init() {
            eventListeners();
            matchHeight();
        }
        function eventListeners(){
            $(window).on('resize', function() {
                matchHeight();
            });
        }
        function matchHeight(){
            var groupName = $('[data-match-height]');
            var groupHeights = [];
            groupName.css('min-height', 'auto');
            groupName.each(function() {
                groupHeights.push($(this).outerHeight());
            });
            var maxHeight = Math.max.apply(null, groupHeights);
            groupName.css('min-height', maxHeight);
        };
        return {
            init: init
        };
    } ();
    $(document).ready(function() {
        matchHeight.init();
    });
    /* -------- Roadmap Equal height End ------- */

    /* -------- Partner box Height Start ------- */
    function container_height(){
        var grid_width = jQuery('.partners-grid').width();
        var box_width = (grid_width) + 32;
        jQuery('.partners-grid').css('height', box_width);
    }

    $(document).ready(function() {
    	container_height();
        jQuery('.partners-grid').css('opacity', 1);

        $(window).resize(function(){
            container_height();
        });
    });
    /* -------- Partner box Height Start ------- */
})
