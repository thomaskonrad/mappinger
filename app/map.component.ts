import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {FeaturePaneComponent} from './featurepane.component';

declare var mapboxgl:any; // Magic

@Component({
    selector: 'my-map',
    template: `
            <mapbox-gl-map style="map-styles/streets-v8.json"></mapbox-gl-map>
            <div id="map"></div>
            <feature-pane></feature-pane>
            `,
    directives: [FeaturePaneComponent]
})
export class MapComponent implements OnInit {
    public map;


    constructor() {

    }

    ngOnInit() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFza29ucmFkIiwiYSI6ImNpaDVjYWh0ZTAwMDZ2OG0zdDBpbnlscGEifQ.QpmEYQHokgr9m8N2c77s7w';

        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: "/src/map-styles/streets-v8.json", //stylesheet location
            center: [0, 30], // starting position
            zoom: 2, // starting zoom,
            interactive: true
        });

    }

}
