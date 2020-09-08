# Step Step Recollection

## General Info

A workout tracking API for rhythm game players, built using Express/MongoDB/Node.js

This is a work in progress. General CRUD functionality, authentication, and some basic permissions are implemented, but expect some rough edges.

Initial support is primarily for DDR-styled games (as soon as I have sessions up and running I'll be playtesting this on my Stepmania setup), but the overall design is aimed to be game agnostic. The song and release models support pads of any panel number, and while their scaling parameter was built for conversion between games (pre- and post-X DDR scaling, mostly), it loosely corresponds to series. It could feasibly be modified to support other game types, provided you have a dataset of songs that you can feed into it.

For the UI, see [https://github.com/chaosharmonic/step-step-recollection-react](step-step-recollection-react). 
For the seeder and simfile scraping tools, see [https://github.com/chaosharmonic/step-step-recollection-scripts](step-step-recollection-scripts). 

## Setup

To run this project, you need Node.js and MongoDB installed.

Once you have that squared away:

* cd into the source directory and install project dependencies using `npm install` or your alternative package manager of choice.
* Create a `.env` file using the example in the root folder. Leave the variables as is for local MongoDB installs, or add a relevant remote URL and port otherwise. (You can also use this to change the port the Express server runs on.)
* `npm start`. Nodemon is installed as a dev dependency, so the server will hot reload.
