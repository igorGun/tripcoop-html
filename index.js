var marker;
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: {
    lat: 49.992157,
    lng: 36.231082,
  },
});

var markers = {};

var latlng;

var myLatLng = [{
  lat: 49.992157,
  lng: 36.231082,
}, ];
for (var i = 0; i < myLatLng.length; i++) {
  console.log(i, myLatLng[i]);
  var marker = new google.maps.Marker({
    position: myLatLng[i],
    map: map,
    title: 'Hello World!',
  });
  bindMarkerinfo(marker);
}

function markerWindow() {
  return (
    '<div>' +
    '<div class="info-window user_point" data-id="2" id="2">' +
    '<div class="info-window__header">' +
    '<div class="info-window__address" id="address-2">вулиця Щедринський Квартал, 4, Харків</div>' +
    '<div class="info-window__actions">' +
    '<button type="button" class="btn info-window__btn info-window__edit">' +
    '<img class="info-window__icon info-window__icon-edit" src="img/edit.png" alt="">' +
    '</button>' +
    '<button type="button" class="btn info-window__btn info-window__confirm">' +
    '<img class="info-window__icon info-window__icon-confirm" src="img/confirm.png" alt="">' +
    '</button>' +
    '</div>' +
    '</div>' +
    '<div class="info-window__content">' +
    '<form class="info-window__form" id="set-trip-form" action="/set" method="post">' +
    '<input type="hidden" name="_csrf" value="S-cv4TLi4siliW_mRwtO7CgNPS-3ouOJIbNWU4BXRSUCk0K2ddeTuvfPF4AdMn-4HX1naMP2kN5v4RIBy2YvSg==">' +
    '<div class="form-group field-tripsroutes-start_point">' +
    '<input type="hidden" id="tripsroutes-start_point" class="form-control" name="TripsRoutes[start_point]" value="">' +
    '<div class="help-block"></div>' +
    '</div>' +
    '<div class="form-group field-tripsroutes-end_point">' +
    '<input type="hidden" id="tripsroutes-end_point" class="form-control" name="TripsRoutes[end_point]" value="">' +
    '<div class="help-block"></div>' +
    '</div>' +
    '<div class="form-group field-trips-polygone required">' +
    '<input type="hidden" id="trips-polygone" class="form-control" name="Trips[polygone]" value="">' +
    '<div class="help-block"></div>' +
    '</div>' +
    '<div class="form-group field-trips-max_companions">' +
    '<label class="control-label" for="trips-max_companions">Max Companions</label>' +
    '<div>' +
    '<select id="trips-max_companions" class="form-control" name="Trips[max_companions]">' +
    '<option value="1">1</option>' +
    '<option value="2" selected="">2</option>' +
    '<option value="3">3</option>' +
    '</select>' +
    '<div class="help-block"></div>' +
    '</div>' +
    '</div>' +
    '<div class="form-group field-trips-departure_time required">' +
    '<label class="control-label" for="trips-departure_time">Departure Time</label>' +
    '<div>' +
    '<select id="trips-departure_time" class="form-control" name="Trips[departure_time]" aria-required="true">' +
    '<option value="0">5</option>' +
    '<option value="1">10</option>' +
    '<option value="2">15</option>' +
    '<option value="3">20</option>' +
    '<option value="4">30</option>' +
    '<option value="5">60</option>' +
    '<option value="6">90</option>' +
    '<option value="7">120</option>' +
    '</select>' +
    '<div class="help-block"></div>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<div class="info-window__form-buttons">' +
    '<button type="button" class="btn btn-secondary">Отменить</button>' +
    '<button type="submit" id="set-trip-button" class="btn btn-success" onclick="openChatBoxButton()">Искать поездку</button>' +
    '</div>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div></div>'
  );
}

function bindMarkerinfo(marker) {
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent(markerWindow());
  infowindow.open(map, marker);
}

$(document).ready(function () {
  // open-close main menu
  $('.btn.btn-primary.toggle-menu-btn').click(function (e) {
    $('#mainMenuItems').toggle();
    $('#fa-bars-icon').toggle();
    $('#fa-times-icon').toggle();
  });

  // open order-block
  $('.btn.btn-success.open-order-box-btn').click(function (e) {
    $('.order-block').toggle();
    $(this).hide();
    $('.btn.btn-success.open-box-yet').show();
    $('.bottom-clock-form').hide();
    $('.form-order ').css('margin-bottom', '0');
  });

  // yet button click
  $('.btn.btn-success.open-box-yet').click(function (e) {
    $(this).hide();
    $('.bottom-clock-form').show();
  });

  // close chat-box button
  $('.close.chat-close-btn').click(function () {
    $('.chat-block').toggle();
    $('#map').css('height', '100%');
  });

  // close order-block button
  $('.close.form-order-close-btn').click(function () {
    $('.order-block').toggle();
    $('.btn.btn-success.open-order-box-btn').show();
    $('.btn.btn-success.open-box-yet').hide();
  });

  $('.responsive-sign-block').click(function () {
    $('.sign-in-window').toggle();
  });

  $('.sign-in-btn-close').click(function () {
    $('.sign-in-window').toggle();
  });
});

function openChatBoxButton(e) {
  if (
    $('.order-block').css('display') === 'block' &&
    $('.btn.btn-success.open-order-box-btn').text() === 'Скрить'
  ) {
    $('.order-block').css('display', 'none');
    $('.btn.btn-success.open-order-box-btn')
      .text('Информация поездки')
      .css('max-width', '100%');
  }
  $('.chat-block').css({
    display: 'block',
    top: '0',
    zIndex: '2000',
    width: '100%',
    left: '0',
    padding: '0',
    height: '100%',
  });
  $('.card-chat').css('height', '100%');
  $('#map').css('height', '80%');
}

// change text on info button
function deleteTextButton() {
  if ($(window).width() <= '460') {
    $('#set-trip-button').text('Искать');
  } else {
    $('#set-trip-button').text('Искать поездку');
  }
}
$(window).resize(deleteTextButton);