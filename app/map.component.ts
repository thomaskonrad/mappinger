import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {SearchComponent} from './search.component';
import {SearchResult} from './search.service';
import {FeaturePaneComponent} from './featurepane.component';
import {Config} from './config';

declare var mapboxgl:any; // Magic

@Component({
    selector: 'my-map',
    template: `
            <mapbox-gl-map style="map-styles/streets-v8.json"></mapbox-gl-map>
            <div id="map"></div>
            <feature-pane
                [osm_id]="_osm_id">
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
    _osm_id:number;


    constructor() {

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
    }

    onSelected(eventData: SearchResult) {
        console.log("event received: " + eventData);
        this._osm_id = eventData.osm_id;
      }

}