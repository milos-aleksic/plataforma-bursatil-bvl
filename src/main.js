
import { createApp } from 'vue'
import {Vue} from 'vue'

import VueCompositionApi from '@vue/composition-api'
import AlphaIndex from './components/AlphaIndex.vue'
import App from './App.vue'
import router from './router'

Vue.use(VueCompositionApi)
const app = createApp(App)

app.component('AlphaIndex', AlphaIndex) // global registration - can be used anywhere

new Vue({
  render: h => h(app)
}).$use(router)
.$mount("#app");