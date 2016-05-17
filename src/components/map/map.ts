import {Component, OnInit} from 'angular2/core';
import {SearchComponent} from '../search/search';
import {SearchResult, Coordinates} from '../commons';
import {FeaturePaneComponent} from '../featurepane/featurepane';
import {Config} from '../../config';
import {Feature} from '../commons';
import {IpGeolocationService} from './ipgeolocation.service';

declare var mapboxgl:any; // Magic
// declare mapboxgl.Geolocate:any; // Magic

@Component({
    selector: 'my-map',
    providers: [IpGeolocationService],
    template: require('./map.html'),
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./map.scss')],
    directives: [SearchComponent, FeaturePaneComponent]
})
export class MapComponent implements OnInit {
    public map;
    selectedFeature:Feature;
    ipGeolocation:Coordinates;

    constructor(private _ipGeolocationService:IpGeolocationService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = Config.mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: "/static/map-styles/streets-v8.json", //stylesheet location
            center: [0, 30], // starting position
            zoom: 2, // starting zoom,
            interactive: true
        });

        // Add Controls
        this.map.addControl(new mapboxgl.Navigation({position: 'top-right'}));
        this.map.addControl(new mapboxgl.Geolocate({position: 'top-right'}));

        this._ipGeolocationService.getIpGeolocation().subscribe((result) => {
            this.map.flyTo({
                center: result,
                zoom: 11,
                speed: 3
            });

            this.ipGeolocation = new Coordinates(result[1], result[0]);
        });
    }

    onSelected(searchResult: SearchResult) {

        let feature = new Feature();
        feature.feature_type = searchResult.osm_type;
        feature.osm_id = searchResult.osm_id;
        feature.name = searchResult.name;

        this.selectedFeature = feature;

        // set map center
        this.map.jumpTo({center: new mapboxgl.LngLat(searchResult.coordinates.lat, searchResult.coordinates.lon), zoom: 17});
    }

}
