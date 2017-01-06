import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Feature} from '../commons';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {WikipediaService} from "./wikipedia.service";
import {PresetsService} from './presets.service';

@Component({
    selector: 'feature-pane',
    template: require('./featurepane.html'),
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./featurepane.scss')],
    providers:[MapService, NominatimService, WikipediaService, PresetsService]
})
export class FeaturePaneComponent {
    selectedFeature:Feature;
    isLoading:boolean = false;
    featureType:string = 'Unknown';

    @Input()
    set feature(feature: Feature) {
        if (feature) {
            this.selectedFeature = feature;
            this.fetchFeatureInfo();
        }
    }

    constructor(
        private _mapService: MapService,
        private _nominatimService: NominatimService,
        private _wikipediaService: WikipediaService,
        private _presetsService: PresetsService
    ) {
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

                // convert address
                // TODO: write localized adress parser
                if ('addr:street' in this.selectedFeature.tags) {
                    this.selectedFeature.tags.addr_street = this.selectedFeature.tags["addr:street"];
                }

                let preset = this._presetsService.match(response.elements[0]);
                console.log(preset);

                if (preset) {
                    this.selectedFeature.type = preset.data.name;
                }
            }
            else {
                this.isLoading = false;
            }
        });
    }



}
