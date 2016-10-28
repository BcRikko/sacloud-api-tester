import * as types from './mutation-types'

export default {
  // Client
  [types.API_REQUEST] (state, result) {
    const response = JSON.stringify(result, null, '  ')
    state.response = response

    state.history.list.push({
      date: window.moment().format('YYYY/MM/DD HH:mm:ss'),
      request: {
        zone: state.request.zone,
        method: state.request.method,
        uri: state.request.uri,
        params: state.request.params
      },
      response: state.response
    })

    if (state.history.saveTo === 'localstorage') {
      window.localStorage.setItem('sacloud-api-tester:history', JSON.stringify(state.history.list))
    }
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
  },

  // API List
  [types.SELECT_API] (state, api) {
    state.request.method = api.method
    state.request.uri = api.uri
  },

  // History
  [types.SELECT_HISTORY] (state, history) {
    state.request = history.request
    state.response = history.response
  },
  [types.DELETE_HISTORY] (state) {
    state.history.list = []
  },

  // Settings
  [types.CHANGE_SETTINGS_SAVETO] (state, saveTo) {
    state.history.saveTo = saveTo
    window.localStorage.setItem('sacloud-api-tester:saveTo', saveTo)

    if (saveTo === 'memory') {
      window.localStorage.removeItem('sacloud-api-tester:history')
    }
  }
}
