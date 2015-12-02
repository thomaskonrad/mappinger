mappingerApp.directive('mapboxGlMap', function(){
    return {
        scope: true,
        restrict: 'AE',
        replace: true,
        template: '<div id="map" ng-click="mapClicked($event)"></div>',
        link: function($scope, $elem, $attrs) {
            mapboxgl.accessToken = config.mapboxAccessToken;

            $scope.map = new mapboxgl.Map({
                container: 'map', // container id
                style: $attrs.style, //stylesheet location
                center: [16.37186, 48.20797], // starting position
                zoom: 15, // starting zoom,
                interactive: true
            });

            $scope.map.addControl(new mapboxgl.Navigation());

            $scope.mapClicked = function($event) {
                if (!drag) {
                    $scope.map.featuresAt($event, {radius: 30}, function(err, features) {
                        if (err) throw err;

                        if (features.length > 0) {
                            var feature = features[0];

                            console.log(features[0]);

                            $scope.$emit('featureSelected', feature);
                        } else {
                            console.log("Error");
                        }
                    });
                }
            };

            $scope.$on('setMapCenter', function(event, position) {
                $scope.map.flyTo({
                    center: position.center,
                    zoom: position.zoom,
                    speed: 3
                });
            })
        }
    };
});
