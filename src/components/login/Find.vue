<template>
  <container-view :fullPage="true">
    <div class="register">
      <div class="complete_input">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label><span class="iconfont input_icon icon-shouji-copy"></span></label>
            <input type="number" class="mui-input-clear" v-model="username" placeholder="请输入您的手机号">
          </div>
        </form>
      </div>
      <div class="complete_input">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label><span class="iconfont input_icon icon-yzm"></span></label>
            <input type="text" class="mui-input-clear" v-model="yzm" placeholder="请输入验证码">
            <button :disabled="isSend" type="button" class="getCode mui-btn-submit" @click="getCode(username)">
              {{codeText}}
            </button>
          </div>
        </form>
      </div>
      <div class="complete_input">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label><span class="iconfont input_icon icon-mima"></span></label>
            <input type="password" class="mui-input-password" v-model="pwd" placeholder="请输入密码">
          </div>
        </form>
      </div>
      <div class="complete_input">
        <form class="mui-input-group">
          <div class="mui-input-row">
            <label><span class="iconfont input_icon icon-mima"></span></label>
            <input type="password" class="mui-input-password" v-model="confirmPwd"
                   placeholder="请再次输入密码">
          </div>
        </form>
      </div>
      <div class="submit_btn">
        <button type="button" @click="findFn(username,yzm, pwd,confirmPwd)"
                class="mui-btn mui-btn-submit">确认
        </button>
      </div>
    </div>
  </container-view>
</template>

<script>
  import api from '@/api/api'
  import util from '@/utils/util'
  import ContainerView from "../common/ContainerView";

  let timeTask;
  export default {
    name: "find",
    components: {ContainerView},
    data() {
      return {
        username: '',
        pwd: '',
        confirmPwd: '',
        yzm: '',
        codeText: '获取验证码',
        isSend: false,
        showTime: 60
      }
    },
    methods: {
      getCode(username) {
        if (!util.isPoneAvailable(username)) {
          this.$vux.toast.show({
            text: '手机号码格式错误!',
            type: 'cancel'
          });
          return;
        }
        let that = this;
        api.api_sendVerifyCode(this, username, res => {
          let data = JSON.parse(res.data);
          if (data.code === 0) {
            timeTask = setInterval(function () {
              if (that.showTime <= 0) {
                clearTimeout(timeTask);
                that.codeText = "获取验证码";
                that.showTime = 60;
                that.isSend = false;
                return
              }
              that.isSend = true;
              that.showTime = that.showTime - 1;
              that.codeText = that.showTime + "秒后获取";
            }, 1000)
          } else {
            that.$vux.alert.show({
              title: '提示',
              content: data.msg,
              buttonText: '再试试'
            });
          }
        })
      },
      findFn(username, yzm, pwd, confirmPwd) {
        if (!util.isPoneAvailable(username)) {
          this.$vux.toast.show({
            text: '手机号码格式错误!',
            type: 'cancel'
          });
          return
        }
        if (yzm === "") {
          this.$vux.toast.show({
            text: '请输入验证码!',
            type: 'cancel'
          });
          return
        }
        if (!util.pwdCk(pwd)) {
          this.$vux.toast.show({
            text: '密码6-20位字母数字组合!',
            type: 'cancel'
          });
          return;
        }
        if (pwd !== confirmPwd) {
          this.$vux.toast.show({
            text: '两次密码填写不一致!',
            type: 'cancel'
          });
          return;
        }
        let that = this;
        api.api_forgetPwd(this, username, pwd, yzm, res => {
          let data = JSON.parse(res.data);
          if (data.code === 0) {
            that.$vux.toast.show('密码修改成功!');
            setTimeout(function () {
              that.$router.goBack();
            }, 1000)
          } else {
            that.$vux.alert.show({
              title: '提示',
              content: data.msg,
            })
          }
        })
      }
    },
    deactivated() {
      // this.$destroy();
    }
  }
</script>

<style lang="less" scoped>
  .mui-radio.mui-left label, .mui-checkbox.mui-left label {
    padding-left: 30px;
  }

  .mui-radio.mui-left input[type='radio'], .mui-checkbox.mui-left input[type='checkbox'] {
    left: 0;
  }

  .mui-radio input[type='radio']:checked:before, .mui-checkbox input[type='checkbox']:checked:before {
    color: #fe4e59;
  }

  .register {
    padding: .4rem .4rem 0;
    .complete_input {
      margin-bottom: .3rem;
    }
    .getCode {
      height: 100%;
      margin-top: 0;
      width: auto;
      display: flex;
      align-items: center;
      border-radius: .1rem;
    }
    .user_type {
      display: flex;
      margin: .4rem 0;
    }
    .yhxy {
      text-align: right;
      margin-top: .2rem;
      a {
        color: #fe6672;
      }
    }
  }

</style>
