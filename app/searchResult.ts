import {FeatureType} from './feature';
import {Coordinates} from './commons';

export class SearchResult {
    osm_type: FeatureType;
    osm_id: number;
    name: string;
    coordinates: Coordinates;

    setFeatureType(featureType: string, provider: string = 'photon') {
        if (provider == 'photon') {
            if (featureType == 'N') {
                this.osm_type = FeatureType.Node;
            } else if (featureType == 'W') {
                this.osm_type = FeatureType.Way;
            } else if (featureType == 'R') {
                this.osm_type = FeatureType.Relation;
            } else {
                this.osm_type = FeatureType.Unknown;
            }
        } else {
            if (featureType == 'node') {
                this.osm_type = FeatureType.Node;
            } else if (featureType == 'way') {
                this.osm_type = FeatureType.Way;
            } else if (featureType == 'relation') {
                this.osm_type = FeatureType.Relation;
            } else {
                this.osm_type = FeatureType.Unknown;
            }
        }
    }
}
