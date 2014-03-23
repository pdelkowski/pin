// Generated by CoffeeScript 1.4.0
(function() {

  jQuery(function() {
    var clear_any_notification, clear_pwd2_notifications, notify_pwd2_dont_match, pwd1_strength_changed, show_verification_notfound, show_verification_ok, show_verifying, verification_callback, verification_error_callback, verify_passwords_match, verify_username;
    $.verification_running = false;
    $.last_value_verified = '';
    $('#username').keyup(function() {
      var value;
      if (!$.verification_running) {
        value = $(this).val();
        if (value !== '') {
          verify_username();
        } else {
          clear_any_notification();
        }
      }
    });
    verify_username = function() {
      var current_value;
      $.verification_running = true;
      current_value = $('#username').val();
      if (current_value === '') {
        clear_any_notification();
        $.verification_running = false;
        $.last_value_verified = '';
      } else {
        if (current_value !== $.last_value_verified) {
          $.last_value_verified = current_value;
          show_verifying();
          $.ajax({
            method: 'GET',
            url: '/recover_password_username_test/',
            dataType: 'json',
            data: {
              'username': current_value
            },
            success: verification_callback,
            error: verification_error_callback
          });
        } else {
          $.verification_running = false;
        }
      }
    };
    verification_callback = function(data) {
      var current_value, status;
      status = data['status'];
      switch (status) {
        case 'ok':
          show_verification_ok();
          break;
        case 'notfound':
          show_verification_notfound();
          break;
        default:
          clear_any_notification();
      }
      $.verification_running = false;
      current_value = $('#username').val();
      if (current_value !== '' && current_value !== $.last_value_verified) {
        verify_username();
      }
    };
    verification_error_callback = function(jqXHR, textStatus, errorThrown) {
      $.verification_running = false;
      return clear_any_notification();
    };
    show_verification_ok = function() {
      clear_any_notification();
      $('#username').after('<div class="green">Looks good!</div>');
    };
    show_verification_notfound = function() {
      clear_any_notification();
      $('#username').after('<div class="red">Invalid username or email</div>');
    };
    show_verifying = function() {
      clear_any_notification();
      $('#username').after('<div class="black">Verifying</div>');
    };
    clear_any_notification = function() {
      $('#username').nextAll('div').remove();
    };
    $('#change_pwd_form').submit(function() {
      return verify_passwords_match();
    });
    verify_passwords_match = function() {
      var pwd1, pwd2;
      pwd1 = $('#pwd1').val();
      pwd2 = $('#pwd2').val();
      clear_pwd2_notifications();
      if (pwd2 !== '' && pwd1 !== pwd2) {
        notify_pwd2_dont_match();
        return false;
      }
      return true;
    };
    notify_pwd2_dont_match = function() {
      $('#pwd2').after('<div class="red">Password don\'t match</div>');
    };
    clear_pwd2_notifications = function() {
      $('#pwd2').nextAll('div').remove();
    };
    $('#pwd2, #pwd1').keyup(function() {
      verify_passwords_match();
    });
    pwd1_strength_changed = function(strength, percentage) {
      var color, message;
      $('#pwd1').nextAll('div').remove();
      if ($('#pwd1').val() === '') {
        return;
      }
      if (percentage < 25) {
        message = 'poor';
        color = 'red';
      } else if (percentage < 50) {
        message = 'good enough';
        color = 'yellow';
      } else if (percentage < 75) {
        message = 'good';
        color = 'black';
      } else {
        message = 'strong';
        color = 'green';
      }
      $('#pwd1').after('<div class="' + color + '">' + message + ' (' + percentage + '%)</div>');
    };
    $('#pwd1').pStrength({
      'changeBackground': false,
      'onPasswordStrengthChanged': pwd1_strength_changed
    });
  });

}).call(this);