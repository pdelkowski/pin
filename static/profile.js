// Generated by CoffeeScript 1.4.0
(function() {
  var dragging_header_background, otherX, otherY, upload, x, y;


  $('#save_thumbnail_edit').click(function() {
    location.reload(true);
  });


  $('#set_as_profile_pic').click(function() {
      picid = $('.modal .active img').attr('picid');
      return $.get('/setprofilepic/'+picid, function(response){
        location.reload(true);
      });
  });


  dragging_header_background = false;

  x = 0;

  y = 0;

  otherX = 0;

  otherY = 0;

  $('#header_background').mousedown(function(e) {
    var _ref;
      x = e.pageX;
      y = e.pageY;
      _ref = $(this).css('background-position').split(' '), otherX = _ref[0], otherY = _ref[1];
      return dragging_header_background = true;
  });

  $('body').mouseup(function() {
    var tempX, tempY, _ref;
    if (dragging_header_background) {
      dragging_header_background = false;
      _ref = $('#header_background').css('background-position').split(' '), otherX = _ref[0], otherY = _ref[1];
      tempX = parseInt(otherX.slice(0, +(otherX.length - 2) + 1 || 9e9));
      tempY = parseInt(otherY.slice(0, +(otherY.length - 2) + 1 || 9e9));
      return $.post('/changebgpos', {
        x: tempX,
        y: tempY
      });
    }
  });

  $('#header_background').mousemove(function(e) {
    var tempY;
    if (dragging_header_background) {
      upload = false;
      tempY = parseInt(otherY.slice(0, +(otherY.length - 2) + 1 || 9e9));
      if (tempY + (e.pageY - y) < 0) {
        return $(this).css('background-position', otherX + ' ' + (tempY + (e.pageY - y)) + 'px');
      }
    }
  });



$('#switch5_wrapper').mouseover(function() {
    return $('#menu5').show();
  });


$('#switch5_wrapper').mouseout(function() {
    return $('#menu5').hide();
  });

//$('.edit_thumbnail_menu').mouseout(function() {
//    return $('#menu5').hide();
//  });


}).call(this);


$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})




function rePin(e){
desc = $(e).attr('data-description');
id = $(e).attr('data-id');
$('#repin-image').attr('src','/static/tmp/pinthumb'+id+'.png');
$('#description').html(desc);
$('#repin-form').attr('action','/add-to-your-own-getlist/'+id); 
$('.category-list').val($(e).attr('data-category'));
}


