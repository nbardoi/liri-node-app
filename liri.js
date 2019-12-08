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
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says\n");
    };
};


function concertInfo(input) {

    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    // console.log(queryURL);

    axios.get(queryURL)
    .then(function(response) {
        // console.log(response.data)

        var concerts = response.data;

        console.log("\n------------------CONCERT INFO for " + concerts[0].lineup[0] + "-------------------")
        fs.appendFileSync("log.txt", "\n------------------CONCERT INFO for " + concerts[0].lineup[0] + "-------------------")

            for (var i = 0; i < concerts.length; i++) {

                var dateTime = new Date(concerts[i].datetime);
                var dateOfEvent = moment.utc(dateTime).format('MM/DD/YYYY');
                
                console.log("\n"); 
                console.log(i);
                console.log("Venue Name: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.city);
                console.log("Date of the Event: " + dateOfEvent);
                console.log("--------------------------------------------");

                fs.appendFileSync("log.txt", "\n");
                fs.appendFileSync("log.txt", "\n" + i);
                fs.appendFileSync("log.txt", "\nVenue Name: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "\nVenue Location: " + concerts[i].venue.city);
                fs.appendFileSync("log.txt", "\nDate of the Event: " + dateOfEvent);
                fs.appendFileSync("log.txt", "\n--------------------------------------------");
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

        console.log("\n--------------------SONG INFO for " + input + "--------------------");
        fs.appendFileSync("log.txt", "\n--------------------SONG INFO for " + input + "--------------------")
        
            for (var i = 0; i < songs.length; i++) {

            console.log("\n"); 
            console.log(i);
            console.log("Artist(s): " +  songs[i].artists[0].name);
            console.log("Song Name: " + songs[i].name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("--------------------------------------------");

            fs.appendFileSync("log.txt", "\n"); 
            fs.appendFileSync("log.txt", "\n" + i);
            fs.appendFileSync("log.txt", "\nArtist(s): " +  songs[i].artists[0].name)
            fs.appendFileSync("log.txt", "\nSong Name: " + songs[i].name)
            fs.appendFileSync("log.txt", "\nPreview Song: " + songs[i].preview_url)
            fs.appendFileSync("log.txt", "\nAlbum: " + songs[i].album.name)
            fs.appendFileSync("log.txt", "\n--------------------------------------------")
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

        console.log("\n");
        console.log("--------------------MOVIE INFO--------------------")
        console.log("Title: " + movieInfo.Title);
        console.log("Release Year: " + movieInfo.Year);
        console.log("Rating: " + movieInfo.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        console.log("Country of Production: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Actors: " + movieInfo.Actors);
        console.log("Plot: " + movieInfo.Plot);
        console.log("---------------------------------------------")

        fs.appendFileSync("log.txt", "\n");
        fs.appendFileSync("log.txt", "\n--------------------MOVIE INFO--------------------")
        fs.appendFileSync("log.txt", "\nTitle: " + movieInfo.Title);
        fs.appendFileSync("log.txt", "\nRelease Year: " + movieInfo.Year);
        fs.appendFileSync("log.txt", "\nRating: " + movieInfo.imdbRating);
        fs.appendFileSync("log.txt", "\nRotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
        fs.appendFileSync("log.txt", "\nCountry of Production: " + movieInfo.Country);
        fs.appendFileSync("log.txt", "\nLanguage: " + movieInfo.Language);
        fs.appendFileSync("log.txt", "\nActors: " + movieInfo.Actors);
        fs.appendFileSync("log.txt", "\nPlot: " + movieInfo.Plot);
        fs.appendFileSync("log.txt", "\n---------------------------------------------")
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