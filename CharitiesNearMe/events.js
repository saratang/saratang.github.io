//Find all places within a limit
function get_formats() {
    formats = [];
    //for each checked box, add its value to formats
    $('.type:checked').each(function() {
        formats.push($(this).val());
    });
    return formats.join();
    //return formats.join();
}

function ajax_request(tokenv, startv, endv, locationv) {
    var search = {
        token: tokenv,
        categories: 111,
        formats: get_formats()
    }

    return $.ajax({
        url: "https://www.eventbriteapi.com/v3/events/search/?start_date.range_start=" + startv + "&start_date.range_end=" + endv + "&venue.city=" + locationv,
        type: "GET",
        dataType: "json",
        cache: "false",
        // contentType: 'application/json', 
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // },
        data: $.param(search)
    });
}

function strip_milli(string) {
    var i = string.indexOf(".");
    string = string.substring(0,i);
    return string;
}

function thirty_days_later() {
    var future = new Date();
    future.setDate(future.getDate() + 30);
    return future;
}

function format(date) {
    var result = date.toISOString();
    result = strip_milli(result);
    result = result + "Z";
    result = encodeURI(result);
    return result;
}

// function eventHTML(event) {
//     var res = '<div>' + event['name']['text'] + '</div>';
//     return res;
// }

// function add_marker(event) {
//     var longitude = event['venue']['longitude'];
//     var latitude = event['venue']['latitude'];
//     var coordinates = new google.maps.LatLng(longitude, latitude);
//     var marker = new google.maps.Marker({
//         position: coordinates,
//         map: map,
//         title: event['name']['text']
//     });
// }

// $(function() {
//     $('#button').click(function() {
//         var location = 'toronto';
//         var token = "ZBEVEGMUTNYPFPOKE4B7";
//         var today = new Date();
//         today = format(today);
//         var end = format(thirty_days_later());

//         //var params = {'hostname': $hostname, 'type': $type};
//         var res = ajax_request(token, today, end, location);
//         res
//             .done(function(data) {
//                 //if data is non-empty, return an array containing data['events']['name']['text'], data['events']['description']['text'], data['events']['url'], data['events']['start']['local'], host name, event address, and number of people attending, latitude and longitude -.-"
//                 if (data) {
//                     $.each(data['events'], function() {
//                         //turn info into marker on map
//                         add_marker(this);

//                         console.log('');
//                         console.log('Name: ' + this['name']['text']);
//                         console.log('Host: ' + this['organizer']['name']);
//                         console.log('Venue: ' + this['venue']['address']['address_1']);
//                         console.log('Type: ' + this['format']['name']);
//                     });
//                 } else {
//                     //if data is empty, display some message
//                     console.log("error:" + data);
//                 }
//             });
//     });
//     $('#formats').click(function() {
//         get_formats();
//     });
// });