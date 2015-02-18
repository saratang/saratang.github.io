window.onload = function() {

    var messages = [];
    var current_index;
    var socket = io.connect('http://192.168.2.20:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("chatbox");

    var sess;
    function get_sess (data) {
        sess = data;
        login(sess);
        socket.removeListener('send_sess', get_sess);
    }

    socket.on('send_sess', get_sess);

    socket.emit('new_user');

    //Checks if user is valid
    $('#enter').click(function() {
        var name = validate_name($('#name').val());
    });

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            var i = messages.length - 1;
            current_index = i;
            //for(var i=0; i<messages.length; i++) {
            html += '<div class="msgln" id="msgln_' + messages[i].id + '">';
            html += '<div class="userbox"><b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b></div>';
            html += '<div class="msg" id="msg_' + messages[i].id + '">' + messages[i].message + '</div></div>';
            //}
            $("#chatbox").append(html);

        } else {
            console.log("There is a problem:", data);
        }

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, messages[i].message]);
        $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    });


    function sendMessage() {
        var text = autocomplete(field.value.trim());
        socket.emit('send', { message: text, username: sess.name, id: makeid() });
        field.value = "";
    };

    $("#send").click(function() {
        sendMessage();
    });

    $("#typing span").css("visibility", "hidden");
    $("#field").focusin(function() {
        if (this.value != '') {
            $("#typing span").css("visibility", "visible");
        } else {
            $("#typing span").css("visibility", "hidden");
        }
    }).focusout(function() {
        $("#typing span").css("visibility", "hidden");
    });
    
    $("#field").keyup(function(e) {
        //Typing should show "User is typing"
        if (this.value != '') {
            $("#typing span").css("visibility", "visible");
        }

        //Pushing Enter or Shft + Enter
        if (e.keyCode == 13 && e.shiftKey) {
            var content = $(this).val();
            var caret = getCaret(this);
            $(this).val() = content.substring(0, caret) + "\n" + content.substring(caret, content.length);
            e.stopPropagation();
        }
        else if (e.keyCode == 13 && !e.shiftKey) {
            if ($(this).val() != '') {
                sendMessage();
            }
        }

        //Pushing Up should pull up last message
        if (e.keyCode == 38) {
            if (messages[current_index].username == sess.name) {
                this.value = messages[current_index].message;
            }

            while (current_index > 0) {
                do {
                    current_index--;
                    console.log(current_index);
                } while (messages[current_index].username != sess.name && current_index > 0);
                break;
            }
        }

        //Pushing Down should go to "next" message
        if (e.keyCode == 40) {
            while (current_index < messages.length - 1) {
                do {
                    current_index++;
                    console.log(current_index);
                } while (messages[current_index].username != sess.name && current_index < messages.length - 1);
                break;
            }
            
            if (messages[current_index].username == sess.name) {
                this.value = messages[current_index].message;
            }
        }
        //Pushing Tab should autocomplete...

    });
}

function validate_name(username) {
    if (username == '') {
        alert('Name cannot be empty!');
    } else {
        $.post("/login",{name:username},function(data){        
            if(data==='done') {
                window.location.href="/";
            }
        });
    }
}

function login(sess) {
    if (typeof sess != 'undefined' && typeof sess.name != 'undefined') {
        // alert('sess and sess.name are defined');
        $('#welcome').hide();
        $('#chatroom').show();
        $('#greeting p').html('You are currently logged in as <b>' + sess.name + '</b>');
    } else {
        // if (typeof sess == 'undefined') {
        //     alert('sess is undefined');
        // } else if (typeof sess.name == 'undefined') {
        //     alert('sess.name is undefined');
        // }
        $('#chatroom').hide();
        $('#welcome').show();
    }
}

function autocomplete(message) {
    var count = 0;
    for (var i=0; i< message.length; i++) {
        if (message[i] + message[i + 1] == '$$') {
            count++
        }
    }

    switch(count % 2) {
        case 1:
            message += '$$';
            break;
        default:
            break;
    }

    return message
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getCaret(el) {
  if (el.selectionStart) {
     return el.selectionStart;
  } else if (document.selection) {
     el.focus();

   var r = document.selection.createRange();
   if (r == null) {
    return 0;
   }

    var re = el.createTextRange(),
    rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }  
  return 0;
}