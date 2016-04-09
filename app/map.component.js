System.register(['angular2/core', './featurepane.component'], function(exports_1, context_1) {
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
    var core_1, featurepane_component_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (featurepane_component_1_1) {
                featurepane_component_1 = featurepane_component_1_1;
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent() {
                }
                MapComponent.prototype.ngOnInit = function () {
                    mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza29ucmFkIiwiYSI6ImNpaDVjYWh0ZTAwMDZ2OG0zdDBpbnlscGEifQ.QpmEYQHokgr9m8N2c77s7w';
                    this.map = new mapboxgl.Map({
                        container: 'map',
                        style: "/src/map-styles/streets-v8.json",
                        center: [0, 30],
                        zoom: 2,
                        interactive: true
                    });
                };
                MapComponent = __decorate([
                    // Magic
                    core_1.Component({
                        selector: 'my-map',
                        template: "\n            <mapbox-gl-map style=\"map-styles/streets-v8.json\"></mapbox-gl-map>\n            <div id=\"map\"></div>\n            <feature-pane></feature-pane>\n            ",
                        directives: [featurepane_component_1.FeaturePaneComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MapComponent);
                return MapComponent;
            }());
            exports_1("MapComponent", MapComponent);
        }
    }
});
//# sourceMappingURL=map.component.js.map