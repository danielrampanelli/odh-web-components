import { LitElement, html } from 'lit-element'
import '@polymer/paper-spinner/paper-spinner.js'
import '@vaadin/vaadin-dialog/vaadin-dialog.js'
import '@vaadin/vaadin-text-field/vaadin-text-field.js'
import { getBeacons, getNearestPOI } from './api.js'
import { searchBeacons } from './search.js'

class BeaconPoisMapView extends LitElement {

  constructor() {
    super()
  }

  render() {
    return html`
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css');

        :host {
          display: block;
          height: 100%;
          min-height: 320px;
          position: relative;
          z-index: 100;
        }

        #spinner {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        #search {
          background: #ffffff;
          padding: 0;
          position: absolute;
          right: 10px;
          top: 10px;
          width: 240px;
          z-index: 750;
        }

        #map {
          height: 100%;
          z-index: 500;
        }
      </style>
      <paper-spinner id="spinner"></paper-spinner>
      <vaadin-dialog id="dialog" theme="beacon"></vaadin-dialog>
      <vaadin-text-field id="search" placeholder="Search" clear-button-visible></vaadin-text-field>
      <div id="map"></div>
      <dom-module id="beacon-dialog-overlay-styles" theme-for="vaadin-dialog-overlay">
        <template>
          <style>
            :host([theme~="beacon"]) [part="overlay"] {
              z-index: 1000;
            }
          </style>
        </template>
      </dom-module>
    `
  }

  async firstUpdated() {
    let self = this
    let root = this.shadowRoot

    const spinner = root.getElementById('spinner')
    const dialog = root.getElementById('dialog')
    const search = root.getElementById('search')
    const mapElement = root.getElementById('map')

    dialog.renderer = (root, dialog) => {
      function createField(id, label) {
        const labelElement = window.document.createElement('label')
        labelElement.textContent = label
        labelElement.style.fontWeight = 'bold'

        const fieldElement = window.document.createElement('div')
        fieldElement.setAttribute('id', id)
        fieldElement.style.width = '480px'

        root.appendChild(labelElement)
        root.appendChild(fieldElement)
      }

      if (!root.firstElementChild) {
        createField('beacon-uuid', 'UUID')
        createField('beacon-major', 'MAJOR')
        createField('beacon-minor', 'MINOR')
        createField('beacon-position', 'POSITION')

        root.appendChild(window.document.createElement('hr'))

        createField('poi-id', 'ID')
        createField('poi-name', 'NAME')
        createField('poi-municipality', 'MUNICIPALITY')
        createField('poi-district', 'DISTRICT')
        createField('poi-position', 'POSITION')
      }

      let infos = dialog.poi.GpsInfo.filter(info => info.Gpstype === 'position')

      document.getElementById('beacon-uuid').textContent = dialog.beacon.uuid
      document.getElementById('beacon-major').textContent = dialog.beacon.major
      document.getElementById('beacon-minor').textContent = dialog.beacon.minor
      document.getElementById('beacon-position').textContent = dialog.beacon.latitude + ', ' + dialog.beacon.longitude

      document.getElementById('poi-id').textContent = dialog.poi.Id
      document.getElementById('poi-name').textContent = dialog.poi.Shortname
      document.getElementById('poi-municipality').textContent = dialog.poi.LocationInfo.MunicipalityInfo.Name.de
      document.getElementById('poi-district').textContent = dialog.poi.LocationInfo.DistrictInfo.Name.de
      document.getElementById('poi-position').textContent = infos[0].Latitude + ', ' + infos[0].Longitude
    }

    search.onchange = () => {
      const bounds = L.latLngBounds()

      for (var id in self.markers) {
        self.markers[id].removeFrom(self.map)
      }

      let results = searchBeacons(self.beacons, search.value)

      if (!!results) {
        results.forEach((match) => {
          let marker = self.markers[match.id]

          marker.addTo(self.map)
          bounds.extend(marker.getLatLng())
        })
      } else {
        for (var id in self.markers) {
          self.markers[id].addTo(self.map)
          bounds.extend(self.markers[id].getLatLng())
        }
      }

      if (bounds.isValid()) {
        self.map.fitBounds(bounds)
      }
    }

    spinner.active = true
    search.style.visibility = 'hidden'
    mapElement.style.visibility = 'hidden'

    self.beacons = await getBeacons()

    spinner.style.display = 'none'
    search.style.visibility = 'visible'
    mapElement.style.visibility = 'visible'

    self.markers = []

    self.map = L.map(mapElement, {
      zoomControl: true
    }).setView([ 46.49067, 11.33982 ], 13)

    self.map.scrollWheelZoom.disable()

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(self.map)

    const bounds = L.latLngBounds()

    self.beacons.forEach((beacon) => {
      const coordinate = [ beacon.latitude, beacon.longitude ]

      let marker = L.marker(coordinate, {
        title: beacon.name
      }).on('click', async () => {
        let poi = await getNearestPOI(beacon.latitude, beacon.longitude)
        dialog.beacon = beacon
        dialog.poi = poi
        dialog.opened = true
      })

      marker.addTo(self.map)

      bounds.extend(coordinate)

      self.markers[beacon.id] = marker
    })

    self.map.fitBounds(bounds)
  }

}

customElements.define('beacon-pois-map', BeaconPoisMapView)