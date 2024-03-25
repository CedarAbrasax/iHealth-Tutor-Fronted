<template>
  <div class="personal-home">
    <div class="personal-header">
      <img src="https://i.postimg.cc/pdGFKqQG/image.png" alt="背景图片" class="background-image" />
      <div class="user-info">
        <div class="user-avatar">
          <img src="https://i.postimg.cc/MTzyn1vs/user-avatar.jpg" alt="用户头像" class="avatar" />
        </div>
        <div class="user-name">
          John Doe
        </div>
      </div>
    </div>
    <div class="personal-content">
      <button class="profile-button">
        <div class="button-logo"></div>收藏列表
      </button>
      <button class="profile-button">
        <div class="button-logo"></div>设置
      </button>
      <button class="profile-button">
        <div class="button-logo"></div>帮助
      </button>
      <button class="profile-button">
        <div class="button-logo"></div>账户信息
      </button>
      <button class="profile-button">
        <div class="button-logo"></div>联系我们
      </button>
    </div>
  </div>
</template>

<style scoped>
.personal-home {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.personal-header {
  position: relative;
  height: 25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.background-image {
  width: 100%;
  height: 100%;
}

.user-info {
  position: absolute;
  bottom:0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  height:30%;
}

.user-avatar {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #ADD8E6; /* 浅蓝色背景 */
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit:fill;
}

.user-name {
  text-align: center;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.7); /* 半透明背景 */
  width: 100px; /* 与头像同宽 */
  padding: 4px;
  margin-top: -50px; /* 覆盖头像的下半部分 */
}

.personal-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.profile-button {
  width: 100%; /* 按钮宽度与页面宽度一致 */
  padding: 15px 30px;
  background-color: transparent;
  border: none; /* 移除边框 */
  color: #000;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 添加阴影 */
}


.button-logo {
  width: 50px; /* logo的宽度 */
  height: 50px; /* logo的高度 */
  background-image: src('https://i.postimg.cc/bYTm9wPD/Logo.png'); /* logo图片 */
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px; /* 与文字之间的间隙 */
}

@media (max-width: 768px) {
  /* 对移动端进行样式调整 */
  .personal-header, .personal-content, .profile-button {
    /* 添加移动端特定的样式 */
  }
}
</style>
