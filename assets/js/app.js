(function ($) {

  var config = {
    animation_time: {
      scroll: 200,
      chart: 1000
    },
    mandrill: {
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      key: "QxUaZvcmlIHZdyslVMfdMw"
    }
  };

  $(document).ready(function () {
    // increse marketing buttons size for desktops and tablets
    var md = new MobileDetect(window.navigator.userAgent);
    if (md.phone() == null) {
      $('.about-me').addClass('btn-lg');
      $('.hire-me').addClass('btn-lg');
    }

    // animation
    var $lazyAnimation = $('.lazy-animation');
    if (!$lazyAnimation.hasClass('animated')) {
      $lazyAnimation.addClass('animated fadeInDown');
    }

    // activate charts
    $('.chart').easyPieChart({
      barColor: '#1ABC9C',
      trackColor: '#F2F2F2',
      scaleColor: false,
      lineCap: 'butt',
      lineWidth: 12,
      size: 130,
      animate: config.animation_time.chart
    });

    // scrollspy
    $('body').scrollspy({
      target: '.navbar-default',
      offset: 61  // fix issue with fixed navbar
    });

    // scroll
    $("a[href^='#']").on('click', function (e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({ scrollTop: $(this.hash).offset().top - 60 }, config.animation_time.scroll, function () {
        window.location.hash = hash;
      });
    });

    // work items
    $('#work li').on('click', function (e) {
      if (md.phone() != null || md.tablet() != null) {
        e.preventDefault();
        var href = $(this).find('a').attr('href');
        if (href) {
          var win = window.open(href, '_blank');
          win.focus();
        }
      }
    });

    // contact for submission
    $('#contact-form').submit(function () {
      var $contact_throbber = $(this).find('.btn-primary > .fa-spin');
      var $inputName        = $('#inputName');
      var $inputEmail       = $('#inputEmail');
      var $inputMessage     = $('#inputMessage');

      var html = "Name: " + $inputName.val() + "<br/>";
      html += "Email: " + $inputEmail.val() + "</br>";
      html += "Message: " + $inputMessage.val();

      // some simple validation...
      var errors = [];
      var valid  = true;

      if (!$inputName.val().length || !$inputEmail.val().length || !$inputMessage.val().length) {
        valid = false;
      }

      if (!valid) {
        if (!$inputName.val().length) {
          errors.push('name');
        }

        if (!$inputEmail.val().length) {
          errors.push('email');
        }

        if (!$inputMessage.val().length) {
          errors.push('message');
        }

        // reset all previous errors
        $.each(['name', 'email', 'message'], function (k, v) {
          $('#' + v).removeClass('has-error');
        });

        // set errors flags
        $.each(errors, function (k, v) {
          $('#' + v).addClass('has-error');
        });

        errors = [];
      }
      else {
        $contact_throbber.show();

        $.ajax({
          type: "post",
          url: config.mandrill.url,
          data: {
            key: config.mandrill.key,
            message: {
              from_email: $inputEmail.val(),
              to: [
                {
                  email: 'vavgustov@yandex.ru',
                  name: 'Vladimir Avgustov',
                  type: 'to'
                }
              ],
              autotext: 'true',
              subject: 'Submission from vavgustov.github.io!',
              html: html
            }
          }
        }).done(function (response) {
          $contact_throbber.hide();

          // reset input fields
          $inputName.val('');
          $inputEmail.val('');
          $inputMessage.val('');

          // show confirmation
          $('#contact-modal').modal();
        });
      }

      return false;
    });

  });

})(jQuery);