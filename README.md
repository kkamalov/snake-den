# snake-den
Multiplayer [slither.io](http://slither.io).

Collude with friends while playing [slither.io](http://slither.io) by joining
the same room and sharing a minimap and scoreboard.

![shared leaderboard][shared-leaderboard]
![shared minimap][shared-minimap]


## Server Setup
Only one person in the group has to setup the server to share map and score
information.

Begin by starting the websocket server to share the minimap with your friends
while you are in the same room. You can start the server with the following
commands:

```
git clone git@github.com:kkamalov/snake-den.git && cd snake-den
make install
make run
```

## Client Setup
Once one person is running the server, you need to add some javascript to
modify the gameplay. Add a breakpoint which executes Javascript (Safari browser
does this well) following the instructions below.

1. View the source of the file `game144000.js` and add a breakpoint to the line
   shown in the screenshot. Searching for `ws://` will bring you to the right
   place.

![script name.png][script-name]
![edit source.png][edit-source]
2. Edit the breakpoint and copy the source from `client.js` in this repository.
   Don't forget to change the `config` variable appropriately. There are
   comments in the source code to help you update it.

![edit breakpoint][edit-breakpoint]
![insert code][insert-code]
3. Setup the breakpoint to `Evaluate Javascript` and `Automatically continue
   after evaluating`.

![breakpoint action][breakpoint-action]
![breakpoint options][breakpoint-options]

Have fun slithering together!

## Authors

**Kainar Kamalov**
+ [kainar.kamalov@gmail.com](mailto:kainar.kamalov@gmail.com)
+ [@kainarkamal](https://twitter.com/kainarkamal)

**Josh Blum**
+ [jblum18@gmail.com](mailto:jblum18@gmail.com)
+ [@blumua](https://twitter.com/blumua)

We largely hacked on this while at work. Come work with us
[@b12](https://b12.io/about/#/Team).

[shared-minimap]: https://github.com/kkamalov/snake-den/raw/master/screenshots/shared-minimap.png "Shared Minimap"
[shared-leaderboard]: https://github.com/kkamalov/snake-den/raw/master/screenshots/shared-leaderboard.png "Shared Leaderboard"
[script-name]: https://github.com/kkamalov/snake-den/raw/master/screenshots/script-name.png "Script Name"
[edit-source]: https://github.com/kkamalov/snake-den/raw/master/screenshots/edit-source.png "Edit Source"
[edit-breakpoint]: https://github.com/kkamalov/snake-den/raw/master/screenshots/edit-breakpoint.png "Edit Breakpoint"
[insert-code]: https://github.com/kkamalov/snake-den/raw/master/screenshots/insert-code.png "Insert Code"
[breakpoint-action]: https://github.com/kkamalov/snake-den/raw/master/screenshots/action.png "Breakpoint Action"
[breakpoint-options]: https://github.com/kkamalov/snake-den/raw/master/screenshots/options.png "Breakpoint Options"
