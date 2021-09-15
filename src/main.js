
import { createApp } from 'vue'
import AlphaIndex from './components/AlphaIndex.vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.component('AlphaIndex', AlphaIndex) // global registration - can be used anywhere

app
  .use(router)
  .mount('#app')
