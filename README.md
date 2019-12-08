# **LIRI Bot**

## **Overview**

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. LIRI will search the Spotify API for songs, the Bands in Town Events API for concerts, and the OMDB API for movies. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands.
- - -

### **Instructions**

1. Open your terminal such as Bash.

2. Clone the repository

2. Run npm install, and the following packages should be installed:

    - Node-Spotify-API
    - Axios : This module will be used to get the OMDB and BandsInTown API data
    - Moment
    - DotEnv

3. Create a .env file in the same directory as the rest of the files. In the .env file should be the user's Spotify API keys:

    `# Spotify API keys`

    `SPOTIFY_ID=your-spotify-ID-here`

    `SPOTIFY_SECRET=your-spotify-secret-here`

4. Navigate to the folder that contains the liri.js file.

5. Depending on which command you run, the output will vary.
- - -

### **LIRI Functions (Commands)**

The LIRI is designed to produce search results based on the following commands and log the data to the terminal/bash window:

1. `node liri.js concert-this <artist/band name here>`
   * This will show the following information about each event in the terminal/bash:

     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

![](GIFs/concert-this.gif)

2. `node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in the terminal/bash. If no song is provided then the program will output data for "The Sign" by Ace of Base.

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

![](GIFs/spotify-this-song.gif)

3. `node liri.js movie-this '<movie name here>'`
   * This will show the following information about the movie in the terminal/bash window. If no song is provided then the program will output data for the movie 'Mr. Nobody.'.

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

![](GIFs/movie-this.gif)

4. `node liri.js do-what-it-says`
   * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to run one of LIRI’s commands.

![](GIFs/do-what-it-says.gif)

5. If the user does not correctly enter one of the 4 functions listed above a default message will be logged to the terminal/bash window.

![](GIFs/default.gif)

In addition to logging the data to the terminal/bash window, the data will output to the `log.txt` file without overwriting the contents of the file each time a command is run.
- - -

### **Technologies Used**
- Node.js
- JavaScript
- Bands In Town API (via axios npm module)
- Spotify API (via spotify npm module)
- OMDb API (via axios npm module)