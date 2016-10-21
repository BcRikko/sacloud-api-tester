import * as types from './mutation-types'
import api from '../api'

export default {
  [types.API_REQUEST] ({ commit }, params) {
    api.apiRequest(params, (result) => {
      commit(types.API_REQUEST, result)
    })
  },

  [types.SELECT_API] ({ commit }, api) {
    const match = api.match(/(GET|POST|PUT|DELETE) (.+)/)
    debugger
    commit(types.SELECT_API, {
      method: match[1],
      uri: match[2]
    })
  }
}
