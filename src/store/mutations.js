import * as types from './mutation-types'

export default {
  [types.API_REQUEST] (state, result) {
    const response = JSON.stringify(result, null, '  ')
    state.response = response
  },
  [types.SELECT_API] (state, api) {
    state.request.method = api.method
    state.request.uri = api.uri
  }
}
