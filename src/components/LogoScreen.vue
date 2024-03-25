<template>
<div class="container">
    <h1 class="title">欢迎使用邮医助治！</h1>
    <div class="logo-screen">
        <img src="https://i.postimg.cc/Dfpygg1T/1b604d8a12dac626614b08a8e31f537.png">
    </div>
    <div class="loading">
        <img src="https://i.postimg.cc/YSTwJnqc/loading.gif">
    </div>
     <p class="footer">© 2023 邮医助治. 保留所有权利。</p>
</div>

</template>

<script>
export default {
  name: 'LogoScreen',
  mounted() {
    // 在3秒后跳转到登录页面
    setTimeout(() => {
      this.$router.push('/login');
    }, 3000); 
  }
};
</script>

<style>
.container {
  text-align: center; 
  padding: 20px; 
   min-height: calc(100vh - 50px);
}


.title {
  margin-bottom: 20px; 
}

.logo-screen img {
  max-width: 100%; 
  height: auto;
  max-height: 200px; 
}

.loading img {
  max-width: 100%; 
  height: auto;
  max-height: 80px; 
}

/* 媒体查询，为不同屏幕尺寸提供适配 */
@media (max-width: 600px) {
  .logo-screen img {
    max-height: 150px; /* 移动端时图片更小 */
  }
}
.footer {
  color: grey; 
  font-size: 12px; 
  text-align: center; 
  position: absolute; 
  bottom: 0; 
  width: 100%; 
  padding: 10px 0;
  
}
</style>
