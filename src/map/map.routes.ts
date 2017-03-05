import { SlippyMapComponent} from './slippy-map/slippy-map.component';
import { FeaturePaneComponent } from './featurepane/featurepane.component';

import {RouterModule, Routes } from '@angular/router';

const MAP_ROUTES: Routes = [{
    path: '',
    component: SlippyMapComponent,
    children: [
        {
            path: 'place/:id', // flug-buchen/flug-suchen
            component: FeaturePaneComponent
        }
    ]
}];

export const MapRouterModule = RouterModule.forChild(MAP_ROUTES);
