$(document).ready(function() {

var topics = ["Lost Girl", "Parks and Recreation", "The Office", "30 Rock", 
"Bojack Horseman", "Charmed", "Games of Thrones"];

function renderbuttons() {
  $(".buttons").empty();

for (var i=0; i < topics.length; i++)  {
  var buttons = $("<button>");
  buttons.attr("data-name",topics[i]);
  buttons.html(topics[i]);
  $(".buttons").append(buttons);  
}
}

function displayMovieinfo () {
	$(".title").empty();
  $(".showInformation").empty();
  var show = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
        }).done(function(response) {
  
          var results = response.data;
            var h2 = $("<h2>").text(show);
          $(".title").append(h2);
          

          for (var j = 0; j < results.length; j++) {
    			var div = $("<div class='item'>");
          var image = $("<img>").attr("src", results[j].images.original_still.url).attr("height", "100").attr("width", "auto");
          image.attr("data-still", results[j].images.original_still.url);
          image.attr("data-animate", results[j].images.original.url);
          image.attr("data-state", "still");
          var rating = results[j].rating;
          var p = $("<p>").text("Rating: " + rating);
          div.append(image);
          div.append(p);
          $(".showInformation").append(div);
        }  

         $("img").on("click", function() {
       		 	var state = $(this).attr("data-state");
      			if (state === "still") {
        			$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");
     			 	} 
     			 	else {
        			$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
      			}
    		});
        });
}

    $("#add-tv").on("click", function () {
    		event.preventDefault();
    		var tvShow = $("#tv-input").val().trim();
    		topics.push(tvShow);
    		$("#tv-input").val('');
        renderbuttons();
     });

renderbuttons();

$(document).on("click", "button", displayMovieinfo); 
});	




