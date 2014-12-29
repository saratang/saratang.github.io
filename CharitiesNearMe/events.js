//Find all places within a limit
function ajax_request(tokenv, startv, endv, locationv) {
    var search = {
        token: tokenv,
        categories: 111,
        start_date: {
            range_start: startv,
            range_end: endv
        },
        venue: {
            city: locationv
        }
    }

    alert($.param(search));

    return $.ajax({
        //format_id: {
            //1: Conference,
            //2: Seminar or Talk,
            //3: Expo,
            //4: Convention,
            //5: Festival,
            //6: Concert,
            //7: Screening,
            //8: Dinner,
            //9: Workshop,
            //10: Meeting/Networking,
            //11: Party or Social Gathering
            //12: Rally,
            //13: Tournament,
            //14: Game or Competition,
            //15: Race or Endurance Event
        url: "https://www.eventbriteapi.com/v3/events/search/?token=" + tokenv + "&categories=111&start_date.range_start=" + startv + "&start_date.range_end=" + endv + "&venue.city=" + locationv,
        type: "GET",
        dataType: "json",
        cache: "false",
        // contentType: 'application/json', 
        // beforeSend: function(xhr) {
        //     xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // },
        // data: $.param(search)
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

function eventHTML(event) {
    var res = '<div>' + event['name']['text'] + '</div>';
    return res;
}

$(function() {
    $('#button').click(function() {
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
                        console.log('Name: ' + this['name']['text']);
                        console.log('Host: ' + this['organizer']['name']);
                        console.log('Venue: ' + this['venue']['address']['address_1']);
                    });
                } else {
                    //if data is empty, display some message
                    console.log("error:" + data);
                }
            });
    });
});