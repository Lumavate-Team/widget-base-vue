<template>
  <div>
    <lumavate-toolbar></lumavate-toolbar>
    <div>Testing</div>
  </div>
</template>

<script>
export default {
  name: 'foo',
  computed: {
    instance () {
      return this.$store.state.instanceData
    }
  }
}
</script>

<style scoped>
</style>
