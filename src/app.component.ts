import { Component } from '@angular/core';

@Component({
    selector: "app",
    template: require('./app.html')
})
export class AppComponent {
    constructor() {

    }

    ngOnInit() {
        console.log('[Component] app running');
    }
}
