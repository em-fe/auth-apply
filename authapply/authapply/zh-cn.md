# B 端权限申请
> 无权限的时候其中一种情况是跳转到带有权限申请组件的页面中，解决导航定位问题。

## 案例演示

<w-auth-apply :action="action"></w-auth-apply>

## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|action|用户申请接口地址|String|是|-|
|success|登录成功|Function|是|() => {}|


<script>
import WAuthApply from './index';

export default {
  data() {
    return {
      action: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
    }
  },
  components: {
    WAuthApply,
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import './style/authapply.scss';
</style>
