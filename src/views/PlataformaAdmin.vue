<template>
  <listEmisoresBVL />

  
  <TickerCreate />

  <TickerListAdmin />
  
</template>

<script>
import listEmisoresBVL from '@/components/listEmisoresBVL.vue'
import TickerListAdmin from '@/components/TickerListAdmin.vue'
import TickerCreate from '@/components/TickerCreate.vue'

const Obj = {
  name: 'PlataformaAdmin',
  components: {  listEmisoresBVL, TickerListAdmin, TickerCreate }
}

export default Obj

</script>
