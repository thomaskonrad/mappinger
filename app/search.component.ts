import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {SearchService, SearchResult, SearchParameters} from './search.service';
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
            <input type="text"
             [ngFormControl]="searchControl" [(ngModel)]='searchTerm'/>
                <ul id="search-results">
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
export class SearchComponent {

    items: Observable<Array<string>>;
    public currentSearchItems:any;
    searchControl = new Control();
    searchTerm:string;
    selectedSearchResult:SearchResult;

    constructor(private _searchService: SearchService) {
        this.items = this.searchControl.valueChanges
             .debounceTime(400)
             .distinctUntilChanged()
             .switchMap(searchTerm => {
                 let searchParams = new SearchParameters();
                 searchParams.provider = "komoot";
                 searchParams.lat = '48.209';
                 searchParams.lon = '16.372';
                 return this.currentSearchItems = this._searchService.search(searchTerm, searchParams);
                }
             );
     }

     onSelect(selectedItem:SearchResult) {
         console.log(selectedItem);
         this.selectedSearchResult = selectedItem;
     }

     onKeyPress(event:any) {
         if(event.keyCode == 40) {
             // down arrow pressed -> select first/next item
             if(!this.selectedSearchResult) {
                 console.log("no result selected yet");
                 this.selectedSearchResult = this.items[0];
                 console.log(this.currentSearchItems);
             }
             else {
                 console.log("already selected");
             }
         }
         if(event.keyCode == 38) {
             // up arrow pressed --> select previous item or focus on input-box
         }
     }


}
