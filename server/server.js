const express = require('express')
const bodyParser = require('body-parser')
const sacloud = require('sacloud')
const app = express()

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
  console.log('Something is happening.')
  next()
})

router.post('/', (req, res) => {
  res.contentType('application/json')

  // validate
  if (!(req.body.accessToken && req.body.secretToken && req.body.uri)) {
    res.status(400).json({
      status: {
        code: 400,
        message: 'Bad Request'
      },
      response: {}
    })
    return
  }

  const client = sacloud.createClient({
    accessToken: req.body.accessToken,
    accessTokenSecret: req.body.secretToken,
    debug: false
  })

  const params = {
    method: req.body.method || 'GET',
    path: req.body.uri,
    body: req.body.params
  }

  client.createRequest(params).send((err, result) => {
    const response = {
      status: {
        code: result.responseInfo.status,
        message: result.responseInfo.statusText
      },
      response: result
    }
    if (err) {
      res.status(result.responseInfo.status)
    }

    res.json(response)
  })
})

app.use('/', router)

app.listen(port)
console.log(`listen on port ${port}`)
