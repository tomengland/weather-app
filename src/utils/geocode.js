const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2dG9tZW5nbGFuZCIsImEiOiJjanlncWN3OGgwM3JqM21rMnppbGZ3Z2luIn0.G5Fw40YTFZumuvyYd_Gouw&limit=1"
    request({ url: geocodeURL, json: true}, (error, { body }) => {
        if (error) {
            callback('Could not connect to API', undefined)
        } else if (body.features.length === 0) {
            callback('Try again, no match was found based on what you entered', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
