<template>
<div :class="['bkg', { active: showRegisterPopup }]">
<div class="bkg">
  <div class="login-container">
    
    <h1>登录</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="login">登录</button>
      
    

    </form>
    <!-- 注册按钮 -->
    <button class="register" type="button" @click="showRegisterPopup = true">注册</button>
    <!-- 注册弹窗子组件 -->
    <register-popup :visible="showRegisterPopup" @close="showRegisterPopup = false" @registered="handleRegistration"></register-popup>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</div>
</div>
</template>

<script>
import RegisterPopup from './RegisterPopup.vue';

export default {
  components: {
    RegisterPopup
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
       showRegisterPopup: false
    };
  },
  methods: {
    login() {
      // 在这里可以添加登录逻辑，例如发送登录请求到服务器
      // 如果登录失败，可以设置 errorMessage 来显示错误信息
    const storedUsername = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');

    // 检查用户输入的用户名和密码是否与存储的匹配
    if (this.username === storedUsername && this.password === storedPassword) {
      alert('登录成功！');
      this.$router.push('/HomePage'); // 登录成功后跳转到 ChatPage
    } else {
      this.errorMessage = '用户名或密码不正确';
    }
    },
     handleRegistration() {
      this.showRegisterPopup = false; // 关闭注册弹窗
      // 可以在这里处理注册后的逻辑
    }
  },
};
</script>

<style scoped>

.login-container {
    background: lightgray;
    opacity: 0.8;
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

.bkg {
    background-image: url("./bkg.gif");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}

/* 中等屏幕（平板电脑）的样式 */
@media screen and (max-width: 1024px) {
    .login-container {
        width: 50%; /* 平板上宽度更宽一些 */
        padding: 1.5rem; /* 减少内边距 */
    }
}

/* 小屏幕（手机）的样式 */
@media screen and (max-width: 768px) {
    .login-container {
        width: 80%; /* 在手机上使用更宽的宽度 */
        padding: 1rem; /* 再次减少内边距 */
    }

    h1 {
        font-size: 20px; /* 减小标题字体大小 */
    }

    label, input, button {
        font-size: 14px; /* 减小字体大小 */
    }

    .login, .register {
        padding: 8px; /* 减小按钮内边距 */
    }
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  text-align: left;
}

input {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: rgb(230, 230, 230);
  color: darkslategrey;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.register-popup {
    background: white;
    padding: 20px;
    width:80%;
    height:80%;
    max-width:20rem;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    position: fixed; /* 使用fixed定位，使其脱离文档流 */
    top: 50%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    transform: translate(-50%, -50%); /* 通过transform进行精确居中 */
    z-index: 1000; /* 确保弹窗在最上层 */
}

/* 覆盖整个页面的半透明遮罩层 */
.bkg.active {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
    top: 0;
    left: 0;
    z-index: 900; /* 遮罩层比弹窗低一点，确保弹窗能够显示在上面 */
}

</style>
