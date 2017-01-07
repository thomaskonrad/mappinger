import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class PresetsService {

    private presetData;
    private fields = {};
    private universal = [];
    private all = new Collection([]);
    //private defaults = { area: this.all, line: this.all, point: this.all, vertex: this.all, relation: this.all };
    // Index of presets by (geometry, tag key).
    private index = {
        point: {},
        vertex: {},
        line: {},
        area: {},
        relation: {}
    };

    constructor(private _http: Http) {
        this._http.get('/static/presets.json')
            .map((res: Response) => res.json())
            .subscribe(res => {
                this.presetData = res;
                this.load();
            });
    }

    public match(entity) {
        let geometry = 'point'; //entity.geometry;
        let geometryMatches = this.index[geometry];
        let best = -1;
        let match;

        for (var k in entity.tags) {
            var keyMatches = geometryMatches[k];
            if (!keyMatches) continue;

            for (var i = 0; i < keyMatches.length; i++) {
                var score = keyMatches[i].matchScore(entity);
                if (score > best) {
                    best = score;
                    match = keyMatches[i];
                }
            }
        }

        return match || this.all.item(geometry);
    }

    private load() {
        if (this.presetData.fields) {
            for (let id in this.presetData.fields) {
                let data = this.presetData.fields[id];
                this.fields[id] = new Field(id, data);

                if (data.universal) {
                    this.universal.push(this.fields[id]);
                }
            }
        }

        if (this.presetData.presets) {
            for (let id in this.presetData.presets) {
                let data = this.presetData.presets[id];
                this.all.collection.push(new Preset(id, data, this.fields));
            }
        }

        if (this.presetData.categories) {
            for (let id in this.presetData.categories) {
                let data = this.presetData.categories[id];
                this.all.collection.push(new Category(id, data, this.all));
            }
        }

        // TODO: Do we need the defaults?
        /* if (this.presetData.defaults) {
         let getItem = function() {

         }
         } */

        for (var i = 0; i < this.all.collection.length; i++) {
            let preset = this.all.collection[i];

            let geometry = preset.data.geometry;

            for (var j = 0; j < geometry.length; j++) {
                var g = this. index[geometry[j]];
                for (var k in preset.data.tags) {
                    (g[k] = g[k] || []).push(preset);
                }
            }
        }
    }
}

export class Field {

    private id;
    private data;
    private placeholder;

    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.placeholder = this.data.placeholder;
    }

    matchGeometry(geometry) {
        return !this.data.geometry || this.data.geometry === geometry;
    };

    t(scope, options) {
        // TODO: Do this with Angular2 translation.
        //return t('presets.fields.' + id + '.' + scope, options);
        return this.id;
    };

    label() {
        return this.t('label', {'default': this.id});
    }

    getPlaceholder() {
        return this.t('placeholder', {'default': this.placeholder});
    };
}

export class Preset {
    private id;
    private data;

    constructor(id, data, fields: Array) {
        this.id = id;
        this.data = data;

        this.data.fields = (this.data.fields || []).map(function(id) {
            return fields[id];
        });
        this.data.geometry = (this.data.geometry || []);
    }

    matchGeometry(geometry) {
        return this.data.geometry.indexOf(geometry) >= 0;
    }

    matchScore(entity) {
        let matchScore = this.data.matchScore || 1;
        let tags = this.data.tags;
        let score = 0;

        for (let t in tags) {
            if (entity.tags[t] === tags[t]) {
                score += matchScore;
            } else if (tags[t] === '*' && t in entity.tags) {
                score += matchScore / 2;
            } else {
                return -1;
            }
        }

        return score;
    }

    t(scope, options) {
        // TODO: Do this with Angular2 translation.
        //return t('presets.presets.' + id + '.' + scope, options);
        return this.id;
    };

    name() {
        let name = this.data.name;

        if (this.data.suggestion) {
            let id = this.id.split('/');
            id = id[0] + '/' + id[1];
            // TODO: Handle suggestion case!
            //return name + ' - ' + this.t('presets.presets.' + id + '.name');
            return name;
        }

        // TODO: Translate!
        //return preset.t('name', {'default': name});
        return name;
    }
}

export class Category {
    private id;
    private data;
    private members;

    constructor(id, data, all: Collection) {
        this.id = id;
        this.data = data;
        this.members = new Collection(this.data.members.map(function(id) {
            return all.item(id);
        }));
    }
}

export class Collection {
    public collection = [];
    private static maxSearchResults = 50;
    private static maxSuggestionResults = 10;

    constructor(collection) {
        this.collection = collection;
    }

    item(id) {
        for (let itemId in this.collection) {
            if (id === itemId) {
                return this.collection[itemId];
            }
        }
    }
}