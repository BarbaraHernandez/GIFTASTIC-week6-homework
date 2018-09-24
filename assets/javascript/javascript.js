//variables
var dogBreed;
var myDogs = ["pug", "corgi","shiba inu","pomeranian","french bulldog", "chihuahua", "dachshund"];

for (i=0; i < myDogs.length; i++){
    dogBreed = myDogs[i];
    $("#button-bar").append("<button>" + dogBreed + "</button>");
}

$("button").on("click", function getGif(){
    var dog = $(this).text;

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
                dogGif.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(rating);
                gifDiv.append(dogGif);
                $("#gif-box").prepend(gifDiv);//pushes populated gif div to DOM
            }
        });

    
});

$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

