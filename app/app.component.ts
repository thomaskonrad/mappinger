import {Component} from 'angular2/core';
import {MapComponent} from './map.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>Mappinger, bitches!</h1>
        <my-map></my-map>
    `,
    directives: [MapComponent]
})
export class AppComponent {



}
