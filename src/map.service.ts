import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

    constructor(private _http: Http) {

    }

    getFeatureTypeAndRealId(mapboxId: number) {
        let osmIdentifier = {
            type: null,
            id: 0
        };

        if (mapboxId < 1000000000000) {
            osmIdentifier.type = 'way';
            osmIdentifier.id = mapboxId;
        } else if (mapboxId < 2000000000000) {
            osmIdentifier.type = 'way';
            osmIdentifier.id = mapboxId - 1000000000000;
        } else if (mapboxId < 3000000000000) {
            osmIdentifier.type = 'relation';
            osmIdentifier.id = mapboxId - 2000000000000;
        } else if (mapboxId < 1000000000000000) {
            osmIdentifier.type = 'relation';
            osmIdentifier.id = mapboxId - 3000000000000;
        } else {
            osmIdentifier.type = 'node';
            osmIdentifier.id = mapboxId - 1000000000000000;
        }

        return osmIdentifier;
    };

    getCenterCoordinates(data: any) {
        if ("center" in data) {
            return [data.center.lon, data.center.lat];
        } else if ("lat" in data && "lon" in data) {
            return [data.lon, data.lat]
        }
    };

    fetchFeatureFromOsm(featureType, osmId) {
        let query = '[out:json][timeout:10];' + featureType + '(' + osmId + ');out center;';

        let params: URLSearchParams = new URLSearchParams();
        params.set('data', query);

        return this._http.get('https://overpass-api.de/api/interpreter', {
            search: params
        }).map(res => res.json());//.map(res => res.data.elements[0]);
    };
}
