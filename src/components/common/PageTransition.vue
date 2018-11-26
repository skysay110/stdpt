<template>
  <div>
    <appbar></appbar>
    <transition :name="transitionName">
      <navigation>
        <router-view
          ref="child"
          class="child-view">
        </router-view>
      </navigation>
    </transition>
    <mu-paper class="bottom_nav" :z-depth="10">
      <BottomNav :currentPage="child"></BottomNav>
    </mu-paper>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import BottomNav from "./BottomNav";
  import Appbar from "./AppBar";

  export default {
    name: 'PageTransition',
    components: {Appbar, BottomNav},
    data() {
      return {
        transitionName: '',
        title: '速贷通服务平台',
        showBack: false,
        child: {}
      }
    },
    beforeRouteUpdate(to, from, next) {
      let isBack = this.$router.isBack;
      this.showBack = to.meta.type !== 'HomePage';
      this.title = to.meta.title;
      this.commit_title(to.meta.title);
      this.commit_show_nav_back(to.meta.type !== "HomePage");
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      mui.init({
        swipeBack: to.meta.type !== 'HomePage'
      });
      if (to.meta.type === 'HomePage' &&
        from.meta.type === 'HomePage') {
        this.transitionName = 'not-transition';
      } else {
        this.$router.isBack = false;
      }
      next();
    },
    methods: {
      ...mapActions([
        'commit_title',
        'commit_tab_index',
        'commit_show_nav_back'
      ]),
    },
    computed: {
      ...mapGetters([
        'get_title'
      ])
    },
    mounted() {
      this.commit_tab_index(1);
      this.child = this.$refs.child
    },
    created() {
      // this.$navigation.on('forward', (to, from) => {
      //   debugger
      // });
      // this.$navigation.once('back', (to, from) => {
      //   debugger
      // });
      // this.$navigation.on('replace', (to, from) => {
      //   debugger
      // });
      // this.$navigation.off('refresh', (to, from) => {
      //   debugger
      // });
      // this.$navigation.on('reset', () => {
      //   debugger
      // })
    }
  }
</script>

<style lang="less" scoped>
  .child-view {
    transition: all 400ms cubic-bezier(.55, 0, .1, 1);
    height: 100%;
    padding-top: 56px;
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
    padding-bottom: 56px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .slide-left-enter, .slide-right-leave-active {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    z-index: 1;
  }

  .slide-left-leave-active, .slide-right-enter {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    z-index: -1;
  }

  .not-transition-enter, .not-transition-leave-active {
    transition: all 0s;
  }

  .bottom_nav {
    bottom: 0;
    width: 100%;
    height: 56px;
    position: fixed;
  }
</style>
