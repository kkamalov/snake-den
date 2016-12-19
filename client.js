config = {
  'roomServer': 'ws://199.21.79.248:444/slither',
  'mapServer': 'ws://websocket_server:8000',
  'color': 'blue',
  'name': 'blumua',
};

denSocket = null;
denSnakes = null;
denLbh = null;
denLbs = null;

denSetup = function() {
  ws = new WebSocket(config.roomServer);

  // Setup init.
  denSocket = new WebSocket(config.mapServer);
  denSnakes = {};

  // Setup socket
  denSocket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.event === 'delete') {
      var denSnake = denSnakes[data.id];
      denSnake.remove();
      delete denSnakes[data.id];
      return;
    }
    if (denSnakes[data.id]) {
      var denSnake = denSnakes[data.id];
      denSnake.style.top = data.top;
      denSnake.style.left = data.left;
      denSnake.score = Math.floor(15 * (fpsls[data.sct] + data.fam / fmlts[data.sct] - 1) - 5) / 1
    } else {
      denSnake = document.createElement("img");
      lc.width = lc.height = 14;
      ctx = lc.getContext("2d");
      ctx.fillStyle = data.color;
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(7, 7, 2.5, 0, pi2);
      ctx.stroke();
      ctx.fill();
      denSnake.src = lc.toDataURL();
      denSnake.className = "nsi";
      denSnake.style.position = "absolute";
      denSnake.style.left = data.left;
      denSnake.style.top = data.top;
      denSnake.style.opacity = 1;
      denSnake.style.zIndex = 13;
      denSnake.name = data.name;
      denSnake.color = data.color;
      denSnakes[data.id] = denSnake;
      trf(myloc, agpu);
      loch.appendChild(denSnake);
    }
  }


  // Setup leaderboard.
  denLbh = document.createElement("div");
  denLbh.className = "nsi";
  denLbh.style.position = "fixed";
  denLbh.style.left = "4px";
  denLbh.style.top = "4px";
  denLbh.style.textAlign = "center";
  denLbh.style.width = "255px";
  denLbh.style.height = "28px";
  denLbh.style.color = "#ffffff";
  denLbh.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  denLbh.style.fontSize = "21px";
  denLbh.style.fontWeight = "bold";
  denLbh.style.overflow = "hidden";
  denLbh.style.opacity = .7;
  denLbh.style.zIndex = 7;
  denLbh.style.cursor = "default";
  var lstr = "Den Leaderboard";
  "de" == lang ? lstr = "Bestenliste" : "fr" == lang ? lstr = "Gagnants" : "pt" == lang && (lstr = "L\u00edderes");
  denLbh.textContent = lstr;
  trf(denLbh, agpu);
  document.body.appendChild(denLbh);

  denLbs = document.createElement("div");
  denLbs.className = "nsi";
  denLbs.style.position = "fixed";
  denLbs.style.textAlign = "center";
  denLbs.style.left = "20px";
  denLbs.style.top = "32px";
  denLbs.style.width = "150px";
  denLbs.style.height = "800px";
  denLbs.style.color = "#ffffff";
  denLbs.style.fontFamily = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  denLbs.style.fontSize = "12px";
  denLbs.style.overflow = "hidden";
  denLbs.style.opacity = .7;
  denLbs.style.zIndex = 7;
  denLbs.style.cursor = "default";
  denLbs.style.lineHeight = "150%";
  trf(denLbs, agpu);
  document.body.appendChild(denLbs);
  return setInterval(updateUi, 1000);
}

updateLocation = function() {
  denSocket.send(JSON.stringify({
    top: myloc.style.top,
    left: myloc.style.left,
    color: config.color,
    name: config.name,
    // Internal score representation
    sct: snake.sct,
    fam: snake.fam,
  }));
}


updateLeaderboard = function() {
  var scores = "";
  for (var denSnakeId in denSnakes) {
    if (!denSnakes.hasOwnProperty(denSnakeId)) {
      continue;
    }
    var denSnake = denSnakes[denSnakeId];
    scores += '<span style="opacity:.7; color:' + denSnake.color + ';">' + denSnake.name + ': ' + denSnake.score + "</span><BR>";
  }
  denLbs.innerHTML = scores;
}

denReset = function() {
  denSocket && denSocket.close();
  denSocket = null;
  if (typeof denSnakes !== 'undefined') {
    for (var snakeId in denSnakes) {
      var denSnake = denSnakes[snakeId];
      denSnake.remove();
    }
  }
  denSnakes = {};
}


updateUi = function() {
  if (!playing || !connected) {
    denReset();
    clearInterval(denPeriodic);
  } else {
    updateLocation();
    updateLeaderboard();
  }
}


denPeriodic = denSetup();
