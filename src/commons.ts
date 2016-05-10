 /**
 * Represents a Coordinate with Latitude and Longitude
 * @constructor
 * @param {Number} lat - The Latitude of the Cooordinate.
 * @param {Number} lon - The Longitude of the Coordinate.
 */
export class Coordinates {
    lat:Number;
    lon:Number;
    constructor(lat:Number, lon:Number) {
        this.lat = lat;
        this.lon = lon;
    }
}
