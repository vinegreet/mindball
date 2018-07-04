let ticking = false;

export default function reqAnim(...argums) {
  if (!ticking) {
    /*console.log(argums);
    console.log(arguments[0], arguments[1]);*/
    const args = arguments;
    requestAnimationFrame(() => ontouch(args[0], args[1]));
    ticking = true;
  }
}

/*export default function reqAnim($el, callback) {
  if (!ticking) {
    console.log(args);
    console.log(arguments[0], arguments[1]);
    const args = arguments;
    // args[0], args[1]
    requestAnimationFrame(() => ontouch($el, callback));
    ticking = true;
  }
}*/

function ontouch($el, callback){

  var touchsurface = $el,
  dir,
  swipeType,
  startX,
  startY,
  distX,
  distY,
  threshold = 150,
  restraint = 100,
  allowedTime = 500,
  elapsedTime,
  startTime,
  handletouch = callback || function(evt, dir, phase, swipetype, distance){};

  // console.log(touchsurface)
  if (!touchsurface) return;
  touchsurface.addEventListener('touchstart', function(e){
    var touchobj = e.changedTouches[0];
    dir = 'none';
    swipeType = 'none';
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime();
    handletouch(e, 'none', 'start', swipeType, 0);
    // e.preventDefault();
  });
 
  touchsurface.addEventListener('touchmove', function(e){
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    if (Math.abs(distX) > Math.abs(distY)){
      dir = (distX < 0)? 'left' : 'right';
      handletouch(e, dir, 'move', swipeType, distX);
    }
    else{
      dir = (distY < 0)? 'up' : 'down';
      handletouch(e, dir, 'move', swipeType, distY);
    }
    // if (dir === 'left' || dir === 'right') e.preventDefault();
  });
 
  touchsurface.addEventListener('touchend', function(e){
    var touchobj = e.changedTouches[0];
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime){
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
        swipeType = dir;
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
        swipeType = dir;
      }
    }
    handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
    // e.preventDefault();
  });
  ticking = false;
}