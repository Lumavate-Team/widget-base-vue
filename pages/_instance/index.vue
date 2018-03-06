<template>
  <div>
    <lumavate-toolbar backgroundcolor='#ACACAC'
      items='[
      {"title":"Home","icon":"home","url":"http://google.com","color":"red"},
      {"title":"Good","icon":"note_add","url":"http://google.com","color":"blue"},
      {"title":"Away","icon":"delete","url":"http://cnn.com"}]'>
    </lumavate-toolbar>
    <div class="title">{{ instance.myText }}</div>
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
