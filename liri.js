require("dotenv").config();

var keys = require("./keys");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var request = require('request');


var getMyTweets = function(){
    var client = new Twitter(keys.twitter);

      var params = {screen_name: 'PabonDanielle'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error){
          console.error(error);
        }
        if (!error) {
          console.log(tweets);
          for (var i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
          }
        }  
      }); 

}
var getArtistNames = function(artist){
    return artist.name;
}

var getMeSpotify = function(songName){
    spotify.search({ type: 'track', query: songName }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      } else {


      }
  
      var songs = data.tracks.items;
      for(var i=0; i<songs.length;i++){
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('--------------------------------------');
      }
  });

} 
var getMeMovie = function(movieName){

    request("https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error,response, body){
      if(!error && response.statusCode == 200){

        var jsonData = JSON.parse(body);

        console.log('Title: ' + jsonData.Title);
        console.log('Year: ' + jsonData.Year);
        console.log('Rate: ' + jsonData.Rate);
        console.log('IMDB Rating: ' + jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.Language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
        

      }
    });
}

var doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function(err, data){
      if(err) throw err;
      
      var dataArray = data.split(',');

      if(dataArray.length === 2){
        pick(dataArray[0], dataArray[1]);

      }else if(dataArray.length === 1){
        pick(dataArray[0]);
      }

    });

  }
var pick = function(caseData, functionData){
  switch(caseData){
    case 'my-tweets':
        getMyTweets();
        break;

    case 'spotify-this-song':
        getMeSpotify(functionData);
        break;
    case 'movie-this':
        getMeMovie(functionData);
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;    
    default:
    console.log('LIRI doesnt know that ! ');    
  }
}

var runThisStuff = function(argOne, argTwo){
  pick(argOne, argTwo);
};

runThisStuff(process.argv[2], process.argv[3]);

