import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from "@angular/http";
import { MapRouterModule } from './map.routes';

import { SlippyMapComponent} from './slippy-map/slippy-map.component';
import { SearchComponent } from './search/search.component';
import { FeaturePaneComponent } from './featurepane/featurepane.component';

import { MessageService } from './message.service';


@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        JsonpModule,
        MapRouterModule
    ],
    declarations: [
        SlippyMapComponent,
        SearchComponent,
        FeaturePaneComponent
    ],providers: [
        MessageService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap:    [ SlippyMapComponent ]
})

export class MapModule { }
