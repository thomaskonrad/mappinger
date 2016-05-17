export class Coordinates {
    lat: number;
    lon: number;

    constructor(lat:number, lon:number) {
        this.lat = lat;
        this.lon = lon;
    }
}
export enum FeatureType
{
    Node = "node",
    Way = "way",
    Relation = "relation",
    Unknown
}

export class Feature {
    public feature_type: FeatureType;
    public osm_id: number;
    public name: string;
    public tags: any;
    public opening_hours: any;
    public wikipedia_image_url: string;
}

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
