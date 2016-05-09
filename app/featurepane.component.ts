import {Component, Input} from 'angular2/core';
import {OnInit} from 'angular2/core';
import { JSONP_PROVIDERS }  from 'angular2/http';
import {Feature} from './feature';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {WikipediaService} from "./wikipedia.service";

@Component({
    selector: 'feature-pane',
    template: `
<div *ngIf="selectedFeature" id="feature-pane">
    <div class="feature-head">
        <div class="feature-title-wrapper" >
            <h1>{{selectedFeature.name}}</h1>
            <div ng-if="selectedFeature.type" class="muted">{{selectedFeature.type}}</div>
        </div>

        <div class="feature-image" ng-show="selectedFeature.wikipediaImageUrl">
            <div class="feature-image-inner"></div>
        </div>

    </div>

    <div *ngIf="selectedFeature && selectedFeature.opening_hours" class="opening-hours">
        <div ng-switch-when="true" class="text-success">
            Now Open (Closing {{selectedFeature.opening_hours.next_change}} at {{selectedFeature.opening_hours.next_change_date|date : 'shortTime'}})
        </div>
        <div ng-switch-when="false" class="text-danger">
            Now Closed (Opening {{selectedFeature.opening_hours.next_change}} at {{selectedFeature.opening_hours.next_change_date|date : 'shortTime'}})
        </div>
    </div>

    <ul *ngIf="selectedFeature && selectedFeature.tags" class="feature-tags">
        <li *ngIf="selectedFeature.tags.website">Website: <a href="{{selectedFeature.tags.website}}" target="_blank">{{selectedFeature.tags.website}}</a></li>
        <li *ngIf="selectedFeature.tags.email">E-Mail: <a href="mailto:{{selectedFeature.tags.email}}" target="_blank">{{selectedFeature.tags.email}}</a></li>
        <li *ngIf="selectedFeature.tags.phone">Phone: <a href="tel:{{selectedFeature.tags.phone}}" target="_blank">{{selectedFeature.tags.phone}}</a></li>
    </ul>
</div>
`,
    styleUrls: ['./app/featurepane.component.css'],
    providers:[JSONP_PROVIDERS, WikipediaService]
})
export class FeaturePaneComponent implements OnInit {
    selectedFeature: Feature;

    @Input()
        set feature(feature: Feature) {
            if (feature) {
                this.selectedFeature = feature;
                this.fetchFeatureInfo();
            }
        }

    constructor(private _mapService: MapService, private _nominatimService: NominatimService, private _wikipediaService: WikipediaService) {
    }

    ngOnInit() {
    }

    fetchFeatureInfo() {
        this._mapService.fetchFeatureFromOsm(this.selectedFeature.feature_type, this.selectedFeature.osm_id).subscribe((response) => {
            this.selectedFeature.tags = response.elements[0].tags;
            console.log(this.selectedFeature);
        });

        if ('wikipedia' in this.selectedFeature.tags) {
            var parts = this.selectedFeature.tags.wikipedia.split(':');
            this._wikipediaService.getMainImageUrl(parts[0], parts[1]).subscribe((response) => {
                this.selectedFeature.wikipedia_image_url = response;
            });
        }
    }

}
