<template>

  <form @submit.prevent="onSubmit">
    <div class="container">
      <div class="row">
        <div class="form-group col-2">
          <input v-model="form.ticker" placeholder="Ticker" class="form-control" required />
        </div>

        <div class="form-group col-5">
          <input v-model="form.nombre" placeholder="Nombre" class="form-control" required />
        </div>

        <div class="form-group col">
          <select v-model="form.cotiza">
            <option value="">- Moneda -</option>
            <option value="pen">Soles</option>
            <option value="usd">Dolares</option>
          </select>
        </div>

        <div class="form-group col">
          <input v-model="form.sector" placeholder="Sector" class="form-control" required />
        </div>

        <div class="form-group col">
          <button type="submit" class="btn btn-success mt-3">
            Añadir Ticker
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { createTicker } from '@/firebase'
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      ticker: '',
      nombre: '',
      cotiza: '',
      sector: ''
    })
    const onSubmit = async () => {
      await createTicker({ ...form })
      form.ticker = ''
      form.nombre = ''
      form.cotiza = ''
      form.sector = ''

    }

    return { form, onSubmit}
  }
}
</script>
