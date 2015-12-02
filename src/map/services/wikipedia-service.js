mappingerApp.service('wikipediaService', ['$http', function($http) {
    this.getMainImageUrl = function(language, pageTitle) {
        var url = 'https://' + encodeURIComponent(language) + '.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(pageTitle) + '&prop=pageimages&pithumbsize=800&format=json&callback=JSON_CALLBACK';

        return $http.jsonp(url).then(
            function(response) {
                var pages = response.data.query.pages;
                var firstPage = pages[Object.keys(pages)[0]];
                return firstPage.thumbnail.source;
            }
        );
    };
}]);
