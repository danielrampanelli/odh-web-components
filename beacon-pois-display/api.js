export async function getBeacons() {
  let response = await fetch('https://cors.io/?https://api.beacon.bz.it/v1/infos', {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json'
    })
  })

  let json = await response.json()

  return json.filter(beacon => !!beacon.latitude && !!beacon.longitude && (!!beacon.address || !!beacon.location))
}

export async function getNearestPOI(latitude, longitude) {
  let response = await fetch('https://cors.io/?https://service.suedtirol.info/api/ODHActivityPoi?pagesize=1&latitude=' + latitude + '&longitude=' + longitude + '&radius=50', {
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