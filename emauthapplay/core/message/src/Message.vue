<template>
  <transition-group tag="div" class="waa-message-box" name="fade">
    <div class="waa-message-main" :class="[`waa-message-${notice.type}`]" v-for="(notice, noticeIndex) in notices" :key="notice.name" :style="notice.style">
      <p class="waa-message-text">{{ notice.content }}</p>
    </div>
  </transition-group>
</template>
<script>
let seed = 0;

export default {
  name: 'WMessage',
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      const name = `ivuNotification_${Date.now()}_${seed++}`;
      // 继承一下参数
      const newNotice = Object.assign({
        content: '',
        name,
        type: 'info',
        style: {},
        close() {},
      }, notice);
      // 添加到队列中
      this.notices.push(newNotice);
      // 自动关闭
      setTimeout(this.close.bind(this, name), notice.delayTime);
    },
    close(name) {
      this.notices.every((notice, noticeIndex) => {
        this.notices.splice(noticeIndex, 1);
        notice.close();
        return notice.name !== name;
      });
    },
  },
};
</script>
