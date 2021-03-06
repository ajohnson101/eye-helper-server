function attach_click_listeners() {
    $('#phones img').on('click', function( e ) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log(x + ", " + y);
    });
}

function escape_id(myid) {
     return "#" + myid.replace( /(:|\.|\[|\])/g, "\\$1" );
}

function updateUI(phones){
    $('#phones').empty();
    for (var i = 0; i < phones.length; i+=1) {
        var address = phones[i];
        $('#phones').append('<li id="'+address+'"><img><input type="text" name="address"></li>');
    }
    attach_click_listeners();
    if (phones.length === 0) {
        $('#phones').append('<li id="no_phones">Nobody is connected at the moment.</li>');
    }
};

function updateImage(data) {
    $(escape_id(data.phone) + " img").attr('src', data.image);
}

var socket = io.connect();

socket.on('phones', function (phones) {
    updateUI(phones);
});

socket.on('video_feed', function(data) {
    updateImage(data);
});

//enter key pressed
$('#phones').keyup(function (e) {
    if (e.keyCode === 13) {
        console.log(e.target);
        socket.emit('message', {'address': e.target.parentElement.id,'text': e.target.value});
        e.target.value = '';
    }
})

attach_click_listeners();
