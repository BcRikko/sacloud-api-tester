<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="container-fluid">
      <div class="row">
        <sidebar class="col-sm-3" :apiList="apiList"></sidebar>
        <client class="col-sm-9 col-sm-offset-3"></client>
      </div>
    </div>
  </div>
</template>

<style>
body { padding-top: 90px; }
</style>

<script>
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import Client from './components/Client'

import rawData from './assets/api_rawdata.json'

const apiData = (() => {
  const map = []
  for (let d in rawData) {
    map.push({
      uri: d,
      desc: rawData[d]
    })
  }
  return map
})()

export default {
  name: 'app',
  components: {
    TopBar,
    Sidebar,
    Client
  },
  data () {
    return {
      apiList: apiData
    }
  }
}
</script>
