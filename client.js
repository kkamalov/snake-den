config = {
  'roomServer': 'ws://199.21.79.248:444/slither',
  'mapServer': 'ws://websocket_server:8000',
  'color': 'red'
}

ws = new WebSocket(config.roomServer)
if (typeof b12Socket !== 'undefined') {
  b12Socket.close();
  if (typeof b12Snakes !== 'undefined') {
    for (var snakeId in b12Snakes) {
      var b12Snake = b12Snakes[snakeId];
      b12Snake.remove();
    }
  }
}

b12Socket = new WebSocket(config.mapServer);
b12Snakes = {}

updateLocation = function() {
  b12Socket.send(JSON.stringify({
    top: myloc.style.top,
    left: myloc.style.left,
    color: config.color
  }))
}

setInterval(updateLocation, 1000)

b12Socket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  if (data.event === 'delete') {
    var b12Loc = b12Snakes[data.id];
    b12Loc.remove();
    delete b12Snakes[data.id];
    return;
  }

  if (b12Snakes[data.id]) {
    var b12Snake = b12Snakes[data.id];
    b12Snake.style.top = data.top;
    b12Snake.style.left = data.left;
  } else {
    b12Loc = document.createElement("img");
    lc.width = lc.height = 14;
    ctx = lc.getContext("2d");
    ctx.fillStyle = data.color;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(7, 7, 2.5, 0, pi2);
    ctx.stroke();
    ctx.fill();
    b12Loc.src = lc.toDataURL();
    b12Loc.className = "nsi";
    b12Loc.style.position = "absolute";
    b12Loc.style.left = data.left;
    b12Loc.style.top = data.top;
    b12Loc.style.opacity = 1;
    b12Loc.style.zIndex = 13;
    b12Snakes[data.id] = b12Loc;
    trf(myloc, agpu);
    loch.appendChild(b12Loc);
  }
}
