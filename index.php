<!DOCTYPE html>
<?php
  // header("Cache-Control: max-age=2592000");
  $hostName = $_SERVER['HTTP_HOST']; 
  $protocol = strtolower(substr($_SERVER['SERVER_PROTOCOL'],0,5))=='https'?'https':'http';
  $baseUrl = $protocol.'://'.$hostName;
?>
<html xmlns="http://www.w3.org/1999/xhtml"
  xmlns:fb="http://ogp.me/ns/fb#">
  <head>
    <base href="<?php echo $baseUrl; ?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta property="og:url"          content="<?php echo $baseUrl; ?>" />
    <meta property="og:title"        content="Mindball Ukraine" />
    <meta property="og:description"  content="Hello and Welcome to Mindball Ukraine!" />
    <meta property="og:image"        content="<?php echo $baseUrl; ?>/assets/Mindball_Ukraine_logo.png" />
    <meta property="og:image:width"  content="800" />
    <meta property="og:image:height" content="247" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="Hello and Welcome to Mindball Ukraine!">
    <title>Mindball Ukraine</title>
    <style>
      body { background-color: #303030; overflow: hidden; }
      .loading { margin-left: calc(50% - (142px / 2)); margin-top: calc(50vh - (142px / 2 + 2em / 2)); }
      .noReactMessage { text-align: center; font: 300 2em sans-serif; width: 100%; bottom: calc(50vh - (2em / 2 + 142px / 2)); position: absolute; color: #fff; }
    </style>
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Prompt:300,400,400i,500,600,700|Source+Code+Pro:900" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="/assets/slick-theme.css?<?php echo date('Y-m-d_H:i'); ?>" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/customScroll.css" />
  </head>
  <body>
    <div class="container">
      <svg class="loading" width="142px"  height="142px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ripple" style="background: none;"><circle cx="50" cy="50" r="31.8211" fill="none" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-width="{{config.width}}" stroke="#f98228" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1.3" keySplines="0 0.2 0.8 1" begin="-0.65s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1.3" keySplines="0.2 0 0.8 1" begin="-0.65s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="11.5321" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" stroke="#E25244" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1.3" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1.3" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate></circle></svg>
      <div class="noReactMessage">Loading...</div>
    </div>
  </body>
  <script>
    var $container = document.getElementsByClassName('container')[0];
    function checkContainer() {
      if ($container.innerHTML === '') {
        $container.innerHTML = '<div class="noReactMessage">Something went wrong. Try to reload page.</div>';
      }
    }
    setInterval(checkContainer, 2000);
  </script>
  <script src="/bundle.js?<?php echo date('Y-m-d_H:i'); ?>"></script>
</html>
