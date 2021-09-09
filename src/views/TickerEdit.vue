<template>
  <div class="card card-body mt-4">
    <h3>Modificar Emisor</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Ticker</label>
        <input v-model="form.ticker" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Sector</label>
        <input v-model="form.sector" lass="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary  mt-3">
        Actualizar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTicker, updateTicker } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const tickerId = computed(() => route.params.ticker)

    const form = reactive({ ticker: '', sector: '' })
    onMounted(async () => {
      const ticker = await getTicker(tickerId.value)
      form.ticker = ticker.ticker
      form.sector = ticker.sector
    })

    const update = async () => {
      await updateTicker(tickerId.value, { ...form })
      router.push('/')
      form.ticker = ''
      form.sector = ''
    }

    return { form, update }
  }
}
</script>
