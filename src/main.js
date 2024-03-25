import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue'
import ChatPage from './components/ChatPage.vue'
import LogoScreen from './components/LogoScreen.vue'
import DocRecPage from './components/DocRecPage.vue'
import HomePage from './components/HomePage.vue'
import PersonalPage from './components/PersonalPage.vue'
import DocPage from './components/DocPage.vue'
import HospitalPage from './components/HospitalPage.vue'

// document.documentElement.style.fontSize=window.screen.width/10+'px'
const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LogoScreen },// 默认路由设置为LogoScreen
    { path: '/login', component: LoginPage }, // 登录注册界面
    { path: '/ChatPage', component: ChatPage }, // 聊天页面
    { path: '/DocRecPage', component: DocRecPage},
    { path: '/HomePage', component: HomePage},
    { path: '/PersonalPage', component: PersonalPage},
    { path: '/DocPage', component: DocPage},
    { path: '/HospitalPage', component: HospitalPage},
  ],
});

app.use(router);

app.mount('#app');
