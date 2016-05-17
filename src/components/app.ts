import {Component, View}    from 'angular2/core';
import {MapComponent}       from './map/map';
import {RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: "app"
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: require('./app.html')
})
@RouteConfig([
    new Route({ path: '/', component: MapComponent, name: 'Map' })
])
export class App {
    constructor() {

    }

    ngOnInit() {
        console.log('[Component] app running');
    }
}
