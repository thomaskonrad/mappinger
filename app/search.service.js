System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var SearchService;
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
            SearchService = (function () {
                function SearchService(_http) {
                    this._http = _http;
                }
                SearchService.prototype.search = function (searchTerm) {
                    var params = new http_1.URLSearchParams();
                    params.set('q', searchTerm);
                    params.set('lat', '48.209'); // TODO: get lat/long dynamically
                    params.set('lon', '16.372');
                    params.set('lang', 'de'); // TODO: get lang dynamically
                    // call komoot api
                    return this._http.get('https://photon.komoot.de/api/', { search: params })
                        .map(function (res) { return res.json(); })
                        .map(function (el) {
                        return el.features.map(function (feature) {
                            return ({ name: feature.properties.name, osm_id: feature.properties.osm_id });
                        });
                    });
                };
                SearchService.prototype.logError = function (err) {
                    console.error('There was an error: ' + err);
                };
                SearchService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SearchService);
                return SearchService;
            }());
            exports_1("SearchService", SearchService);
        }
    }
});
//# sourceMappingURL=search.service.js.map