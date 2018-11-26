<template>
  <mu-dialog :overlay-close="false"
             width="360" :open.sync="open">
    <lottie v-on:animCreated="handleAnimation"
            :options="options"></lottie>
  </mu-dialog>
</template>

<script>
  import Lottie from 'vue-lottie';

  export default {
    name: "AnimatorDialog",
    components: {Lottie},
    methods: {
      handleAnimation(anim) {
        let _this = this;
        anim.addEventListener('complete', function () {
          _this.$emit('update:open', _this.options.loop);
          _this.$emit('animationPlayComplete');
        })
      },
    },
    props: {
      options: {
        type: Object,
        required: true
      },
      open: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
