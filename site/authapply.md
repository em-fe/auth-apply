# B 端权限申请
> 无权限的时候其中一种情况是跳转到带有权限申请组件的页面中，解决导航定位问题。

<div class="demo">
  <w-auth-apply authValue="/homepage" action="http://gateway.inner.evente.cn:8000/home/api/org/applies/permit"></w-auth-apply>
</div>

## API

### 属性

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|action|接口地址|String|否|无|
|auth|对应的权限的名字|String|否|无|
|company|公司|String|否|无|
|success|成功之后关闭弹框的回调|Function|否|() => {}|

### 方法

|事件名|说明|返回值|
|---|------|-----|
|success|成功之后关闭弹框的回调|无|

<script>
import WAuthApply from '../emauthapply/core/authapply/authapply';

export default {
  data() {
    return {
    };
  },
  components: {
    WAuthApply,
  },
}
</script>

<style lang="scss">
@import '../emauthapply/assets/css/authapply.scss';
@import '../emauthapply/assets/css/message.scss';

.demo {
  padding: 16px;
  border: 1px solid #dbdbdb;
  background: #999;
}
</style>
