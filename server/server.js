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

const request = (data, cb) => {
  console.log(JSON.stringify(data, null, ' '))

  const res = {
    status: '',
    data: ''
  }

  if (data.zone) {
    sacloud.API_ROOT = `https://secure.sakura.ad.jp/cloud/zone/${data.zone}/api/cloud/1.1/`
  }

  const client = sacloud.createClient({
    accessToken: data.accessToken,
    accessTokenSecret: data.secretToken,
    disableLocalizeKeys: true,
    debug: process.env.NODE_ENV !== 'production'
  })

  const params = {
    method: data.method || 'GET',
    path: data.uri,
    body: data.params && JSON.parse(data.params)
  }

  client.createRequest(params).send((err, result) => {
    console.log(err)
    const response = {
      status: {
        code: result.responseInfo.status,
        message: result.responseInfo.statusText
      },
      response: result
    }

    res.status = result.responseInfo.status
    res.data = response
    cb(res)
  })
}

router.post('/', (req, res) => {
  res.contentType('application/json')

  // validate
  if (req.body.data) {
    try {
      const data = JSON.parse(req.body.data)
      if (!(data.accessToken && data.secretToken && data.uri)) {
        res.status(400).json({
          status: {
            code: 400,
            message: 'Bad Request'
          },
          response: {}
        })
        return
      }

      request(data, (result) => {
        res.status(result.status)
        res.json(result.data)
      })
    } catch (e) {
      res.status(400).json({
        status: {
          code: 400,
          message: e.message
        },
        response: {}
      })
      return
    }
  }
})

app.use('/', router)

app.listen(port)
console.log(`listen on port ${port}`)
