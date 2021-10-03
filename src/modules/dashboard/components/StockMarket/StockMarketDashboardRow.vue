<template>
    <div class="uk-card uk-card-small uk-card-default">

        <div class="uk-card-header uk-padding-remove-bottom">


            <div class="uk-grid uk-grid-divider uk-grid-small uk-text-small uk-flex uk-flex-middle" data-uk-grid>

                <TickerCompanyHeadingInfo 
                    v-bind:sectorDescription="itemRow.sectorDescription" 
                    v-bind:nemonico="itemRow.nemonico" 
                    v-bind:shortName="itemRow.shortName" 
                    v-bind:segment="itemRow.segment" 
                />


            
                <!-- Ultimo Valor CIerre -->
                <LastValuesHeading 
                    v-bind:item="itemRow" 
                    v-bind:progressClass="getProgressClass(itemRow.TickerVariation)" 
                    v-bind:formatedVariation="formatTickerVariation(itemRow.TickerVariation)" 
                />


            </div>

            <!-- Factor Presencia Mercado -->
            <div uk-grid>
                <!-- <FactorPresenciaMercado
                        v-bind:="itemRow.marketPresence" 
                    /> -->
            </div>

        </div>

        <div class="uk-card-body">
        </div>

        <div class="uk-card-media">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                <p class="uk-text-small uk-text-muted"></p>

                <!-- <img class="lazy" data-src="https://picsum.photos/400/300/?random=5" data-width="200" data-height="150" data-uk-img alt="" src="img/transp.gif"> -->
                <div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
                    <span data-uk-icon="icon:heart; ratio: 0.8"></span> 12.345 <span data-uk-icon="icon:comment; ratio: 0.8"></span> 12.345
                </div>
            </div>                     
        </div>
        <div class="uk-card-footer">
            <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                <div class="uk-width-expand">

                    <!-- Notas Calificativas de 3 meses -->
                    <div class="uk-text-center uk-grid uk-grid-small uk-grid-divider" data-uk-grid>

    <!--                     <div class="uk-width-expand">
                            <div class=" uk-flex uk-flex-middle uk-text-bold uk-text-center uk-text-uppercase uk-text-small uk-text-muted" data-uk-tooltip="Valor asignado a las acciones y valores representativos de acciones que cumplen con tener presencia bursátil">
                                Análisis
                            </div> 
                            <div class="uk-display-block uk-flex uk-flex-middle">
                                <i @click="loadCharts()" class="uk-text-large bi-bar-chart-fill"></i>
                            </div>
                        </div> -->


                    </div>

                </div>
                <div class="uk-width-auto">
                    <button class="uk-button uk-button-small uk-button-secondary" type="submit" @click="buyStock()">
                        OPERAR
                    </button>
                    <!-- <a data-uk-tooltip="title: Comprar" href="#" class="uk-icon-link" data-uk-icon="icon:heart; ratio: 1"></a> -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import TickerCompanyHeadingInfo from './TickerCompanyHeadingInfo'
import LastValuesHeading from './LastValuesHeading'

export default {
    name: 'StockMarketDashboardRow',
    components: {TickerCompanyHeadingInfo, LastValuesHeading},
    props: ['itemRow'],
    data() {
        return {
            langStrings: {
                TOOLTIP_SECTORTICKER: 'Sector al que pertenece la empresa',
                TOOLTIP_TICKER: 'Codigo de la Renta Variable - Ticker',
                TOOLTIP_EMPRESANOMBRE: 'Nombre de la empresa',
                TOOLTIP_PRESENCIAMERCADO: 'Valor asignado a las acciones y valores representativos de acciones que cumplen con tener presencia bursátil',
                TOOLTIP_LASTCLOSE: 'Valor de la acción obtenido en la última transacción',
                TOOLTIP_LASTDATE: 'Momento cuando ocurrió la ultima transacción',
                TOOLTIP_VARIATION: 'Diferencia entre los dos ultimos valores, ha habido un cambio reciente en el valor si puedes ver la diferencia'
            },
            hotSectores: []
        }
    },
    methods: {
        buyStock() {
            console.log('buyStock!')
        },
        getPercentageDiff(modifiedValue, baseValue) { // (valorNuevo, valorAntiguo)
            const formuled = ((modifiedValue - baseValue) / modifiedValue) * 100 
            const percentNumber = Number(parseFloat((formuled - (formuled * 2))).toFixed(2))
            return percentNumber
        },
        loadCharts () {
            console.log('loadCharts')
        },
        formatTickerVariation (value) {

            // console.log('formatTickerVariation value', value);

            if (value > 0) {
                return '+' + value + '%'
            }
            if (value == 0) {
                return '-----'
            }
            if (value < 0) {
                return value + '%'
            }
        },
        getProgressClass(progressValue) {
            let progressClass = ''

            if (progressValue > 0) {
                progressClass = 'success'
            } else if (progressValue < 0) {
                progressClass = 'danger'
            } else if (progressValue == 0) {
                progressClass = 'primary'
            }


            return `uk-text-${progressClass} uk-${progressClass}`
        }
    },
    mounted() {

    }
}
</script>


