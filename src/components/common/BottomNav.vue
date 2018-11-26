<template>
  <mu-bottom-nav ref="bottomNav" :value="get_tab_index" @change="changePage">
    <mu-bottom-nav-item :value="0" title="发布需求" icon="restore"></mu-bottom-nav-item>
    <mu-bottom-nav-item :value="1" title="浏览产品" icon="favorite"></mu-bottom-nav-item>
    <mu-bottom-nav-item :value="2" title="我的" icon="location_on"></mu-bottom-nav-item>
  </mu-bottom-nav>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "BottomNav",
    props: ['currentPage'],
    methods: {
      ...mapActions([
        'commit_tab_index'
      ]),
      changePage(idx) {
        let page;
        switch (idx) {
          case 0:
            page = 'index';
            break;
          case 1:
            page = 'productList';
            break;
          case 2:
            page = 'mine';
            break
        }
        if (this.currentPage.isLoading) {
          this.$refs.bottomNav.activeValue = this.get_tab_index;
        } else {
          this.commit_tab_index(idx);
          this.$router.replace(page)
        }
      },
    },
    computed: {
      ...mapGetters([
        'get_tab_index'
      ])
    }
  }
</script>

<style scoped>
  .mu-bottom-nav {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
