<template>
  <div>
    <div class="title">{{ instance.barColor }}</div>
  </div>
</template>

<script>
export default {
  name: 'users',
  computed: {
    instance () {
      return this.$store.state.instanceData
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 16px;
    font-weight: 500;
    padding: 24px;
  }

  lumavate-toolbar /deep/ .container {
    padding: 8px;
  }
</style>
