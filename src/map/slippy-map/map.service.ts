import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
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

        let lastDigit = mapboxId % 10;
        osmIdentifier.id = (mapboxId - lastDigit) / 10;

        if (lastDigit === 0) {
            osmIdentifier.type = 'node';
        } else if (lastDigit === 1 || lastDigit === 2) {
            osmIdentifier.type = 'way';
        } else if (lastDigit === 3 || lastDigit === 4) {
            osmIdentifier.type = 'relation';
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
