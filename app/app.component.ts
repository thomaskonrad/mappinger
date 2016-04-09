import {Component} from 'angular2/core';
import {MapComponent} from './map.component';

@Component({
    selector: 'my-app',
    template: `
        <my-map></my-map>
    `,
    directives: [MapComponent]
})
export class AppComponent {



}
