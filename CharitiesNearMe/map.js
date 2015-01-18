// // // Get current location
// // // Note: This example requires that you consent to location sharing when
// // // prompted by your browser. If you see a blank space instead of the map, this
// // // is probably because you have denied permission for location sharing.

var map;
var markers = [];
var infowindows_content = [];
var infowindow = new google.maps.InfoWindow();

function initialize() {
    var mapOptions = {
      zoom: 15
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }

    $('#refine').submit(function(e) {
        e.preventDefault();

        if (typeof markers !== "undefined") {
            delete_markers();
        }

        if ($('#location-check').prop("checked")) {
            var location = $('#location-input').val().split(',').slice(0, 1).join('');
        } else {
            var location = $('#location-input').val().split(',').slice(0, 1).join('');
        }

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
                    delete_markers();
                    infowindows_content = [];
                    
                    $.each(data['events'], function() {
                        //turn info into marker on map
                        markers.push(add_marker(this, map));
                        infowindows_content.push(add_infowindow_content(this));
                    });

                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(map);
                        google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
                          return function() {
                            infowindow.close()
                            infowindow.setContent(infowindows_content[i]);
                            infowindow.open(map, markers[i]);
                          }
                        })(markers[i], i));
                    }

                    pan_to_city(map, $('#location-input').val());
                    map.setZoom(12);
                    notify_results(location, markers);
                } else {
                    //if data is empty, display some message
                    console.log("error:" + data);
                }
            });
    });

    function set_all_map(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function delete_markers() {
        set_all_map(null);
        markers = [];
    }

    function add_marker(event) {
        var latitude = parseFloat(event['venue']['latitude']),
        longitude = parseFloat(event['venue']['longitude']),
        coordinates = new google.maps.LatLng(latitude, longitude),
        marker = new google.maps.Marker({
            position: coordinates,
            title: event['name']['text']
        });
        return marker;
    }

    function add_infowindow_content(event) {
        if (event['description'] !== null && event['description']['text'] !== null) {
            var description = event['description']['text'];
            if (event['description']['text'].split(' ').length > 100) {
                description = description.split(' ').slice(0, 99).join(' ') + '...';
            }
        } else {
            var description = "This event has no description!";
        }

        var start_date = new Date(event['start']['local']),
        end_date = new Date(event['end']['local']);

        if (start_date.toDateString() === end_date.toDateString()) {
            var date = "<p><b>Date & Time: </b>" + start_date.toDateString() + ', ' + 
            start_date.toLocaleTimeString() + ' - ' + end_date.toLocaleTimeString() + '</p>';
        } else {
            var date = "<p><b>Start date: </b>" + start_date.toDateString() + ', ' +
            start_date.toLocaleTimeString() + "</p>" +
            "<p><b>End date: </b>" + end_date.toDateString() + ', ' + 
            end_date.toLocaleTimeString() + "</p>";
        }

        return contentString = '<div class="info-content">'+
            '<h1 class="firstHeading">' + event['name']['text'] + '</h1>'+
            '<h2 class="secondHeading">' + event['organizer']['name'] + '</h2>' + 
            date + '</div>' +
            '<div class="bodyContent"><p>' + description + '</p>' +
            '<p>For more information, please <a href="' + event['url'] + '">' + 
            'click here</a>.</p>'+
            '</div>'+
            '</div>';
    }

    function notify_results(location, markers) {
        num = markers.length;
        location = location.charAt(0).toUpperCase() + location.slice(1);

        if (num != 1) {
            $('#results-notification').html("We found " + num + " relevant events in " + location + ".");
        } else {
            $('#results-notification').html("We found " + num + " relevant event in " + location + ".");
        }

        $('#results-notification').slideDown(function() {
            setTimeout(function() {
                $('#results-notification').slideUp();
            }, 2500);
        });
    }

    function pan_to_city(map, fqcn) {
        if (fqcn) {
            $.ajax({
                url: "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+fqcn,
                async: false,
                dataType: 'json',
                success: function(data) {
                    var latitude = parseFloat(data.geobyteslatitude),
                    longitude = parseFloat(data.geobyteslongitude),
                    coords = new google.maps.LatLng(latitude, longitude); 
                    map.panTo(coords);          
                }
            });
        }
    }
}

function handleNoGeolocation(errorFlag) {
if (errorFlag) {
  var content = 'Error: The Geolocation service failed.';
} else {
  var content = 'Error: Your browser doesn\'t support geolocation.';
}

var options = {
  map: map,
  position: new google.maps.LatLng(60, 105),
  content: content
};

var infowindow = new google.maps.InfoWindow(options);
map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);