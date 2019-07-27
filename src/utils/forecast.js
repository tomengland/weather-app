const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b343aaa5ed84e0d2b27cc16e3409ea11/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback(error, undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temperature = body.currently.temperature
            const precipitation = body.currently.precipProbability
            const humidity = body.currently.humidity
            const windSpeed = body.currently.windSpeed
        
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out.  There is a ' + precipitation + '% chance of rain. ' + 'The humidity is ' + humidity + '%. The wind speed is ' + windSpeed + ' mph.')
        }
    })
}

module.exports = forecast