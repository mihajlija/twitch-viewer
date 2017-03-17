var api = "https://api.twitch.tv/kraken/channels/";
var callback = "?callback=?";
var streams = ["esl_csgo", "360chrism", "esl_bida", "freecodecamp", "RobotCaleb", "terakilobyte", "OgamingSC2", "brunofin", "ESL_SC2", "reverbgames"];


// iterating through predefined array of users
for (var i = 0; i < streams.length; i++) {
  var user = streams[i];
  var apiURL = api + user + callback;

  // creating div with unique id nested within "row" element
  var id = i;
  $(".stream-container").append(
    $('<div/>', {
      'id': id,
      class: "stream"
    })
  );

  $('#' + id).append(
    $('<div/>', {
      class: 'stream__logo'
    }));

  $('#' + id).append(
    $('<div/>', {
      class: 'stream__info'
    }));
createURL(user, id);
  getTwitch(apiURL, id);
}

//sort stream array


// creating link to twitch stream from username and appending it to a div with the given id
function createURL(user, id) {

  $('#' + id).find('.stream__info').append(
    $('<div/>', {
      class: 'stream__info__link'
    }).append(
      $('<a>', {
        text: user,
        href: "http://www.twitch.tv/" + user,
        target: "_blank"
      })));

}

// getting info about streams from twitch and adding it to div with the id given in the parameter
function getTwitch(apiURL, id) {

  
  $.ajax({
    url: apiURL,
    method: "GET",
    dataType: "jsonp",
    // Passing the twitch parameters to document in case of successful request
    success: function(data) {
      
      // checking if user exists
      if (data.hasOwnProperty("error")) {

        $('#' + id).addClass("offline");

        $('#' + id).find('.stream__info').append(
          $("<div/>", {
            class: "stream__info__description",
            text: "account does not exist"
          })
        );


        // setting up profile pic
        $('#' + id).find('.stream__logo').append(
          $("<img>", {
            class: "stream__logo__img",
            src: "https://s-media-cache-ak0.pinimg.com/236x/1f/30/71/1f3071c2355c1d6a21a779614aa834c5.jpg"
          })
        );
      }

      // if the user is currently streaming
      else if (data.status != null) {

        $('#' + id).addClass("online");

        // getting info about stream
        $('#' + id).find('.stream__info').append(
          $("<div/>", {
            class: "stream__info__description description--online",
            text: data.status
          })
        );

        // setting profile pics
        $('#' + id).find('.stream__logo').append(
          $("<img>", {
            class: "stream__logo__img",
            src: data.logo
          })
        );
      }

      // if user is not streaming currently
      else {
        // setting offline message

        $('#' + id).addClass("offline");

        $('#' + id).find('.stream__info').append(
          $("<div/>", {
            class: "stream__info__description",
            text: "offline"
          })
        );

        // offline pic
        $('#' + id).find('.stream__logo').append(
          $("<img>", {
            class: "stream__logo__img",
            src: "https://s-media-cache-ak0.pinimg.com/236x/1f/30/71/1f3071c2355c1d6a21a779614aa834c5.jpg"
          })
        );

      }
    }
  });
}

$(document).ready(function() {

  $("#online").click(function() {
    $(".offline").hide( "slow" );
    $(".online").show();
    $("#online").addClass("active");
    $("#all").removeClass("active");
    $("#offline").removeClass("active");
  });

  $("#offline").click(function() {
    $(".online").hide( "slow" );
    $(".offline").show();
    $("#offline").addClass("active");
    $("#all").removeClass("active");
    $("#online").removeClass("active");
  });

  $("#all").click(function() {
    $(".offline").show( "slow" );
    $(".online").show("slow");
    $("#all").addClass("active");
    $("#online").removeClass("active");
    $("#offline").removeClass("active");
  });

});