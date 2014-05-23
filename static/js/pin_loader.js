// Generated by CoffeeScript 1.4.0

jQuery(function() {
  var all_fields_blank, category_selected, get_pin_html_text, have_valid_price, margin_to_subtract, open_edit_dialog_for, previous_position, price_regex, put_filter, refresh_pin, remove_all_errors, remove_error_from_field, selected_a_price_range, separate_link_to_fit_small_space, show_error_for_field, update_pin_in_backgroud, validate_errors, validate_image, validate_link_and_product;
  $("#tabs").tabs();
  $('.urllink,.imagelink,.urlproduct_url').change(function(e) {
    var i, value;
    i = $(this).attr('i');
    remove_error_from_field($(this), i);
    value = $(this).val().toLowerCase();
    if (value !== '' && value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
      if (value.indexOf('//') === 0) {
        $(this).val('http:' + value);
      } else {
        $(this).val('http://' + value);
      }
    }
  });
  $('.titleentry').on('change', function() {
    var i;
    i = $(this).attr('i');
    if ($(this).val() !== '') {
      remove_error_from_field($(this), i);
    }
  });
  $('.prodprice').on('change', function() {
    var i;
    i = $(this).attr('i');
    have_valid_price($(this), i);
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
      if (!category_selected('categories', 'category_check', $('#category_error_message'))) {
        can_submit = false;
      }
      if (!can_submit) {
        window.alert('Errors pending, please check');
      }
      if (can_submit) {
        $('#wait_for_process_to_finish_layer').height($(window).innerHeight());
        $('#wait_for_process_to_finish_layer div').css('margin-top', ($(window).innerHeight() / 2) - 150);
        $('#wait_for_process_to_finish_layer').show();
      }
      return can_submit;
    } catch (error) {
      alert(error);
      return false;
    }
  });
  validate_errors = function(i) {
    var description, imageurl, link, no_error, price, product_url, tags, title;
    no_error = true;
    title = $('#title' + i);
    description = $('#description' + i);
    link = $('#link' + i);
    product_url = $('#product_url' + i);
    imageurl = $('#imageurl' + i);
    tags = $('#tags' + i);
    price = $('#price' + i);
    if (all_fields_blank(title, description, link, imageurl, tags, price, product_url)) {
      return no_error;
    }
    if (title.val() === '') {
      no_error = false;
      show_error_for_field(title, 'Empty title', i);
    } else {
      remove_error_from_field(title, i);
    }
    if (tags.val() === '') {
      no_error = false;
      show_error_for_field(tags, 'Empty tags', i);
    } else {
      remove_error_from_field(tags, i);
    }
    if (!have_valid_price(price, i)) {
      no_error = false;
    }
    if (!validate_link_and_product(link, product_url, i)) {
      no_error = false;
    }
    if (!selected_a_price_range(i)) {
      no_error = false;
    }
    if (!validate_image(imageurl, i)) {
      no_error = false;
    }
    return no_error;
  };
  all_fields_blank = function(title, description, link, imageurl, tags, price, product_url) {
    return title.val() === '' && description.val() === '' && link.val() === '' && imageurl.val() === '' && tags.val() === '' && price.val() === '' && product_url.val() === '';
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
  validate_link_and_product = function(link, product_url, i) {
    var message, value;
    remove_error_from_field(link, i);
    remove_error_from_field(product_url, i);
    if (link.val() === '' && product_url.val() === '') {
      message = 'Provide source link or product link';
      show_error_for_field(link, message, i);
      show_error_for_field(product_url, message, i);
      return false;
    } else {
      value = link.val().toLowerCase();
      if (value !== '' && value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
        if (value.indexOf('//') === 0) {
          link.val('http:' + value);
        } else {
          link.val('http://' + value);
        }
      }
      value = product_url.val().toLowerCase();
      if (value !== '' && value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
        if (value.indexOf('//') === 0) {
          product_url.val('http:' + value);
        } else {
          product_url.val('http://' + value);
        }
      }
    }
    return true;
  };
  validate_image = function(imageurl, i) {
    var value;
    if (imageurl.val() === '') {
      show_error_for_field(imageurl, 'Empty image', i);
      return false;
    } else {
      remove_error_from_field(imageurl, i);
      value = imageurl.val().toLowerCase();
      if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
        if (value.indexOf('//') === 0) {
          $(this).val('http:' + value);
        } else {
          $(this).val('http://' + value);
        }
      }
    }
    return true;
  };
  price_regex = /^\d+(?:\.?\d{0,2})$/;
  have_valid_price = function(price, i) {
    var value;
    remove_error_from_field(price, i);
    if (price.val() === '') {
      return true;
    }
    if (price.val().indexOf('$') === 0) {
      price.val(price.val().substring(1, price.val().length));
    }
    if (!price_regex.test(price.val())) {
      show_error_for_field(price, 'Not a valid price. Use format: 8888.88', i);
      return false;
    } else {
      value = price.val();
      if (value.indexOf('.') === -1) {
        price.val(value + '.00');
      } else if (value.indexOf('.') === value.length - 1) {
        price.val(value + '00');
      } else if (value.indexOf('.') === value.length - 2) {
        price.val(value + '0');
      }
    }
    return true;
  };
  selected_a_price_range = function(i) {
    var price_range;
    remove_error_from_field($('#price_range' + i), i);
    price_range = $('input[name=price_range' + i + ']:checked').val();
    if (price_range === void 0) {
      show_error_for_field($('#price_range' + i), 'Select a price range');
      return false;
    }
    return true;
  };
  category_selected = function(field_to_fill_name, check_fields_name, error_object) {
    var c, category_value, checked_categories, value, _i, _len;
    checked_categories = $('input[name="' + check_fields_name + '"]:checked');
    error_object.hide();
    if (checked_categories.length > 0) {
      category_value = '';
      for (_i = 0, _len = checked_categories.length; _i < _len; _i++) {
        c = checked_categories[_i];
        value = c.value;
        if (category_value !== '' && category_value.lastIndexOf(',') !== category_value.length - 1) {
          category_value = category_value + ',';
        }
        category_value = category_value + value;
      }
      $('input[name=' + field_to_fill_name + ']').val(category_value);
      return true;
    } else {
      error_object.show();
      return false;
    }
  };
  get_pin_html_text = function(pin) {
    var base_html, cat, html, start, _i, _len, _ref;
    start = true;
    pin['categories_list'] = '';
    _ref = pin['categories'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cat = _ref[_i];
      if (start) {
        start = false;
      } else {
        pin['categories_list'] = pin['categories_list'] + '<br>';
      }
      pin['categories_list'] = pin['categories_list'] + cat['name'];
    }
    pin['separate_product'] = separate_link_to_fit_small_space(pin['product_url']);
    pin['separate_link'] = separate_link_to_fit_small_space(pin['link']);
    base_html = $('#pin_template').html();
    html = _.template(base_html, pin);
    return html;
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
      $('tr[pinid="' + pinid + '"]').remove();
    }
    $.pagination_grid.g.unSelectAll();
  });
  $('#pin_edit_dialog').dialog({
    autoOpen: false,
    minWidth: 500
  });
  $('body').on('click', '.button_pin_edit', function(event) {
    var pinid;
    event.stopPropagation();
    pinid = $(this).attr('pinid');
    $.ajax({
      type: 'GET',
      url: '/admin/input/pins/' + pinid + '/',
      dataType: 'json',
      cache: false,
      success: function(pin) {
        open_edit_dialog_for(pin);
      },
      error: function(x, textStatus, errorThrown) {
        $.loading_more_pins = false;
        console.log("Error:" + textStatus + ', ' + errorThrown);
      }
    });
    $.pagination_grid.g.unSelectAll();
  });
  open_edit_dialog_for = function(pin) {
    var cat, _i, _len, _ref;
    $("#id11").val(pin['id']);
    $("#title11").val(pin['name']);
    $("#description11").val(pin['description']);
    $("#link11").val(pin['link']);
    $("#product_url11").val(pin['product_url']);
    $("#tags11").val($.put_hash_symbol(pin['tags']));
    $("#imgtag11").attr('src', pin['image_202_url'] + '?_=' + new Date().getTime());
    $("#imgfulllink11").attr('href', '/p/' + pin['external_id']);
    $("#category11").val('');
    $("#imageurl11").val('');
    if (pin['price'] !== 'None') {
      $("#price11").val(pin['price']);
    } else {
      $("#price11").val('');
    }
    $("#previmageurl11").attr('href', pin['image_url']);
    $('input[name=price_range11]').prop('checked', false);
    $('input[name=price_range11][value=' + pin['price_range'] + ']').prop('checked', true);
    $('input[name=category_check11]:checked').prop('checked', false);
    _ref = pin['categories'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cat = _ref[_i];
      $('input[name=category_check11][value=' + cat['id'] + ']').prop('checked', true);
    }
    remove_all_errors();
    $('#pin_edit_dialog').dialog('open');
  };
  $('#pin_edit_form').submit(function() {
    var category, description, imageurl, link, no_error, pinid, price, price_range, product_url, tags, title;
    no_error = true;
    pinid = $('#id11');
    title = $('#title11');
    description = $('#description11');
    link = $('#link11');
    product_url = $('#product_url11');
    imageurl = $('#imageurl11');
    tags = $('#tags11');
    category = $('#categories11');
    price = $('#price11');
    price_range = $('input[name=price_range11]:checked');
    if (title.val() === '') {
      no_error = false;
      show_error_for_field(title, 'Empty title', 11);
    } else {
      remove_error_from_field(title, 11);
    }
    if (tags.val() === '') {
      no_error = false;
      show_error_for_field(tags, 'Empty tags', 11);
    } else {
      remove_error_from_field(tags, 11);
    }
    if (!have_valid_price(price, 11)) {
      no_error = false;
    }
    if (!validate_link_and_product(link, product_url, 11)) {
      no_error = false;
    }
    if (!selected_a_price_range(11)) {
      no_error = false;
    }
    if (!category_selected('categories11', 'category_check11', $('#category_error_message11'))) {
      no_error = false;
    }
    if (no_error) {
      update_pin_in_backgroud(pinid, title, description, link, product_url, imageurl, tags, category, price, price_range);
      $('#pin_edit_dialog').dialog('close');
    }
    return false;
  });
  update_pin_in_backgroud = function(pinid, title, description, link, product_url, imageurl, tags, category, price, price_range) {
    var pin_data;
    pin_data = {
      'title': title.val(),
      'description': description.val(),
      'link': link.val(),
      'product_url': product_url.val(),
      'imageurl': imageurl.val(),
      'tags': tags.val(),
      'categories': category.val(),
      'price': price.val(),
      'price_range': price_range.val()
    };
    $.ajax({
      type: 'POST',
      url: '/admin/input/pins/' + pinid.val() + '/',
      data: pin_data,
      dataType: 'json',
      cache: false,
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
      cache: false,
      success: function(pin) {
        var box, text;
        box = $('tr[pinid="' + pin_id + '"]');
        text = get_pin_html_text(pin);
        box.html(text);
      },
      error: function(x, textStatus, errorThrown) {
        console.log("Error:" + textStatus + ', ' + errorThrown);
      }
    });
  };
  separate_link_to_fit_small_space = function(url) {
    var i, last_val, sep, slice, _i, _ref;
    sep = Array();
    last_val = 0;
    for (i = _i = 0, _ref = url.length; _i <= _ref; i = _i += 16) {
      last_val = i;
      slice = url.slice(i, i + 16);
      sep.push(slice);
    }
    return sep.join(' ');
  };
  $.put_hash_symbol = function(tags) {
    var result, tag, _i, _len;
    result = '';
    for (_i = 0, _len = tags.length; _i < _len; _i++) {
      tag = tags[_i];
      if (result !== '') {
        result = result + ' ';
      }
      result = result + '#' + tag;
    }
    return result;
  };
  $.put_failed_pin_to_edit = function(pin) {
    if (pin['imageurl'] !== '') {
      $('#imageurl' + pin['index']).val(pin['imageurl']);
    }
    if (pin['link'] !== '') {
      $('#link' + pin['index']).val(pin['link']);
    }
    if (pin['title'] !== '') {
      $('#title' + pin['index']).val(pin['title']);
    }
    if (pin['description'] !== '') {
      $('#description' + pin['index']).val(pin['description']);
    }
    if (pin['product_url'] !== '') {
      $('#product_url' + pin['index']).val(pin['product_url']);
    }
    if (pin['tags'] !== '') {
      $('#tags' + pin['index']).val(pin['tags']);
    }
    if (pin['price'] !== '') {
      $('#price' + pin['index']).val(pin['price']);
    }
    if (pin['price_range'] !== '') {
      $('input[name=price_range' + pin['index'] + '][value=' + pin['price_range'] + ']').attr('checked', 'checked');
    }
    $('#imageurl' + pin['index']).before('<div class="error_text">' + pin['error'] + '</div>');
  };
  $('input[name=category_check]').change(function(event) {
    var parent_category;
    parent_category = $(this).attr('parent-category');
    if (parent_category !== void 0) {
      if ($(this).prop('checked')) {
        $('input[name=category_check][value=' + parent_category + ']').prop('checked', true);
      }
    }
  });
  $('#change_categories_dialog').dialog({
    autoOpen: false,
    minWidth: 500
  });
  $('#change_categories_button').on('click', function(event) {
    var categories_not_selected, data, pins, pins_not_selected, row, _i, _len, _ref;
    categories_not_selected = true;
    pins = '';
    _ref = $.pagination_grid.g.getSelectedRows();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      pins_not_selected = false;
      if (pins !== '') {
        pins = pins + ',';
      }
      pins = pins + $(row).attr('pinid');
    }
    if (pins_not_selected) {
      return;
    }
    $('input[name=category_change_check]').prop('checked', false);
    $('#change_categories_dialog').dialog('open');
    data = {
      pins: pins
    };
    $.post('/admin/input/get_categories_for_items', data, function(categories) {
      var category, category_object, _j, _len1;
      for (_j = 0, _len1 = categories.length; _j < _len1; _j++) {
        category_object = categories[_j];
        category = category_object.category_id;
        $('#change_categories_dialog').find('input[value=' + category + ']').prop('checked', true);
      }
    }, 'json');
  });
  $('#change_pins_categories_form').on('submit', function(event) {
    var data, ids, pinid, row, _i, _len, _ref;
    event.preventDefault();
    $('#category_change_error_message').hide();
    if (!category_selected('categories_to_change', 'category_change_check', $('#category_change_error_message'))) {
      $('#category_change_error_message').show();
      return false;
    }
    ids = '';
    _ref = $.pagination_grid.g.getSelectedRows();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      pinid = $(row).attr('pinid');
      if (ids !== '') {
        ids = ids + ',';
      }
      ids = ids + pinid;
    }
    data = {
      'ids': ids,
      'categories': $('#categories_to_change').val()
    };
    $.ajax({
      type: 'POST',
      url: '/admin/input/change_pin_categories',
      data: data,
      dataType: 'json',
      success: function() {
        var _j, _len1, _ref1;
        _ref1 = $.pagination_grid.g.getSelectedRows();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          row = _ref1[_j];
          pinid = $(row).attr('pinid');
          refresh_pin(pinid);
        }
      }
    });
    $('#change_categories_dialog').dialog('close');
    return false;
  });
  $('#select_all_pins_button').click(function() {
    return $.pagination_grid.g.selectAll();
  });
  $('#unselect_all_pins_button').click(function() {
    return $.pagination_grid.g.unSelectAll();
  });
  previous_position = $('#tabs').offset();
  margin_to_subtract = previous_position.left;
  $('#pins_container_layer').css('margin-left', (-margin_to_subtract) + 'px');
  $('#pins_container_layer').css('width', $(window).innerWidth() - 80);
  $('#page_size_form').on('submit', function(event) {
    put_filter(event, '/admin/input/change_page_size_for_loaded_items?size=', $('#page_size_field').val());
  });
  $('#tagcloud span').on('click', function(event) {
    put_filter(event, '/admin/input/change_filter_by_tag_for_loaded_items?tag=', $(this).attr('search'));
  });
  $('#clear_tag_filter').on('click', function(event) {
    put_filter(event, '/admin/input/change_filter_by_tag_for_loaded_items?tag=', '');
  });
  $('#category_filter_field').on('change', function(event) {
    put_filter(event, '/admin/input/change_filter_by_category_for_loaded_items?category=', $(this).val());
  });
  put_filter = function(event, url, filter) {
    event.stopPropagation();
    event.preventDefault();
    $.get(url + filter, function() {
      var index;
      $.pagination_grid.g.load();
      index = $('#tabs a[href="#added"]').parent().index();
      $("#tabs").tabs("option", "active", index);
      $('.grid-page-info .grid-page-input').val(1);
    });
  };
});
