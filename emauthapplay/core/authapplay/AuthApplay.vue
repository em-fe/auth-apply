<template>
  <div class="w-authapplay">
    <div class="w-authapplay-desc">
      <img :src="require('assets/img/error.png')" class="w-authapplay-desc-img">
      <div class="w-authapplay-desc-main">
        <p class="w-authapplay-desc-desc">您好，此功能属于高级套餐功能，您还没有使用权限。</p>
        <div class="w-authapplay-desc-phone">
          <div>如需开通请致电：</div>
          <div>
            <p class="w-authapplay-desc-text">400 - 0630260 客服</p>
            <p class="w-authapplay-desc-text">133 3104 3623 王先生</p>
            <p class="w-authapplay-desc-text">130 5107 2968 薛先生</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-authapplay-apply">
      <img :src="require('assets/img/link.png')" class="w-authapplay-line w-authapplay-line-left">
      <img :src="require('assets/img/link.png')" class="w-authapplay-line w-authapplay-line-right">
      <div class="w-authapplay-title">
        <img :src="require('assets/img/custservice.svg')">
        <span class="w-authapplay-title-text">请留下您的信息，我们会尽快和您联系。</span>
      </div>
      <div class="w-authapplay-form">
        <p class="w-authapplay-form-name">如何称呼您？</p>
        <input type="text" placeholder="请输入" class="w-authapplay-form-input" v-model="nickname"></input>
      </div>
      <div class="w-authapplay-form">
        <p class="w-authapplay-form-contact">如何联系您？</p>
        <input type="text" placeholder="请输入" class="w-authapplay-form-input" v-model="mobile"></input>
      </div>
      <button class="w-authapplay-submit" :class="{[`w-authapplay-submit-loading`]: loading}" @click="confirmBtn">提交申请</button>
    </div>
    <!-- 提示弹框 start -->
    <div class="w-authapplay-modal" v-if="tipShow">
      <div class="w-authapplay-modal-wrap">
        <div class="w-authapplay-modal-header">
          <div class="w-authapplay-modal-inner">提示</div>
          <div class="w-authapplay-modal-close" @click="closeFn">＋</div>
        </div>
        <div class="w-authapplay-modal-main">您的申请已提交，我们会尽快安排处理。</div>
      </div>
    </div>
    <!-- 提示弹框 end -->
  </div>
</template>
<script>
import 'em-cookie';
import message from 'message/index';
import CONSTANT from 'helper/constant';
import ajax from 'helper/ajax';

  export default {
    name: 'WAuthApplay',
    data() {
      return {
        mobile: '',
        nickname: '',
        tipShow: false,
        loading: false,
      };
    },
    props: {
      action: {
        type: String,
        default: '',
      },
      auth: String,
      company: {
        type: String,
        default: '',
      },
      success: {
        type: Function,
        default: () => {},
      }
    },
    computed: {
      authValue() {
        return this.auth;
      },
      companyValue() {
        return this.company;
      },
    },
    methods: {
      checkValue() {
        if (!this.nickname) {
          message.error({
            content: '请填写您的称呼',
          });
          return false;
        }
        if (!this.mobile) {
          message.error({
            content: '请填写您的联系电话',
          });
          return false;
        }
        return true;
      },
      confirmBtn() {
        if (this.checkValue()) {
          const dataForPost = {
            nickname: this.nickname,
            mobile: this.mobile,
            company: this.companyValue,
            permit_path: this.authValue,
            referrer: document.referrer,
          };

          this.isLoading();

          ajax({
            type: 'POST',
            action: this.action,
            data: JSON.stringify(dataForPost),
            headers: {
              Authorization: window.$cookie.get(CONSTANT.EVENT_TOKE),
            },
            onSuccess: (res) => {
              this.noLoading();
              if (res.code === CONSTANT.AJAX_SUCCESS) {
                this.tipShow = true;
              } else {
                message.error({
                  content: res.message,
                });
              }
            },
            onError: (err, response) => {
              this.noLoading();
              message.error({
                content: response.message,
              });
            },
          });
        }
      },
      closeFn() {
        this.tipShow = false;
        this.success();
        this.$emit('success');
      },
      isLoading() {
        this.loading = true;
      },
      noLoading() {
        this.loading = false;
      },
    },
  };
</script>
