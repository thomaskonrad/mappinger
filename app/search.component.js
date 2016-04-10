System.register(['angular2/core', 'angular2/common', 'ng2-bootstrap/ng2-bootstrap', './search.service'], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1, search_service_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_searchService) {
                    this._searchService = _searchService;
                    this.autoCompleteRef = this.autoComplete.bind(this);
                    this.typeaheadLoading = false;
                    this.typeaheadNoResults = false;
                }
                SearchComponent.prototype.autoComplete = function () {
                    return this.searchResults = this._searchService.search(this.autoCompleteSearchTerm).toPromise();
                };
                SearchComponent.prototype.changeTypeaheadLoading = function (e) {
                    this.typeaheadLoading = e;
                };
                SearchComponent.prototype.changeTypeaheadNoResults = function (e) {
                    this.typeaheadNoResults = e;
                };
                SearchComponent.prototype.typeaheadOnSelect = function (e) {
                    console.log("Selected value: " + e.item.name);
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'search',
                        directives: [ng2_bootstrap_1.TYPEAHEAD_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [search_service_1.SearchService],
                        template: "\n            <div id=\"search-box\">\n\n            <input [(ngModel)]=\"autoCompleteSearchTerm\"\n              [typeahead]=\"autoCompleteRef\"\n              [typeaheadOptionField]=\"'name'\"\n              (typeaheadLoading)=\"changeTypeaheadLoading($event)\"\n              (typeaheadNoResults)=\"changeTypeaheadNoResults($event)\"\n              (typeaheadOnSelect)=\"typeaheadOnSelect($event)\"\n              [typeaheadOptionsLimit]=\"7\"\n              [typeaheadWaitMs]=\"100\"\n              placeholder=\"Search...\"\n              class=\"form-control\">\n\n               <div *ngIf=\"typeaheadLoading===true\">\n                   <i class=\"glyphicon glyphicon-refresh ng-hide\" style=\"\"></i>\n               </div>\n               <div *ngIf=\"typeaheadNoResults===true\" class=\"\" style=\"\">\n                   <i class=\"glyphicon glyphicon-remove\"></i> No Results Found\n               </div>\n\n            </div>\n            ",
                        styles: ["\n        #search-box {\n            width: 340px;\n            position: absolute;\n            left: 20px;\n            top: 20px;\n            z-index: 100;\n\n        }\n        #search-box > input {\n            font-size: 18px;\n            padding: 6px 10px;\n            font-weight: 300;\n            width: 100%;\n        }\n        #search-results {\n            position: absolute;\n            top: 55px;\n            left: 20px;\n            display: block;\n        }\n        "]
                    }), 
                    __metadata('design:paramtypes', [search_service_1.SearchService])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search.component.js.map