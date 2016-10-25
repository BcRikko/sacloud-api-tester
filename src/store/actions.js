import * as types from './mutation-types'
import api from '../api'

export default {
  [types.API_REQUEST] ({ commit }, { params, callback }) {
    api.apiRequest(params, (result) => {
      commit(types.API_REQUEST, result)
      if (callback) { callback() }
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
