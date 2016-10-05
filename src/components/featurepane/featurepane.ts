import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import { JSONP_PROVIDERS }  from 'angular2/http';
import {Feature} from '../commons';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {WikipediaService} from "./wikipedia.service";

@Component({
    selector: 'feature-pane',
    template: require('./featurepane.html'),
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./featurepane.scss')],
    providers:[JSONP_PROVIDERS, MapService, NominatimService, WikipediaService],
    directives: [NgClass]
})
export class FeaturePaneComponent {
    selectedFeature:Feature;
    isLoading:boolean = false ;

    @Input()
    set feature(feature: Feature) {
        if (feature) {
            this.selectedFeature = feature;
            this.fetchFeatureInfo();
        }
    }

    constructor(private _mapService: MapService, private _nominatimService: NominatimService, private _wikipediaService: WikipediaService) {
    }



    fetchFeatureInfo() {
        this.isLoading = true;
        this._mapService.fetchFeatureFromOsm(this.selectedFeature.feature_type, this.selectedFeature.osm_id).subscribe((response) => {

            this.isLoading = false;

            if(response.elements.length > 0) {
                this.selectedFeature.tags = response.elements[0].tags;
                if ('wikipedia' in this.selectedFeature.tags) {
                    var parts = this.selectedFeature.tags.wikipedia.split(':');
                    this._wikipediaService.getMainImageUrl(parts[0], parts[1]).subscribe((response) => {
                        this.selectedFeature.wikipedia_image_url = response;
                    });
                }
            }
            else {
                this.isLoading = false;
            }
        });
    }



}
