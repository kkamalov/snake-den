config = {
  'roomServer': 'ws://199.21.79.248:444/slither',
  'mapServer': 'ws://websocket_server:8000',
  'color': 'red'
}

ws = new WebSocket(config.roomServer)
if (typeof denSocket !== 'undefined') {
  denSocket.close();
  if (typeof denSnakes !== 'undefined') {
    for (var snakeId in denSnakes) {
      var denSnake = denSnakes[snakeId];
      denSnake.remove();
    }
  }
}

denSocket = new WebSocket(config.mapServer);
denSnakes = {}

updateLocation = function() {
  denSocket.send(JSON.stringify({
    top: myloc.style.top,
    left: myloc.style.left,
    color: config.color
  }))
}

setInterval(updateLocation, 1000)

denSocket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  if (data.event === 'delete') {
    var denLoc = denSnakes[data.id];
    denLoc.remove();
    delete denSnakes[data.id];
    return;
  }

  if (denSnakes[data.id]) {
    var denSnake = denSnakes[data.id];
    denSnake.style.top = data.top;
    denSnake.style.left = data.left;
  } else {
    denLoc = document.createElement("img");
    lc.width = lc.height = 14;
    ctx = lc.getContext("2d");
    ctx.fillStyle = data.color;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(7, 7, 2.5, 0, pi2);
    ctx.stroke();
    ctx.fill();
    denLoc.src = lc.toDataURL();
    denLoc.className = "nsi";
    denLoc.style.position = "absolute";
    denLoc.style.left = data.left;
    denLoc.style.top = data.top;
    denLoc.style.opacity = 1;
    denLoc.style.zIndex = 13;
    denSnakes[data.id] = denLoc;
    trf(myloc, agpu);
    loch.appendChild(denLoc);
  }
}
