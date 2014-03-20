// Generated by CoffeeScript 1.4.0
(function() {

  jQuery(function() {
    var all_fields_blank, ensure_tags_has_hash_symbol, get_pin_html_text, load_more_pins, open_edit_dialog_for, put_more_pins_into_the_page, refresh_pin, remove_all_errors, remove_error_from_field, show_error_for_field, update_pin_in_backgroud, validate_errors, validate_image, validate_link;
    $("#tabs").tabs();
    $('.urllink,.imagelink').change(function(e) {
      var i, value;
      i = $(this).attr('i');
      remove_error_from_field($(this), i);
      value = $(this).val().toLowerCase();
      if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
        show_error_for_field($(this), 'Link lacks http:// or https://, seems invalid', i);
      }
    });
    $('.imagefile').on('change', function(e) {
      var i, value;
      i = $(this).attr('i');
      remove_error_from_field($(this), i);
      value = $(this).val().toLowerCase();
      if (value.indexOf('.png') === -1 && value.indexOf('.jpg') === -1 && value.indexOf('.jpeg') === -1 && value.indexOf('.gif') === -1 && value.indexOf('.svg') === -1) {
        show_error_for_field($(this), 'Image doesn\'t seem to be in a internet friendly format: .png, ,jpg, .gif, .svn', i);
      }
    });
    $('.titleentry,.descrentry').on('change', function() {
      var i;
      i = $(this).attr('i');
      if ($(this).val() !== '') {
        remove_error_from_field($(this), i);
      }
    });
    $('#form').submit(function(e) {
      var can_submit, i, no_error, _i;
      try {
        can_submit = true;
        remove_all_errors();
        for (i = _i = 1; _i <= 10; i = ++_i) {
          no_error = validate_errors(i);
          if (can_submit) {
            can_submit = no_error;
          }
        }
        if (!can_submit) {
          window.alert('Errors pending, please check');
        }
        return can_submit;
      } catch (error) {
        alert(error);
        return false;
      }
    });
    validate_errors = function(i) {
      var description, image, imageurl, link, no_error, tags, title;
      no_error = true;
      title = $('#title' + i);
      description = $('#description' + i);
      link = $('#link' + i);
      imageurl = $('#imageurl' + i);
      image = $('#image' + i);
      tags = $('#tags' + i);
      if (all_fields_blank(title, description, link, imageurl, image, tags)) {
        return no_error;
      }
      if (title.val() === '') {
        no_error = false;
        show_error_for_field(title, 'Empty title', i);
      } else {
        remove_error_from_field(title, i);
      }
      if (description.val() === '') {
        no_error = false;
        show_error_for_field(description, 'Empty description', i);
      } else {
        remove_error_from_field(description, i);
      }
      if (tags.val() === '') {
        no_error = false;
        show_error_for_field(tags, 'Empty tags', i);
      } else {
        remove_error_from_field(tags, i);
        ensure_tags_has_hash_symbol(tags);
      }
      if (!validate_link(link, i)) {
        no_error = false;
      }
      if (!validate_image(imageurl, image, i)) {
        no_error = false;
      }
      return no_error;
    };
    all_fields_blank = function(title, description, link, imageurl, image, tags) {
      return title.val() === '' && description.val() === '' && link.val() === '' && imageurl.val() === '' && tags.val() === '' && image.val() === '';
    };
    show_error_for_field = function(field, text, i) {
      field.addClass('field_error');
      return field.after('<div class="error_text">' + text + '</div>');
    };
    remove_error_from_field = function(field, i) {
      field.removeClass('field_error');
      return field.nextAll('.error_text').remove();
    };
    remove_all_errors = function() {
      return $('div.error_text').remove();
    };
    validate_link = function(field, i) {
      if (field.val() === '') {
        show_error_for_field(field, 'Empty link', i);
        return false;
      } else {
        remove_error_from_field(field, i);
        if (field.val().toLowerCase().indexOf('http://') !== 0 && field.val().toLowerCase().indexOf('https://') !== 0) {
          show_error_for_field(field, 'Link lacks http:// or https://, seems invalid', i);
        }
      }
      return true;
    };
    validate_image = function(imageurl, image, i) {
      var value;
      if (imageurl.val() === '' && image.val() === '') {
        show_error_for_field(imageurl, 'Empty image', i);
        show_error_for_field(image, 'Empty image', i);
        return false;
      } else {
        remove_error_from_field(imageurl, i);
        remove_error_from_field(image, i);
        value = imageurl.val().toLowerCase();
        if (value) {
          if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
            show_error_for_field(imageurl, 'Link lacks http:// or https://, seems invalid', i);
          }
        } else {
          value = image.val().toLowerCase();
          if (value.indexOf('.png') === -1 && value.indexOf('.jpg') === -1 && value.indexOf('.jpeg') === -1 && value.indexOf('.gif') === -1 && value.indexOf('.svg') === -1) {
            show_error_for_field(image, 'Image doesn\'t seem to be in a internet friendly format: .png, ,jpg, .gif, .svn', i);
          }
        }
      }
      return true;
    };
    ensure_tags_has_hash_symbol = function(field) {
      var new_tag, new_value, some_has_no_hash_symbol, tag, value, _i, _len, _ref;
      value = field.val();
      new_value = '';
      some_has_no_hash_symbol = false;
      _ref = value.split(" ");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        if (tag.indexOf('#') !== 0) {
          some_has_no_hash_symbol = true;
          new_tag = '#' + tag;
        } else {
          new_tag = tag;
        }
        if (new_value === '') {
          new_value = new_tag;
        } else {
          new_value = new_value + ' ' + new_tag;
        }
      }
      if (some_has_no_hash_symbol) {
        field.val(new_value);
      }
    };
    $('.tagwords').on('change', function() {
      if ($(this).val() !== '') {
        return ensure_tags_has_hash_symbol($(this));
      }
    });
    $(window).scroll(function() {
      var doc_height, height, sensitivity, top;
      top = $(window).scrollTop();
      height = $(window).innerHeight();
      doc_height = $(document).height();
      sensitivity = 300;
      if (top + height + sensitivity > doc_height) {
        load_more_pins();
      }
    });
    $.loading_more_pins = true;
    $.ajax({
      type: 'GET',
      url: '/admin/input/pins/',
      dataType: 'json',
      data: {
        'offset': '0'
      },
      success: function(d) {
        put_more_pins_into_the_page(d);
      },
      error: function(x, textStatus, errorThrown) {
        $.loading_more_pins = false;
        console.log("Error:" + textStatus + ', ' + errorThrown);
      }
    });
    load_more_pins = function() {
      if (!$.loading_more_pins) {
        $.loading_more_pins = true;
        $.ajax({
          type: 'GET',
          url: '/admin/input/pins/',
          dataType: 'json',
          success: function(d) {
            put_more_pins_into_the_page(d);
          },
          error: function(x, textStatus, errorThrown) {
            $.loading_more_pins = false;
            console.log("Error:" + textStatus + ', ' + errorThrown);
          }
        });
        return;
      }
    };
    $.column_control = 1;
    put_more_pins_into_the_page = function(data) {
      var column, pin, _i, _len;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        pin = data[_i];
        column = $('.column' + $.column_control);
        column.append('<div class="pinbox" pinid="' + pin['id'] + '">' + get_pin_html_text(pin) + '</div>');
        $.column_control += 1;
        if ($.column_control > 4) {
          $.column_control = 1;
        }
      }
      $.loading_more_pins = false;
    };
    get_pin_html_text = function(pin) {
      return '<div class="pin_image"><a href="/pin/' + pin['id'] + '" target="_blank" title="See full size">' + '<img src="/static/tmp/pinthumb' + pin['id'] + '.png?_=' + new Date().getTime() + '"></a></div>' + '<table>' + '<tr><th>Category</th><td>' + pin['category_name'] + '</td></tr>' + '<tr><th>Title</th><td>' + pin['name'] + '</td></tr>' + '<tr><th>Descr.</th><td>' + pin['description'] + '</td></tr>' + '<tr><th>Link</th><td><a href="' + pin['link'] + '" title="' + pin['link'] + '">link</a></td></tr>' + '<tr><th>Tags</th><td>' + pin['tags'] + '</td></tr>' + '<tr><td colspan="2"><button class="button_pin_edit" pinid="' + pin['id'] + '">Edit</button> ' + '<button class="button_pin_delete" pinid="' + pin['id'] + '">Delete</button></td></tr>' + '</table>';
    };
    $('body').on('click', '.button_pin_delete', function() {
      var confirmation, pinid;
      confirmation = window.confirm('Are you sure to delete this pin?');
      if (confirmation) {
        pinid = $(this).attr('pinid');
        $.ajax({
          type: 'DELETE',
          url: '/admin/input/pins/' + pinid + '/'
        });
        $('div.pinbox[pinid="' + pinid + '"]').remove();
      }
    });
    $('#pin_edit_dialog').dialog({
      autoOpen: false,
      minWidth: 500
    });
    $('body').on('click', '.button_pin_edit', function() {
      var pinid;
      pinid = $(this).attr('pinid');
      $.ajax({
        type: 'GET',
        url: '/admin/input/pins/' + pinid + '/',
        dataType: 'json',
        success: function(pin) {
          open_edit_dialog_for(pin);
        },
        error: function(x, textStatus, errorThrown) {
          $.loading_more_pins = false;
          console.log("Error:" + textStatus + ', ' + errorThrown);
        }
      });
    });
    open_edit_dialog_for = function(pin) {
      $("#id11").val(pin['id']);
      $("#title11").val(pin['name']);
      $("#description11").val(pin['description']);
      $("#link11").val(pin['link']);
      $("#tags11").val(pin['tags']);
      $("#imgtag11").attr('src', '/static/tmp/pinthumb' + pin['id'] + '.png');
      $("#imgfulllink11").attr('href', '/pin/' + pin['id']);
      $("#category11").val(pin['category']);
      $("#imageurl11").val('');
      $("#image11").val('');
      remove_all_errors();
      return $('#pin_edit_dialog').dialog('open');
    };
    $('#pin_edit_form').submit(function() {
      var category, description, image, imageurl, link, no_error, pinid, tags, title;
      no_error = true;
      pinid = $('#id11');
      title = $('#title11');
      description = $('#description11');
      link = $('#link11');
      imageurl = $('#imageurl11');
      image = $('#image11');
      tags = $('#tags11');
      category = $('#category11');
      if (title.val() === '') {
        no_error = false;
        show_error_for_field(title, 'Empty title', 11);
      } else {
        remove_error_from_field(title, 11);
      }
      if (description.val() === '') {
        no_error = false;
        show_error_for_field(description, 'Empty description', 11);
      } else {
        remove_error_from_field(description, 11);
      }
      if (tags.val() === '') {
        no_error = false;
        show_error_for_field(tags, 'Empty tags', 11);
      } else {
        remove_error_from_field(tags, 11);
        ensure_tags_has_hash_symbol(tags);
      }
      if (!validate_link(link, 11)) {
        no_error = false;
      }
      if (no_error) {
        if (image.val() !== '' && imageurl.val() === '') {
          return true;
        } else {
          update_pin_in_backgroud(pinid, title, description, link, imageurl, tags, category);
          $('#pin_edit_dialog').dialog('close');
        }
      }
      return false;
    });
    update_pin_in_backgroud = function(pinid, title, description, link, imageurl, tags, category) {
      var pin_data;
      pin_data = {
        'title': title.val(),
        'description': description.val(),
        'link': link.val(),
        'imageurl': imageurl.val(),
        'tags': tags.val(),
        'category': category.val()
      };
      $.ajax({
        type: 'POST',
        url: '/admin/input/pins/' + pinid.val() + '/',
        data: pin_data,
        dataType: 'json',
        success: function(data) {
          if (data['status'] !== 'ok') {
            return window.alert('Server error in your last update: ' + data['status']);
          } else {
            return refresh_pin(pinid.val());
          }
        },
        error: function(x, err, ex) {
          return window.alert('Server error in your last update: ' + err + ' ' + ex);
        }
      });
    };
    refresh_pin = function(pin_id) {
      $.ajax({
        type: 'GET',
        url: '/admin/input/pins/' + pin_id + '/',
        dataType: 'json',
        success: function(pin) {
          var box, text;
          box = $('div.pinbox[pinid="' + pin_id + '"]');
          text = get_pin_html_text(pin);
          box.html(text);
        },
        error: function(x, textStatus, errorThrown) {
          console.log("Error:" + textStatus + ', ' + errorThrown);
        }
      });
    };
  });

}).call(this);
