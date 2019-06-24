import 'geolib/lib/index';

export function searchBeacons(beacons, query) {
  let normalizedQuery = query.trim().toLowerCase()

  if (!!normalizedQuery) {
    var latLngQuery = normalizedQuery.match(/^(?:(\d+(?:\.\d+)?)\s*(?:,|;)\s*(\d+(?:\.\d+)?)\s*(?:,|;)\s*(\d+)|(\d+(?:\,\d+)?)\s*;\s*(\d+(?:\,\d+)?)\s*;\s*(\d+))$/)
    if (!!latLngQuery) {
      let latitude = parseFloat((latLngQuery[1] || latLngQuery[4].replace(',', '.')))
      let longitude = parseFloat((latLngQuery[2] || latLngQuery[5].replace(',', '.')))
      let radius = parseInt(latLngQuery[3] || latLngQuery[6])

      return beacons.filter((beacon) => {
        let distance = geolib.getDistance({
          latitude: latitude,
          longitude: longitude
        }, {
          latitude: beacon.latitude,
          longitude: beacon.longitude
        })

        return distance <= (radius * 1000)
      })
    } else if (normalizedQuery.length >= 3) {
      return beacons.filter((beacon) => {
        var lookup = []
        lookup.push(beacon.uuid)
        lookup.push(beacon.major)
        lookup.push(beacon.minor)
        lookup.push(beacon.latitude)
        lookup.push(beacon.longitude)
        lookup.push(beacon.address || '')
        lookup.push(beacon.location || '')
        lookup.push(beacon.cap || '')

        return lookup.join(' ').toLowerCase().includes(query)
      })
    }
  }

  return null
}