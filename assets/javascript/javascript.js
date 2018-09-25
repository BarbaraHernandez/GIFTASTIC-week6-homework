//variables
var dogBreed;
var topics = ["pug", "corgi","shiba inu","pomeranian","french bulldog", "chihuahua", "dachshund"];

for (i=0; i < topics.length; i++){
    dogBreed = topics[i];
    $("#button-bar").append("<button>" + dogBreed + "</button>");
}

$("button").on("click", function getGif(){

    $("#gif-box").empty();

    var dog = $(this).text();

    //create link to query
    //something about this is not working. I am getting GIFs but dog is not working
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=skroQi8RIIYW717TOet3Fnqg1j33oYuY&limit=10";

    //define AJAX request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        //use data from request
        .then(function(response){
            console.log(queryURL);
            console.log(response);
            var results = response.data;

            //loop through resulting GIFs, creating html elements
            for (var i =0; i < results.length; i++){
                var gifDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var dogGif = $("<img>");
                dogGif.attr("data-still", results[i].images.fixed_height_small_still.url);
                dogGif.attr("data-animate", results[i].images.fixed_height_small.url);            
                dogGif.attr("src", results[i].images.fixed_height_small_still.url);//load still gif by default
                dogGif.attr("data-state", "still");
                gifDiv.append(rating);
                gifDiv.append(dogGif);
                $("#gif-box").prepend(gifDiv);//pushes populated gif div to DOM
            }
        });

    
});

$(document).on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log($(this).src);
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$("#submit").on("click", function (){
    var newDog = $("#user-input").val().trim();
    console.log(newDog);
    topics.push(newDog);
})

