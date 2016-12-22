config = {
  'roomServer': 'ws://199.21.79.248:444/slither', // Set this to your preferred room.
  'mapServer': 'ws://websocket_server:8000', // Set this to the location of the running web server
  'color': 'red', // Each player should choose a color.
  'name': 'kainar' // Each player should put their username.
}

denSocket = null;
denSnakes = null;
denLbh = null;
denLbs = null;
denReset = null;

denReset = function() {
  denSocket && denSocket.close();
  denSocket = null;
  denLbh = document.getElementById("leaderboardTag");
  denLbs = document.getElementById("leaderboardScores");
  if (denLbh) denLbh.remove();
  if (denLbs) denLbs.remove();

  var oldSnakes = document.getElementsByClassName("denSnake");
  for (var i = 0; i < oldSnakes.length; i++) {
    oldSnakes[i].remove();
  }
  denSnakes = {};
}

denSetup = function() {
  denReset();
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
        denSnake.classList.add("nsi");
        denSnake.classList.add("denSnake");
        denSnake.style.position = "absolute";
        denSnake.style.left = data.left;
        denSnake.style.top = data.top;
        denSnake.style.opacity = 1;
        denSnake.style.zIndex = 13;
        denSnake.name = data.name;
        denSnake.color = data.color;
        denSnake.score = 0;
        denSnakes[data.id] = denSnake;
        trf(myloc, agpu);
        loch.appendChild(denSnake);
      }
    }
    // Setup leaderboard.

  denLbh = document.createElement("div");
  denLbh.className = "nsi";
  denLbh.setAttribute('id', 'leaderboardTag');
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
  denLbs.setAttribute('id', 'leaderboardScores');
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
  var sortedSnakes = [];
  denLbs.innerHTML = '';

  for (var denSnakeId in denSnakes) {
    if (!denSnakes.hasOwnProperty(denSnakeId)) {
      continue;
    }
    var denSnake = denSnakes[denSnakeId];
    sortedSnakes.push([denSnake, denSnake.score]);
  }
  sortedSnakes.sort(function(a, b) {
    return b[1] - a[1]
  })

  for (var idx in sortedSnakes) {
    var denSnake = sortedSnakes[idx][0];
    var rank = 1 + parseFloat(idx);
    var rankText = '# ' + rank + '    ';
    scores += '<span style="opacity:.7; color:' + denSnake.color + ';">' + rankText + denSnake.name + ': ' + denSnake.score + "</span><BR>";
  }
  denLbs.innerHTML = scores;
}

updateUi = function() {
  if (!connected) {
    denReset();
    clearInterval(denPeriodic);
  } else {
    updateLocation();
    updateLeaderboard();
  }
}


denPeriodic = denSetup();
