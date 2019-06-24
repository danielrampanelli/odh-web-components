# BEACON POI MAPPING

The following set of web-components expose the data collected and maintained for the "[BEACON SÜDTIROL - ALTO ADIGE](https://beacon.bz.it)" project coupled together with the data from "[SÜDTIROL GUIDE](https://www.suedtirol.info)".

## Overview

The web-components in this project are built on top of [Polymer's LitElement](https://lit-element.polymer-project.org) and other UI elements and framework ([Leaflet](https://leafletjs.com), [OpenstreetMap](https://www.openstreetmap.org/), [VAADIN Components](https://vaadin.com/components)). The project is organised and managed by [NPM](https://www.npmjs.com), the build process is powered mainly by [Lerna](https://github.com/lerna/lerna) and [Webpack](https://webpack.js.org).

The `map` web-component shows all beacon devices deployed in the region and associates them to the nearest point-of-interest. Similarly, the `table` web-component list all deployed beacon devices along with all their details.

## Getting started

### Prerequisites

In order to work on the project, you'll just need a recent and working installation of Node and NPM, the rest of the tools will be installed automatically in the project's scope.

### Setup

This step is required and will install all required software and tools in the project folders. This needs to be run just once and probably may be repeated in case of relevant changes to the overall project structure.

    npm run setup

### Building

Building the project will yield the distributable components in the `dist` folder, one for each component (`table.min.js`, `map.min.js`) and a file containing all of them (`bundle.min.js`).

    npm run build

### Preview

The built components can be previewed and evaluated using a built-in server at the address [http://0.0.0.0:8000](http://0.0.0.0:8000).

    npm run serve

## Usage

You can download the packaged/build components and include them in your website or link the resources directly by means of a CDN service.
    
    <!-- include self-hosted component -->
    <script src="./js/table.min.js"></script>
    
    <!-- include from CDN -->
    <script src="https://cdn.jsdelivr.net/gh/noi-techpark/odh-web-components@beacon-pois-display/beacon-pois-display/dist/bundle.min.js"></script>

Once the components are correctly included, the following custom tags are available to be used

    <beacon-pois-table></beacon-pois-table>
    <beacon-pois-map></beacon-pois-map>

## Authors

* Daniel Rampanelli [hello@danielrampanelli.com](mailto:hello@danielrampanelli.com)

## License

TODO