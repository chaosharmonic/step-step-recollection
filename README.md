# Step Step Recordtracker

## General Info

A workout tracker (backend) for rhythm game players. (UI still in progress.) Built using Express/MongoDB/Node.js

This is a work in progress, and not production ready. CRUD functionality is implemented, but the API is still pretty skeletal, and I'm currently juggling getting a fleshed-out UI up and running, with seeding my database so that I can actually use it for more than basic HTTP requests.

Initial support is primarily for DDR-styled games (as soon as I have sessions up and running I'll be playtesting this on my Stepmania setup), but the overall design is aimed to be game agnostic. The song and release models support pads of any panel number, and while their scaling parameter was built for conversion between games (pre- and post-X DDR scaling, mostly), it loosely corresponds to series. It could feasibly be modified to support other game types, provided you have a dataset of songs that you can feed into it.

The backend is built out separately both as an exercise in building out a full MERN-stack webapp, and an implementation a variety of UIs can run on top of. (It has occurred to me that a locally-installed app would probably make more sense for this project than the client/server model, and while it's not an immediate priority it's definitely on my radar.)


## Setup

To run this project, you need a MongoDB instance, running either locally or on a cloud server.

Once you have that squared away:

* cd into the source directory and install dependencies using `npm install` or your alternative package manager of choice.
* Create a `.env` file using the example in the root folder. Leave the variables as is for local MongoDB installs, or add a relevant remote URL and port otherwise. (You can also use this to change the port the Express server runs on.)
* `npm start`. Nodemon is installed as a dev dependency, so the server will hot reload.