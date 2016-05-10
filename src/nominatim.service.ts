import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {URLSearchParams} from 'angular2/http';

@Injectable()
export class NominatimService {

    constructor(private _http: Http) {

    }

    reverseGeocode(lat, lon) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('format', 'json');
        params.set('lat', lat);
        params.set('lon', lon);

        return this._http.get('https://nominatim.openstreetmap.org/reverse', {
            search: params
        });//.map(res => res.data.elements[0]);
    };
}
