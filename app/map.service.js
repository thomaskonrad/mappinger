System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var MapService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MapService = (function () {
                function MapService(_http) {
                    this._http = _http;
                }
                MapService.prototype.getFeatureTypeAndRealId = function (mapboxId) {
                    var osmIdentifier = {
                        type: null,
                        id: 0
                    };
                    if (mapboxId < 1000000000000) {
                        osmIdentifier.type = 'way';
                        osmIdentifier.id = mapboxId;
                    }
                    else if (mapboxId < 2000000000000) {
                        osmIdentifier.type = 'way';
                        osmIdentifier.id = mapboxId - 1000000000000;
                    }
                    else if (mapboxId < 3000000000000) {
                        osmIdentifier.type = 'relation';
                        osmIdentifier.id = mapboxId - 2000000000000;
                    }
                    else if (mapboxId < 1000000000000000) {
                        osmIdentifier.type = 'relation';
                        osmIdentifier.id = mapboxId - 3000000000000;
                    }
                    else {
                        osmIdentifier.type = 'node';
                        osmIdentifier.id = mapboxId - 1000000000000000;
                    }
                    return osmIdentifier;
                };
                ;
                MapService.prototype.getFeatureTypeByPhotonType = function (photonType) {
                    if (photonType == 'N') {
                        return 'node';
                    }
                    else if (photonType == 'W') {
                        return 'way';
                    }
                    else if (photonType == 'R') {
                        return 'relation';
                    }
                    else {
                        return 'postcode'; //?
                    }
                };
                MapService.prototype.getCenterCoordinates = function (data) {
                    if ("center" in data) {
                        return [data.center.lon, data.center.lat];
                    }
                    else if ("lat" in data && "lon" in data) {
                        return [data.lon, data.lat];
                    }
                };
                ;
                MapService.prototype.fetchFeatureFromOsm = function (featureType, osmId) {
                    var query = '[out:json][timeout:10];' + featureType + '(' + osmId + ');out center;';
                    var params = new http_1.URLSearchParams();
                    params.set('data', query);
                    return this._http.get('https://overpass-api.de/api/interpreter', {
                        search: params
                    }).map(function (res) { return res.json(); }); //.map(res => res.data.elements[0]);
                };
                ;
                MapService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MapService);
                return MapService;
            }());
            exports_1("MapService", MapService);
        }
    }
});
//# sourceMappingURL=map.service.js.map