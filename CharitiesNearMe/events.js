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
        data: $.param(search),
        //beforeSend: $('#load').show()
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

$(function () 
 {
     $("#location-input").autocomplete({
        source: function (request, response) {
         jQuery.getJSON(
            "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
            function (data) {
             response(data);
            }
         );
        },
        minLength: 3,
        select: function (event, ui) {
         var selectedObj = ui.item;
         $("#location-input").val(selectedObj.value);
         return false;
        },
        open: function () {
         $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
         $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
     });
     $("#location-input").autocomplete("option", "delay", 100);
});
