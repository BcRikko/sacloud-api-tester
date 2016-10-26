export default {
  apiRequest (params, callback) {
    params.uri = params.uri.substr(1)
    const data = JSON.stringify(params)
    window.fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length.toString()
      },
      body: data

    }).then(res => {
      return res.json()
    }).then(result => {
      const status = result.status.code || result.response.responseInfo.status
      if (status >= 200 && status < 300) {
        // success
        callback(result.response.response)
      } else {
        // failure
        callback(result)
      }
    }).catch((err) => {
      console.log(err.message)
      callback()
    })
  }
}

