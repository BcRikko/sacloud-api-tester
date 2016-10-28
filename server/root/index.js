const sacloud = require('sacloud')

const _prevalidate = (data) => {
  if (!data) {
    return {
      status: 400,
      message: 'Bad Request - There is no parameter.'
    }
  }

  var jsonData
  try {
    jsonData = JSON.parse(data)
    JSON.parse(jsonData.params)
  } catch (e) {
    return {
      status: 400,
      message: `Bad Request - ${e.message}`
    }
  }

  if (!(jsonData.accessToken && jsonData.secretToken)) {
    return {
      status: 401,
      message: 'Unauthorized - AccessToken and SecretToken are required fields.'
    }
  }

  if (!(jsonData.zone && jsonData.uri)) {
    return {
      status: 404,
      message: 'Not Found - Zone and URI are required fields'
    }
  }
}

const request = (req, res) => {
  const preResult = _prevalidate(req.body.data)
  if (preResult) {
    res.status(400).json({
      status: {
        code: preResult.status,
        message: preResult.message
      },
      response: {}
    })
    return
  }

  const data = JSON.parse(req.body.data)
  sacloud.API_ROOT = `https://secure.sakura.ad.jp/cloud/zone/${data.zone}/api/cloud/1.1/`

  const client = sacloud.createClient({
    accessToken: data.accessToken,
    accessTokenSecret: data.secretToken,
    disableLocalizeKeys: true,
    debug: process.env.NODE_ENV !== 'production'
  })

  const param = {
    method: data.method || 'GET',
    path: data.uri,
    body: data.params && JSON.parse(data.params)
  }

  client.createRequest(param).send((err, result) => {
    console.log(err)
    const response = {
      status: {
        code: result.responseInfo.status,
        message: result.responseInfo.statusText
      },
      response: result
    }

    res.status(response.status.code)
    res.json(response)
  })
}

module.exports = request
