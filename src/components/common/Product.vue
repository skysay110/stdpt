<template>
  <mu-ripple class="m-mu-ripple"
             @click="goDetail(it)"
             @touchmove="$emit('move')"
             @touchstart="$emit('start',it.CPID)"
             @touchend="$emit('end')"
             :opacity="0.7">
    <div class="product mui-table-view-cell">
      <div class="product_img">
        <img v-if="type === 'rx'" :key="it.CPTP[0]" v-lazy="it.CPTP[0]">
        <img v-else :key="img" v-lazy="img">
      </div>
      <div class="product_info">
        <div class="info_top">
          <span>{{it.CPMC}}</span>
          <span id="FKSJ">{{it.FKSJ}}放款</span>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div>
            <div class="info_mid">
              <span>月利息: <span class="num_cor">{{it.ZXLX}}% - {{it.ZDLX}}%</span></span>
              <span>最高额度: <span class="num_cor">{{it.ZDED}}万</span></span>
            </div>
            <div class="info_bottom">
              <span>{{it.CPTD}}</span>
            </div>
          </div>
          <div style="display: flex;flex-direction: column;justify-content: space-between;height: 1.28rem;">
            <div class="tag_box">
              <span id="tag" v-for="(tag,index) in tags" v-if="index<2">{{tag}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mu-ripple>
</template>

<script>
  import Config from '@/Config'

  export default {
    name: "Product",
    data() {
      return {
        emptyImg: require('@/assets/images/empty_img.png')
      }
    },
    computed: {
      tags() {
        return this.it.CPBQ && this.it.CPBQ.split("|");
      },
      img() {
        if (!this.it.CPTP[0]) {
          return this.emptyImg;
        } else {
          return Config.url_file + this.it.CPTP[0]
        }
      }
    },
    methods: {
      goDetail(it) {
        if (this.type === "rx") {
          this.$router.push({
            path: '/productDetail',
            query: {type: 'isrx', idx: this.idx, id: it.ID}
          });
        } else {
          if (this.form === 'favorites') {
            this.$router.push({path: 'productDetail', query: {id: it.CPID}})
          } else {
            this.$router.push({path: 'productDetail', query: {id: it.ID}})
          }
        }
      },
    },
    props: {
      it: Object,
      form: '',
      type: '',
      idx: 0
    }
  }
</script>

<style lang="less" scoped>
  @ocor: #f78462;
  @num_cor: #ff4a0b;

  .mui-table-view-cell:after {
    height: 0;
  }

  .product {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 12px 6px 12px 12px;
    border-bottom: 1px solid #eeeeee;
    .product_img {
      height: 96px;
      width: 96px;
      text-align: center;
      display: flex;
      border: 1px solid #eeeeee;
      background-color: #ffffff;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 90%;
        border-radius: 10px;
      }
    }
    .product_info {
      margin-left: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .info_top {
        display: flex;
        justify-content: space-between;
        line-height: 22px;
        font-size: 16px;
        color: #333333;
      }
      .info_mid {
        color: #979797;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        span {
          font-size: 12px;
          height: 22px;
          line-height: 22px;
        }
        .num_cor {
          color: #ff4a0b;
        }
      }
      .info_bottom {
        font-size: 12px;
        color: #979797;
        display: flex;
        justify-content: space-between;
        line-height: 18px;
      }
    }
    #FKSJ {
      font-size: 12px;
      color: #c1b35d;
      text-align: right;
    }
    .tag_box {
      display: flex;
      flex-direction: column;
      #tag {
        overflow: hidden;
        width: 70px;
        background: #ffebe2;
        color: @ocor;
        margin-top: 5px;
        text-align: center;
        border-radius: 50px;
        font-size: 10px;
        white-space: nowrap;
        line-height: 22px;
      }
    }
  }

  .m-mu-ripple {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    color: rgba(33, 150, 243, 0.27);
  }
</style>
