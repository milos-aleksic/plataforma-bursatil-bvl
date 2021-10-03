
import { createApp } from 'vue'
import AlphaIndex from './components/AlphaIndex.vue'
import App from './App.vue'

import router from './router'
// import store from './store'


const app = createApp(App)
app.component('AlphaIndex', AlphaIndex) // global registration - can be used anywhere

app
  .use(router)
  // .use(Vuex)
  // .use(store)
  .mount('#app')
