import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from "@angular/http";
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { SlippyMapComponent} from './map/slippy-map/slippy-map.component';
import { SearchComponent } from './map/search/search.component';
import { FeaturePaneComponent } from './map/featurepane/featurepane.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: SlippyMapComponent },
    { path: '**', redirectTo: 'map' }
];

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    declarations: [
        AppComponent,
        SlippyMapComponent,
        SearchComponent,
        FeaturePaneComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
