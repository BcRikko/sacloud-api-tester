import * as types from './mutation-types'
import api from '../api'

export default {
  [types.API_REQUEST] ({ commit }, { params, callback }) {
    api.apiRequest(params, {
      onSuccess: (result) => {
        commit(types.API_REQUEST, result.response.response)
        if (callback) { callback(result) }
      },
      onFailure: (result) => {
        const data = result.responseJSON || result
        commit(types.API_REQUEST, data)
        if (callback) { callback(data) }
      }
    })
  },

  [types.SELECT_API] ({ commit }, api) {
    const match = api.match(/(GET|POST|PUT|DELETE) (.+)/)
    commit(types.SELECT_API, {
      method: match[1],
      uri: match[2]
    })
  }
}
