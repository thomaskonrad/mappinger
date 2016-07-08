import {Component, OnInit} from 'angular2/core';
import {SearchComponent} from '../search/search';
import {SearchResult, Coordinates} from '../commons';
import {FeaturePaneComponent} from '../featurepane/featurepane';
import {Config} from '../../config';
import {Feature} from '../commons';
import {IpGeolocationService} from './ipgeolocation.service';
import {MapService} from './map.service';

declare var mapboxgl:any; // Magic
// declare mapboxgl.Geolocate:any; // Magic

@Component({
    selector: 'my-map',
    providers: [IpGeolocationService, MapService],
    template: require('./map.html'),
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./map.scss')],
    directives: [SearchComponent, FeaturePaneComponent]
})
export class MapComponent implements OnInit {
    public map;
    selectedFeature:Feature;
    ipGeolocation:Coordinates;

    constructor(private _ipGeolocationService:IpGeolocationService, private _mapService:MapService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = Config.mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            // style: "/static/map-styles/streets-v8.json", //stylesheet location
            style: "mapbox://styles/mappinger/cipwkev5y0007dkmckfu7v4x8", //stylesheet location
            center: [0, 30],    // starting position
            zoom: 2,            // starting zoom,
            interactive: true
        });

        // Add Map Load Event Listener
        let that = this;
        this.map.on('load', this.onMapLoaded);
        this.map.on('click', function(event) {
            that.onMapClick(event, that);
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

    onSelected(searchResult: SearchResult, jumpto:Boolean = true) {

        let feature = new Feature();
        feature.feature_type = searchResult.osm_type;
        feature.osm_id = searchResult.osm_id;
        feature.name = searchResult.name;

        this.selectedFeature = feature;

        // set map center
        // TODO: dynamically define zoom-level: if a amenity -> goto 17, if city etc use a lower value
        if(jumpto) {
            this.map.jumpTo({center: new mapboxgl.LngLat(searchResult.coordinates.lat, searchResult.coordinates.lon), zoom: 17});

            // move the map half the width of the featurepane to center the marker (we need to wait a bit to do that though)
            window.setTimeout(function() {
                try {
                    let feature_pane_width = document.querySelector('#feature-pane').offsetWidth;
                    window.MapComponentRef.map.panBy([-feature_pane_width/2,0], {duration: 0});
                }  catch (e) {
                    // catch me if you can
                }
            }, 10);
        }


        // remove 'markers' layer and source if they have been added before
        if(typeof this.map.getLayer('markers') !== 'undefined') this.map.removeLayer("markers");
        if(typeof this.map.getSource('markers') !== 'undefined') this.map.removeSource("markers");

        // add 'markers' Source
        this.map.addSource("markers", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [searchResult.coordinates.lat, searchResult.coordinates.lon]
                    },
                    "properties": {
                        "title": searchResult.name,
                        "marker-symbol": "za-provincial-2" // unused at the moment
                    }
                }]
            }
        });

        // add 'markers' Layer
        this.map.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "markers",
            "layout": {
                "icon-image": "marker-2",
                "icon-offset": [0,-20]
                //"text-field": "{title}",
                "text-font": ["Source Sans Pro Regular", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.8],
                "text-anchor": "top"
            }
        });

    }

    onUnselect() {
        this.selectedFeature = false;
    }


    onMapLoaded(event) {

    }

    onMapClick(event, mapComponent) {
        // get the map
        let themap = event.target;
        // get the features at the clicked point
        let features = themap.queryRenderedFeatures(event.point);
        let selectedFeature;

        for (var feature of features) {
            if ('id' in feature && feature.id > 1) {
                selectedFeature = feature;
            }
        }

        if (selectedFeature != null) {
            console.log(selectedFeature);

            // get feature type and id
            let featureTypeAndId = mapComponent._mapService.getFeatureTypeAndRealId(selectedFeature.id);

            // create a SearchResult to pass on to onSelected
            let clickResult = new SearchResult();
            clickResult.osm_type = featureTypeAndId.type;
            clickResult.osm_id = featureTypeAndId.id;
            clickResult.name = selectedFeature.properties.name;
            clickResult.coordinates = new Coordinates(
                selectedFeature.geometry.coordinates[0],
                selectedFeature.geometry.coordinates[1]
            );

            // call onSelected
            mapComponent.onSelected(clickResult, false);
        }
        else {
            mapComponent.onUnselect();
        }
    }

}
