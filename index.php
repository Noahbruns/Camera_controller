<!DOCTYPE html>
<html>
<head>
    <title>Camera control</title>
    <meta charset="utf-8">
    <script type="text/javascript" src="jquery.js"></script>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="camera.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
    <style type="text/css">
    #ctrl {
      width:128px;
    }

    #zoom_in {
      margin-left: 6px;
      margin-top: 4px;
    }

    #zoom_out {
      margin-left: 6px;
      margin-top: 6px;
    }

    #image_con {
      margin-top: 20px;
    }

    #img {
      width: 100%;
      max-width: 430px;
    }

    body {
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */

  /* No support for these yet, use at own risk */
  -o-user-select: none;
  user-select: none;
    }
</style>

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />

</head>
<body>

<div class="container">

<div class="row">
  <div class="col-md-4">
    <H2>Cameracontrol</H2><br> 
  </div>
</div>

<div class="row">
  <div class="col-md-2">
    <div id="ctrl">
<div class="row">
  <div class="col-xs-4 col-xs-offset-4"><button type="button" class="btn btn-info btn-lg" onclick="move(1)"><span class="glyphicon glyphicon-chevron-up"></button></div>
  <div class="col-xs-4"><button type="button" class="btn btn-default btn" onclick="zoom(1)" id="zoom_in"><span class="glyphicon glyphicon-zoom-in"></button></div>
</div>
<div class="row">
  <div class="col-xs-4"><button type="button" class="btn btn-info btn-lg" onclick="move(2)"><span class="glyphicon glyphicon-chevron-left"></span></button></div>
  <div class="col-xs-4"><button type="button" class="btn btn-primary btn-lg" onclick="move(3)"><span class="glyphicon glyphicon-home"></button></div>
  <div class="col-xs-4"><button type="button" class="btn btn-info btn-lg" onclick="move(4)"><span class="glyphicon glyphicon-chevron-right"></span></button></div>
</div>
<div class="row">
  <div class="col-xs-4 col-xs-offset-4"><button type="button" class="btn btn-info btn-lg" onclick="move(5)"><span class="glyphicon glyphicon-chevron-down"></button></div>
  <div class="col-xs-4"><button type="button" class="btn btn-default btn" onclick="zoom(1)" id="zoom_out"><span class="glyphicon glyphicon-zoom-out"></button></div>
</div>

<div class="row" style="margin-top:10px;">
  <div class="col-xs-6 col-xs-offset-4 btn-group-vertical">
      <button type="button" class="btn btn-default btn-sm tip" title="Bild aktualisieren" data-toggle="tooltip" data-placement="right" onclick="reload()"><span class="glyphicon glyphicon-repeat"></button>
      <button type="button" class="btn btn-default btn-sm tip" title="Einstellungen" data-toggle="tooltip" data-placement="right" onclick="show_modal()"><span class="glyphicon glyphicon-cog"></button>
  </div>

</div>

</div>
</div>
<div class="col-md-4 col-md-offset-2" id="image_con">
    <img id="img" src="http://192.168.1.100/imagep/picture.jpg" />
</div>
</div>

</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Einstellungen</h4>
      </div>
      <div class="modal-body">
        Schwenkwinkel: <br>
<div class="btn-group" data-toggle="buttons" id="select_tilt">
  <label class="btn btn-default  active">
    <input type="radio" name="options" id="speed_5" value="5"> 5 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_10" value="10"> 10 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_15" value="15"> 15 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_20" value="20"> 20 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_25" value="25"> 25 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_30" value="30"> 30 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_35" value="35"> 35 </input>
  </label>
  <label class="btn btn-default">
    <input type="radio" name="options" id="speed_40" value="40"> 40 </input>
  </label>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="error_modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div class="alert alert-danger">Keine Verbindung zur Kamera</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="retest_connection()">Erneut testen</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</body>
</html>