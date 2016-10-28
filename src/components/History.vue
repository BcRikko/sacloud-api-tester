<template>
  <div>
    <h3 style="margin-top: 0;">History</h3>
    <p v-if="hasHistorys" class="bg-info" style="padding: 15px;">There is no history.</p>
    <div class="list-group">
      <button v-for="h in historys" @click="selectHistory(h)" class="list-group-item" style="overflow: hidden; text-overflow: ellipsis;">
        <div class="card">
          <div class="card-block">
            <h5>{{ h.date }}</h5>
            <p>{{ getZoneName(h.request.zone) }}</p>
            <p>{{ h.request.method}} {{ h.request.uri}}</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SELECT_HISTORY } from '../store/mutation-types'

const zones = {
  is1a: 'Ishikari 1st',
  is1b: 'Ishikari 2nd',
  tk1a: 'Tokyo 1st',
  tk1v: 'Sandbox'
}

export default {
  props: ['apiList'],
  computed: {
    ...mapGetters([
      'historys'
    ]),
    hasHistorys () {
      return !this.historys || this.historys.length <= 0
    }
  },
  methods: {
    selectHistory (history) {
      // 双方向バインディングされるのでひとつひとつ渡す
      this.$store.commit(SELECT_HISTORY, {
        request: {
          zone: history.request.zone,
          method: history.request.method,
          uri: history.request.uri,
          params: history.request.params
        },
        response: history.response
      })
    },
    getZoneName (zone) {
      return zones[zone]
    }
  }
}
</script>
