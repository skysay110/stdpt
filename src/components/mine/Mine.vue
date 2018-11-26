<template>
  <container-view>
    <div class="mime">
      <transition name="fade" mode="out-in">>
        <div class="login-prompt-box" v-if="get_userInfo==null">
          <div class="out">
            <div class="inner1">
              <div class="inner2">
                <img class="avatar" src="../../assets/images/avatar2.png"/>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <router-link to="login">
              <mu-button color="primary" class="login">登陆</mu-button>
            </router-link>
            <router-link to="register">
              <mu-button color="primary" class="register">注册</mu-button>
            </router-link>
          </div>
        </div>
        <div v-else>
          <div class="mine_top">
            <div class="profile">
              <WaveView></WaveView>
              <div class="profile_left">
                <mu-avatar size="64">
                  <img :src="avatar_path" alt="">
                </mu-avatar>
              </div>
              <div class="profile_mid">
                <div class="userInfo">
                  <div style="font-size: 15px;">{{get_userInfo.USERNAME}}</div>
                </div>
              </div>
            </div>
          </div>
          <mine-model mode="list" :cols="3" :cells="myBusiness"></mine-model>
        </div>
      </transition>
      <div class="mine_bottom">
        <p>咨询电话:
          <span style="text-decoration: underline;" @click="callPhone('15722289131')">15722289131 </span>
        </p>
      </div>
    </div>
  </container-view>
</template>

<script>
  import Appbar from "../common/AppBar";
  import ContainerView from "../common/ContainerView";
  import BottomNav from "../common/BottomNav";
  import {mapGetters, mapActions} from 'vuex';
  import MineModel from "../common/MineModel";
  import WaveView from "../common/WaveView";

  export default {
    name: "mine",
    components: {WaveView, MineModel, BottomNav, ContainerView, Appbar},
    data() {
      return {
        avatar_path: require('@/assets/images/avatar.png'),
        myBusiness: [
          {name: '我发布的任务', url: ''},
          {name: '我的客服', url: ''},
          {name: '我的跟踪', url: ''},
          {
            name: '退出', fn: (vue) => {
              vue.commit_userInfo(null);
            }
          }
        ],
      }
    },
    methods: {
      ...mapActions(['commit_userInfo']),
      callPhone(phone) {
        mui.plusReady(function () {
          plus.device.dial(phone, false);
        });
      },
      initWaveBg() {
        //获得canvas容器
      }
    },
    computed: {
      ...mapGetters(['get_userInfo'])
    },
    activated() {
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  .mime {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    background-color: #faf9f9;
    .mine_top {
      /*padding: 10px;*/
      margin: 10px;
      border-radius: 10px;
      overflow: hidden;
      background: linear-gradient(to right, #177ad7, #30a3f3);
      .profile {
        padding: 27px 0 32px 20px;
        display: flex;
        position: relative;
        align-items: center;
        .profile_left {
          img {
            width: 65px;
            height: 65px;
            border-radius: 100%;
            border: 2px solid #fbffff;
          }
        }
        .profile_mid {
          margin-left: 12px;
          text-align: left;
          color: #fff;
          .userInfo {
            font-size: 21px;
            display: flex;
            align-items: center;
            span {
              font-size: 10px;
              margin-left: 3px;
              padding: 7px;
              border-radius: 100px;
              display: block;
              &:nth-child(2) {
                background: #ffb636;
                margin-left: 6px;
              }

            }
            &:nth-child(3) {
              background: #b5cd15;
            }
          }
          p {
            font-size: 12px;
            color: #fff;
            margin-bottom: 0;
          }
        }
        .profile_right {
          // box-shadow: 1px 1px 5px #999;
          position: absolute;
          right: 0;
          color: #ffffff;
          background: #ffb636;
          padding: 7px 12px 7px 17px;
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
          font-size: 12px;
        }
      }
    }
    .mine_bottom {
      position: absolute;
      bottom: 15px;
      width: 100%;
      p {
        text-align: center;
        font-size: 14px;
        color: #999;
        margin-bottom: 6px;
      }
    }
    .login-prompt-box {
      justify-content: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      .out {
        margin-top: 40px;
        border-radius: 100%;
        background: #daeefb;
        padding: 20px;
        flex: 1;
        display: flex;
        width: 210px;
        height: 210px;
        .inner1 {
          border-radius: 100%;
          background: #cae6fc;
          padding: 20px;
          flex: 1;
          display: flex;
          height: 170px;
          width: 170px;
          .inner2 {
            background: #7ec5f8;
            border-radius: 100%;
            padding: 20px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 130px;
            height: 130px;
            .avatar {
              width: 90px;
              height: 90px;
              background: #fff;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .btn-box {
      width: 80%;
      display: flex;
      justify-content: space-around;
      .login,
      .register {
        margin: 90px 0;
        font-size: 15px;
      }
    }
  }


</style>
