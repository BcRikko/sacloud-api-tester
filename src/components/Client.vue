<template>
  <div class="client">
    <div class="loader" v-show="loading"></div>
    <div class="navbar">
      <form class="form">
        <div class="form-group" :class="{ 'has-error' : validationToken(accessToken) }">
          <label for="access-token">Access Token</label>
          <input id="access-token" type="text" class="form-control" v-model="accessToken">
          <transition name="token">
            <p class="alert alert-danger" style="margin-top: 5px;" v-show="validationToken(accessToken)">Required input</p>
          </transition>
        </div>
        <div class="form-group" :class="{ 'has-error' : validationToken(secretToken) }">
          <label for="secret-token">Secret Token</label>
          <input id="secret-token" type="text" class="form-control" v-model="secretToken">
          <transition name="token">
            <p class="alert alert-danger" style="margin-top: 5px;"  v-show="validationToken(secretToken)">Required input</p>
          </transition>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="rememberMe"> Remember me
          </label>
        </div>
          <label>Request</label>
          <div class="form-inline">
            <div class="form-group">
              <label for="zone" hidden>Zone:</label>
              <select id="zone" class="form-control" v-model="zone">
                <option value="is1a">Ishikari 1st</option>
                <option value="is1b">Ishikari 2nd</option>
                <option value="tk1a">Tokyo 1st</option>
                <option value="tk1v">Sandbox</option>
              </select>
            </div>
            <div class="input-group">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{method}} <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a @click="CHANGE_METHOD('GET')">GET</a></li>
                  <li><a @click="CHANGE_METHOD('POST')">POST</a></li>
                  <li><a @click="CHANGE_METHOD('PUT')">PUT</a></li>
                  <li><a @click="CHANGE_METHOD('DELETE')">DELETE</a></li>
                </ul>
              </div>
              <input id="http-uri" type="text" class="form-control"　placeholder="/server/123456789012/power" v-model="uri" style="width: 360px;">
            </div>
            <button type="button" class="btn btn-primary" @click="run">Run</button>
          </div>
      </form>
    </div>
    <div class="main">
      <div class="col-sm-5">
        <div class="panel panel-default">
          <div class="panel-heading">Request params</div>
          <div class="panel-body" style="height: 500px;">
            <editor editor-id="reqEditor" :content="requestParams" @change-content="changeParams"></editor>
          </div>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="panel panel-default">
          <div class="panel-heading">Response</div>
          <div class="panel-body" style="height: 500px;">
            <editor editor-id="resEditor" :content="response" @change-content="changeResponse"></editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.token-transition {
  transition: opacity .5s;
}
.token-enter-active, .token-leave-active {
  transition: opacity .5s
}
.token-enter, .token-leave-active {
  opacity: 0
}

.loader {
  z-index: 99999;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(3,3,3,0.3);
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import Editor from './Editor'
import { API_REQUEST, CHANGE_ZONE, CHANGE_METHOD, CHANGE_URI, CHANGE_PARAMS } from '../store/mutation-types'

export default {
  components: {
    Editor
  },
  data () {
    return {
      accessToken: '',
      secretToken: '',
      rememberMe: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      method: state => state.request.method,
      response: state => state.response
    }),
    zone: {
      get () {
        return this.$store.state.request.zone
      },
      set (zone) {
        this.$store.commit(CHANGE_ZONE, zone)
      }
    },
    uri: {
      get () {
        return this.$store.state.request.uri
      },
      set (uri) {
        this.$store.commit(CHANGE_URI, uri)
      }
    },
    requestParams: {
      get () {
        return this.$store.state.request.params
      },
      set (params) {
        this.$store.commit(CHANGE_PARAMS, params)
      }
    }
  },
  mounted () {
    this.accessToken = window.localStorage.getItem('sacloud-api-tester:access-token')
    this.secretToken = window.localStorage.getItem('sacloud-api-tester:secret-token')
    if (this.accessToken || this.secretToken) {
      this.rememberMe = true
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_ZONE,
      CHANGE_METHOD
    }),
    validationToken (token) {
      return !token || token.trim().length === 0
    },
    changeMethod (method) {
      this.$store.state.request.method = method
    },
    run () {
      if (this.rememberMe) {
        window.localStorage.setItem('sacloud-api-tester:access-token', this.accessToken)
        window.localStorage.setItem('sacloud-api-tester:secret-token', this.secretToken)
      } else {
        window.localStorage.removeItem('sacloud-api-tester:access-token')
        window.localStorage.removeItem('sacloud-api-tester:secret-token')
      }

      const params = {
        accessToken: this.accessToken,
        secretToken: this.secretToken,
        zone: this.zone,
        method: this.method,
        uri: this.uri,
        params: this.requestParams || ''
      }

      this.loading = true
      this.$store.dispatch(API_REQUEST, {
        params: params,
        callback: () => {
          this.$data.loading = false
        }
      })
    },
    changeParams (value) {
      this.$store.commit(CHANGE_PARAMS, value)
    },
    changeResponse (value) {
      this.response = value
    }
  }
}
</script>
