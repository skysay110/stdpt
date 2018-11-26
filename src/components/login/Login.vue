<template>
  <container-view :fullPage="true">
    <mu-container>
      <mu-form ref="form" :model="loginForm" class="mu-demo-form">
        <mu-form-item label-float
                      icon="account_circle"
                      label="用户名" prop="username"
                      :rules="usernameRules">
          <mu-text-field
            v-model="loginForm.username" prop="username"></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码"
                      icon="locked"
                      label-float prop="password" :rules="passwordRules">
          <mu-text-field v-model="loginForm.password"
                         :action-icon="visibility ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibility = !visibility)"
                         :type="visibility ? 'text' : 'password'">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button
            round
            color="primary"
            @click="submit">登陆
          </mu-button>
        </mu-form-item>
      </mu-form>
      <animator-dialog
        :open.sync="openDialog"
        @animationPlayComplete="animationPlayComplete"
        :options="{animationData: $animatorData.successAnimator,loop:false}">
      </animator-dialog>
    </mu-container>
  </container-view>
</template>

<script>
  import ContainerView from "../common/ContainerView";
  import {mapActions} from 'vuex'
  import AnimatorDialog from "../common/AnimatorDialog";

  export default {
    name: "login",
    components: {AnimatorDialog, ContainerView},
    data() {
      return {
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写用户名'},
          {
            validate: (val) => /^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(val),
            message: '用户名由英文字母和数字组成的4-16位字符，以字母开头'
          }
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          {
            validate: (val) => /^[a-zA-Z0-9]{4,10}$/.test(val),
            message: '密码不能含有非法字符，长度在4-10之间'
          },
        ],
        loginForm: {
          username: '',
          password: '',
          isAgree: false,
        },
        visibility: false,
        openDialog: false
      }
    },
    methods: {
      ...mapActions(['commit_userInfo']),
      animationPlayComplete() {
        this.$router.goBack();
      },
      submit() {
        let _this = this;
        this.$refs.form.validate()
          .then((result) => result && _this.login());
      },
      login() {
        this.$api.apiUser.login(this.loginForm.username, this.loginForm.password)
          .then(res => {
            let data = res;
            if (data.code === 0) {
              localStorage.setItem('userInfo', JSON.stringify(data.user));
              this.commit_userInfo(data.user);
              this.openDialog = true
            } else {
              this.$alert(`${data.msg}`, '提示');
            }
          })
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
