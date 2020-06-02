// page transitions 

$(document).ready(function() {
  $(".animsition-overlay").animsition({
    inClass: 'overlay-slide-in-left',
    outClass: 'overlay-slide-out-left',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : true,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
});




//slider

var $slider = $(".slider");
var $slides = $slider.find(".slider-item");
var $navPrev = $(".go-prev");
var $navNext = $(".go-next");
var $startAutoplay = $(".start-autoplay");
var $stopAutoplay = $(".stop-autoplay");
var slidesNum = $slides.length;
var prevSlideID = null;
var currentSlideID = 0;
var isAnimating = false;
var isAutoPlay = false;



function init() {
  TweenLite.set($slides, {
    left: "100%",
    ease: "power3.out"
  });
  $navPrev.on("click", gotoPrevSlide);
  $navNext.on("click", gotoNextSlide);
  $startAutoplay.on("click", startAutoPlay);
  $stopAutoplay.on("click", stopAutoPlay);
  gotoSlide(0, 0);
}

function gotoPrevSlide() {
  var slideToGo = currentSlideID - 1;
  if (slideToGo <= -1) {
    slideToGo = slidesNum - 1;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 1, "prev");
}

function gotoNextSlide() {
  var slideToGo = currentSlideID + 1;
  if (slideToGo >= slidesNum) {
    slideToGo = 0;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 1, "next");
}

function gotoSlide(slideID, _time, _direction) {
  if (!isAnimating) {
    isAnimating = true;
    prevSlideID = currentSlideID;
    currentSlideID = slideID;
    var $prevSlide = $slides.eq(prevSlideID);
    var $currentSlide = $slides.eq(currentSlideID);
    var $prevInner = $slides.eq(prevSlideID).find(".inner");
    var $currentInner = $slides.eq(currentSlideID).find(".inner");
    var currentH1 = $slides.eq(currentSlideID).find("h1.large span");
    var currentArrows = $slides.eq(currentSlideID).find(".arrows i");
    var currentParagraph = $slides.eq(currentSlideID).find(".title-small");
    var time = 6;
    if($currentSlide){
      TweenLite.to($currentInner, 6, {css:{transform: "scale(1.08)"}});
      TweenLite.to($prevInner, 0.1, {css:{transform: "scale(1)"}, delay:7});
      TweenMax.set(currentH1, {autoAlpha:0, y:"100%"})
      TweenMax.staggerTo(currentH1, 1, {y:"0%", autoAlpha:1, ease:Power3.out, delay:1}, 0.2);
      TweenMax.set(currentArrows, {autoAlpha:0})
      TweenMax.to(currentArrows, 1, {autoAlpha:1, ease:Power3.out, delay:0.9});
      TweenMax.set(currentParagraph, {autoAlpha:0});
      TweenMax.to(currentParagraph, 1, {autoAlpha:1, ease:Power3.out, delay:0.8})
    }
    if (_time !== null) {
      time = _time;
    }
    var direction = "next";
    if (_direction != null) {
      direction = _direction;
    }
    if (direction == "next") {
      TweenLite.to($prevSlide, time, {
        left: "0%"
      });
      TweenLite.fromTo($currentSlide, time, {
        left: "100%"
      }, {
        left: "0"
      });
    } else {
      TweenLite.to($prevSlide, time, {
        left: "100%"
      });
      TweenLite.fromTo($currentSlide, time, {
        left: "100%"
      }, {
        left: "0"
      });
    }
    TweenLite.delayedCall(time, function() {
      isAnimating = false;
    });
  }
}

function play(){
  gotoNextSlide();
  TweenLite.delayedCall(6, play);
}

function startAutoPlay(immediate) {
  if (immediate != null) {
    immediate = false;
  }
    
  if (immediate) {
    gotoNextSlide();
  }
  TweenLite.delayedCall(6, play);
}

function stopAutoPlay() {
  isAutoPlay = true;
  TweenLite.killDelayedCallsTo(play);
}
init();
startAutoPlay();




$('.sl').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  centerMode: true,
  centerPadding: "-10px",
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('.sl .slick-next').append('<span><img src="img/arrow-next.svg"></span>');



var $status = $('.pagingInfo');
var $slickElement = $('.sl2');

$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.slideCount);
});



$slickElement.slick({
  dots: false,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 4000,
  slidesToScroll: 1,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
  vertical:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical:false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical:false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical:false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


// var element = document.getElementById("sl2");
// var photosNumber = element.children.length
// document.getElementById('allPh').innerHTML = photosNumber;
// console.log(slickCurrentSlide())






//other animation


var menuLines = $(".line:nth-child(odd)");
var menuLine = $(".line:nth-child(2)");
var content = document.querySelector('#menu-overlay');
var button = document.querySelector('#nav');


button.onclick = function() {
  if ( content.clientWidth === 0 ) {
    // max-height of a number "larger-than-necessary" in order to be dynamic
    TweenLite.to('#menu-overlay', .5, {css: {width: "100%"}})
    TweenLite.to(menuLines, 0.1, {css:{transform: "scale(0)", opacity:"0"}})
    TweenMax.to(menuLine, 0.1, {css:{transform: "rotate(90deg) scale(1.7)"}})
    TweenMax.staggerTo("#menu-overlay h2", 0.5, {autoAlpha:1, x:0}, 0.2)
  } else {
    TweenLite.to('#menu-overlay', .5, {css: {width: 0}})
    TweenLite.to(menuLines, 0.1, {css:{transform: "scale(1)", opacity:"1"}})
    TweenMax.to(menuLine, 0.1, {css:{transform: "rotate(0deg) scale(1)"}})
    TweenMax.staggerTo("#menu-overlay h2", 0.5, {autoAlpha:0}, 0.2)
  }
}



//custom cursor

// const cursor = document.querySelector(".cursor");
// document.addEventListener("mousemove", e =>{
//   cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX -10)+"px;");
// })

// document.addEventListener("click", () =>{
//   cursor.classList.add("expand");
//   setTimeout(() => {
//     cursor.classList.remove("expand")
//   }, 500)
// })

var cursor = $(".cursor"),
  follower = $(".cursor-follower");

  var posX = 0,
  posY = 0,
  mouseX = 0,
  mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX - 20,
        top: posY - 20
      }
      });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    });
    }
  });

  $(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  $("a").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
    });

  $("a").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

    $("#nav").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
    });

  $("#nav").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

  $("button").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
    });

  $("button").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

   $(".indicators img").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
    });

  $(".indicators img").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });


//parallax

  var controller = new ScrollMagic.Controller();

  var parallaxTl = new TimelineMax();

  parallaxTl
      .from('.content-wrapper', 0.4, {autoAlpha: 0, ease:Power0.easeNone}, 0.4 )
      .from('.bcg', 2, {y: '-35%', ease: Power0.easeNone}, 0 )

  var slideParallaxScene = new ScrollMagic.Scene({
    triggerElement: '.bcg-parallax',
    triggerHook: 1,
    duration: '200%'
  })

  .setTween(parallaxTl)
  .addTo(controller)



// onload animation

TweenMax.staggerTo("h3.large div", 1, {css:{transform:"translateY(0%)", opacity: "1"}, delay:1}, 0.2);
TweenMax.fromTo("p.small", 1, {autoAlpha:0}, {autoAlpha:1, ease:Power3.out, y:0, delay:1})
TweenMax.to(".bcg-parallax", 0.9, {css:{width:"100%", autoAlpha:1, ease:Power3.out}, delay:1.5});



var controller = new ScrollMagic.Controller();

  var textTl = new TimelineMax();

  textTl
      .staggerTo('h3.large-text div', 1, {autoAlpha: 1, y:0, ease:Power3.out}, 0.2)
      .staggerTo(".about-text", 1, {autoAlpha:1, y:0, ease:Power3.out}, 0.2)
      .to(".large-text div.line", 1, {autoAlpha:1, y:0, ease:Power3.out}, 0.2)

  var textAbout = new ScrollMagic.Scene({
    triggerElement: '.text-section',
    triggerHook: 0.7,
    reverse: false
  })

.setTween(textTl).addTo(controller);



var controller = new ScrollMagic.Controller();

  var sliderAboutTl = new TimelineMax();

  sliderAboutTl
      .staggerTo('h3.slider-large div', 1, {autoAlpha: 1, y:0, ease:Power3.out}, 0.2)


  var sliderAbout = new ScrollMagic.Scene({
    triggerElement: '.container-inner',
    triggerHook: 0.7,
    reverse:false
  })

.setTween(sliderAboutTl).addTo(controller);


var controller = new ScrollMagic.Controller();

var contactTlFooter = new TimelineMax();

  contactTlFooter
      .to(".line4", 0.5, {y:"0", autoAlpha:1})
      .staggerTo('.rev_item', 1, {autoAlpha: 1, y:0, ease:Power3.out}, 0.2)


  var contactTlFooter = new ScrollMagic.Scene({
    triggerElement: 'footer',
    triggerHook: 0.7,
    reverse:false
  })

.setTween(contactTlFooter).addTo(controller);





TweenMax.to(".sl2", 1, {css:{opacity:"1", transform:"translateY(0%)"}, delay:1});
TweenMax.to(".indicators .prev", 1, {autoAlpha:0.6, delay:1.5});
TweenMax.to(".indicators .next", 1, {autoAlpha:0.6, delay:1.5});
TweenMax.to(".pagingInfo", 1, {autoAlpha:1, delay:1.5});
TweenMax.to(".slider-caption", 1, {autoAlpha:1, delay:1.5});











