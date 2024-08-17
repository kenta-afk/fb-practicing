import { createRouter,createWebHistory } from 'vue-router';
import List from './components/ListPage.vue';
import Add from './components/AddPage.vue';
import Edit from './components/EditPage.vue';
 
const routes = [
    { path: '/', name: 'list', component: List },
    { path: '/add', name: 'add', component: Add },
    { path: '/edit', name: 'edit', component: Edit, props: true },
]
 
const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;
