<template>
  <div :id="editorId" style="width: 100%; height: 100%;"></div>
</template>

<script>
export default {
  props: ['editorId', 'content'],
  data () {
    return {
      editor: Object,
      beforeContent: ''
    }
  },
  watch: {
    'content' (value) {
      if (value !== this.beforeContent) {
        this.editor.setValue(value || '', -1)
      }
    }
  },
  mounted () {
    this.editor = window.ace.edit(this.editorId)
    this.editor.setTheme('ace/theme/github')
    this.editor.getSession().setMode('ace/mode/json')
    this.editor.getSession().setFoldStyle('markbegin')

    this.editor.on('change', () => {
      this.beforeContent = this.editor.getValue()
      this.$emit('change-content', this.editor.getValue())
    })
  }
}
</script>
