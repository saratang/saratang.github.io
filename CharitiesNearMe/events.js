//Find all places within a limit
function ajax_request(tokenv, startv, endv, locationv) {
    var search = {
        token: tokenv,
        categories: 111,
        start_date.range_start: startv,
        start_date.range_end: endv,
        venue.city: locationv
    }

    return $.ajax({
        url: "https://www.eventbriteapi.com/v3/events/search/?",
        type: "GET",
        dataType: "json",
        cache: "false",
        contentType: 'application/json'
        data: $.params(search)
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
                if (data && !data.error) {
                    $.each(data.events, function() {
                        $(this).prependTo('#target');
                    });
                    console.log("done!");
                } else {
                    //if data is empty, display some message
                    console.log("error:" + data);
                }
            });
    });
});