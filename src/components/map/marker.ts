export class Marker {
    element: HTMLElement;

    private defaultConfig = {
        width: 38,
        height: 38
    }

    constructor (options:any) {

        let _options:any = options || {};
        _options.imageUrl = _options.imageUrl || "";

        this.element = document.createElement('div');
        this.element.className = 'marker';
        this.element.style.width = (_options.width || this.defaultConfig.width) + 'px';
        this.element.style.height = (_options.height || this.defaultConfig.height)+ 'px';

        let innerElement = document.createElement('div');
        innerElement.className = 'marker-inner';
        innerElement.style.width = '100%';
        innerElement.style.height = '100%';
        innerElement.style.height = '100%';
        if(_options.imageUrl) {
            innerElement.style.backgroundImage = 'url(' + _options.imageUrl + ')';
            innerElement.style.backgroundSize = '100%';
        }

        // add to marker
        this.element.appendChild(innerElement);

        // add event listener
        // TODO: remove this if not needed
        // this.element.addEventListener('click', function() {
        //     console.log(searchResult.name);
        // });
    }

}
