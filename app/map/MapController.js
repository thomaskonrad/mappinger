'use strict';

var mapControllers = angular.module('mapControllers', []);

var map = null;

mapControllers.controller('MapCtrl',['$scope', '$http',
    function($scope, $http) {
        $scope.searchTerm = null;
        $scope.searchResults = [];

        $scope.$on('$viewContentLoaded', function() {
            mapboxgl.accessToken = config.mapboxAccessToken;

            map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
                center: [16.37186, 48.20797], // starting position
                zoom: 5, // starting zoom,
                interactive: true
            });

            map.addControl(new mapboxgl.Navigation());

            map.on('click', function(e) {
                map.featuresAt(e.point, {radius: 30}, function(err, features) {
                    if (err) throw err;
                });
            });
        });

        $scope.search = function(query) {
            var mapCenter = map.getCenter();

            return $http({
                method: 'GET',
                url: 'http://photon.komoot.de/api/',
                params: {
                    q: query,
                    limit: 10,
                    lon: mapCenter.lng,
                    lat: mapCenter.lat
                }
            }).then(function successCallback(response) {
                console.log(response);
                return response.data.features;
            }, function errorCallback(response) {
                // TODO: Handle the failure.
            });
        };

        $scope.onSelect = function($item) {
            map.flyTo({
                center: $item.geometry.coordinates,
                zoom: 14,
                speed: 3
            });
        };
    }
]);
