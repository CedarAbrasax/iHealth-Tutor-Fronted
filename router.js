import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import ChatPage from './components/ChatPage.vue';
import LogoScreen from './components/LogoScreen.vue';
import DocRecPage from './components/DocRecPage.vue';
import HomePage from './components/HomePage.vue';
import PersonalPage from './components/PersonalPage.vue';
import DocPage from './components/DocPage.vue';

const routes = [
  { path: '/', component: LogoScreen }, // 重定向到启动页面
  { path: '/login', component: LoginPage },
  { path: '/chat', component: ChatPage },
  { path: '/docRec', component:DocRecPage},
  { path: '/home', component:HomePage},
  { path: '/personal', component:PersonalPage},
  { path: '/doctor', component:DocPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
