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
}