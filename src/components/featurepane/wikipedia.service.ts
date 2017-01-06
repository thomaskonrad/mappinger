import {Injectable} from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';

@Injectable()
export class WikipediaService {

    constructor(private jsonp: Jsonp) {
    }

    getMainImageUrl(language, pageTitle) {
        // https://de.wikipedia.org/w/api.php?action=query&titles=Stephansdom_(Wien)&prop=pageimages&format=json&pithumbsize=800&callback=JSONP_CALLBACK
        // https://de.wikipedia.org/w/api.php?action=query&titles=Stephansdom%20(Wien)&prop=pageImages&format=json&pithumbsize=800&callback=__ng_jsonp__.__req0.finished
        let wikiUrl = 'https://' + encodeURIComponent(language) + '.wikipedia.org/w/api.php';

        var params = new URLSearchParams();
        params.set('action', 'query');
        params.set('titles', pageTitle);
        params.set('prop', 'pageimages');
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
