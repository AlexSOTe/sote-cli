<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    provide() {
      return {
      }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
</style>
