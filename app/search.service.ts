import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';


export class SearchResult {
  osm_id: number;
  name: string;
}


@Injectable()
export class SearchService {
  constructor(private _http: Http) {}

  search (term: any) {
    // define URLSearchParams
    let params:URLSearchParams = new URLSearchParams();
    params.set('q', term);
    params.set('lat', '48.209');    // TODO: get lat/long dynamically
    params.set('lon', '16.372');
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
                            result.osm_id = feature.properties.osm_id;
                            return result;
                    });
                });
  }
}
