<template>
  <div class="container_view"
       :class="fullPage?'full_page':''"
       ref="ContainerView" @scroll="pageScroll">
    <transition name="fade" mode="out-in">
      <template v-if="isLoading">
        <div v-if="loadingType==='list'"
             class="loading_page"
             :class="fullPage?'full_loading':''">
          <lottie :options="listOptions"></lottie>
        </div>
        <lottie :width="200" v-else
                :options="defaultOptions"></lottie>
      </template>
      <slot v-else></slot>
    </transition>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie';

  export default {
    name: "ContainerView",
    components: {Lottie},
    data() {
      return {
        listOptions: {animationData: this.$animatorData.listAnimator},
        defaultOptions: {animationData: this.$animatorData.loadingAnimator},
        scrollTop: 0,
      }
    },
    methods: {
      pageScroll() {
        this.scrollTop = this.$refs.ContainerView.scrollTop
      },
    },
    mounted() {

    },
    activated() {
      this.$refs.ContainerView.scrollTop = this.scrollTop
    },
    props: {
      fullPage: {
        type: Boolean,
        default: false
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      loadingType: {},
    }
  }
</script>

<style lang="less" scoped>
  .container_view {
    flex: 1;
    background: #FFF;
    height: 100%;
    overflow: scroll;
  }

  .full_page {
    position: absolute;
    top: 0;
    padding-top: 56px;
    left: 0;
    z-index: 1;
    padding-bottom: 0;
  }

  .loading_page {
    display: flex;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    position: absolute;
    width: 100%;
    flex: 1;
    top: 0;
    margin-top: 76px;
    margin-bottom: 56px;
  }

  .container_view::-webkit-scrollbar {
    display: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
