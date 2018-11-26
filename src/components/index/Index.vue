<template>
  <container-view>
    <mu-container style="padding: 10px;background-color: #eee;">
      <mu-paper :z-depth="5" round>
        <mu-form ref="form" :model="form" class="index_form" :label-position="labelPosition">
          <mu-form-item prop="AGE" label="年龄" :rules="ageRules">
            <mu-select v-model="form.AGE">
              <mu-option v-for="option in options" :key="option" :label="option" :value="option"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="XYK" label="有用过信用卡" :rules="xykRules">
            <mu-radio v-model="form.XYK"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="true" label="有"></mu-radio>
            <mu-radio v-model="form.XYK"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="false" label="没有"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="CITY" label="所在城市：" :rules="cityRules">
            <mu-auto-complete
              :data="cityData"
              :max-search-results="3"
              v-model="form.CITY"
              open-on-focus>
            </mu-auto-complete>
          </mu-form-item>
          <mu-form-item prop="JZSJ" label="在该城市已居住时间或工作时间：" :rules="jzsjRules">
            <mu-radio v-model="form.JZSJ"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="半年以上" label="半年以上"></mu-radio>
            <mu-radio v-model="form.JZSJ"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="半年以下" label="半年以下"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="SFFD" label="在该城市有过房贷" :rules="sffdRules">
            <mu-radio v-model="form.SFFD"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="true" label="是"></mu-radio>
            <mu-radio v-model="form.SFFD"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="SJC" label="名下有私家车" :rules="sjcRules">
            <mu-radio v-model="form.SJC"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="true" label="是"></mu-radio>
            <mu-radio v-model="form.SJC"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="SFCD" v-if="form.SJC === 'true'"
                        label="目前还在还车贷" :rules="cdRules">
            <mu-radio v-model="form.SFCD"
                      value="true"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      label="是"></mu-radio>
            <mu-radio v-model="form.SFCD"
                      value="false"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item prop="SFBD" label="购买过寿险保单" :rules="sfbdRules">
            <mu-radio v-model="form.SFBD"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="true" label="是"></mu-radio>
            <mu-radio v-model="form.SFBD"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      value="false" label="否"></mu-radio>
          </mu-form-item>
          <mu-form-item v-if="form.SFBD === 'true'"
                        prop="NBF" label="名下寿险年保费合计"
                        :rules="nbfRules">
            <mu-radio v-model="form.NBF"
                      value="2400以上"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      label="2400以上"></mu-radio>
            <mu-radio v-model="form.NBF"
                      value="2400以下"
                      uncheck-icon="check_box_outline_blank"
                      checked-icon="check_box"
                      label="2400以下"></mu-radio>
          </mu-form-item>
          <mu-form-item :label-width="0">
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
        </mu-form>
        <animator-dialog
          :open.sync="showDialog"
          @animationPlayComplete="animationPlayComplete"
          :options="{animationData: $animatorData.successAnimator2,loop:false}">
        </animator-dialog>
      </mu-paper>
    </mu-container>
  </container-view>
</template>

<script>
  import {ContainerView} from '../common'
  import {city} from '../../data/city'
  import AnimatorDialog from "../common/AnimatorDialog";

  export default {
    name: "index",
    components: {AnimatorDialog, ContainerView},
    data() {
      return {
        showDialog: false,
        city: city,
        options: [
          '23周岁以下', '23-55周岁', '55周岁以上'
        ],
        labelPosition: 'top',
        form: {
          AGE: '',
          XYK: '',
          CITY: '',
          JZSJ: '',
          SFFD: '',
          SJC: '',
          SFCD: '',
          SFBD: '',
          NBF: ''
        },
        ageRules: [{validate: (val) => !!val, message: '请选择年龄段'},],
        xykRules: [{validate: (val) => !!val, message: '请选择是否有过信用卡'},],
        cityRules: [{validate: (val) => !!val, message: '请选择工作城市'},],
        jzsjRules: [{validate: (val) => !!val, message: '请选择在该城市工作或居住时间'},],
        sffdRules: [{validate: (val) => !!val, message: '请选择在该城市是否有过房贷'},],
        sjcRules: [{validate: (val) => !!val, message: '请选择名下是否有私家车'},],
        cdRules: [{validate: (val, other) => other.SJC === 'false' || !!val, message: '请选择是否目前还在还车贷'}],
        sfbdRules: [{validate: (val) => !!val, message: '请选择是否购买过寿险保单'}],
        nbfRules: [{validate: (val, other) => other.SFBD === 'false' || !!val, message: '请选择名下寿险年保费合计'}],
      }
    },
    computed: {
      cityData() {
        return city.map((it) => {
            return it.cityName
          }
        )
      }
    },
    mounted() {

    },
    methods: {
      animationPlayComplete() {

      },
      submit() {
        let _this = this;
        this.$refs.form.validate().then((result) => {
          console.log('form valid: ', result);
          if (result) _this.showDialog = true
        });
      },
      clear() {
        this.$refs.form.clear();
        this.form = {
          input: '',
          select: '',
          XYK: '',
          city: '',
          JZSJ: '',
          SFFD: '',
          SJC: '',
          SFCD: '',
          SFBD: '',
          NBF: ''
        }
      }
    },
    activated() {
      mui.init({
        swipeBack: false,
      })
    }
  }
</script>
<style lang="less" scoped>
  .release {
    padding: 10px;
    .mui-input-group {
      margin-bottom: 10px;
    }
    .mui-input-row {
      label:nth-child(1) {
        color: #999;
      }
    }
    .right {
      text-align: right;
      padding-right: 0;
    }
    .input_content {
      border: 0;
    }
  }

  .index_form {
    padding: 10px;
    border: 10px;
    background: #fff;
    border-radius: 10px;
  }
</style>
