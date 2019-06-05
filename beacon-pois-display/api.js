export async function getBeacons() {
  let response = await fetch('http://127.0.0.1:9020/beacons', {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json'
    })
  })

  let json = await response.json()

  return json.filter(beacon => !!beacon.latitude && !!beacon.longitude && (!!beacon.address || !!beacon.location))
}

export async function getNearestPOI(latitude, longitude) {
  let response = await fetch('http://127.0.0.1:9020/pois?latitude=' + latitude + '&longitude=' + longitude, {
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