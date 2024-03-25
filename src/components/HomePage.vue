<template>
  <div class="home">
  <div>
    <button class="home-button" @click="navigateTo('/PersonalPage')">
    <img src="https://i.postimg.cc/0NQPqG6D/home.png" class="home-icon">
    </button>
  </div>
    <div class="search-container">
    <input
      class="search-input"
      type="text"
      placeholder="Search..."
      v-model="searchQuery"
    />
  </div>
    <div class="button-container">
      <button class="button" >
        <div class="logo-space">
            <img src="https://i.postimg.cc/KvvZBxzN/24gl-hospital.png" class="icon">
        </div>
        推荐医院
      </button>
      <button class="button" @click="navigateTo('/DocRecPage')">
        <div class="logo-space">
            <img src="https://i.postimg.cc/FsPBqQxD/image.png" class="icon">
        </div>
        推荐医生
      </button>
      <button class="button" @click="navigateTo('/ChatPage')">
        <div class="logo-space">
            <img src="https://i.postimg.cc/ZqzFsfXw/image.png" class="icon">
        </div>
        智能导诊
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    navigateTo(page) {
      // 确保传递正确的路径字符串
      this.$router.push(page);
      console.log('跳转到：', page);
    },
  },
};
</script>


<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://i.postimg.cc/pdGFKqQG/image.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.home-button{
  position:absolute;
  top:20px;
  right:20px;
  padding:10px 20px;
  border:none;
  cursor:pointer;
  display:flex;
  align-items: center;
  background-color:transparent;
}

.home-icon{
  width:30px;
  height:30px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  width: 200px;
  position: relative;
}

.logo-space {
  position: absolute;
  top: 5px;
  left: 5px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon{
    width:49px;
    height:49px;
}

.search-container {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 10px 20px; /* 调整左右内边距，增加左边距 */
  margin: 10px 3px; /* 调整上下和左右的间距 */
  width: 90%; /* 调整宽度，使其不会溢出容器 */
  
}

.search-input {
  width: 100%; /* 让输入框占满容器宽度 */
  border: none;
  background: none;
  font-size: 16px;
  outline: none;
}
</style>
