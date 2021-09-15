<template>

  <div>
    <form @submit.prevent="onSubmit" class="uk-form">
      <div class="container">
        <div class="row" uk-grid>

          <div class="uk-form-group uk-width-1-1 uk-width-3-5">
            <div class="uk-inline uk-width-1-1">
                <a uk-tooltip="title: OBTENER AYUDA: Clickear para ir al Listado Emisores BVL; pos: left" class="uk-form-icon uk-form-icon-flip" href="https://www.bvl.com.pe/emisores/listado-emisores" target="_blank" uk-icon="icon: lifesaver"></a>
                <input v-model="form.ticker" placeholder="Código Ticker" class="uk-input" required />
            </div>
          </div>

          <a @click="onValidateClick()" href="javascript:void(0);" class="uk-button uk-button-primary uk-width-2-5">
            VALIDAR TICKER
          </a>

        </div>
        
        <div class="uk-alert uk-alert-primary" uk-alert
          v-bind:class="{ 'uk-hidden': notif.hidden, 'uk-alert-danger': notif.hasError, 'uk-alert-success': notif.isSuccess }">
            <a class="uk-alert-close" uk-close></a>
            {{form.tickerExistMsg}}
        </div>

        <div class="uk-card" v-bind:class="{ 'uk-hidden': !notif.isSuccess }">

            <a class="uk-alert-close" uk-close uk-tooltip="Cancelar"></a>

            <div class="uk-card-header">
                <h3 class="uk-card-title">
                  {{newTicker.tickercode}}
                  <span class="uk-display-block uk-text-muted uk-text-small">
                    {{newTicker.companyname}}
                  </span>
                </h3>
            </div>
            <div class="uk-card-body"></div>

            <div class="uk-card-footer">
              <button type="submit" class="uk-button uk-buttonn-success uk-button-large">
                Añadir Ticker
              </button>
            </div>

        </div>

        <div class="row uk-hidden uk-margin-top">

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

          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import { createTicker } from '@/firebase'
// import { getAllTickersBVL } from '@/bvlHelper'
// import { getAllTickersBVL, fetchTickerInfo } from '@/bvlHelper'
import { reactive } from 'vue'

export default {
  setup() {

    // console.log('getAllTickersBVL', getAllTickersBVL())
    
    const newTicker = reactive({
      tickercode: '',
      companyname: ''
    })    
    const notif = reactive({
      hidden: true,
      hasError: false,
      isSuccess: false
    })    
    
    const form = reactive({
      ticker: '',
      nombre: '',
      cotiza: '',
      sector: '',
      tickerExistMsg: ''
    })
    const onSubmit = async () => {
      await createTicker({ ...form })
      form.ticker = ''
      form.nombre = ''
      form.cotiza = ''
      form.sector = ''
    }
    
    // const createNewTicker = async (ticker) => {
    //   newTicker.tickercode = ticker
      
    //   const tickerInfo = await fetchTickerInfo(ticker)
    //   newTicker.companyname = tickerInfo['companyName']

    // }

    // const onValidateClick = async () => {
    //   const tickerCodeValue = form.ticker.toUpperCase()
    //   form.ticker = tickerCodeValue
    //   if (tickerCodeValue != '') {
    //     const ticker = await checkIfExistsTicker(tickerCodeValue)

    //     if (ticker['error']) {
    //       notif.isSuccess = false
    //       notif.hasError = true
    //       notif.hidden = false

    //       form.tickerExistMsg = ticker['error']

    //       return
    //     } else {
    //       form.tickerExistMsg = 'Hay un Emisor disponible, revisa los datos y procede acorde'
    //       notif.hasError = false
    //       notif.isSuccess = true
    //       notif.hidden = false


    //       createNewTicker(tickerCodeValue)
    //     }
    //   }

    // }

    return {
      form,
      onSubmit,
      notif,
      newTicker
    }
  }
}
</script>
