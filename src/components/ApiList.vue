<template>
  <div>
    <div class="form-group has-feedback">
      <span class="glyphicon glyphicon-search form-control-feedback"></span>
      <input id="search" type="text" class="form-control" placeholder="Search..." v-model.trim="searchText">
    </div>
    <div class="list-group">
      <div v-for="api in filterdList">
        <button class="list-group-item" style="overflow: hidden; text-overflow: ellipsis;" @click="SELECT_API(api.uri)">{{api.uri}}</button>
      </div>
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
  }
}
</script>
