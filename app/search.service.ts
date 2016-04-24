import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class SearchService {

    constructor(private _http: Http) {
    }

    search(searchTerm:string) {

        let params:URLSearchParams = new URLSearchParams();
        params.set('q', searchTerm);
        params.set('lat', '48.209');    // TODO: get lat/long dynamically
        params.set('lon', '16.372');
        params.set('lang', 'de');       // TODO: get lang dynamically

        // call komoot api
        return this._http.get('https://photon.komoot.de/api/', {search: params})
            .map(res => res.json())
            .map((el) => {
                return el.features.map((feature) => {
                    return ({name: feature.properties.name, osm_id: feature.properties.osm_id});
                });
            });
    }

    logError(err) {
         console.error('There was an error: ' + err);
    }
}
