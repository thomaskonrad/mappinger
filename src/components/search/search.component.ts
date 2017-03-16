import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {SearchService, SearchParameters} from './search.service';
import {SearchResult, Coordinates} from '../commons';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'search',
    providers: [SearchService],
    template: require('./search.html'),
    styles: [require('!raw!autoprefixer?browsers=last 2 versions!sass!./search.scss')],
})
export class SearchComponent implements OnInit{

    @Output() onSelected = new EventEmitter<SearchResult>();
    @Input()
    set centerGeolocation(ipGeoposition: Coordinates) {
        this.center = ipGeoposition;
    }

    public currentSearchItems:any;
    private searchResultItems: Observable<Array<string>>;
    private searchTermsSubject = new Subject<string>();
    private searchTerm:String;

    selectedSearchResult:SearchResult;
    showResults:boolean = true;
    searchResultsArray:Array<SearchResult>;
    selectedIndex:number = 0;
    center:Coordinates;

    constructor(private _searchService: SearchService) {

    }

    ngOnInit() {
        // auto-focus the search-input
        let searchComponentInput:HTMLElement = <HTMLElement>document.querySelector('.search-component-input');
        searchComponentInput.focus();

        // subscribe to changes in the search-input
        this.searchResultItems = this.searchTermsSubject
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(searchTerm => {
                    // show results
                    this.showResults = true;
                    // reset some vars
                    this.selectedIndex = 0;
                    this.selectedSearchResult = null;
                    // prepare search params
                    let searchParams = new SearchParameters();
                    searchParams.provider = "komoot";
                    searchParams.lat = 48.209;
                    searchParams.lon = 16.37;
                    if(this.center) {
                        searchParams.lat = this.center.lat;
                        searchParams.lon = this.center.lon;
                    }
                    // kick off search
                    return this.currentSearchItems = this._searchService.search(searchTerm, searchParams);
                }
            )
            .do( list => this.searchResultsArray = <SearchResult[]>list);
    }

    search(term: string): void {
        // Push a search term into the observable stream.
        this.searchTermsSubject.next(term);
    }

    onSelect(selectedItem:SearchResult) {
        if(selectedItem) {
            this.selectedSearchResult = selectedItem;
            this.onSelected.emit(this.selectedSearchResult);
            this.searchTerm = selectedItem.name;
            this.showResults = false;
        }
    }


    onKeyPress(event:any) {
        this.showResults = true;

        // return if no results yet
        if(!this.searchResultsArray && [40, 38, 13].indexOf(event.keyCode) != -1) return;

        // down arrow pressed -> select first/next item
        if(event.keyCode == 40) {
            if(!this.selectedSearchResult) this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
            else if(this.selectedIndex < this.searchResultsArray.length-1){
                this.selectedIndex++;
                this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
            }
        }

        // up arrow pressed --> select previous item or focus on input-box
        if(event.keyCode == 38) {
            this.selectedIndex--;
            if(this.selectedIndex>=0) this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
            else this.selectedSearchResult = null;
        }

        // enter pressed -> select search result
        if(event.keyCode == 13) {
            // if no Result is selected -> select the first one
            if(!this.selectedSearchResult && this.searchResultsArray.length > 0) this.selectedSearchResult = this.searchResultsArray[0];
            this.onSelect(this.selectedSearchResult);
        }

        // esc pressed -> close/hide search results box
        if(event.keyCode == 27) {
            this.showResults = false;
        }
    }

}
