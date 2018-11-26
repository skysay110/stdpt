<template>
  <mu-appbar style="width: 100%;" color="primary">
    <mu-button icon slot="left" v-show="get_isShowBack" @click="$router.goBack()">
      <mu-icon value="arrow_back"></mu-icon>
    </mu-button>
    {{get_title}}
  </mu-appbar>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "appbar",
    computed: {
      ...mapGetters([
        'get_title',
        'get_isShowBack'
      ])
    }
  }
</script>

<style scoped>
  .mu-appbar {
    position: absolute;
    top: 0;
  }
</style>
