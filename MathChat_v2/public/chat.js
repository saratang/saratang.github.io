window.onload = function() {

    var messages = [];
    var current_index;
    var socket = io.connect('http://192.168.0.101:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("chatbox");
    var blip = document.createElement("audio");
    blip.setAttribute('src', '/blip.wav');

    var sess;

    socket.on('server_message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            var i = messages.length - 1;
            var id = makeid();

            html += '<div class="msgln" id="msgln_' + id + '">';
            html += '<div class="servermsg" id="msg_' + id + '"><i>' + messages[i].message + '</i></div></div>'; 
            
            $("#chatbox").append(html);
            blip.play();
        } else {
            console.log("There is a problem:", data);
        }

        //MathJax.Hub.Queue(["Typset", MathJax.Hub, messages[i].message]);
        $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    });

    //If user logs out
    $("#logout").click(function() {
        socket.emit('exit');
    });

    function login(sess) {
        if (typeof sess != 'undefined' && typeof sess.name != 'undefined') {
            // alert('sess and sess.name are defined');
            $('#welcome').hide();
            $('#chatroom').show();
            $('#greeting p').html('You are currently logged in as <b>' + sess.name + '</b>. ');
            $('#greeting p').append('<a id="logout" href="/logout">(Log out)</a>');
            socket.emit('enter');
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

            if (i != 0 && messages[i-1].username == messages[i].username) {
                html += '<div class="msgln" id="msgln_' + messages[i].id + '">';
                html += '<div class="usermsg" id="msg_' + messages[i].id + '">' + messages[i].message + '</div></div>';
            } else {
            //for(var i=0; i<messages.length; i++) {
                html += '<div class="msgln" id="msgln_' + messages[i].id + '">';
                html += '<div class="userbox"><b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b></div>';
                html += '<div class="usermsg" id="msg_' + messages[i].id + '">' + messages[i].message + '</div></div>';
            }
            //}
            $("#chatbox").append(html);
            blip.play();
            
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, messages[i].message]);
            $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
        } else {
            console.log("There is a problem:", data);
        }
    });

    function sendMessage() {
        var text = autocomplete(field.value.trim());
        socket.emit('send', { message: text, username: sess.name, id: makeid() });
        field.value = "";
    };

    $("#send").click(function() {
        if (field.value != '') {
            sendMessage();
        }
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
            if (field.value != '') {
                sendMessage();
            }
        }

        //Pushing Up should pull up last message
        if (e.keyCode == 38) {
            if (messages[current_index].username == sess.name) {
                this.value = messages[current_index].message;
            }

            if (current_index > 0) {
                do {
                    current_index--;
                    console.log(current_index);
                } while (messages[current_index].username != sess.name && current_index > 0);
            }
        }

        //Pushing Down should go to "next" message
        if (e.keyCode == 40) {
            if (current_index < messages.length - 1) {
                do {
                    current_index++;
                    console.log(current_index);
                } while (messages[current_index].username != sess.name && current_index < messages.length - 1);
            }
            
            if (messages[current_index].username == sess.name) {
                this.value = messages[current_index].message;
            }
        }

        //Pushing Tab should autocomplete...

    })
    .keydown(function(e) {
        if (e.keyCode == 38) {
            return false;
        }
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