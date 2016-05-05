import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {SearchComponent} from './search.component';
import {SearchResult} from './search.service';
import {FeaturePaneComponent} from './featurepane.component';
import {Config} from './config';
import {Feature} from './feature';
import {IpGeolocationService} from './ip-geolocation.service';

declare var mapboxgl:any; // Magic

@Component({
    selector: 'my-map',
    template: `
            <mapbox-gl-map style="map-styles/streets-v8.json"></mapbox-gl-map>
            <div id="map"></div>
            <feature-pane
                [feature]="selectedFeature">
            </feature-pane>
            <search
                (onSelected)="onSelected($event)">
            </search>
            `,
    styles: [`
        #map {
            position:absolute;
            top:0;
            bottom:0;
            left: 0;
            right: 0;
        }
        `],
    directives: [SearchComponent, FeaturePaneComponent]
})
export class MapComponent implements OnInit {
    public map;
    selectedFeature:Feature;

    constructor(private _ipGeolocationService:IpGeolocationService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = Config.mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: "/src/map-styles/streets-v8.json", //stylesheet location
            center: [0, 30], // starting position
            zoom: 2, // starting zoom,
            interactive: true
        });

        this._ipGeolocationService.getIpGeolocation().subscribe((result) => {
            this.map.flyTo({
                center: result,
                zoom: 11,
                speed: 3
            });
        });
    }

    onSelected(searchResult: SearchResult) {
        console.log("event received: " + searchResult);

        let feature = new Feature();

        feature.feature_type = searchResult.osm_type;
        feature.osm_id = searchResult.osm_id;
        feature.name = searchResult.name;

        this.selectedFeature = feature;
      }

}
