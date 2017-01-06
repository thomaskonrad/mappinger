import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './components/app.component';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { FeaturePaneComponent } from './components/featurepane/featurepane.component';


const appRoutes: Routes = [
    { path: '/', component: MapComponent }
];

@NgModule({
    imports:      [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        MapComponent,
        SearchComponent,
        FeaturePaneComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
