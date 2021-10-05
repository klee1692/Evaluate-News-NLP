const dotenv = require('dotenv')
dotenv.config()
console.log(`Your API key is ${process.env.API_KEY}`)

var path = require('path')

const mockAPIResponse = require('./mockAPI.js')

const express = require('express')
const app = express()
app.use(express.static('dist'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const fetch = require('node-fetch')

const cors = require('cors');
app.use(cors());



console.log(__dirname)

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/getAnalysis', async function (req, res) {

    console.log(req.body);

    const apiKey = process.env.API_KEY;

    const analysis = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${req.body.formText}`)
    try {
        const results = await analysis.json()
        console.log(results)
        res.send(results)
    } catch (error) {
        console.log(error)
    }
})
