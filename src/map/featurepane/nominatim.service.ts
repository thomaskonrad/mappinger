import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

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
