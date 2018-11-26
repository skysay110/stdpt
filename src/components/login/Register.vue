<template>
  <container-view :fullPage="true">
    <mu-container class="register">
      <mu-form :model="registerForm" ref="registerForm">
        <mu-form-item label-float
                      icon="account_circle"
                      :rules="usernameRules"
                      prop="username"
                      label="用户名">
          <mu-text-field v-model="registerForm.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码"
                      icon="locked"
                      label-float prop="password" :rules="passwordRules">
          <mu-text-field v-model="registerForm.password"
                         :action-icon="visibilityPwd ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibilityPwd = !visibilityPwd)"
                         :type="visibilityPwd ? 'text' : 'password'">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item label="确认密码"
                      icon="locked"
                      label-float prop="confirmPwd" :rules="confirmPwdRules">
          <mu-text-field v-model="registerForm.confirmPwd"
                         :action-icon="visibilityPwd ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibilityPwd = !visibilityPwd)"
                         :type="visibilityPwd ? 'text' : 'password'">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item label-position="right" prop="userType" :rules="userTypeRules">
          <mu-radio v-model="registerForm.userType"
                    value="true" label="服务商"></mu-radio>
          <mu-radio v-model="registerForm.userType"
                    value="false" label="发布人"></mu-radio>
        </mu-form-item>
        <mu-form-item>
          <mu-button
            round
            color="primary"
            @click="register">注册
          </mu-button>
        </mu-form-item>
      </mu-form>

      <animator-dialog
        :open="openDialog"
        @animationPlayComplete="animationPlayComplete"
        :options="{animationData: $animatorData.successAnimator,loop:false}">
      </animator-dialog>
    </mu-container>
  </container-view>
</template>

<script>
  import ContainerView from "../common/ContainerView";
  import AnimatorDialog from "../common/AnimatorDialog";

  export default {
    name: "register",
    components: {AnimatorDialog, ContainerView},
    data() {
      return {
        visibilityPwd: false,
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
        confirmPwdRules: [
          {validate: (val) => !!val, message: '请填写确认密码'},
          {
            validate: (val) => /^[a-zA-Z0-9]{4,10}$/.test(val),
            message: '密码不能含有非法字符，长度在4-10之间'
          },
          {validate: (val, other) => val === other.password, message: '两次输入的密码不一致'},
        ],
        userTypeRules: [
          {validate: (val) => !!val, message: '请选择注册的用户类型'}
        ],
        registerForm: {
          password: '',
          username: '',
          confirmPwd: '',
          userType: ''
        },
        openDialog: false,
      }
    },
    activated() {
    },
    mounted() {
    },
    methods: {
      animationPlayComplete() {
        this.$router.goBack();
      },
      register() {
        let _this = this;
        this.$refs.registerForm.validate().then((result) => {
          console.log('form valid: ', result);
          if (result) _this.openDialog = true
        });
      }
    },
  }
</script>

<style lang="less" scoped>
  .register {

  }
</style>
