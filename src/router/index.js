import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../components/userProfile.vue';
import UsersList from '@/views/UsersList.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userID',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/users',
    name: 'UsersList',
    component: UsersList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
