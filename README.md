# X'mas Game

![Photo Gallery App Demo](/assets/xmas-game-demo.jpg)
This is my first project from the Ironhack coding bootcamp. It is a christmas themed run-and-jump game.

The goal of this project is to practice JavaScript syntax and Object-oriented programming (OOP).

You can play the game on my deployment page: [X'mas Game](https://shanwong29.github.io/Xmas-game/).

## Run Locally

<!-- Since there are preloaded image and sound files in the project, a local server is needed to run the html file.
If you use Visual Studio Code, there is an extention called [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) which does the setup of the local server for you.
Alternatively, you can set up the local server by following the [instruction from p5.js](https://github.com/processing/p5.js/wiki/Local-server)-->

1. Clone the repository

```
git clone https://github.com/shanwong29/Xmas-game.git

```

2. Make sure you have [`Docker`](https://www.docker.com/) installed

3. Build a docker image and run the docker container by using the following commands

```
cd Xmas_Game/
docker build -t xmas-game:latest .
docker run -p 8080:80 -d xmas-game:latest
```

4. You can then run the game locally on http://localhost:8080/

## Built with

- JavaScript
- [p5.js](https://p5js.org/)

## Acknowledgments

Special thanks to my teacher Montasar, all the teaching assistants, and all the following artists for their amazing work:

- santa and deer - Illustration 33572198 © Christos Georghiou - Dreamstime.com
- coins - Illustration 1095396236 © MicroOne - shutterstock.com
- gifts - Illustrated by [Shona Dutta](https://dribbble.com/shonachica)
- background - Illustrated by [Ariana](https://dribbble.com/aristravelsphere)
