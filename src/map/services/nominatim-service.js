mappingerApp.service('nominatimService', ['$http', function($http) {
    this.reverseGeocode = function(lat, lon) {
        return $http({
            method: 'GET',
            url: 'https://nominatim.openstreetmap.org/reverse',
            params: {
                format: 'json',
                lat: lat,
                lon: lon
            }
        }).then(
            function(response) {
                return response.data;
            }
        );
    };
}]);
