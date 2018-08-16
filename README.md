Conway's Game of Life
===========================

This is a simple simulation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) and is a fork of the original at charlee/react-gameoflife.

I've adapted it to call an imaginary API (by default at http://localhost:8080) that should expose endpoints to create a new game, toggle cells and return the next generation of the game.

The idea is that implementing these small services can become a language independent kata. 

## How to Run

Simply run `npm install` then `npm start`. A webpage will show in the browser.
Click the board to setup the initial state, or use Random button to randomize the board.
Then click "Run" button to see the iterations.

## Caveats

The error handling that I've implemented is almost non-existent. That means if the API isn't available or does something weird the code will likely fall over.

