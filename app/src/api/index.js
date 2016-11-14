import Vue from 'vue'

// API_ROOT = ?apiRoot=localhost ? 'localhost' : hostname
const API_ROOT = (() => {
  const search = decodeURIComponent(window.location.search.substr(1))
  if (search.length === 0) {
    return window.location.hostname
  }

  const params = search.split('&')
  let paramObject = {}
  params.forEach(p => {
    const pair = p.split('=')
    paramObject[pair[0]] = pair[1]
  })

  if (paramObject.apiRoot === 'localhost') {
    return 'localhost'
  } else {
    return window.location.hostname
  }
})()

export default {
  apiRequest (params, options) {
    const opts = options || {}

    params.uri = params.uri.substr(1)
    const data = JSON.stringify(params)

    Vue.http.post(`https://${API_ROOT}:3000`, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length.toString()
      },
      params: data
    }).then(res => {
      opts.onSuccess(res.body.response)
    }).catch(res => {
      opts.onFailure(res.body)
    })
  }
}

