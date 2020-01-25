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

import device from 'current-device';
import Scrollbar from 'smooth-scrollbar';
import slick from "slick-carousel";
import "inputmask/lib/extensions/inputmask.numeric.extensions";
import Inputmask from "inputmask/lib/extensions/inputmask.date.extensions";

$(document).ready(function() {
  $select.init();
  $checkbox.init();
  $mask.init();
  animatedElements.init();
  $nav.init();
  catalogue.init();
  $scrollArea.init();

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
  element: $('.checkbox'),
  init: function() {
    $(document).on('click', '.checkbox', function() {
      $checkbox.check();
    })
  },
  check: function() {
    $checkbox.element.each(function() {
      if($(this).find('input').prop('checked') || $('#' + $(this).attr('for')).prop('checked')) {
        $(this).addClass('checked');
        if($(this).hasClass('toggle-checkbox')) {
          $(this).parents('form').find('.toggle-item').addClass('active');
        }
      } else {
        $(this).removeClass('checked');
        if($(this).hasClass('toggle-checkbox')) {
          $(this).parents('form').find('.toggle-item').removeClass('active');
        }
      }
    })
  }
}
let $nav = {
  trigger: $('.nav-toggle'),
  el: $('.m-nav'),
  overlay: $('.overlay'),
  state: false,
  open: function() {
    this.state=true;
    this.el.addClass('active');
    this.trigger.addClass('active');
    this.overlay.addClass('active');
  },
  close: function() {
    this.state=false;
    this.el.removeClass('active');
    this.trigger.removeClass('active');
    this.overlay.removeClass('active');
  },
  init: function() {
    $nav.trigger.on('click', function() {
      if($nav.state==false) {
        $nav.open();
      } else {
        $nav.close();
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
        alwaysShowTracks: true
      });
      setInterval(()=>{
        scroll.update();
      }, 50)
    }
  }
}
let catalogue = {
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

    $('.ctlg-nav-m__link').on('click', function(event) {
      if(!desktop()) {
        event.preventDefault();
      }
    })

    $trigger.on('click mouseenter mouseleave', function(event) {
      if(event.type=='mouseenter' && desktop()) {
        $(this).addClass('active');
      } else if(event.type=='mouseleave' && desktop()) {
        $trigger.removeClass('active');
      } else if(event.type=='click' && !desktop()) {
        if(!$(this).hasClass('active')) {
          $trigger.removeClass('active');
          $(this).addClass('active');
          //$scrollArea.scrollbar.update();
        } else {
          $(this).removeClass('active');
        }
      }

    })

    $(document).on('click touchstart', function(event) {
      let $btn = $('.nav__catalogue-trigger');
      if(event.type=='click' && $(event.target).is($btn)) {
        if($btn.hasClass('active')) {
          $btn.removeClass('active');
          $('.ctlg-nav').removeClass('active');
        } else {
          $btn.addClass('active');
          $('.ctlg-nav').addClass('active');
        }

      } else if((event.type=='touchstart' || event.type=='click') && !$(event.target).is($btn) && $(event.target).closest('.ctlg-nav').length==0) {
        $btn.removeClass('active');
        $('.ctlg-nav').removeClass('active');
      }
    })

    
    
  }
}