//import {enableProdMode} from 'angular2/core'
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';

declare var opening_hours:any; // Magic

//enableProdMode();
bootstrap(AppComponent, [HTTP_PROVIDERS]);
