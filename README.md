# snake-den
Group play on [slither.io](http://slither.io)


Collude while playing [slither.io](http://slither.io) by joining the same room
and sharing a minimap.

To enable, add a breakpoint which executes Javascript
(Safari browser does this well) below the line where the connection to the room
is created: `ws = new WebSocket("ws://" + bso.ip + ":" + bso.po + "/slither");`
Select `Execute Javscript` and `Continue after evaluating`
TODO(joshblum): add screenshots

In addition, start the websocket server to share the minimap with your friends
while you are in the same room.

```
make install
make run
```
