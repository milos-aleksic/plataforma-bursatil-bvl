import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Plataforma from '@/views/Plataforma.vue'
import PlataformaAdmin from '@/views/PlataformaAdmin.vue'
import TickerEdit from '@/views/TickerEdit.vue'
import Edit from '@/views/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plataforma',
    name: 'Plataforma',
    component: Plataforma
  },
  {
    path: '/extapiadmin',
    name: 'ExtApiAdmin',
    component: ExtApiAdmin
  },
  {
    path: '/plataforma_admin',
    name: 'Plataforma - Admin',
    component: PlataformaAdmin
  },
  {
    path: '/tickeredit/:ticker',
    name: 'Editar :ticker',
    component: TickerEdit
  },
  
  {
    path: '/edituser/:id',
    name: 'Edit',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
