export default {
  apiRequest (params, options) {
    const opts = options || {}

    params.uri = params.uri.substr(1)
    const data = JSON.stringify(params)

    window.jQuery.post('http://localhost:3000', {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length.toString()
      },
      data: data
    }).done((res) => {
      opts.onSuccess(res)
    }).fail((err) => {
      opts.onFailure(err)
    })
  }
}

