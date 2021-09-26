<template>

<div class="uk-card uk-card-small uk-card-default">
    <div class="uk-card-header uk-padding-remove-bottom">
        <div class="uk-grid uk-grid-divider uk-grid-small uk-text-small uk-flex uk-flex-middle" data-uk-grid>
            <div class="uk-width-expand">
                <div class="uk-h4 cat-txt uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">

                    <span class="uk-display-block uk-text-muted uk-text-small" style="line-height: 15px;">
                        <!-- <span class="uk-display-block uk-text-small">({{ ticker.computedGradeSum }})</span> -->
                        {{ticker.sectorDescription}}
                    </span>

                    <!-- // TICKER NAME - NEMONICO -->
                    <span class="uk-position-relative">
<!-- 
                        <span v-if="parseFloat(ticker.negotiatedQuantity) > 0" class="uk-position-absolute" style="top: -7px; left: -16px;">
                            <i class="fa fa-cog fa-spin uk-text-small uk-text-gold"></i>
                        </span> -->

                        {{ticker.nemonico}}
                    </span>

                    <div class="uk-display-block uk-text-muted uk-text-small uk-margin-remove" style="line-height: 15px;">
                        {{ticker.shortName}}
                    </div>

                </div>
            </div>

            <!-- Ultimo Valor CIerre -->
            <div class="uk-width-auto">
                <div class="uk-margin-small-bottom uk-text-bold uk-text-right" :class="getProgressClass(ticker.TickerVariation)">

                    <!-- Actualizado hace X horas -->
                    <span class="uk-display-block uk-text-small uk-text-muted" style="line-height: 15px;">
                        Hace 
                        <span v-if="ticker.last">{{ ticker.LastUpdate }}</span>
                        <span v-else>{{ ticker.PreviousDateFormatted }}</span>
                    </span>

                    <!-- Ticker Value -->
                    {{ ticker.currency }}
                    <span class="uk-text-bold uk-h2 uk-margin-remove" :class="getProgressClass(ticker.TickerVariation)">
                        <span v-if="ticker.last" class="uk-position-relative">
                            {{ ticker.last }}
                        </span>
                        <span v-else>
                            {{ ticker.previous }}
                        </span>
                    </span>

                    <!-- Value Progress % -->
                    <div class=" uk-h6 uk-margin-remove">
                        <!-- <span v-if="ticker.last" :class="getProgressClass">{{ percentageChange }} %</span> -->
                        <span :class="getProgressClass(ticker.TickerVariation)">{{ formatTickerVariation(ticker.TickerVariation) }} </span>
                    </div>

                </div>
            </div>


        </div>

        <!-- Factor Presencia Mercado -->
        <div uk-grid>

            <div class="uk-width-4-5">
                <div class="uk-text-bold uk-text-center uk-margin-remove">
                    <progress class="uk-progress presencia" v-bind:value="parseFloat(ticker.marketPresence.factor)" max="100" :class="getProgressClass(ticker.marketPresence.MarketPresenceVariation)"></progress>
                </div>
            </div>

            <div class="uk-h5 uk-margin-remove uk-text-bold uk-width-expand uk-width-1-5">

                <!-- <div class="uk-text-center uk-text-muted">Presencia Mercado</div> -->

                <div class="uk-text-right" :class="getProgressClass(ticker.marketPresence.MarketPresenceVariation)">
                    
                    <div v-if="ticker.marketPresence"> 
                        <span v-if="ticker.marketPresence.MarketPresenceVariation">
                            <span v-bind:data-uk-tooltip="formatTickerVariation(ticker.marketPresence.MarketPresenceVariation)">
                                {{ ticker.marketPresence.factor }} 
                            </span>
                        </span>
                        <span v-else>
                            {{ ticker.marketPresence.factor }} 
                        </span>
                    </div>
                    <div v-else>
                        <div class="uk-text-primary uk-margin-top-small">
                            0
                        </div>
                    </div>

                </div>

            </div>

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


<style type="text/css">
    /*.actualizadohace {
        margin: -10px 0 5px 0;
    }*/
</style>

<script>

export default {
    props: ['ticker', 'sectores'],
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
    computed: {
        /*,
        getProgressIcon() {
            let progressIcon = ''
            const actualTicker = this.ticker

            if (actualTicker.percentageChange > 0) {
                progressIcon = 'triangle-up'
            } else if (actualTicker.percentageChange < 0) {
                progressIcon = 'triangle-down'
            } else if (actualTicker.percentageChange == 0.0) {
                progressIcon = ''
            }

            return progressIcon
        }*/
    }
}
</script>


