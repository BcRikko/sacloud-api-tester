import * as types from './mutation-types'

export default {
  [types.API_REQUEST] (state, result) {
    const response = JSON.stringify(result, null, '  ')
    state.response = response

    state.history.push({
      request: {
        zone: state.request.zone,
        method: state.request.method,
        uri: state.request.uri,
        params: state.request.params
      },
      response: state.response
    })
  },
  [types.SELECT_API] (state, api) {
    state.request.method = api.method
    state.request.uri = api.uri
  }
}
