import { createRouter, createWebHistory } from 'vue-router';

import Entry from '@/views/ready/Entry.vue';
import Language from '@/views/ready/Language.vue';
import Welcome from '@/views/ready/Welcome.vue';
import Name from '@/views/onboarding/Name.vue';
import Type from '@/views/onboarding/Type.vue';
import Chat from '@/views/content/Chat.vue';
import Map from '@/views/content/Map.vue';
import Content from '@/views/content/Content.vue';
import Setting from '@/views/content/Setting.vue';
import Keyword from '@/views/onboarding/Keyword.vue';

export const routes = [
  /** ready */
  { path: '/', component: Entry, name: 'Entry' },
  { path: '/language', component: Language, name: 'Language' },
  { path: '/welcome', component: Welcome, name: 'Welcome' },
  /** onboarding */
  { path: '/onboarding-name', component: Name, name: 'Name' },
  { path: '/onboarding-type', component: Type, name: 'Type' },
  { path: '/onboarding-keyword', component: Keyword, name: 'Keyword' },

  /** content */
  { path: '/content-chat', component: Chat, name: 'Chat' },
  { path: '/content-map', component: Map, name: 'Map' },
  { path: '/content-setting', component: Setting, name: 'Setting' },
  { path: '/content/:id', component: Content, name: 'Content' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
