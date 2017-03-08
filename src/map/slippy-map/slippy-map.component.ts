import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SearchResult, Coordinates} from '../../commons';
import {Config} from '../../config';
import {Feature} from '../../commons';
import {IpGeolocationService} from './ipgeolocation.service';
import {MapService} from './map.service';
import {Marker} from './marker';

declare var mapboxgl:any; // Magic
// declare mapboxgl.Geolocate:any; // Magic

@Component({
    selector: 'my-map',
    providers: [IpGeolocationService, MapService],
    template: require('./slippy-map.html'),
    styles: [require('!raw-loader!autoprefixer?browsers=last 2 versions!sass-loader!./slippy-map.scss')]
})
export class SlippyMapComponent implements OnInit {
    public map;
    selectedFeature:Feature;
    showFeaturePane:boolean;
    ipGeolocation:Coordinates;
    marker:any;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ipGeolocationService:IpGeolocationService,
        private _mapService:MapService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = Config.mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: "/static/map-styles/streets-v9.json", // Local style ID.
            //style: 'mapbox://styles/mapbox/streets-v9', // Mapbox-hosted style ID.
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
        this.map.addControl(new mapboxgl.NavigationControl({position: 'top-right'}));
        this.map.addControl(new mapboxgl.GeolocateControl({position: 'top-right'}));

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
        let map:any = this.map;

        let feature = new Feature();
        feature.feature_type = searchResult.osm_type;
        feature.osm_id = searchResult.osm_id;
        feature.name = searchResult.name;

        this.selectedFeature = feature;
        this.showFeaturePane = true;

        this.addMarker(searchResult.coordinates);

        // TODO: dynamically define zoom-level: if a amenity -> goto 17, if city etc use a lower value
        // set map center
        if(jumpto) {
            this.map.jumpTo({center: new mapboxgl.LngLat(searchResult.coordinates.lat, searchResult.coordinates.lon), zoom: 17});

            // move the map half the width of the featurepane to center the marker (we need to wait a bit to do that though)
            window.setTimeout(function() {
                try {
                    let featurePaneElement:HTMLElement = <HTMLElement>document.querySelector('#feature-pane');
                    let featurePaneElementWidth:number = featurePaneElement.offsetWidth;
                    if(featurePaneElementWidth != window.innerWidth) map.panBy([-featurePaneElementWidth/2,0], {duration: 0});
                }  catch (e) {
                    // catch me if you can
                }
            }, 30);
        }

        // Navigate to /map/place/w123

        this._router.navigate(['/map/place', feature.getFeatureTypeLetter() + feature.osm_id + "-" + feature.name]);
    }


    addMarker(coordinates:Coordinates) {
        // remove old marker
        if(this.marker) this.marker.remove();
        // create new Marker
        let markerDom = new Marker({imageUrl: "static/marker_76x76.png"});

        // create new MapBoxGl-Marker and add to Map
        this.marker = new mapboxgl.Marker(markerDom.element, {offset: [-19, -39]})
          .setLngLat([coordinates.lat, coordinates.lon])
          .addTo(this.map);
        
        // add move-in class
        window.setTimeout(function() {
            markerDom.element.classList.add("move-in");
        },10);
    }

    onUnselect() {
        //this.showFeaturePane = false;
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
            if ('id' in feature && feature.id > 1 && feature.geometry.type === "Point") {
                selectedFeature = feature;
            }
        }

        if (selectedFeature != null) {

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
