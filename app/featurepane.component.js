System.register(['angular2/core', './feature', './map.service', './nominatim.service'], function(exports_1, context_1) {
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
    var core_1, feature_1, map_service_1, nominatim_service_1;
    var FeaturePaneComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (feature_1_1) {
                feature_1 = feature_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (nominatim_service_1_1) {
                nominatim_service_1 = nominatim_service_1_1;
            }],
        execute: function() {
            FeaturePaneComponent = (function () {
                function FeaturePaneComponent(_mapService, _nominatimService) {
                    this._mapService = _mapService;
                    this._nominatimService = _nominatimService;
                }
                FeaturePaneComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var feature = new feature_1.Feature();
                    this._mapService.fetchFeatureFromOsm('node', 2512621735).subscribe(function (response) {
                        feature.tags = response.elements[0].tags;
                        _this.selectedFeature = feature;
                    });
                };
                FeaturePaneComponent = __decorate([
                    core_1.Component({
                        selector: 'feature-pane',
                        template: "\n<div *ngIf=\"selectedFeature\" id=\"feature-pane\">\n    <div class=\"feature-head\">\n        <div class=\"feature-title-wrapper\" >\n            <h1>{{selectedFeature.tags.name}}</h1>\n            <div ng-if=\"selectedFeature.type\" class=\"muted\">{{selectedFeature.type}}</div>\n        </div>\n\n        <div class=\"feature-image\" ng-show=\"selectedFeature.wikipediaImageUrl\">\n            <div class=\"feature-image-inner\"></div>\n        </div>\n\n    </div>\n\n    <div *ngIf=\"selectedFeature && selectedFeature.opening_hours\" class=\"opening-hours\">\n        <div ng-switch-when=\"true\" class=\"text-success\">\n            Now Open (Closing {{selectedFeature.opening_hours.next_change}} at {{selectedFeature.opening_hours.next_change_date|date : 'shortTime'}})\n        </div>\n        <div ng-switch-when=\"false\" class=\"text-danger\">\n            Now Closed (Opening {{selectedFeature.opening_hours.next_change}} at {{selectedFeature.opening_hours.next_change_date|date : 'shortTime'}})\n        </div>\n    </div>\n\n    <ul class=\"feature-tags\">\n        <li ng-if=\"selectedFeature.tags.website\">Website: <a href=\"{{selectedFeature.tags.website}}\" target=\"_blank\">{{selectedFeature.tags.website}}</a></li>\n        <li ng-if=\"selectedFeature.tags.email\">E-Mail: <a href=\"mailto:{{selectedFeature.tags.email}}\" target=\"_blank\">{{selectedFeature.tags.email}}</a></li>\n        <li ng-if=\"selectedFeature.tags.phone\">Phone: <a href=\"tel:{{selectedFeature.tags.phone}}\" target=\"_blank\">{{selectedFeature.tags.phone}}</a></li>\n    </ul>\n</div>\n",
                        styles: ["\n    #feature-pane {\n        position: absolute;\n        z-index: 99;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 380px;\n        background-color: rgba(34,34,34,0.9);\n        color: white;\n        box-shadow: 0 0 20px rgba(0,0,0,0.33);\n        transition: opacity 1s ease-out;\n    }\n\n    .feature-head {\n        position: relative;\n        height: 33vh;\n        min-height: 200px;\n        width: 100%;\n        margin-bottom: 20px;\n        overflow: auto;\n        background-color: #CCBF15;\n    }\n\n    .feature-title-wrapper {\n        position: absolute;\n        bottom: 0px;\n        padding: 20px;\n        width: 100%;\n        z-index: 2;\n        overflow: hidden;\n        background: rgba(0,0,0,0);\n        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);\n        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,0)), color-stop(100%, rgba(0,0,0,0.65)));\n        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);\n        background: -o-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);\n        background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);\n        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);\n        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=0 );\n    }\n\n    .feature-title-wrapper h1 {\n        text-shadow: 2px 1px 2px rgba(0,0,0,0.3);\n    }\n\n    .feature-image {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        z-index: 1;\n\n        /* stuff for animation: */\n        opacity: 1;\n        display: block !important; /* yes, important */\n        -webkit-transition: 1s linear all;\n        -moz-transition: 1s linear all;\n        -o-transition: 1s linear all;\n        transition: 1s linear all;\n    }\n\n    .feature-image.ng-hide {\n        opacity: 0;\n    }\n\n    .feature-image-inner {\n        background-position: center;\n        background-size: cover;\n        width: 100%;\n        height: 100%;\n    }\n"]
                    }), 
                    __metadata('design:paramtypes', [map_service_1.MapService, nominatim_service_1.NominatimService])
                ], FeaturePaneComponent);
                return FeaturePaneComponent;
            }());
            exports_1("FeaturePaneComponent", FeaturePaneComponent);
        }
    }
});
//# sourceMappingURL=featurepane.component.js.map