'use strict';

var mapControllers = angular.module('mapControllers', []);

var map = null;

mapControllers.controller('MapCtrl',  ['$scope', '$http', 'mapService', 'wikipediaService',
    function($scope, $http, mapService, wikipediaService) {
        $scope.searchTerm = null;
        $scope.searchResults = [];
        $scope.featurePaneVisible = false;
        $scope.selectedFeature = null;

        $scope.search = function(query) {
            return $http({
                method: 'GET',
                url: 'https://photon.komoot.de/api/',
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
                zoom: 16
            });

            $scope.showFeatureDetails({
                type: mapService.getFeatureTypeByPhotonType($item.properties.osm_type),
                id: $item.properties.osm_id
            });
        };

        $scope.$on('featureSelected', function(event, feature) {
            console.log(feature);

            var osmIdentifier = mapService.getFeatureTypeAndRealId(feature.properties.osm_id);
            $scope.showFeatureDetails(osmIdentifier);
        });

        $scope.showFeatureDetails = function(osmIdentifier) {
            mapService.fetchFeatureFromOsm(osmIdentifier.type, osmIdentifier.id)
                .then(function(data) {
                    console.log(data);
                    data.geometry = function() {
                        return "point";
                    };

                    var preset = idPresets.match(data);

                    if (preset !== undefined) {
                        data.type = preset.name();
                    }

                    if (data.tags.wikipedia) {
                        var parts = data.tags.wikipedia.split(':');
                        wikipediaService.getMainImageUrl(parts[0], parts[1]).then(function(result) {
                            data.wikipediaImageUrl = result;
                        });
                    }

                    $scope.selectedFeature = data;
                    $scope.featurePaneVisible = true;
                });
        };
    }
]);
