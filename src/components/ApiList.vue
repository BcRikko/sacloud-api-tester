<template>
  <div>
    <div class="form-group has-feedback">
        <span class="glyphicon glyphicon-search form-control-feedback"></span>
        <input id="search" type="text" class="form-control" placeholder="Search..." v-model.trim="searchText">
      </div>
    <div class="list-group">
      <button class="list-group-item" style="overflow: hidden; text-overflow: ellipsis;" v-for="api in filterdList" @click="SELECT_API(api.uri)" data-toggle="tooltip" data-placement="top" :title="api.desc">{{api.uri}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { SELECT_API } from '../store/mutation-types'

export default {
  methods: {
    ...mapActions({
      SELECT_API
    })
  },
  props: {
    apiList: {
      uri: String,
      desc: String
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    filterdList () {
      if (!this.searchText) return this.apiList

      return this.apiList.filter(a => {
        const target = a.uri.toLowerCase()
        return this.searchText.toLowerCase().split(' ').every(s => target.includes(s))
      })
    }
  },
  created () {
    window.$(function () {
      window.$('[data-toggle="tooltip"]').tooltip()
    })
  }
}
</script>
