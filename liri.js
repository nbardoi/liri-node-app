require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var input = "";

nodeArgs = process.argv;

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 &&  i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
    } else {
        input += nodeArgs[i];
    }
}

switch(command) {
    case 'concert-this':

    break;

    case 'spotify-this-song':

    break;

    case 'movie-this':

    break;

    case 'do-what-it-says':

    break;
};


