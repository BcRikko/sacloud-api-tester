<template>
  <div :id="editorId" style="width: 100%; height: 100%;"></div>
</template>

<script>
export default {
  props: ['editorId', 'paramId', 'content'],
  data () {
    return {
      editor: Object
    }
  },
  watch: {
    'content' (value) {
      this.editor.setValue(value)
    }
  },
  mounted () {
    this.editor = window.ace.edit(this.editorId)
    this.editor.setTheme('ace/theme/github')
    this.editor.getSession().setMode('ace/mode/json')

    this.editor.on('change', () => {
      this.$parent[this.paramId] = this.editor.getValue()
    })
  }
}
</script>
