<template>
  <div class="register-popup" v-if="visible">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="newUsername">用户名：</label>
        <input type="text" id="newUsername" v-model="newUsername" required>
      </div>
      <div class="form-group">
        <label for="newPassword">密码：</label>
        <input type="password" id="newPassword" v-model="newPassword" required>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <button type="submit">注册</button>
      <button type="button" @click="closePopup">取消</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newUsername: '',
      newPassword: '',
      errorMessage: '' // 添加用于显示错误信息的字段
    };
  },
  methods: {
    register() {
      // 假设我们只存储一个用户，用户名和密码存储在localStorage
      if (this.newUsername && this.newPassword) {
        localStorage.setItem('user', this.newUsername);
        localStorage.setItem('password', this.newPassword);
        alert('注册成功！');
        // 清空输入字段
        this.newUsername = '';
        this.newPassword = '';
        this.closePopup(); // 关闭弹窗
        // this.$router.push('/LoginPage'); // 如果你有一个登录页面
      } else {
        this.errorMessage = '请输入用户名和密码';
      }
    },
    closePopup() {
      this.$emit('close'); // 通知父组件关闭弹窗
    }
  }
};
</script>

<style scoped>
/* 弹窗样式 */
.error-message {
  color: red;
  margin-top: 10px;
}

/* 注册弹窗样式，匹配登录框样式 */
.register-popup {
    background: lightgray;
    /* opacity: 0.8; */
    width: 30%; /* 电脑端屏幕较大，可以使用更小的百分比宽度 */
    max-width: 20rem; /* 最大宽度限制 */
    padding: 2rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 10px;
}

input {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  display: block;
  font-size: 16px;
  text-align: left;
}
</style>
