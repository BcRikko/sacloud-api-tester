const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const app = express()

const sslOptions = {
  key: fs.readFileSync(`${__dirname}/keys/server.key`),
  cert: fs.readFileSync(`${__dirname}/keys/server.crt`)
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const port = process.env.PORT || 3000
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.post('/', require('./root'))
app.use('/', router)

https.createServer(sslOptions, app).listen(port)
console.log(`listen on port ${port}`)
