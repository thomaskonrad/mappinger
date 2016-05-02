import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Feature} from './feature';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {Response} from 'angular2/http';

@Component({
    selector: 'feature-pane',
    template: `
<div *ngIf="selectedFeature" id="feature-pane">
    <div class="feature-head">
        <div class="feature-title-wrapper" >
            <h1>{{selectedFeature.tags.name}}</h1>
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

    <ul class="feature-tags">
        <li ng-if="selectedFeature.tags.website">Website: <a href="{{selectedFeature.tags.website}}" target="_blank">{{selectedFeature.tags.website}}</a></li>
        <li ng-if="selectedFeature.tags.email">E-Mail: <a href="mailto:{{selectedFeature.tags.email}}" target="_blank">{{selectedFeature.tags.email}}</a></li>
        <li ng-if="selectedFeature.tags.phone">Phone: <a href="tel:{{selectedFeature.tags.phone}}" target="_blank">{{selectedFeature.tags.phone}}</a></li>
    </ul>
</div>
`,
    styleUrls: ['./app/featurepane.component.css'] 
})
export class FeaturePaneComponent implements OnInit {
    selectedFeature: Feature;

    constructor(private _mapService: MapService, private _nominatimService: NominatimService) {

    }

    ngOnInit() {
        let feature = new Feature();
        this._mapService.fetchFeatureFromOsm('node', 2512621735).subscribe((response) => {
            feature.tags = response.elements[0].tags;

            this.selectedFeature = feature;
        });
    }

}
