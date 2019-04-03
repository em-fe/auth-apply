<template>
  <div class="w-authapply-box">
    <div v-if="type === 'staff'" class="w-authapply2">
      <div class="w-authapply2-desc">
        <img :src="errorImage" class="w-authapply2-desc-img">
        <div class="w-authapply2-desc-main">
          <p class="w-authapply2-desc-desc">您还没有使用权限。</p>
        </div>
      </div>
    </div>
    <div v-else class="w-authapply">
      <div class="w-authapply-desc">
        <img :src="errorImage" class="w-authapply-desc-img">
        <div class="w-authapply-desc-main">
          <p class="w-authapply-desc-desc">您好，此功能属于高级套餐功能，您还没有使用权限。</p>
          <div class="w-authapply-desc-phone">
            <div>如需开通请致电：</div>
            <div>
              <p class="w-authapply-desc-text">400 - 0630260 客服</p>
              <p class="w-authapply-desc-text">133 3104 3623 于先生</p>
              <p class="w-authapply-desc-text">130 5107 2968 薛先生</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-authapply-apply">
        <img :src="require('assets/img/link.png')" class="w-authapply-line w-authapply-line-left">
        <img :src="require('assets/img/link.png')" class="w-authapply-line w-authapply-line-right">
        <div class="w-authapply-title">
          <img :src="require('assets/img/custservice.svg')">
          <span class="w-authapply-title-text">请留下您的信息，我们会尽快和您联系。</span>
        </div>
        <div class="w-authapply-form">
          <p class="w-authapply-form-name">如何称呼您？</p>
          <input type="text" placeholder="请输入" class="w-authapply-form-input" v-model="nickname"></input>
        </div>
        <div class="w-authapply-form">
          <p class="w-authapply-form-contact">如何联系您？</p>
          <input type="text" placeholder="请输入" class="w-authapply-form-input" v-model="mobile"></input>
        </div>
        <button class="w-authapply-submit" :class="{[`w-authapply-submit-loading`]: loading}" @click="confirmBtn">提交申请</button>
      </div>
      <!-- 提示弹框 start -->
      <div class="w-authapply-modal" v-if="tipShow">
        <div class="w-authapply-modal-wrap">
          <div class="w-authapply-modal-header">
            <div class="w-authapply-modal-inner">提示</div>
            <div class="w-authapply-modal-close" @click="closeFn">＋</div>
          </div>
          <div class="w-authapply-modal-main">您的申请已提交，我们会尽快安排处理。</div>
        </div>
      </div>
      <!-- 提示弹框 end -->
    </div>
  </div>
</template>
<script>
import 'em-cookie';
import message from 'message/index';
import CONSTANT from 'helper/constant';
import ajax from 'helper/ajax';
import errorImage from './errorimage';

export default {
  name: 'WAuthApplay',
  data() {
    return {
      errorImage,
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
    },
    type: {
      type: String,
      default: 'staff',
    },
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
