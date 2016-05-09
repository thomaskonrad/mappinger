import {Component} from 'angular2/core';
import {MapComponent} from './map.component';
import {MapService} from './map.service';
import {NominatimService} from './nominatim.service';
import {IpGeolocationService} from "./ip-geolocation.service";

@Component({
    selector: 'my-app',
    template: `
        <my-map></my-map>
    `,
    directives: [MapComponent],
    providers: [MapService, NominatimService, IpGeolocationService]
})
export class AppComponent {

}
