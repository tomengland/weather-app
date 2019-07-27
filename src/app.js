const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// PATHS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views/partials location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thomas England'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Thomas England'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is a help page.',
        name: 'Thomas England'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address (city or zipcode)'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log('Location found: ' + place) 

            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        title: '404 Page',
        name: 'Thomas England'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404 Page',
        name: 'Thomas England'
    })
})
app.listen(port, () => {
    console.log('Server is up! On Port: ' + port)
})