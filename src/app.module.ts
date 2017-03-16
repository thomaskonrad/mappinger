import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from "@angular/http";
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { MapModule } from './map/map.module';


const appRoutes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    {
        path: 'map',
        loadChildren: () => MapModule
    },
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
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
