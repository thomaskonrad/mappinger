import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {Control, OnInit} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {SearchService, SearchParameters} from './search.service';
import {SearchResult} from './searchResult';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'search',
    directives: [],
    providers: [SearchService],
    template: `
            <div id="search-box" (keyup)="onKeyPress($event)">
            <input type="text" class="search-component-input"
             [ngFormControl]="searchControl" [(ngModel)]='searchTerm'/>
                <ul id="search-results" *ngIf="showResults">
                    <li
                        *ngFor="#item of items | async"
                        [class.selected]="item === selectedSearchResult"
                        (click)="onSelect(item)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            `,
    styleUrls: ['./app/search.component.css']
})
export class SearchComponent implements OnInit {

    @Output() onSelected = new EventEmitter<SearchResult>();

    items: Observable<Array<string>>;
    public currentSearchItems:any;
    searchControl = new Control();
    searchTerm:string;
    selectedSearchResult:SearchResult;
    showResults:boolean = true;
    searchResultsArray:Array<SearchResults>;
    selectedIndex:Number = 0;

    constructor(private _searchService: SearchService) {
        this.items = this.searchControl.valueChanges
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
                 searchParams.lat = '48.209';
                 searchParams.lon = '16.372';
                 // kick off search
                 return this.currentSearchItems = this._searchService.search(searchTerm, searchParams);
                }
            )
            .do( list => this.searchResultsArray = list) );
     }

     ngOnInit() {
         // FIXME
         document.querySelector('.search-component-input').focus();
     }


     onSelect(selectedItem:SearchResult) {
         console.log(selectedItem);
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

         if(event.keyCode == 40) {
             // down arrow pressed -> select first/next item
             if(!this.selectedSearchResult) {
                 this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
             }
             else if(this.selectedIndex < this.searchResultsArray.length-1){
                 this.selectedIndex++;
                 this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
             }
         }
         if(event.keyCode == 38) {
             // up arrow pressed --> select previous item or focus on input-box
             this.selectedIndex--;
             if(this.selectedIndex>=0) this.selectedSearchResult = this.searchResultsArray[this.selectedIndex];
             else this.selectedSearchResult = null;
         }
         if(event.keyCode == 13) {
             // enter pressed -> select search result
             this.onSelect(this.selectedSearchResult);
         }
     }

}
