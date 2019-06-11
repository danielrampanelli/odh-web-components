import { LitElement, html } from 'lit-element'
import '@polymer/paper-spinner/paper-spinner.js'
import '@vaadin/vaadin-grid/vaadin-grid.js'
import '@vaadin/vaadin-text-field/vaadin-text-field.js'
import { getBeacons } from './api.js'
import { searchBeacons } from './search.js'

class BeaconPoisTableView extends LitElement {

  constructor() {
    super()
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
          min-height: 320px;
          position: relative;
        }

        #spinner {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        #search {
          width: 240px;
        }

        #table {
          height: 100%;
          min-height: 320px;
        }
      </style>
      <paper-spinner id="spinner"></paper-spinner>
      <vaadin-text-field id="search" placeholder="Search" clear-button-visible></vaadin-text-field>
      <vaadin-grid id="table" theme="row-dividers">
        <vaadin-grid-column id="idcolumn" header="UUID" path="uuid"></vaadin-grid-column>
        <vaadin-grid-column id="majorcolumn" header="MAJOR" path="major"></vaadin-grid-column>
        <vaadin-grid-column id="minorcolumn" header="MINOR" path="minor"></vaadin-grid-column>
        <vaadin-grid-column id="latitudecolumn" header="LATITUDE" path="latitude"></vaadin-grid-column>
        <vaadin-grid-column id="longitudecolumn" header="LONGITUDE" path="longitude"></vaadin-grid-column>
        <vaadin-grid-column id="locationcolumn" header="LOCATION"></vaadin-grid-column>
      </vaadin-grid>
    `
  }

  async firstUpdated() {
    let self = this
    let root = this.shadowRoot

    const spinner = root.getElementById('spinner')
    const search = root.getElementById('search')
    const table = root.getElementById('table')

    search.onchange = () => {
      let results = searchBeacons(self.beacons, search.value)

      if (!!results) {
        table.items = results
      } else {
        table.items = self.beacons
      }
    }

    root.getElementById('locationcolumn').renderer = (root, grid, rowData) => {
      root.textContent = (rowData.item.location || rowData.item.address) + ' (' + rowData.item.cap + ')'
    }

    spinner.active = true
    search.style.visibility = 'hidden'
    table.style.visibility = 'hidden'

    self.beacons = await getBeacons()

    table.items = self.beacons

    spinner.style.display = 'none'
    search.style.visibility = 'visible'
    table.style.visibility = 'visible'
  }

}

customElements.define('beacon-pois-table', BeaconPoisTableView)