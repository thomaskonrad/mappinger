'use strict';

var mapControllers = angular.module('mapControllers', []);

var map = null;

mapControllers.controller('MapCtrl',  ['$scope', '$http', 'mapService',
    function($scope, $http, mapService) {
        $scope.searchTerm = null;
        $scope.searchResults = [];
        $scope.featurePaneVisible = false;
        $scope.selectedFeature = null;

        $scope.search = function(query) {
            return $http({
                method: 'GET',
                url: 'http://photon.komoot.de/api/',
                params: {
                    q: query,
                    limit: 10
                }
            }).then(function successCallback(response) {
                console.log(response);
                return response.data.features;
            }, function errorCallback(response) {
                // TODO: Handle the failure.
            });
        };

        $scope.onSelect = function($item) {
            $scope.$broadcast('setMapCenter', {
                center: $item.geometry.coordinates,
                zoom: 15
            })
        };

        $scope.$on('featureSelected', function(event, feature) {
            $scope.showFeatureDetails(feature);
        });

        $scope.showFeatureDetails = function(feature) {
            console.log(feature);
            var osmIdentifier = mapService.getFeatureTypeAndRealId(feature.properties.osm_id);

            mapService.fetchFeatureFromOsm(osmIdentifier.type, osmIdentifier.id)
                .then(function(data) {
                    console.log(data);
                    $scope.selectedFeature = data;
                });

            $scope.$apply(function() {
                $scope.selectedFeature = feature;
                $scope.featurePaneVisible = true;
            });
        }
    }
]);
