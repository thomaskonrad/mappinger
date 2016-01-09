mappingerApp.service('mapService', ['$http', function($http) {
    // TODO: Write a test for this!
    this.getFeatureTypeAndRealId = function(mapboxId) {
        osmIdentifier = {
            type: null,
            id: 0
        }

        if (mapboxId < 1000000000000) {
            osmIdentifier.type = 'way';
            osmIdentifier.id = mapboxId;
        } else if (mapboxId < 2000000000000) {
            osmIdentifier.type = 'way';
            osmIdentifier.id = mapboxId - 1000000000000;
        } else if (mapboxId < 3000000000000) {
            osmIdentifier.type = 'relation';
            osmIdentifier.id = mapboxId - 2000000000000;
        } else if (mapboxId < 1000000000000000) {
            osmIdentifier.type = 'relation';
            osmIdentifier.id = mapboxId - 3000000000000;
        } else {
            osmIdentifier.type = 'node';
            osmIdentifier.id = mapboxId - 1000000000000000;
        }

        return osmIdentifier;
    };

    this.getFeatureTypeByPhotonType = function(photonType) {
        if (photonType == 'N') {
            return 'node';
        } else if (photonType == 'W') {
            return 'way';
        } else if (photonType == 'R') {
            return 'relation';
        } else {
            return 'postcode'; //?
        }
    }

    this.getCenterCoordinates = function(data) {
        if ("center" in data) {
            return [data.center.lon, data.center.lat];
        } else if ("lat" in data && "lon" in data) {
            return [data.lon, data.lat]
        }
    };

    this.fetchFeatureFromOsm = function(featureType, osmId) {
        var query = '[out:json][timeout:10];' + featureType + '(' + osmId + ');out center;';

        return $http({
            method: 'GET',
            url: 'https://overpass-api.de/api/interpreter',
            params: {
                data: query
            }
        }).then(
            function(response) {
                return response.data.elements[0];
            }
        );
    };
}]);