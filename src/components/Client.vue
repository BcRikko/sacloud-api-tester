<template>
  <div class="client">
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

        <label>Request</label>
        <div class="form-inline">
          <div class="form-group">
            <label for="zone" hidden>Zone:</label>
            <select id="zone" class="form-control" v-model="$store.state.request.zone">
              <option value="is1a">Ishikari 1st</option>
              <option value="is1b">Ishikari 2nd</option>
              <option value="tk1a">Tokyo 1st</option>
              <option value="tk1s">Sandbox</option>
            </select>
          </div>
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{$store.state.request.method}} <span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li><a @click="changeMethod('GET')">GET</a></li>
                <li><a @click="changeMethod('POST')">POST</a></li>
                <li><a @click="changeMethod('PUT')">PUT</a></li>
                <li><a @click="changeMethod('DELETE')">DELETE</a></li>
              </ul>
            </div>
            <input id="http-uri" type="text" class="form-control" style="width: 400px;"　placeholder="/server/123456789012/power" v-model="$store.state.request.uri">
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
            <editor editor-id="reqEditor" :content="getRequestParams" v-on:change-content="changeParams"></editor>
          </div>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="panel panel-default">
          <div class="panel-heading">Response</div>
          <div class="panel-body" style="height: 500px;">
            <editor editor-id="resEditor" :content="getResponse" v-on:change-content="changeResponse"></editor>
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
</style>

<script>
import Editor from './Editor'
import { API_REQUEST } from '../store/mutation-types'

export default {
  components: {
    Editor
  },
  data () {
    return {
      accessToken: '',
      secretToken: '',
      requestParams: '',
      response: ''
    }
  },
  computed: {
    getResponse () {
      return this.$store.state.response
    },
    getRequestParams () {
      return this.$store.state.request.params
    }
  },
  methods: {
    validationToken (token) {
      return !token || token.trim().length === 0
    },
    changeMethod (method) {
      this.$store.state.request.method = method
    },
    run () {
      const param = {
        accessToken: this.accessToken,
        secretToken: this.secretToken,
        zone: this.$store.state.request.zone,
        method: this.$store.state.request.method,
        uri: this.$store.state.request.uri,
        params: this.requestParams || '{}'
      }

      this.$store.dispatch(API_REQUEST, param)
      return this
    },
    changeParams (value) {
      this.requestParams = value
    },
    changeResponse (value) {
      this.response = value
    }
  }
}
</script>
