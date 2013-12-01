var tilt;

test_connection();

$(function() {
  $(".tip").tooltip();
});

function test_connection() {
  $.ajax({
  url:"http://192.168.1.100/cgi-bin/picture.cgi",
  crossDomain: true,
  dataType: 'jsonp',
  timeout: 1200,
   error: function (xhr, ajaxOptions, thrownError) {
        if(xhr.status==0){
        $('#error_modal').modal('show');
      }
    },
  });
}


function retest_connection() {
  $.ajax({
  url:"http://192.168.1.100/cgi-bin/picture.cgi",
  crossDomain: true,
  dataType: 'jsonp',
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
  dataType: 'jsonp',
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
  dataType: 'jsonp',
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
