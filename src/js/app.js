window.$ = window.jQuery = require('jquery');

//select
(function($) {

  $.fn.niceSelect = function(method) {
    
    // Methods
    if (typeof method == 'string') {      
      if (method == 'update') {

        this.each(function() {
          let index = $(this).parents('.select').find(':selected').index();
          $(this).parents('.select').find('.selected').removeClass('selected');
          $(this).parents('.select').find('.option').eq(index).addClass('selected');
          let text = $(this).parents('.select').find('.option').eq(index).text();
          $(this).parents('.select').find('.current').text(text);
        });

      } 
      return this;
    }
      
    // Hide native select
    this.hide();
    
    // Create custom markup
    this.each(function() {
      var $select = $(this);
      
      if (!$select.next().hasClass('nice-select')) {
        create_nice_select($select);
      }
    });
    
    function create_nice_select($select) {
      $select.after($('<div></div>')
        .addClass('nice-select')
        .addClass($select.attr('class') || '')
        .addClass($select.attr('disabled') ? 'disabled' : '')
        .attr('tabindex', $select.attr('disabled') ? null : '0')
        .html(`<span class="current js-animated"></span><svg class="icon"><use xlink:href="${$select.data('icon')}"></use></svg><div class="scroll-container nice-select__list"><div class="scroll-child"><ul></ul></div></div>`)
      );
        
      var $dropdown = $select.next();
      var $options = $select.find('option');
      var $selected = $select.find('option:selected');
      
      $dropdown.find('.current').html($selected.data('display') || $selected.text());
      $options.each(function(i) {
        var $option = $(this);
        var display = $option.data('display');

        $dropdown.find('ul').append($('<li></li>')
          .attr('data-value', $option.val())
          .attr('data-display', (display || null))
          .addClass('option' +
            ($option.is(':selected') ? ' selected' : '') +
            ($option.is(':disabled') ? ' disabled' : ''))
          .html($option.text())
          .addClass('js-animated')
        );
      });
    }
    
    /* Event listeners */
    
    // Unbind existing events in case that the plugin has been initialized before
    $(document).off('.nice_select');
    
    // Open/close
    $(document).on('click.nice_select', '.nice-select', function(event) {
      var $dropdown = $(this);
      
      $('.nice-select').not($dropdown).removeClass('open');
      $dropdown.toggleClass('open');
      
      if ($dropdown.hasClass('open')) {
        $dropdown.find('.option');  
        $dropdown.find('.focus').removeClass('focus');
        $dropdown.find('.selected').addClass('focus');
      } else {
        $dropdown.focus();
      }
    });
    
    // Close when clicking outside
    $(document).on('click.nice_select', function(event) {
      if ($(event.target).closest('.nice-select').length === 0) {
        $('.nice-select').removeClass('open').find('.option');  
      }
    });
    // Option click
    $(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function(event) {
      var $option = $(this);
      var $dropdown = $option.closest('.nice-select');
      
      $dropdown.find('.selected').removeClass('selected');
      $option.addClass('selected');
      
      var text = $option.data('display') || $option.text();
      $dropdown.find('.current').text(text);
      
      $dropdown.prev('select').val($option.data('value')).trigger('change');
    });

    //callback
    if (typeof method === 'object') {
      method.onComplete();
    }

    return this;
  };

}(jQuery));

import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import device from 'current-device';
import Scrollbar from 'smooth-scrollbar';
import slick from "slick-carousel";
window.Lazy = require('jquery-lazy');
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import "inputmask/lib/extensions/inputmask.numeric.extensions";
import Inputmask from "inputmask/lib/extensions/inputmask.date.extensions";
import tippy from 'tippy.js';

$(document).ready(function() {
  $select.init();
  $checkbox.init();
  $mask.init();
  animatedElements.init();
  $nav.init();
  catalogue.init();
  $scrollArea.init();
  images.init();
  slider.init();
  filter.init();
  picker.init();
  tabs.init();
  tooltips.init();

  if($('html').hasClass('desktop')) {
    //code
  }
})


window.addEventListener('load',function(){ 
  //code
}, false);

$(window).resize(function () {
  
})

const $window = {
  width: function() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }
}
//check device
function desktop() {
  if($('html').hasClass('desktop')) {
    return true;
  } else {
    return false;
  }
}

let animatedElements = {
  init: function() {
    $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', '.js-animated', function(event) {
      let $target = $(this);
  
      if(event.type=='touchstart' && !$('html').hasClass('desktop')) {
        $target.addClass('touch');
      } else if(event.type=='mouseenter' && $('html').hasClass('desktop')) {
        $target.addClass('hover');
      } else if(event.type=='mousedown' && $('html').hasClass('desktop')) {
        $target.addClass('focus');
      } else if(event.type=='mouseup' && $('html').hasClass('desktop')) {
        $target.removeClass('focus');
      } else {
        $target.removeClass('touch');
        $target.removeClass('hover');
        $target.removeClass('focus');
      }
    })
  }
}
let $checkbox = {
  element: $('.checkbox, .radio'),
  init: function() {
    $checkbox.check();
    $(document).on('click', '.checkbox', function() {
      $checkbox.check();
    })
    $(document).on('click', '.radio', function() {
      $checkbox.check();
    })
  },
  check: function() {
    $checkbox.element.each(function() {
      let input = $(this).find('input');
      if(input.prop('disabled')) {
        $(this).addClass('disabled');
      } else {
        $(this).removeClass('disabled');
      }
      if(input.prop('checked')) {
        $(this).addClass('checked');
      } else {
        $(this).removeClass('checked');
      }
    })
  }
}
let tooltips = {
  el: '[data-tippy-content]',
  init: function() {
    tippy(tooltips.el, {
      duration: 300,
      theme: 'light-border',
      animation: 'scale-extreme',
      inertia: true
    });
  }
}
let $nav = {
  trigger: $('.nav-toggle'),
  el: $('.m-nav'),
  overlay: $('.overlay'),
  state: false,
  open: function() {
    this.resize();
    this.state=true;
    this.el.addClass('active');
    this.trigger.addClass('active');
    this.overlay.addClass('active');
    $('html,body').animate({scrollTop:0},300);
    disablePageScroll();
  },
  close: function() {
    this.resize();
    this.state=false;
    this.el.removeClass('active');
    this.trigger.removeClass('active');
    this.overlay.removeClass('active');
    enablePageScroll();
  },
  resize: function() {
    let w = $(window).height(),
        p = $('#panel').length>0 ? $('#panel').height() : 0;
    this.el.outerHeight(w - p)
  },
  init: function() {
    this.resize();
    $nav.trigger.on('click', function(event) {
      event.preventDefault();
      if($nav.state==false) {
        $nav.open();
      } else {
        $nav.close();
      }
    })
    $(window).resize(function () {
      if($window.width()>1024) {
        if($nav.state==true) {
          $nav.close();
        }
      } else {
        $nav.resize();
      }
    })
    $nav.overlay.on('click touchstart', function() {
      if($nav.state==true) {
        $nav.close();
      }
    })
  }
}
let $select = {
  el: $('.select select'),
  init: function() {
    this.el.niceSelect({onComplete: function() {
      //code
    }});
  }
}
let $mask = {
  el: document.querySelector('[name="phone"]'),
  init: function() {
    if($mask.el!==null) {
      Inputmask({
        mask: "+7 999 999-9999",
        clearIncomplete: true
      }).mask($mask.el);
    }
  }
}
let $scrollArea = {
  init: function() {
    this.elms = document.querySelectorAll('.scroll-container');

    for (let elm of this.elms) {
      let scroll = Scrollbar.init(elm, {
        damping: 0.1,
        alwaysShowTracks: true,
        thumbMinSize: 100
      });
      setInterval(()=>{
        //scroll.update();
      }, 500)
    }
  }
}
//ctlg
let catalogue = {
  $toggle: $('.nav__catalogue-trigger'),
  $navTrigger: $('.ctlg-nav-m__item'),
  $nav: $('.ctlg-nav'),
  state: false,
  init: function() {

    let $parent = $('.ctlg-nav-m'),
        h = $parent.find('.ctlg-nav-m__list').height(),
        $subnav = $('.ctlg-nav-s__list'),
        $trigger = $('.ctlg-nav-m__item');

    $subnav.each(function() {
      let items = $(this).find('.ctlg-nav-s__item'),
          allHeight = 0;

      $(this).height(h);

      items.each(function() {
        allHeight = allHeight + $(this).height();
      })
      if(allHeight>h) {
        $(this).addClass('extended');
      }
    })

    //prevent for touch
    $('.ctlg-nav-m__link').on('click', function(event) {
      if(!desktop() && $(this).siblings('.ctlg-nav-s').length>0) {
        event.preventDefault();
      }
    })

    this.$navTrigger.on('click mouseenter mouseleave', function(event) {
      let $this = $(this);

      function isLink() {
        if($this.find('.ctlg-nav-s').length>0) {
          return false;
        } else {
          return true;
        }
      }

      if(event.type=='mouseenter' && desktop()) {
        $(this).addClass('active');
      } else if(event.type=='mouseleave' && desktop()) {
        catalogue.$navTrigger.removeClass('active');
      } else if(event.type=='click' && !desktop() && !isLink()) {
        if(!$(this).hasClass('active')) {
          catalogue.$navTrigger.not($(this)).removeClass('active');
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      }

    })

    //toggle nav
    $(document).on('click touchstart', function(event) {
      if(event.type=='click' && $(event.target).is(catalogue.$toggle) && !desktop()) {
        if(catalogue.state) {
          catalogue.close();
        } else {
          catalogue.open();
        }
      } 
      else if(event.type=='touchstart' && !$(event.target).is(catalogue.$toggle) && $(event.target).closest(catalogue.$nav).length==0) {
        catalogue.close();
      }
    })
    catalogue.$toggle.on('mouseenter mouseleave', function(event) {
      if(desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })
    $parent.on('mouseenter mouseleave', function(event) {
      if(desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })

  },
  open: function() {
    catalogue.state=true;
    catalogue.$toggle.addClass('active');
    catalogue.$nav.addClass('active');
  }, 
  close: function() {
    catalogue.state=false;
    catalogue.$toggle.removeClass('active');
    catalogue.$nav.removeClass('active');
    catalogue.$navTrigger.removeClass('active');
  }
}
let filter = {
  el: $('.filter'),
  isReplaced: false,
  $trigger: $('.js-filter-toggle'),
  opened: true,
  init: function() {
    if(this.el.length>0) {

      this.changePos();

      this.$trigger.on('click', function() {
        if($window.width()<=768 && filter.opened==false) {
          filter.show();
        } else if($window.width()<=768) {
          filter.hide();
        }
      })

      $(window).resize(function () {
        filter.changePos();
      })

    }
  },
  changePos: function() {
    if($window.width()<=768 && this.isReplaced==false) {
      this.isReplaced=true;
      this.hide();
      this.el.appendTo($('.js-m-filter-parent'))
    } else if($window.width()>768 && this.isReplaced==true) {
      this.show();
      this.isReplaced=false;
      this.el.appendTo($('.js-d-filter-parent'))
    }
  },
  show: function() {
    this.opened = true;
    this.el.addClass('active');
    this.$trigger.find('span').text(this.$trigger.data('hide-text'))

  },
  hide: function() {
    this.opened = false;
    this.el.removeClass('active');
    this.$trigger.find('span').text(this.$trigger.data('show-text'))
  }
}
let images = {
  init: function() {
    $(window).resize(function(){
      images.loaded = $('.lazy.loaded');
      images.resize(images.loaded);
    })
    images.load();
  },
  load: function() {
    images.el = $('.lazy').not('.loaded');
    if(images.el.length>0) {
      images.el.Lazy({
        effectTime: 0,
        threshold: 500,
        imageBase: false,
        defaultImage: false,
        visibleOnly: false,
        afterLoad: function(element) {
          $(element).addClass('loaded');
          images.resize($(element));
        }
      });
    }
  },
  resize: function(element) {
    element.each(function() {
      let $this = $(this),
          box = $this.parent();
      if(!box.hasClass('cover-box_size-auto')) {
        let boxH = box.height(),
            boxW = box.width();
        setTimeout(function() {
          let imgH = $this.height(),
              imgW = $this.width();
          if ((boxW / boxH) >= (imgW / imgH)) {
            $this.addClass('ww').removeClass('wh');
          } else {
            $this.addClass('wh').removeClass('ww');
          }
          $this.addClass('visible');
        }, 300)
      } else {
        $this.addClass('visible');
      }
    })
  }
}
let slider = {
  el: $('.slider'),
  init: function() {
    slider.el.each(function () {
      $(this).on('init', function () {
        $(this).addClass('visible');
        $(this).find('.slick-arrow').addClass('js-animated');
      });

      $(this).on('beforeChange afterChange', function(){
        images.load();
      });

      $(this).on('breakpoint', function(){
        $(this).find('.slick-arrow').addClass('js-animated');
      });
  
      let slideCount = 1,
        slideCount1210 = 1,
        slideCount1024 = 1,
        slideCount768 = 1,
        slideCount576 = 1,
        slideCount420 = 1,
        arrows = false,
        dots = false,
        centerMode = false,
        adaptiveHeight = false,
        autoplay = false;
  
      if($(this).hasClass('dots')) {
        dots = true;
      }
      if($(this).hasClass('arrows')) {
        arrows = true;
      }
      if($(this).hasClass('banner-slider')) {
        autoplay = true;
      }
      if($(this).is('.brands-slider.size1 .slider')) {
        autoplay = true;
        slideCount = 4;
        slideCount1210 = 3;
        slideCount1024 = 7;
        slideCount768 = 5;
        slideCount576 = 3;
        slideCount420 = 3;
      }
      if($(this).is('.brands-slider.size2 .slider')) {
        autoplay = true;
        slideCount = 8;
        slideCount1210 = 7;
        slideCount1024 = 7;
        slideCount768 = 5;
        slideCount576 = 3;
        slideCount420 = 3;
      }
      if($(this).is('.s-ctg-slider')) {
        autoplay = true;
        slideCount = 7;
        slideCount1210 = 7;
        slideCount1024 = 6;
        slideCount768 = 5;
        slideCount576 = 3;
        slideCount420 = 2;
      }
      if($(this).is('.ctlg-slider')) {
        slideCount = 4;
        slideCount1210 = 4;
        slideCount1024 = 3;
        slideCount768 = 2;
        slideCount576 = 1;
        slideCount420 = 1;
      }

      if(!$(this).is('.js-custom-slider')) {
        $(this).slick({
          infinite: true,
          dots: dots,
          arrows: arrows,
          speed: 600,
          centerMode: centerMode,
          slidesToShow: slideCount,
          slidesToScroll: slideCount,
          autoplay: autoplay,
          autoplaySpeed: 6000,
          rows: 0,
          responsive: [{
              breakpoint: 1210,
              settings: {
                slidesToShow: slideCount1210,
                slidesToScroll: slideCount1210
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: slideCount1024,
                slidesToScroll: slideCount1024
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: slideCount768,
                slidesToScroll: slideCount768
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: slideCount576,
                slidesToScroll: slideCount576
              }
            },
            {
              breakpoint: 420,
              settings: {
                slidesToShow: slideCount420,
                slidesToScroll: slideCount420
              }
            }
          ]
        });
      }

      if($(this).is('.m-item-slider')) {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          rows: 0,
          fade: true,
          asNavFor: '.m-nav-slider'
        });
      }
      if($(this).is('.m-nav-slider')) {
        $(this).slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          asNavFor: '.m-item-slider',
          dots: false,
          rows: 0,
          focusOnSelect: true,
          responsive: [{
            breakpoint: 576,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          }]
        });
      }
    
    });

  }
}
let tabs = {
  block: $('.tab-block'),
  init: function() {
    this.block.each(function() {

      let $parent = $(this),
          $trigger = $parent.find('.tab-trigger'),
          $tab = $parent.find('.tab-item'),
          index = $parent.find('.tab-item.active').length>0 ? $parent.find('.tab-item.active').index() : 0;

      function changeTab() {
        $tab.removeClass('active').eq(index).addClass('active');
        $trigger.removeClass('active').eq(index).addClass('active'); 
      }
      changeTab();

      $trigger.on('click', function() {
        index = $(this).data('tab');
        changeTab();
      })

    })
  }
}
//date/time
let picker = {
  init: function() {
    let $date = $('.js-picker-date'),
        $time = $('.js-picker-time');

    function addDateEv() {
      $('.flatpickr-monthDropdown-months, .flatpickr-next-month, .flatpickr-prev-month, .flatpickr-day, .numInputWrapper').addClass('js-animated');
    }
    function addTimeEv() {
      $('.flatpickr-time .numInputWrapper span').addClass('js-animated');
    }

    flatpickr($date.find('input'), {
      minDate: "today",
      "locale": Russian,
      disableMobile: "true",
      dateFormat: "d.m.Y",
      onReady: function() {
        addDateEv();
      },
      onMonthChange: function() {
        addDateEv();
      },
      onChange: function() {
        addDateEv();
      }
    });

    flatpickr($time.find('input'), {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      disableMobile: "true",
      onReady: function() {
        addTimeEv();
      },
      onMonthChange: function() {
        addTimeEv();
      },
      onChange: function() {
        addTimeEv();
      }
    });
  }
}