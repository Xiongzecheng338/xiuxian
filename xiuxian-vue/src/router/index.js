import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Realm from '../views/Realm.vue'
import Technique from '../views/Technique.vue'
import Alchemy from '../views/Alchemy.vue'
import Practice from '../views/Practice.vue'
import Health from '../views/Health.vue'
import News from '../views/News.vue'
import Gacha from '../views/Gacha.vue'
import Achievement from '../views/Achievement.vue'
import Task from '../views/Task.vue'
import Battle from '../views/Battle.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/realm', name: 'Realm', component: Realm },
  { path: '/technique', name: 'Technique', component: Technique },
  { path: '/alchemy', name: 'Alchemy', component: Alchemy },
  { path: '/practice', name: 'Practice', component: Practice },
  { path: '/health', name: 'Health', component: Health },
  { path: '/news', name: 'News', component: News },
  { path: '/gacha', name: 'Gacha', component: Gacha },
  { path: '/achievement', name: 'Achievement', component: Achievement },
  { path: '/task', name: 'Task', component: Task },
  { path: '/battle', name: 'Battle', component: Battle },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
