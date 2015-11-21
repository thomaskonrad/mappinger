'use strict';

var mapControllers = angular.module('mapControllers', []);

mapControllers.controller('MapCtrl',['$scope', '$http',
    function($scope, $http) {
        $scope.searchTerm = null;
        $scope.searchResults = [];

        $scope.$on('$viewContentLoaded', function() {
            mapboxgl.accessToken = config.mapboxAccessToken;

            $scope.map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
                center: [16.37186, 48.20797], // starting position
                zoom: 5, // starting zoom,
                interactive: true
            });

            $scope.map.addControl(new mapboxgl.Navigation());

            $scope.map.on('click', function(e) {
                $scope.map.featuresAt(e.point, {radius: 30}, function(err, features) {
                    if (err) throw err;
                });
            });
        });

        $scope.search = function(query) {
            var mapCenter = $scope.map.getCenter();

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
            var latLng = [$item.geometry.coordinates[1], $item.geometry.coordinates[0]];

            $scope.map.flyTo({
                center: latLng,
                zoom: 15,
                speed: 3
            });
        };
    }
]);
