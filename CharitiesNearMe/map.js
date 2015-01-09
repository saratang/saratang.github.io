// // // Get current location
// // // Note: This example requires that you consent to location sharing when
// // // prompted by your browser. If you see a blank space instead of the map, this
// // // is probably because you have denied permission for location sharing.

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
      zoom: 15,
      scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //google.maps.event.addDomListener($('#formats'), 'click', placeMarker());

    $('#formats').click(function() {
        var location = 'toronto';
        var token = "ZBEVEGMUTNYPFPOKE4B7";
        var today = new Date();
        today = format(today);
        var end = format(thirty_days_later());

        //var params = {'hostname': $hostname, 'type': $type};
        var res = ajax_request(token, today, end, location);
        res
            .done(function(data) {
                //if data is non-empty, return an array containing data['events']['name']['text'], data['events']['description']['text'], data['events']['url'], data['events']['start']['local'], host name, event address, and number of people attending, latitude and longitude -.-"
                if (data) {
                    $.each(data['events'], function() {
                        //turn info into marker on map
                        markers = new Array();
                        infowindows = new Array();

                        markers.push(add_marker(this, map));
                        infowindows.push(add_infowindow(this));

                        console.log('');
                        console.log('Name: ' + this['name']['text']);
                    });
                } else {
                    //if data is empty, display some message
                    console.log("error:" + data);
                }
            });
    });
    
    for (var i = 0; i < markers.length; i++) {
        google.maps.event.addListener(markers[i], 'click', function() {
            infowindows[i].open(map, markers[i]);
        });
    }
    

    function add_marker(event, map) {
        var latitude = parseFloat(event['venue']['latitude']);
        var longitude = parseFloat(event['venue']['longitude']);
        var coordinates = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: event['name']['text']
        });
        return marker;
    }

    function add_infowindow(event) {
        var contentString = '<div class="info-content">'+
            '<h1 class="firstHeading">' + event['name']['text'] + '</h1>'+
            '<h2 class="secondHeading">' + event['organizer']['name'] + '</div>'+
            '<div class="bodyContent">'+
            event['description']['html'] +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        return infowindow;
    }
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
    document.body.appendChild(script);
}

$(function() {
  $('#button').click(function() {
    loadScript();
  });
});