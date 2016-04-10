import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class SearchService {

    constructor(private _http: Http) {
    }

    public searchResults:any;

    search(searchTerm:string) {
        if(searchTerm == "") return;
        
        let params:URLSearchParams = new URLSearchParams();
        params.set('q', searchTerm);
        params.set('lat', '48.209');
        params.set('lon', '16.372');
        params.set('lang', 'de');


        return this._http.get('https://photon.komoot.de/api/', {search: params})
            .map(res => res.json())
            .map((el) => {
                console.log(el.features);
                return el.features.map((feature) => {
                    return ({name: feature.properties.name});
                });
            });
            // .toPromise();
    }

    logError(err) {
         console.error('There was an error: ' + err);
    }
}
