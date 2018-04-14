 require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require("fs");


var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
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

  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, 
function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {


    }
 
    console.log(data);
});


var pick = function(caseData, functionData){
  switch(caseData){
    case 'my-tweets':
        getMyTweets();
        break;

        case "spotify-this-song":
        spotifyThis(content);
        break;

    default:
    console.log('LIRI doesnt know that ! ');    
  }
}

var runThisStuff = function(argOne, argTwo){
  pick(argOne, argTwo);
};

runThisStuff(process.argv[2], process.argv[3]);

