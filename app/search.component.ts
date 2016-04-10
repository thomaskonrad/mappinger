import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {SearchService} from './search.service';


@Component({
    selector: 'search',
    directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [SearchService],
    template: `
            <div id="search-box">

            <input [(ngModel)]="autoCompleteSearchTerm"
              [typeahead]="autoCompleteRef"
              [typeaheadOptionField]="'name'"
              (typeaheadLoading)="changeTypeaheadLoading($event)"
              (typeaheadNoResults)="changeTypeaheadNoResults($event)"
              (typeaheadOnSelect)="typeaheadOnSelect($event)"
              [typeaheadOptionsLimit]="7"
              [typeaheadWaitMs]="100"
              placeholder="Search..."
              class="form-control">

               <div *ngIf="typeaheadLoading===true">
                   <i class="glyphicon glyphicon-refresh ng-hide" style=""></i>
               </div>
               <div *ngIf="typeaheadNoResults===true" class="" style="">
                   <i class="glyphicon glyphicon-remove"></i> No Results Found
               </div>

            </div>
            `,
    styles: [`
        #search-box {
            width: 340px;
            position: absolute;
            left: 20px;
            top: 20px;
            z-index: 100;

        }
        #search-box > input {
            font-size: 18px;
            padding: 6px 10px;
            font-weight: 300;
            width: 100%;
        }
        #search-results {
            position: absolute;
            top: 55px;
            left: 20px;
            display: block;
        }
        `]
})
export class SearchComponent {

    public autoCompleteRef = this.autoComplete.bind(this);
    public autoCompleteSearchTerm:string;

    public typeaheadLoading:boolean = false;
    public typeaheadNoResults:boolean = false;

    public searchResults:any;

    constructor(private _searchService:SearchService) {
    }


    public autoComplete() {
        return this.searchResults = this._searchService.search(this.autoCompleteSearchTerm).toPromise();
    }

    public changeTypeaheadLoading(e:boolean):void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e:boolean):void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e:any):void {
        console.log(`Selected value: ${e.item.name}`);
    }

}
