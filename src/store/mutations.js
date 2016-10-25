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
  },

  [types.CHANGE_ZONE] (state, zone) {
    state.request.zone = zone
  },
  [types.CHANGE_METHOD] (state, method) {
    state.request.method = method
  },
  [types.CHANGE_URI] (state, uri) {
    state.request.uri = uri
  },
  [types.CHANGE_PARAMS] (state, params) {
    state.request.params = params
  }
}
