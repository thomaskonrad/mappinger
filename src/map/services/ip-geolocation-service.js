mappingerApp.service('ipGeolocationService', ['$http', function($http) {
    // TODO: Write a test for this!

    this.getIpGeolocation = function(timeout) {
        // Set the default timeout to 10 seconds
        timeout = typeof timeout !== 'undefined' ? timeout : 10000;

        return $http({
            method: 'GET',
            url: 'http://myexternalip.com/json',
            timeout: timeout
        }).then(
            function(response) {
                //
                return $http({
                    method: 'GET',
                    url: 'https://geoip.thomaskonrad.at/json/' + response.data.ip
                }).then(
                    function(response) {
                        return [response.data.longitude, response.data.latitude];
                    }
                );
            }
        );
    }
}]);
