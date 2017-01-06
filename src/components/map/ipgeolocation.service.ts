import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs} from '@angular/http';

@Injectable()
export class IpGeolocationService {
    constructor(private _http: Http) {
    }

    getIpGeolocation(timeout:number = 10000) {
        return this._http.get("https://myexternalip.com/json")
            .timeout(timeout)
            .map(res => res.json())
            .switchMap(res => this._http.get("https://geoip.thomaskonrad.at/json/" + encodeURIComponent(res['ip'])).timeout(timeout))
            .map(res => res.json())
            .map(res => {
                return [res.longitude, res.latitude];
            })
    }
}
