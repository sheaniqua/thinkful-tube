var SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var API_KEY = 'AIzaSyDJCHL7OOxDheY732RKjDBZ_7m1YW2fzOk';
var YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

function queryYouTube(searchTerm, callback) {
    var data = {
        part: 'snippet',
        key: API_KEY,
        q: searchTerm,
    }
    $.getJSON(SEARCH_URL, data, callback);
}




function displaySearchResults(data) {
    console.log(data)
    var displayElem = $('.js-results');
    data.items.forEach(function(item) {
        var elem = $('.js-result-template').children().clone();
        var watchUrl = YOUTUBE_WATCH_URL + item.id.videoId;
        var imageUrl = item.snippet.thumbnails.default.url;
        elem.find('a').attr('href', watchUrl);
        elem.find('img').attr('src', imageUrl);
        displayElem.append(elem);
    });

}

function clearResults() {
    $('.js-results').empty();
}

function handleSubmit() {
  $('#js-search-term').submit(function(event) {
    console.log("Searching")
    event.preventDefault();
    // clear out any existing results in case previous search
    clearResults();
    var query = $(event.currentTarget).find('input[name="query"]').val().trim();
    queryYouTube(query, displaySearchResults);
  });
}

$(function() {
    handleSubmit();
});
