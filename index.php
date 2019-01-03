<!DOCTYPE html>
<?php
  // header("Cache-Control: max-age=2592000");
  $hostName = $_SERVER['HTTP_HOST']; 
  $protocol = strtolower(substr($_SERVER['SERVER_PROTOCOL'], 0, 5)) == 'https' ? 'https' : 'http';
  $baseUrl = $protocol.'://'.$hostName;
?>
<!-- Made with Love by Roman Zots. Contact: fb.me/roman.zots -->
<html xmlns="http://www.w3.org/1999/xhtml"
  xmlns:fb="http://ogp.me/ns/fb#">
  <head>
    <!-- <base href="<?php echo $baseUrl; ?>" /> -->
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
      @keyframes lds-ball{0%,100%{animation-timing-function:cubic-bezier(0.45,0,0.9,0.55)}0%{-webkit-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(0,108px);transform:translate(0,108px);animation-timing-function:cubic-bezier(0,0.45,0.55,0.9)}100%{-webkit-transform:translate(0,0);transform:translate(0,0)}}@-webkit-keyframes lds-ball{0%,100%{animation-timing-function:cubic-bezier(0.45,0,0.9,0.55)}0%{-webkit-transform:translate(0,0);transform:translate(0,0)}50%{-webkit-transform:translate(0,108px);transform:translate(0,108px);animation-timing-function:cubic-bezier(0,0.45,0.55,0.9)}100%{-webkit-transform:translate(0,0);transform:translate(0,0)}}.lds-ball{position:relative}.lds-ball div{position:absolute;width:52px;height:52px;border-radius:50%;background:#e25244;left:74px;top:20px;-webkit-animation:lds-ball 1.3s linear infinite;animation:lds-ball 1.3s linear infinite}.lds-ball{width:142px !important;height:142px !important;-webkit-transform:translate(-71px,-71px) scale(0.71) translate(71px,71px);transform:translate(-71px,-71px) scale(0.71) translate(71px,71px)}
    </style>
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Prompt:300,400,400i,500,600,700|Source+Code+Pro:900" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="/assets/slick-theme.css?<?php /* echo date('Y-m-d_H:i'); */ ?>" />
    <link rel="stylesheet" type="text/css" href="/assets/ext/customScroll.css" />
  </head>
  <body>
    <div class="container">
      <div class="loading lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ball"><div></div></div></div>
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
  <script src="./bundle.js?<?php /* echo date('Y-m-d_H:i'); */ ?>"></script>
</html>
