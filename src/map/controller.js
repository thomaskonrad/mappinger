'use strict';

var mapControllers = angular.module('mapControllers', []);

var map = null;

mapControllers.controller('MapCtrl',  ['$scope', '$http', 'mapService', 'wikipediaService', 'nominatimService', 'ipGeolocationService', '$moment',
    function($scope, $http, mapService, wikipediaService, nominatimService, ipGeolocationService, $moment) {
        $scope.searchTerm = null;
        $scope.searchResults = [];
        $scope.featurePaneVisible = false;
        $scope.selectedFeature = null;

        $scope.init = function() {
            ipGeolocationService.getIpGeolocation(1000).then(function(result) {
                $scope.$broadcast('setMapCenter', {
                    center: result,
                    zoom: 11
                });
            });
        };

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

                    $scope.$broadcast('setMarker', mapService.getCenterCoordinates(data));

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

                    if (data.tags.opening_hours) {
                        nominatimService.reverseGeocode(data.lat, data.lon).then(function(result) {
                            var oh = new opening_hours(data.tags.opening_hours, result);
                            data.opening_hours = {};
                            data.opening_hours.state = oh.getState();

                            var nextChangeIn = $moment(oh.getNextChange()).fromNow();
                            data.opening_hours.next_change = nextChangeIn;

                            data.opening_hours.next_change_date = oh.getNextChange();
                        });
                    }

                    $scope.selectedFeature = data;
                    $scope.featurePaneVisible = true;
                });
        };


        $scope.init();
    }
]);
