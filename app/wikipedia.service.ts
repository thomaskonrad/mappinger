import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';
import {HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class WikipediaService {

    constructor(private jsonp: Jsonp) {
    }

    getMainImageUrl(language, pageTitle) {
        let wikiUrl = 'https://' + encodeURIComponent(language) + '.wikipedia.org/w/api.php';

        var params = new URLSearchParams();
        params.set('action', 'query');
        params.set('titles', pageTitle);
        params.set('prop', 'pageImages');
        params.set('format', 'json');
        params.set('pithumbsize', '800');
        params.set('callback', 'JSONP_CALLBACK');

        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(res => {
                let pages = res.json().query.pages;
                let firstPage = pages[Object.keys(pages)[0]];
                return firstPage.thumbnail.source;
            });
    };
}
