import { createApp } from 'vue'
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/styles/reset.scss'
import 'font-awesome/css/font-awesome.min.css'

const app = createApp(App);
// 注册全局 element-plus icon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(store).use(ElementPlus, {
    size: 'small'
}).mount('#app')