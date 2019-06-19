const BEACONS_ENDPOINT_URL = 'https://api.beacon.bz.it/v1/infos'
const SUEDTIROL_INFO_ENDPOINT_URL = 'https://service.suedtirol.info/api/ODHActivityPoi?latitude={{LAT}}&longitude={{LNG}}&radius={{RDS}}&pagesize={{CNT}}'

export async function getBeacons() {
  let response = await fetch('https://cors.io/?' + BEACONS_ENDPOINT_URL, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json'
    })
  })

  let json = await response.json()

  return json.filter(beacon => !!beacon.latitude && !!beacon.longitude && (!!beacon.address || !!beacon.location))
}

export async function getNearestPOI(latitude, longitude) {
  var url = SUEDTIROL_INFO_ENDPOINT_URL
  url = url.replace('{{LAT}}', latitude)
  url = url.replace('{{LNG}}', longitude)
  url = url.replace('{{RDS}}', 50)
  url = url.replace('{{CNT}}', 1)

  let response = await fetch('https://cors.io/?' + url, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json'
    })
  })

  let json = await response.json()

  if (!!json.Items && json.Items.length === 1) {
    return json.Items[0]
  }

  return null
}