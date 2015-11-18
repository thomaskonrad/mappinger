'use strict';

var mapControllers = angular.module('mapControllers', []);

mapControllers.controller('MapCtrl',['$scope',
    function($scope, MAPBOX_ACCESS_TOKEN) {
        $scope.$on('$viewContentLoaded', function() {
            mapboxgl.accessToken = config.mapboxAccessToken;

            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
                center: [-74.50, 40], // starting position
                zoom: 9 // starting zoom
            });

            map.addControl(new mapboxgl.Navigation());

            map.on('click', function(e) {
                map.featuresAt(e.point, {radius: 30}, function(err, features) {
                    if (err) throw err;
                    console.log(features);
                });
            });
        });
    }
]);
