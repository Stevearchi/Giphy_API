var topics = ['unicorn', 'dragon', 'werewolf', 'griffon', 'chimera', 'centaur', 'cthulu'];
var queryTerm;
//loops through all buttons

function createButtons(){
    $('#buttonsArea').empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $('<button>');
    
        newButton.text(topics[i]);
        newButton.attr('data-item', topics[i]).addClass('newGiphs');
        $('#buttonsArea').append(newButton);
    };   
};


function ajaxCall(queryT) {
 
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?api_key=6wXTpBjvupFamLaB1TrFHLTB86kNnlFn&limit=10&q=' + queryT,
        method: "GET"
    }).then(function (response) {
        results = response.data;
        for (var i = 0; i < results.length; i++) {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var itemImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            itemImage.attr("src", results[i].images.fixed_height_still.url);
            itemImage.data('animate', results[i].images.fixed_height.url);
            itemImage.data('still', results[i].images.fixed_height_still.url);
            itemImage.data('state', 'still');
            // Appending the paragraph and itemImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(itemImage);

            // Prepending the gifDiv to the "#imageSection" div in the HTML
            $("#imageSection").prepend(gifDiv);

        }

    });
}

$(document).on("click", "img", function(){
    if ($(this).data('state') === 'still') {

        $(this).attr('src', $(this).data('animate')) //sets image to animate if it is currently still
        $(this).data('state', 'animate');
    } else {

        $(this).attr('src', $(this).data('still'))
        $(this).data('state', 'still');
    }
});

// button on click event
$(document).on("click", ".newGiphs", function(){
    queryT = $(this).data("item");
    ajaxCall(queryT);
});


$('#submitButton').on('click', function (event) {
    event.preventDefault();
    var newButtonVal = $('#newButton').val();
    topics.push(newButtonVal);
    createButtons();
    $('#newButton').val("");
});

createButtons();