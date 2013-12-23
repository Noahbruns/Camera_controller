var tilt;

test_connection();

$(function() {
  $(".tip").tooltip();
});

function test_connection() {
  /*$.ajax({
  url:"http://192.168.1.100/cgi-bin/picture.cgi",
  crossDomain: true,
  dataType: 'text',
  timeout: 1200,
   error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status==0){
        $('#error_modal').modal('show');
      }
    },
  });*/
  TV_state();
}


function retest_connection() {
  $.ajax({
  url:"http://192.168.1.100/cgi-bin/picture.cgi",
  crossDomain: true,
  dataType: 'text',
  timeout: 1200,
  headers: {
        "Authorization":"Basic cm9vdDo=",
  },
    error: function (xhr, ajaxOptions, thrownError) {
    if(xhr.status!=0){
        $('#error_modal').modal('hide');
      }
    },
  });
}

function move(dir)
{
tilt=$('#select_tilt').find('.active').children().val();

$.ajax({
  url:"http://192.168.1.100/cgi-bin/camctrl.cgi?move="+dir+"&speedtilt="+tilt+"&speedpan="+tilt,
  crossDomain: true,
  dataType: 'text',
  timeout: 1200,
  headers: {
        "Authorization":"Basic cm9vdDo=",
  },
  error: function (request, status, error) {
        test_connection();
    }
});
x=0;
window.setTimeout(reload_3,500);

}

function zoom(dir)
{
$.ajax({
  url:"http://192.168.1.100/cgi-bin/ccdctrl.cgi?move="+dir,
  crossDomain: true,
  dataType: 'text',
  timeout: 1200,
  headers: {
        "Proxy-Authorization":"Basic cm9vdDo=",
  },
  error: function (request, status, error) {
        test_connection();
    }
});
x=0;
window.setTimeout(reload_3,500);
}

var i=0;

var int=self.setInterval(function(){reload()},10000);

function reload(){
	$("#img").attr('src',"http://192.168.1.100/imagep/picture.jpg?x="+i);
	i++;
  TV_state();
}

function show_modal() {
    $('#myModal').modal('show');
}

var x=0;

function reload_3(){
	$("#img").attr('src',"http://192.168.1.100/imagep/picture.jpg?x="+i);
	i++;
	if(x<5){
	window.setTimeout(reload_3,500);
	}
	x++;
}

function TV_switch() {
  if(onreq){
  }
  else{
  onreq=true;
  $("#TV_button").removeClass( "btn-danger btn-success" ).addClass( "btn-warning" );
  $("#Status_text").text("STATUS: Warten...");
  $("#Status_btn").parent().prop('disabled', true);

  if($("#Status_btn").text()=="Abschalten"){
    TV_off();
  }
  if($("#Status_btn").text()=="Anschalten"){
    TV_on();
  }
}
}

var onreq=false;

function TV_on() {
  $.ajax({
  url:"http://10.0.0.1:5000/on?"+i,
  crossDomain: true,
  dataType: 'text',
  timeout: 100000,
   error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status==0){
        $('#error_modal').modal('show');
      }
    },
    success: function (msg) {
        onreq=false;
        TV_state();
        $("#Status_btn").parent().prop('disabled', false);
    },
  });
  i++;
}

function TV_off() {
  $.ajax({
  url:"http://10.0.0.1:5000/off?"+i,
  crossDomain: true,
  dataType: 'text',
  timeout: 100000,
   error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status==0){
        $('#error_modal').modal('show');
      }
    },
    success: function (msg) {
        onreq=false;
        TV_state();
        $("#Status_btn").parent().prop('disabled', false);
    },
  });
  i++;
}

function TV_state() {
  if(onreq){
  }
  else{
  var request = $.ajax({
  url:"http://10.0.0.1:5000/state?"+i,
  crossDomain: true,
  dataType: 'text',
  timeout: 100000,
   error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status==0){
        $('#error_modal').modal('show');
      }
    },
  });
  i++;
  request.done(function(msg){
    if(msg=="ON"){
      $("#TV_button").removeClass( "btn-danger btn-warning" ).addClass( "btn-success" );
      $("#Status_text").text("STATUS: TV ist an");
      $("#Status_btn").text("Abschalten");
    }
    else if(msg=="WAIT"){
      $("#TV_button").removeClass( "btn-danger btn-success" ).addClass( "btn-warning" );
      $("#Status_text").text("STATUS: Warten...");
      $("#Status_btn").text("...");
    }
    else {
      $("#TV_button").removeClass( "btn-success btn-warning" ).addClass( "btn-danger" );
      $("#Status_text").text("STATUS: TV ist aus");
      $("#Status_btn").text("Anschalten");
    }
  });
}
}