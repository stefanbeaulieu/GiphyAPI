var topics =["Family Guy", "The Simpsons", "Johnny Bravo", "Pokemon", "DBZ"];

function displayTopic() {
    // creates the "p" variable to create the person and read the data

    var topic = $(this).attr('data-name');

    console.log(topic);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

    $.ajax({url: queryURL, method: 'GET'}).done(function(response){

      var results = response.data;

      console.log(response);

      for(var i=0; i < 10; i++){
        if(results[i].rating == "r"  || results [i].rating  == "pg-13"){

        }else {
          var gifDiv = $('<div>');

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gifImage = $('<img>');

          gifImage.attr('src', results[i].images.fixed_height.url);
          gifImage.attr('data-still', results[i].images.original_still.url);
          gifImage.attr('data-animate', results[i].images.original.url);
          gifImage.attr('data-state', 'still');
          gifImage.addClass('gif'); // Added a class

          gifDiv.append(p);
          gifDiv.append(gifImage);

          $('#gifBox').prepend(gifDiv);



          // var gif = $('<img>');
          // gif.attr('src', results[i].embed_url);
          //
          // $('#gifBox').append(gif);
        }

      }
      $('.gif').on('click', function(){

          var state = $(this).attr('data-state');

          if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
          } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
          }
      });

   }); // ends .done function

 } // ends displayTopic function

function renderButtons(){

	$('#subBox').empty();

	// Loops through the array of topics
	for (var i = 0; i < topics.length; i++){

		// Then dynamicaly generates buttons for each topic in the array

		// Note the jQUery syntax here...
	    var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('addTopic topics btn btn-info'); // Added a class
	    a.attr('data-name', topics[i]); // Added a data-attribute
	    a.text(topics[i]); // Provided the initial button text
	    $('#subBox').append(a); // Added the button to the HTML
	}
}



 	// ========================================================

 	// This function handles events where one button is clicked
 	$('.addTopic').on('click', function(){

 		// This line of code will grab the input from the textbox
 		var topic = $('#topic-input').val().trim();

 		// The topic from the textbox is then added to our array
 		topics.push(topic);

 		// Our array then runs which handles the processing of our topic array
 		renderButtons();

 		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
 		return false;

  });

 // Generic function for displaying the movieInfo
 $(document).on('click', '.addTopic', displayTopic);

renderButtons();
