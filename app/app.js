'use strict';

var mappingerApp = angular.module('mappingerApp', [
    'ngRoute',
    'mapControllers',
    'ui.bootstrap'
]);

mappingerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/map', {
            templateUrl: 'map/map.html',
            controller: 'MapCtrl',
            css: 'map/map.css'
        }).
        otherwise({
            redirectTo: '/map'
        });
    }]);

// This lets us configure individual CSS files per route (see above).
mappingerApp.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

// Detect dragging. We need to do this in order to distinguish between click and drag events on the map.
var drag = false;
angular.element(document).bind('mousedown', function(e) {
    drag = false;
    var x = e.clientX;
    var y = e.clientY;

    angular.element(document).bind('mousemove', function(e) {
        if (Math.abs(e.clientX - x) || Math.abs(e.clientY - y) > 1)
            drag = true;
    });
});
angular.element(document).bind('mouseup', function() {
    angular.element(document).unbind('mousemove');
    angular.element('body').removeClass('disableSelect');
});
