<template>
  <div id="app">
    <router-view id="router"></router-view>
  </div>
</template>

<script>

	export default {
		name: 'App',
		mounted() {

		}
	}
</script>

<style lang="less">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    overflow: hidden;
  }

  #app::-webkit-scrollbar {
    display: none;
  }

  #router {
    /*height: 100%;*/
  }
</style>
