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
import Inputmask from "inputmask";
import tippy from 'tippy.js';
window.fancybox = require("@fancyapps/fancybox");

$(document).ready(function() {
  $select.init();
  $checkbox.init();
  $mask.init();
  animatedElements.init();
  $nav.init();
  catalogue.init();
  images.load();
  slider.init();
  filter.init();
  picker.init();
  tabs.init();
  tooltips.init();
  pass.init();
  calc.init();
  inputs.init();

  modals();

  toggleblocks();

  if($('html').hasClass('desktop')) {
    //code
  }
})

window.addEventListener('load',function(){ 
  $scrollArea.init();
}, false);


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
function getUrlParams(url) {

  // извлекаем строку из URL или объекта window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // объект для хранения параметров
  var obj = {};

  // если есть строка запроса
  if (queryString) {

    // данные после знака # будут опущены
    queryString = queryString.split('#')[0];

    // разделяем параметры
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // разделяем параметр на ключ => значение
      var a = arr[i].split('=');

      // обработка данных вида: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // передача значения параметра ('true' если значение не задано)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // преобразование регистра
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        }
        // если индекс задан...
        else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      }
      // если параметр не задан, делаем это вручную
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

let animatedElements = {
  init: function() {
    $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a, button, label, .js-animated', function(event) {
      let $target = $(this);

      //mobile events
    if(!device.desktop()) {

      if(event.type=='touchstart') {
        $target.addClass('touch');
      } else if(event.type=='touchend') {
        setTimeout(function(){
          $target.removeClass('touch');
        }, 100)
      }

    } 
    //desktop events
    else {
      
      if(event.type=='mouseenter') {
        $target.addClass('hover');
      } else if(event.type=='mousedown') {
        $target.addClass('focus');
      } else if(event.type=='mouseup') {
        $target.removeClass('focus');
      } else {
        $target.removeClass('hover');
        $target.removeClass('focus');
      }

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
  el: document.querySelectorAll('.masked'),
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

    $parent.css('min-width', catalogue.$toggle.outerWidth())

    $subnav.each(function() {
      let items = $(this).find('.ctlg-nav-s__item'),
          allHeight = 0;

      items.each(function() {
        allHeight = allHeight + $(this).height();
      })
      if(allHeight/1.9>h) {
        $(this).addClass('extended');
        $(this).height(allHeight/1.9);
      } else {
        $(this).height(h);
        if(allHeight>h) {
          $(this).addClass('extended');
        }
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
        if($this.find('.ctlg-nav-s').length>0 && $(event.target).closest('.ctlg-nav-s').length==0) {
          return false;
        } else {
          return true;
        }
      }

      if(event.type=='mouseenter' && desktop()) {
        $(this).addClass('active');
      } else if(event.type=='mouseleave' && desktop()) {
        catalogue.$navTrigger.removeClass('active');
      } 
      
      else if(event.type=='click' && !desktop() && !isLink()) {
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
    //fix
    $('.bx_filter .bx_ui_slider_handle').addClass('js-animated');
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
window.images = {
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
        }
      });
    }
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
window.picker = {
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
//pass
let pass = {
  trigger: $('.js-pass-toggle'),
  init: function() {
    pass.trigger.on('click', function() {
      let input = $(this).siblings('input'),
          type = input.attr('type') == "text" ? "password" : 'text';
      
      input.prop('type', type);
      $(this).toggleClass('active');
    }) 
  }
}
let inputs = {
  init: function() {

    $(document).on('change input', 'input', function(event) {
      let $target = $(this);
      if($target.hasClass('num-only')) {
        $target.val( $target.val().replace(/\D/, '') )
      }
    })
    
  }
}
//calc
let calc = {
  element: $('.calc-count-block'),
  init: function() {
    this.element.each(function() {
      let $this = $(this),
          $plus = $this.find('.js-plus'),
          $minus = $this.find('.js-minus'),
          $input = $this.find('input'),
          val = +$input.val();
      
      check();
      $plus.on('click', function() {
        val++;
        check();
      })
      $minus.on('click', function() {
        val--;
        check();
      })
      $input.on('change input', function() {
        setTimeout(function() {
          val = +$input.val();
          check();
        },100)
      })

      function check() {
        console.log(val)
        if(val<1 || val==1) {
          val=1;
          $minus.addClass('disabled');
        } else {
          $minus.removeClass('disabled');
        }
        $input.val(val);
      }
    })
  }
}

//modals/popups
function modals() {
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="button fancybox-button fancybox-button--close" title="{{CLOSE}}"><i class="fas fa-times"></i></button>';
  $.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="button fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><i class="fas fa-arrow-left"></i></button>';
  $.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-prev class="button fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><i class="fas fa-arrow-right"></i></button>';
  $.fancybox.defaults.btnTpl.zoom = '<button data-fancybox-zoom class="button fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><i class="fas fa-search-plus"></i></button>';
  $.fancybox.defaults.btnTpl.download = '<a download data-fancybox-download class="button fancybox-button fancybox-button--download" href="javascript:;" title="{{DOWNLOAD}}"><i class="fas fa-download"></i></a>';
  $.fancybox.defaults.btnTpl.slideShow = '<button data-fancybox-play class="button fancybox-button fancybox-button--play" title="{{PLAY_START}}"><i class="fas fa-play"></i><i class="fas fa-pause"></i></button>';
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="button fancybox-button fancybox-close-small" title="{{CLOSE}}"><i class="fas fa-times"></i></button>';
  $.fancybox.defaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="button fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><i class="fas fa-grip-vertical"></i></button>';
  $.fancybox.defaults.i18n.ru = {
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже.',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.animationEffect = 'fade';
  $.fancybox.defaults.backFocus = false;
  $.fancybox.defaults.touch = false;
  $.fancybox.defaults.animationDuration = 500;
  $.fancybox.defaults.beforeShow = function() {
    images.load();
  };
  $.fancybox.defaults.afterShow = function() {
    images.load();
  };

  let $old;

  $('[data-fancybox]').fancybox({
    beforeShow: function(instance) {
      console.log('show')
      if($old!==undefined) {
        setTimeout(function(){
          $old.close();
          $old = instance;
        })
      } else {
        $old = instance;
      }
    }
  });

  //slider
  $('[data-fancybox="gallery"]').fancybox({
    touch: true
  });

  //get 
  if(getUrlParams().auth=='popup') {
    $.fancybox.open({
      src: '#auth',
      beforeShow: function(instance) {
        $old = instance;
      }
    })
  }
  
}

//toggle blocks
function toggleblocks() {
  let $container = $('.toggle-group'),
      $btns,
      $content;

  $(document).on('click', '.toggle-button', function(event) {
    event.preventDefault();

    $container = $(this).closest('.toggle-group');
    $content = $container.find('.toggle-content').eq(0);
    $btns = $container.find('.toggle-button').not($content.find('.toggle-button'));


    if($container.hasClass('active')) {
      $container.removeClass('active');
      $content.removeClass('active');
      $btns.each(function() {
        $(this).removeClass('active');
        if($(this).data('show-text')!==undefined) {
          if($(this).find('span').length>0) {
            $(this).find('span').text($(this).data('show-text'))
          } else {
            $(this).text($(this).data('show-text'))
          }
        }
      })
    } else {
      $container.addClass('active');
      $content.addClass('active');
      $btns.each(function() {
        $(this).addClass('active');
        if($(this).data('hide-text')!==undefined) {
          if($(this).find('span').length>0) {
            $(this).find('span').text($(this).data('hide-text'))
            console.log('2')
          } else {
            $(this).text($(this).data('hide-text'))
          }  
        }
      })
    }


  })


}

