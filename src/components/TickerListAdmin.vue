<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Ticker</th>
          <th scope="col">Nombre</th>
          <th scope="col">Sector</th>
          <th scope="col">Cotiza</th>
          <th scope="col">Valor</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, ticker, nombre, cotiza, sector, cierres } in tickers" :key="id">
          <td>{{ ticker }}</td>
          <td>{{ nombre }}</td>
          <td>{{ sector }}</td>
          <td> {{ cotiza }}</td>
          <td> {{ cierres }}</td>
          <td>
            <router-link :to="`/tickeredit/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Modificar
              </button>
            </router-link>
            <button class="btn btn-warning btn-sm" @click="updateCierresBVL(ticker)">
              Actualizar Cierres
            </button>
            <button disabled class="btn btn-danger btn-sm" @click="deleteTicker(id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { useLoadTickers, deleteTicker } from '@/firebase'
import { updateCierresBVL } from '@/bvlHelper'

export default {
  setup() {
    const tickers = useLoadTickers()
    return { tickers, deleteTicker, updateCierresBVL }
  }
}
</script>
