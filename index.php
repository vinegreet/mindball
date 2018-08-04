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
      #noReactMessage { color: #ccc; text-align: center; font: 300 2em/100vh sans-serif; }
    </style>
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Prompt:300,400,400i,500,600,700" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="/assets/slick-theme.css?<?php echo date('Y-m-d_H:i'); ?>" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/customScroll.css" />
  </head>
  <body>
    <div class="container">
      <div id="noReactMessage">Loading...</div>
    </div>
  </body>
  <script>
    var $container = document.getElementsByClassName('container')[0];
    function checkContainer() {
      if ($container.innerHTML === '') {
        $container.innerHTML = '<div id="noReactMessage">Something went wrong. Try to reload page.</div>';
      }
    }
    setInterval(checkContainer, 2000);
  </script>
  <script src="/bundle.js?<?php echo date('Y-m-d_H:i'); ?>"></script>
</html>
