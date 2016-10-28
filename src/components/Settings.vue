<template>
  <div>
    <h3 style="margin-top: 0;">Settings</h3>
    <div class="form-group">
      <label>Destination to save to</label>
      <div class="radio">
        <label>
          <input type="radio" name="save-to" value="memory" v-model="saveTo">
          Memory
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="save-to" value="localstorage" v-model="saveTo">
          LocalStorage
        </label>
      </div>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-danger" style="width: 100%;" @click="DELETE_HISTORY">Delete history</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { DELETE_HISTORY, CHANGE_SETTINGS_SAVETO } from '../store/mutation-types'

export default {
  props: ['apiList'],
  computed: {
    saveTo: {
      get () {
        return this.$store.state.history.saveTo
      },
      set (val) {
        this.$store.commit(CHANGE_SETTINGS_SAVETO, val)
      }
    }
  },
  methods: {
    ...mapMutations({
      DELETE_HISTORY
    })
  }
}
</script>
