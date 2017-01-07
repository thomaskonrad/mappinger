export class Coordinates {
    lat: number;
    lon: number;

    constructor(lat:number, lon:number) {
        this.lat = lat;
        this.lon = lon;
    }
}

export enum FeatureType {
    Node = <any>"node",
    Way = <any>"way",
    Relation = <any>"relation",
    Unknown = <any>null
}

export class Feature {
    public feature_type: FeatureType;
    public osm_id: number;
    public name: string;
    public tags: any;
    public opening_hours: any;
    public wikipedia_image_url: string;
    public preset_name: string;
}

export class SearchResult {
    osm_type: FeatureType;
    osm_id: number;
    name: string;
    street: string;
    housenumber: string;
    coordinates: Coordinates;
    city: string;
    country: string;

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

    stringify() {
        let outputFragments:Array<string> = [];
        let outputHtml:string;

        // if SearchResult has no name, but street+housenumber --> use street + housenumber as name
        if(typeof this.name === "undefined" && typeof this.street !== "undefined" && typeof this.housenumber !== "undefined") this.name = this.street + " " + this.housenumber;

        // add city and country to outputFragments
        if(this.city) outputFragments.push(this.city);
        if(this.country) outputFragments.push(this.country);

        // concat name and fragments
        return this.name + " <small>" + outputFragments.join(', ') + "</small>";
    }

}
