<template>

    <div class="uk-width-4-5">
        <div class="uk-text-bold uk-text-center uk-margin-remove">
            <progress class="uk-progress presencia" v-bind:value="parseFloat(marketPresence.factor)" max="100" :class="getProgressClass(marketPresence.MarketPresenceVariation)"></progress>
        </div>
    </div>

    <div class="uk-h5 uk-margin-remove uk-text-bold uk-width-expand uk-width-1-5">

        <!-- <div class="uk-text-center uk-text-muted">Presencia Mercado</div> -->

        <div class="uk-text-right" :class="getProgressClass(marketPresence.MarketPresenceVariation)">
            
            <div v-if="marketPresence"> 
                <span v-if="marketPresence.MarketPresenceVariation">
                    <span v-bind:data-uk-tooltip="formatTickerVariation(marketPresence.MarketPresenceVariation)">
                        {{ marketPresence.factor }} 
                    </span>
                </span>
                <span v-else>
                    {{ marketPresence.factor }} 
                </span>
            </div>
            <div v-else>
                <div class="uk-text-primary uk-margin-top-small">
                    0
                </div>
            </div>

        </div>

    </div>

</template>

<script>
export default {

  name: 'FactorPresenciaMercado',
  props: ['marketPresence'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>