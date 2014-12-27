// // Get current location
// // Note: This example requires that you consent to location sharing when
// // prompted by your browser. If you see a blank space instead of the map, this
// // is probably because you have denied permission for location sharing.

// var map;

// function initialize() {
// var mapOptions = {
//   zoom: 15
// };
// map = new google.maps.Map(document.getElementById('map-canvas'),
//     mapOptions);

// // Try HTML5 geolocation
// if(navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var pos = new google.maps.LatLng(position.coords.latitude,
//                                      position.coords.longitude);

//     var infowindow = new google.maps.InfoWindow({
//       map: map,
//       position: pos,
//       content: 'Location found using HTML5.'
//     });

//     map.setCenter(pos);
//   }, function() {
//     handleNoGeolocation(true);
//   });
// } else {
//   // Browser doesn't support Geolocation
//   handleNoGeolocation(false);
// }
// }

// function handleNoGeolocation(errorFlag) {
// if (errorFlag) {
//   var content = 'Error: The Geolocation service failed.';
// } else {
//   var content = 'Error: Your browser doesn\'t support geolocation.';
// }

// var options = {
//   map: map,
//   position: new google.maps.LatLng(60, 105),
//   content: content
// };

// var infowindow = new google.maps.InfoWindow(options);
// map.setCenter(options.position);
// }

//google.maps.event.addDomListener(document.getElementById('submit'), 'click', initialize);
function initialize() {
    var mapOptions = {
      center: { lat: 43.6605055, lng: -79.3902864 },
      zoom: 15
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;

//Find all places within a limit
function ajax_request(token, start, end, location) {
    return $.ajax({
        url: "https://www.eventbriteapi.com/v3/events/search?token="+ token + "&categories=111&start_date.  range_start=" + start+ "&start_date.range_end=" + end + "&venue.city=" + location,
        type: "GET",
        dataType: "json",
        cache: "false"
    });
}

function thirty_days_later() {
    var thirty_days_later = new Date();
    thirty_days_later.setDate(thirty_days_later.getDate() + 30);
    thirty_days_later.toUTCString().slice(0, 10);
    return thirty_days_later;
}

$(function() {
    $('#refine').submit(function() {
        var location = 'toronto';
        var token = "ZBEVEGMUTNYPFPOKE4B7";
        var today = new Date().toUTCString().slice(0, 10);
        var thirty_days_later = thirty_days_later();
        var params = {'hostname': $hostname, 'type': $type};
        var res = ajax_request(token, today, thirty_days_later, location);
        res
            .done(function(data) {
                if (data && !data.error) {
                    $('#target').html(data.events);
                } else {
                    $('#target').html('Error...');
                }
          //if data is non-empty, return an array containing data['events']['name']['text'], data['events']['description']['text'], data['events']['url'], data['events']['start']['local'], host name, event address, and number of people attending
          //if data is empty, display some message
            });
    });
});