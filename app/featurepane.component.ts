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
    styles: [`
    #feature-pane {
        position: absolute;
        z-index: 99;
        left: 0;
        top: 0;
        bottom: 0;
        width: 380px;
        background-color: rgba(34,34,34,0.9);
        color: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.33);
        transition: opacity 1s ease-out;
    }

    .feature-head {
        position: relative;
        height: 33vh;
        min-height: 200px;
        width: 100%;
        margin-bottom: 20px;
        overflow: auto;
        background-color: #CCBF15;
    }

    .feature-title-wrapper {
        position: absolute;
        bottom: 0px;
        padding: 20px;
        width: 100%;
        z-index: 2;
        overflow: hidden;
        background: rgba(0,0,0,0);
        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,0)), color-stop(100%, rgba(0,0,0,0.65)));
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
        background: -o-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
        background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000', GradientType=0 );
    }

    .feature-title-wrapper h1 {
        text-shadow: 2px 1px 2px rgba(0,0,0,0.3);
    }

    .feature-image {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;

        /* stuff for animation: */
        opacity: 1;
        display: block !important; /* yes, important */
        -webkit-transition: 1s linear all;
        -moz-transition: 1s linear all;
        -o-transition: 1s linear all;
        transition: 1s linear all;
    }

    .feature-image.ng-hide {
        opacity: 0;
    }

    .feature-image-inner {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
`]
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
