// 组件
import WAuthApply from './core/authapply/index';

const waterCpt = {
  WAuthApply,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(waterCpt).forEach((key) => {
    Vue.component(key, waterCpt[key]);
  });
};


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
