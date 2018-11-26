<template>
  <container-view :isLoading="isLoading" :fullPage="true">
    <mu-load-more>
      <div class="product_detail">
        <div class="product_top">
          <div class="p_left">
            <img :src="img">
          </div>
          <div class="p_mid">
            <h4>{{pageData.CPMC}}</h4>
            <p>月利息: <span>{{pageData.ZXLX}}% - {{pageData.ZDLX}}%</span></p>
            <p>最高额度: <span>{{pageData.ZDED}}万</span></p>
          </div>
        </div>
        <div class="common">
          <div class="name">
            <span>公司名称</span>
          </div>
          <div class="tag-box">{{pageData.COMPANY}}</div>
        </div>
        <div class="common">
          <div class="name">
            <span>产品特点</span>
          </div>
          <div class="tag-box">{{pageData.CPTD}}</div>
        </div>
        <!--房贷开始-->
        <div v-if="pageData.CPLX === 1" class="common"
             style="flex-direction: column;">
          <div>
            <div @click="model1=!model1">
              <p class="title">一.产品介绍</p>
              <div class="tag_b">
                <div v-if="pageData.SXF" class="tag">服务费:{{pageData.SXF}}%</div>
                <div v-if="pageData.FFBZ" class="tag">{{pageData.FFBZ}}</div>
                <div class="arrow" :class="model1?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model1?'animate':''">
              <p v-if="pageData.SXF">服 务 费 : {{pageData.SXF}}%</p>
              <p v-if="pageData.FFBZ">反费标准 : {{pageData.FFBZ}}</p>
            </div>
          </div>
          <div>
            <div @click="model2=!model2">
              <p class="title">二.贷款方式及年限利率</p>
              <div class="tag_b">
                <div v-if="pageData.DYFS" class="tag">{{pageData.DYFS}}</div>
                <div v-if="pageData.ZXLX" class="tag">利息:{{pageData.ZXLX}}%</div>
                <div class="arrow" :class="model2?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model2?'animate':''">
              <p v-if="pageData.DYFS">抵押方式: {{pageData.DYFS}}</p>
              <p v-if="pageData.HKFS">还款方式: {{pageData.HKFS}}</p>
              <p v-if="pageData.DKNX">贷款年限: {{pageData.DKNX}}</p>
              <p v-if="pageData.ZXLX">利&emsp;&emsp;息 : {{pageData.ZXLX}}% - {{pageData.ZDLX}}%</p>
            </div>
          </div>
          <div>
            <div @click="model3=!model3">
              <p class="title">三.准入条件</p>
              <div class="tag_b">
                <!--<div class="tag" v-if="pageData&&pageData.ZRQY.split">{{pageData.ZRQY.split('|')[0]}}</div>-->
                <div class="tag">{{pageData.ZXNL}}岁 - {{pageData.ZDNL}}岁</div>
                <div class="tag">{{pageData.ZXED}}万 - {{pageData.ZDED}}万</div>
                <div class="arrow" :class="model3?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model3?'animate':''">
              <p v-if="pageData.ZXFL">房龄区间: {{pageData.ZXFL}}年 - {{pageData.ZDFL}}年</p>
              <p v-if="pageData.ZRQY">准入区域: {{pageData.ZRQY}}</p>
              <p v-if="pageData.FWLX">房屋类型: {{pageData.FWLX}}</p>
              <p v-if="pageData.GHYT">规划用途: {{pageData.GHYT}}</p>
              <p>设计用途: {{pageData.SJYT == 0?'非居住':'居住'}}</p>
              <p>额度区间: {{pageData.ZXED}}万 - {{pageData.ZDED}}万</p>
              <p v-if="pageData.YYZZ">营业执照: {{pageData.YYZZ ==0?'否':'是'}}</p>
              <p>年龄区间: {{pageData.ZXNL}}岁 - {{pageData.ZDNL}}岁</p>
              <p v-if="pageData.ZYXZ">职业限制: {{pageData.ZYXZ}}</p>
              <p v-if="pageData.ZXYQ">征信要求: {{pageData.ZXYQ}}</p>
              <p v-if="pageData.ZRTJBZ">其他说明: {{pageData.ZRTJBZ}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model4=!model4">
              <p class="title">四.费用</p>
              <div class="arrow" :class="model4?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model4?'animate':''">
              <p v-if="pageData.FYMXBZ">其他费用明细 : {{pageData.FYMXBZ}}</p>
            </div>
          </div>
          <div>
            <div @click="model5=!model5">
              <div class="tag_b">
                <p class="title">五.所需材料</p>
                <div class="arrow" :class="model5?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model5?'animate':''">
              <p>线上报件材料 : {{pageData.XSBJCL}}</p>
              <p>全部所需材料 : {{pageData.SXCL}}</p>
              <p>做件流程(时限) : {{pageData.ZJLCSX}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model6=!model6">
              <p class="title">六.毙件标准</p>
              <div class="arrow" :class="model6?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model6?'animate':''">
              <p>毙件标准: {{pageData.BJBZ}}</p>
            </div>
          </div>
        </div>
        <!--房贷结束-->


        <!--车贷开始-->
        <div v-else-if="pageData.CPLX === 2" class="common" style="flex-direction: column;">
          <div>
            <div @click="model1=!model1">
              <p class="title">一.产品介绍</p>
              <div class="tag_b">
                <!--<div v-if="pageData.HKFS" class="tag">{{pageData.HKFS}}</div>-->
                <div v-if="pageData.SXF" class="tag">服务费:{{pageData.SXF}}%</div>
                <div v-if="pageData.FFBZ" class="tag">{{pageData.FFBZ}}</div>
                <!--<div v-if="pageData.DKFS" class="tag">{{pageData.DKFS}}</div>-->
                <div class="arrow" :class="model1?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model1?'animate':''">
              <p>{{pageData.CPJS}}</p>
              <p v-if="pageData.SXF">服务费: {{pageData.SXF}}%</p>
              <p v-if="pageData.FFBZ">反费标准 : {{pageData.FFBZ}}</p>
              <!--<p v-if="pageData.DKFS">贷款方式 : {{pageData.DKFS}}</p>-->
              <!--<p v-if="pageData.HKFS">还款方式: {{pageData.HKFS}}</p>-->
              <!--<p v-if="pageData.DKNX">贷款年限: {{pageData.DKNX}}</p>-->
            </div>
          </div>
          <div>
            <div @click="model2=!model2">
              <p class="title">二.贷款方式及年限利率</p>
              <div class="tag_b">
                <div class="tag" v-if="pageData.DKNX">{{pageData.DKNX}}</div>
                <!--<div class="tag" v-if="pageData.DKFS&&pageData.DKFS.split"
                     v-for="it in pageData.DKFS.split('|')">
                  {{it}}
                </div>-->
                <div class="arrow" :class="model2?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model2?'animate':''">
              <p v-if="pageData.DKFS">贷款方式 : {{pageData.DKFS}}</p>
              <p v-if="pageData.ZXLX">利&emsp;&emsp;息 : {{pageData.ZXLX}}% - {{pageData.ZDLX}}%</p>
              <p v-if="pageData.DKNX">贷款年限 : {{pageData.DKNX}}</p>
            </div>
          </div>
          <div>
            <div @click="model3=!model3">
              <p class="title">三.准入条件</p>
              <div class="tag_b">
                <div class="tag">利息:{{pageData.ZXLX}}%</div>
                <div class="tag">手续费: {{pageData.SXF}}%</div>
                <div class="arrow" :class="model3?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model3?'animate':''">
              <p v-if="pageData.ZXED">额度区间: {{pageData.ZXED}}万 - {{pageData.ZDED}}万</p>
              <p v-if="pageData.ZXNL">年龄区间: {{pageData.ZXNL}}岁 - {{pageData.ZDNL}}岁</p>
              <p v-if="pageData.ZYXZ">职业限制: {{pageData.ZYXZ}}</p>
              <p v-if="pageData.ZXYQ">征信要求: {{pageData.ZXYQ}}</p>
              <p v-if="pageData.SDTJQY">可做区域: {{pageData.SDTJQY}}</p>
              <p v-if="pageData.GLS">行驶公里数 : {{pageData.GLS}}</p>
              <p v-if="pageData.CLXZ">车龄限制 : {{pageData.CLXZ}}</p>
              <p v-if="pageData.XCZ">现车值 : {{pageData.XCZ}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model4=!model4">
              <p class="title">四.费用</p>
              <div class="arrow" :class="model4?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model4?'animate':''">
              <p>其他费用明细 : {{pageData.FYMXBZ}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model5=!model5">
              <p class="title">五.所需材料</p>
              <div class="arrow" :class="model5?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model5?'animate':''">
              <p>线上报件材料 :{{pageData.XSBJCL}}</p>
              <p>{{pageData.SXCL}}</p>
              <p>做件流程(时限): {{pageData.ZJLCSX}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model6=!model6">
              <p class="title">六.毙件标准</p>
              <div class="arrow" :class="model6?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model6?'animate':''">
              <p>毙件标准 :{{pageData.BJBZ}}</p>
            </div>
          </div>
        </div>
        <!--车贷结束-->


        <!--信贷开始-->
        <div v-else-if="pageData.CPLX === 3" class="common" style="flex-direction: column;">
          <div>
            <div @click="model1=!model1">
              <p class="title">一.产品介绍</p>
              <div class="tag_b">
                <div v-if="pageData.SXF" class="tag">服务费:{{pageData.SXF}}%</div>
                <div v-if="pageData.FFBZ" class="tag">{{pageData.FFBZ}}</div>
                <div class="arrow" :class="model1?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model1?'animate':''">
              <p>{{pageData.CPJS}}</p>
              <p v-if="pageData.SXF">服务费: {{pageData.SXF}}%</p>
              <p v-if="pageData.FFBZ">反费标准 : {{pageData.FFBZ}}</p>
            </div>
          </div>
          <div>
            <div @click="model2=!model2">
              <p class="title">二.贷款方式及年限利率</p>
              <div class="tag_b">
                <div class="tag" v-if="pageData.DKNX">{{pageData.DKNX}}</div>
                <!--<div class="tag" v-if="pageData.DKFS&&pageData.DKFS.split"
                     v-for="it in pageData.DKFS.split('|')">
                  {{it}}
                </div>-->
                <div class="arrow" :class="model2?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model2?'animate':''">
              <p v-if="pageData.DKFS">贷款方式 : {{pageData.DKFS}}</p>
              <p v-if="pageData.ZXLX">利&emsp;&emsp;息 : {{pageData.ZXLX}}% - {{pageData.ZDLX}}%</p>
              <p v-if="pageData.DKNX">贷款年限 : {{pageData.DKNX}}</p>
            </div>
          </div>
          <div>
            <div @click="model3=!model3">
              <p class="title">三.准入条件</p>
              <div class="tag_b">
                <div class="tag">利息:{{pageData.ZXLX}}%</div>
                <div class="tag">手续费: {{pageData.SXF}}%</div>
                <div class="arrow" :class="model3?'up':'down'">
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                  <i class="iconfont icon-xiala-"></i>
                </div>
              </div>
            </div>
            <div class="hide_model slide" :class="model3?'animate':''">
              <p v-if="pageData.ZXED">额度区间: {{pageData.ZXED}}万 - {{pageData.ZDED}}万</p>
              <p v-if="pageData.YYZZ!=null">营业执照: {{pageData.YYZZ ==0?'否':'是'}}</p>
              <p v-if="pageData.ZXNL">年龄区间: {{pageData.ZXNL}}岁 - {{pageData.ZDNL}}岁</p>
              <p v-if="pageData.ZYXZ">职业限制: {{pageData.ZYXZ}}</p>
              <p v-if="pageData.ZXYQ">征信要求: {{pageData.ZXYQ}}</p>
              <p v-if="pageData.BDYQ">保单要求: {{pageData.BDYQ}}</p>
              <p v-if="pageData.FDYQ">房贷要求: {{pageData.FDYQ}}</p>
              <p v-if="pageData.GJJYQ">公积金要求 : {{pageData.GJJYQ}}</p>
              <p v-if="pageData.SBYQ">社保要求: {{pageData.SBYQ}}</p>
              <p v-if="pageData.ZMXYF">芝麻信用分: {{pageData.ZMXYF}}</p>
              <p v-if="pageData.WLD">有无微粒贷: {{pageData.WLD}}</p>
              <p v-if="pageData.DKC">有无贷款车: {{pageData.DKC}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model4=!model4">
              <p class="title">四.费用</p>
              <div class="arrow" :class="model4?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model4?'animate':''">
              <p>其他费用明细 : {{pageData.FYMXBZ}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model5=!model5">
              <p class="title">五.所需材料</p>
              <div class="arrow" :class="model5?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model5?'animate':''">
              <p>线上报件材料 :{{pageData.XSBJCL}}</p>
              <p>{{pageData.SXCL}}</p>
              <p>做件流程(时限): {{pageData.ZJLCSX}}</p>
            </div>
          </div>
          <div>
            <div class="tag_b" @click="model6=!model6">
              <p class="title">六.毙件标准</p>
              <div class="arrow" :class="model6?'up':'down'">
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
                <i class="iconfont icon-xiala-"></i>
              </div>
            </div>
            <div class="hide_model slide" :class="model6?'animate':''">
              <p>毙件标准 :{{pageData.BJBZ}}</p>
            </div>
          </div>
        </div>
      </div>
    </mu-load-more>
  </container-view>
</template>

<script>
  import Config from '@/Config'
  import ContainerView from "../common/ContainerView";
  import Appbar from "../common/AppBar";

  export default {
    name: "ProductDetail",
    components: {Appbar, ContainerView},
    data() {
      return {
        product: null,
        id: '',
        model1: false,
        model2: false,
        model3: false,
        model4: false,
        model5: false,
        model6: false,
        isLoading: true,
        refreshing: false,
        loading: false,
      }
    },
    methods: {
      init() {
        this.model1 = false;
        this.model2 = false;
        this.model3 = false;
        this.model4 = false;
        this.model5 = false;
        this.model6 = false;
        this.refreshing = false;
        this.loading = false;
        this.isLoading = true;
      },
      animationComplete(id) {
        this.id = id;
        setTimeout(() => {
          this.$api.apiCp.getCpById(id)
            .then(res => {
              console.log('产品信息');
              console.log(res);
              this.product = res.data;
              this.isLoading = false
            })
        }, 1000)
      }
    },
    computed: {
      img() {
        if (this.product) {
          if (!this.product.CPTP[0]) {
            return this.$emptyImg;
          } else {
            return Config.url_file + this.product.CPTP[0]
          }
        } else {
          return this.$emptyImg
        }
      },
      pageData() {
        return this.product === null ? '' : this.product;
      },
    },
    mounted: function () {
      let id = this.$route.query.id;
      // this.init();
      this.animationComplete(id)
    },
  }
</script>

<style scoped lang="less">
  .product_detail {
    background: #FFF !important;
    border-top: 1px solid #eee;
    font-size: 14px;
  }

  .product_top {
    padding: 12px;
    display: flex;
    border-bottom: 1px solid #eee;
    .p_left {
      width: 106px;
      height: 106px;
      text-align: center;
      border: solid 1px #eeeeee;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
      }
    }
    .p_mid {
      margin-left: 10px;
      flex: 1;
      h4 {
        margin: 10px 0;
        color: #333333;
      }
      span {
        color: #ff4a0b;
      }
    }
    .p_right {
      margin-top: 10px;
      .btn {
        border: solid #fda323 1px;
        border-radius: 50px;
        color: #fda323;
        width: 60px;
        height: 21px;
        font-size: 10px;
        line-height: 21px;
        text-align: center;
        margin-bottom: 5px;
        .icon-shoucangfill {
          font-size: 10px;
        }
      }
    }
  }

  .common {
    display: flex;
    padding: 12.5px 20px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 14px;
      padding: 5px 0;
      color: #333;
      line-height: 24px;
      margin-top: 10px;
      font-weight: bold;
    }
    .tag-box {
      flex: 1;
      word-break: break-all;
      font-size: 14px;
      color: #333333;
    }
    .tag {
      color: #333333;
      /*background-color: #86d39f;*/
      border-radius: 10px;
      padding: 2px 5px;
      margin: 5px 5px 10px;
      &:first-child {
        margin-left: 0;
      }
    }
    .name {
      flex-shrink: 0;
      margin-right: 20px;
      color: #888;
    }
    .cpms {
      margin-top: 12.5px;
    }
    .hide_model {
      > p {
        font-size: 14px;
        /*padding: .05rem;*/
        margin: 2px 0;
        color: #000;
      }
      border-radius: 5px;
      background-color: #eee;
    }

  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .animate {
    max-height: 1000px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  .arrow {
    right: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 21px;
    width: 21px;
    border-radius: 100%;
    border: 1px solid #86d39f;
    align-items: center;
    transition: all .5s;
    text-align: center;
    > i {
      height: 0;
      animation: flash 1s infinite reverse;
      font-size: 5px;
      &:nth-child(1) {
        color: #86d39f;
        animation-delay: .33s;
        transform: translateY(4px);
      }
      &:nth-child(2) {
        color: #86d39f;
        animation-delay: .66s;
      }
      &:nth-child(3) {
        color: #86d39f;
        animation-delay: .99s;
        transform: translateY(4px);
      }
    }
  }

  @keyframes flash {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .tag_b {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    align-items: center;
  }

  .up {
    transform: rotate(-180deg);
  }
</style>
