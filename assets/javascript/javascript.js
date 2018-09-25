$(document).ready(function(){ 
    
    //variables
    
    var topics = ["pug", "corgi","shiba inu","pomeranian","french bulldog", "chihuahua", "dachshund"];


    //for loop to create buttons
    function createButtons(){
        $("#button-bar").empty();

        for (i=0; i < topics.length; i++){
            dogBreed = topics[i];
            $("#button-bar").append("<button>" + dogBreed + "</button>");
        }
    }

    createButtons();

    //event listener to pull GIFs 
    $("button").on("click", function getGif(){

        console.log("clicked a button");

        $("#gif-box").empty();

        var dog = $(this).text();

        //create link to query
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
                    dogGif.attr("class", "gif");
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

    $(document).on("click", ".gif", function() {
        console.log("clicked a gif");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#submit").on("click", function (event){ //works, but then buttons don't pull GIFs
        event.preventDefault();
        var newDog = $("#user-input").val().trim();
        console.log(newDog);
        topics.push(newDog);
        createButtons();
    })

    
});
