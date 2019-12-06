require("dotenv").config();

// VARS
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

//
var command = process.argv[2];
var input = process.argv.slice(3).join("+");;

userInputs(command, input);

function userInputs(command, input) {
    switch(command) {
        
        case 'concert-this':
            concertInfo(input);
        break;

        case 'spotify-this-song':
            spotifyInfo(input);
        break;

        case 'movie-this':
            movieInfo(input);
        break;

        case 'do-what-it-says':
            doWhatInfo();
        break;

        default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    };
};


function concertInfo(input) {

    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    // console.log(queryURL);

    axios.get(queryURL)
    .then(function(response) {
        // console.log(response.data)

        var concerts = response.data;

            for (var i = 0; i < concerts.length; i++) {

                var dateTime = new Date(concerts[i].datetime);
                var dateOfEvent = moment.utc(dateTime).format('MM/DD/YYYY')

                console.log("Venue Name: " + concerts[i].venue.name);
                console.log("\nVenue Location: " + rconcerts[i].venue.city);
                console.log("\nDate of the Event: " + dateOfEvent);
                console.log("-------------------------------------")
            }
    })
    
    .catch(function(err) {
            console.log(err);
    });
};

function spotifyInfo(input) {

    if(!input){
        input = "The Sign";
    }

    spotify
    .search({ type: 'track', query: input })
    .then(function(response) {
        // console.log(response.tracks.items);

        var songs = response.tracks.items;

            for (var i = 0; i < songs.length; i++) {

            console.log("Artist(s): " +  songs[i].artists[0].name)
            console.log("\nSong Name: " + songs[i].name)
            console.log("\nPreview Song: " + songs[i].preview_url)
            console.log("\nAlbum: " + songs[i].album.name)
            console.log("-------------------------------------")
        }
    })

    .catch(function(err) {
        console.log(err);
    });

};

function movieInfo(input) {

    if(!input){

        input = "Mr.Nobody";

        console.log("\nIf you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("\nIt's on Netflix!");
    }

    var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL)
    .then(function(response) {
        // console.log(response.data)

        var movieInfo = response.data;

        console.log("\nTitle: " + movieInfo.Title);
        console.log("\nRelease Year: " + movieInfo.Year);
        console.log("\nRating: " + movieInfo.imdbRating);
        console.log("\nRotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        console.log("\nCountry of Production: " + movieInfo.Country);
        console.log("\nLanguage: " + movieInfo.Language);
        console.log("\nPlot: " + movieInfo.Plot);
        console.log("\nActors: " + movieInfo.Actors);
        console.log("-------------------------------------")
    })

    .catch(function(err) {
            console.log(err);
    });
};

function doWhatInfo() {

    fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }
    
    var dataArr = data.split(",");
    
    userInputs(dataArr[0], dataArr[1]);
      
    });

};