import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Feature} from '../../commons';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {WikipediaService} from "./wikipedia.service";
import {PresetsService} from './presets.service';
import {SimpleOpeningHours} from '../../lib/simple-opening-hours';

@Component({
    selector: 'feature-pane',
    template: require('./featurepane.html'),
    styles: [require('!raw-loader!autoprefixer?browsers=last 2 versions!sass-loader!./featurepane.scss')],
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
        route: ActivatedRoute,
        private _mapService: MapService,
        private _nominatimService: NominatimService,
        private _wikipediaService: WikipediaService,
        private _presetsService: PresetsService
    ) {
        route.params.subscribe( (p) => {
            // The place ID looks like "w212496461-Stephansdom". Partition it in "w", "212496461", and "Stephansdom".
            let id:string = p['id'];

            // Split the string at the first occurrence of "-".
            let parts:Array<string> = id.split(/-(.+)/);
            let nodeTypeAndId = parts[0]; // "w212496461"
            let nodeName = parts[1]; // Stephansdom

            let nodeType:string = nodeTypeAndId.substring(0, 1); // "w"
            let nodeId:number = parseInt(nodeTypeAndId.substring(1, id.length)); // 212496461

            // Check whether the node type and OSM ID are valid (name is optional).
            if (['n', 'w', 'r'].indexOf(nodeType) > -1 && !isNaN(nodeId)) {
                // Create a Feature object and call the method to fetch the place info from OSM.
                this.selectedFeature = new Feature();
                this.selectedFeature.feature_type = Feature.getFeatureTypeBySingleLetter(nodeType);
                this.selectedFeature.osm_id = nodeId;
                this.selectedFeature.name = nodeName;

                this.fetchFeatureInfo();
            } else {
                // Invalid place ID. Fail silently for now.
            }
        })
    }

    fetchFeatureInfo() {
        this.isLoading = true;
        this._mapService.fetchFeatureFromOsm(this.selectedFeature.feature_type, this.selectedFeature.osm_id).subscribe((response) => {

            this.isLoading = false;

            if(response.elements.length > 0) {
                this.selectedFeature.name = response.elements[0].tags.name;

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

                if (preset) {
                    this.selectedFeature.preset_name = preset.data.name;
                }

                if (this.selectedFeature.tags.opening_hours) {
                    this.selectedFeature.hasOpeningHours = true;
                    let oh = new SimpleOpeningHours(this.selectedFeature.tags.opening_hours);
                    this.selectedFeature.nowOpen = oh.isOpenNow();
                    this.selectedFeature.openingHoursToday = oh.getOpeningHoursToday();

                }
            }
            else {
                this.isLoading = false;
            }
        });
    }



}
