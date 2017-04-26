$(document).on('click', 'a.back', function(){
    parent.history.back();
    return false;
});

$(document).on('keyup', '.search-inp', function(){
    findMovie($(this).val(), loadData);
});

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function findMovie(movie, callback) {
    $.ajax({
        method: "GET",
        dataType: 'jsonp',
        data: { t: movie },
        url: "http://www.omdbapi.com/?y=&plot=short%20&r=json",
        success: function(data) { callback(data); }
    });
}

function loadData(data) {
    $('.search-result ').hide();
    if(data.Response == "True") {
        showMovie(data);
        $('.search-result ').show();
    }
}

function showMovie(data) {
    $('.md-title').text(data.Title + " (" + data.Year + ")");
    $('.md-info').text(data.Runtime + " | " + data.Genre);
    $('.md-director').text(data.Director);
    $('.md-writer').text(data.Writer);
    $('.md-actors').text(data.Actors);
    $('.md-plot').text(data.Plot);
    if(data.Poster != "N/A") {
        $('.floatImg').attr("src", data.Poster);
    } else {
        $('.floatImg').removeAttr("src");
    }
}