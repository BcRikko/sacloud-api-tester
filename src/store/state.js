export default {
  tokens: {
    accessToken: window.localStorage.getItem('sacloud-api-tester:access-token') || '',
    secretToken: window.localStorage.getItem('sacloud-api-tester:secret-token') || ''
  },
  apiList: [],
  request: {
    zone: 'is1b',
    method: 'GET',
    uri: '/server',
    params: '{}'
  },
  response: {},
  history: {
    saveTo: window.localStorage.getItem('sacloud-api-tester:saveTo') || 'memory',
    list: (() => {
      const history = window.localStorage.getItem('sacloud-api-tester:history')
      if (!history) return []

      try {
        return JSON.parse(history)
      } catch (e) {
        return []
      }
    })()
  }
}
