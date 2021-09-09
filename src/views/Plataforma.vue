<template>
  <TickerList />
  <TickerCreate />
</template>

<script>
import TickerCreate from '@/components/TickerCreate.vue'
import TickerList from '@/components/TickerList.vue'

export default {
  name: 'Plataforma',
  components: { TickerCreate, TickerList }
}
</script>