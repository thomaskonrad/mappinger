import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {Config} from './config';
import {FeatureType} from './feature';

export class SearchResult {
    osm_type: FeatureType;
    osm_id: number;
    name: string;
    coordinates: Coordinates;

    setFeatureType(featureType: string, provider: string = 'photon') {
        if (provider == 'photon') {
            if (featureType == 'N') {
                this.osm_type = FeatureType.Node;
            } else if (featureType == 'W') {
                this.osm_type = FeatureType.Way;
            } else if (featureType == 'R') {
                this.osm_type = FeatureType.Relation;
            } else {
                this.osm_type = FeatureType.Unknown;
            }
        } else {
            if (featureType == 'node') {
                this.osm_type = FeatureType.Node;
            } else if (featureType == 'way') {
                this.osm_type = FeatureType.Way;
            } else if (featureType == 'relation') {
                this.osm_type = FeatureType.Relation;
            } else {
                this.osm_type = FeatureType.Unknown;
            }
        }

    }
}
export class SearchParameters {
    provider:string;
    lat:string;
    lon:string;
}
export class Coordinates {
    lat:Number;
    lon:Number;
    constructor(lat:Number, lon:Number) {
        this.lat = lat;
        this.lon = lon;
    }
}

@Injectable()
export class SearchService {
  constructor(private _http: Http) {}

  search (term: any, searchParameters:SearchParameters) {
    // define URLSearchParams
    let params:URLSearchParams = new URLSearchParams();

    if(searchParameters.provider === "komoot") {

        params.set('q', term);
        params.set('lat', searchParameters.lat);    // TODO: get lat/long dynamically
        params.set('lon', searchParameters.lon);
        params.set('lang', 'de');       // TODO: get lang dynamically
        params.set('limit', '7');

        return this._http
                    .get('https://photon.komoot.de/api/', { search: params })
                    .map(res => res.json())
                    .map((el) => {
                        return el.features
                            .map((feature) => {
                                let result = new SearchResult();
                                result.name = feature.properties.name;
                                result.setFeatureType(feature.properties.osm_type);
                                result.osm_id = feature.properties.osm_id;
                                result.coordinates = new Coordinates(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
                                return result;
                        });
        });

    }
    else if(searchParameters.provider === "mapzen") {

        // https://search.mapzen.com/v1/autocomplete?api_key=search-XXXXXXX&focus.point.lat=37.7&focus.point.lon=-122.4&text=union square

        params.set('api_key', Config.mapzenAccessToken);
        params.set('focus.point.lat', searchParameters.lat);    // TODO: get lat/long dynamically
        params.set('focus.point.lon', searchParameters.lon);
        params.set('text', term);       // TODO: get lang dynamically

        return this._http
                    .get('https://search.mapzen.com/v1/autocomplete', { search: params })
                    .map(res => res.json())
                    .map((el) => {
                        return el.features
                            .map((feature) => {
                                let result = new SearchResult();
                                result.name = feature.properties.name;
                                result.osm_id = feature.properties.osm_id;
                                return result;
                        });
        });
    }

  }




}
