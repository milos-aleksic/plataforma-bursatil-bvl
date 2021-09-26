<template>

    <!--CARDS WRAPPER-->
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-expand uk-margin-large-bottom">

            <div id="stock-filter" class="" data-uk-filter="target: .js-filter; animation: fade">

                <div class="uk-flex-middle">
                    <div class="uk-width-expand">

                        <!-- Buscador y Filtro  Nacion o Internacional -->
                        <div class="search-top-bar uk-padding-small uk-background-secondary">

                            <div class="uk-flex">
                                <!-- Buscador -->
                                <div class="uk-width-expand">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon uk-text-bold" uk-icon="icon: search"></span>
                                        <input type="text" name="keysearch" class="uk-input uk-width-1-1 uk-border-pill">
                                    </div>
                                </div>

                                <div class="uk-width-auto uk-flex uk-flex-middle uk-flex-right">
                                    <button class="uk-border-rounded uk-margin-left uk-button uk-button-alternative">Buscar</button>
                                    <ul class="uk-subnav uk-subnav-pill uk-margin-remove">
                                        <li class="uk-active" 
                                            data-uk-filter-control="filter: [data-filter-location='local']; group: filter-location">
                                                <a href="#">Perú</a>
                                        </li>
                                        <li data-uk-tooltip="Instrumentos del Resto del Mundo" 
                                            data-uk-filter-control="filter: [data-filter-location='stranger']; group: filter-location">
                                                <a href="#"><i class="fa fa-globe-americas fa-2x"></i> </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Filtro  Nacion o Internacional -->
                            <div class="uk-width-auto uk-flex uk-flex-middle">
                            </div>

                        </div>

                        <!-- Filtro Avanzado -->
                        <div class="uk-position-relative uk-overflow-hidden">   
                            <div id="advanced-filter" class="uk-hidden">
                                    
                                <!-- Progresión Positiva o Negativa -->
                                <div class="uk-margin-remove" uk-grid>
                                    <!-- <div>Variación del Valor</div> -->
                                    <ul class="uk-subnav uk-subnav-pill uk-margin-remove">
                                        <li class="uk-active" data-uk-filter-control="group: filter-value-variation">
                                            <a href="#"><span uk-icon="world" ></span></a>
                                        </li>
                                        <li data-uk-filter-control="filter: [data-filter-value-variation='up']; group: filter-value-variation">
                                            <a href="#"><span uk-icon="icon: triangle-up; ratio: 1.5" class="uk-text-success "></span>
                                                En Alza
                                            </a>
                                        </li>
                                        <li data-uk-filter-control="filter: [data-filter-value-variation='nochange']; group: filter-value-variation">
                                            <a href="#"><span uk-icon="icon: more; ratio: 1" class="uk-text-primary "></span>
                                                Sin Cambios
                                            </a>
                                        </li>
                                        <li data-uk-filter-control="filter: [data-filter-value-variation='down']; group: filter-value-variation">
                                            <a href="#"><span uk-icon="icon: triangle-down; ratio: 1.5" class="uk-text-danger "></span>
                                                A la Baja
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Sector -->
                                <div class="uk-margin-remove" uk-grid>
                                    <button class="uk-button uk-button-default" type="button">Sector</button>
                                    <div uk-dropdown>
                                        <ul class="uk-nav uk-dropdown-nav uk-margin-remove" uk-margin>
                                            <li class="uk-active" data-uk-filter-control="group: filter-sector">
                                                <a href="#">TODOS LOS SECTORES</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CA']; group: filter-sector">
                                                <a href="#">ADMINISTRADORAS DE FONDOS DE PENSIONES</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CD']; group: filter-sector">
                                                <a href="#">DIVERSAS</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CS']; group: filter-sector">
                                                <a href="#">SEGUROS</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CG']; group: filter-sector">
                                                <a href="#">AGRARIO</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CB']; group: filter-sector">
                                                <a href="#">BANCOS Y FINANCIERAS</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='FI']; group: filter-sector">
                                                <a href="#">FONDOS DE INVERSIÓN</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CM']; group: filter-sector">
                                                <a href="#">MINERAS</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CP']; group: filter-sector">
                                                <a href="#">SERVICIOS PÚBLICOS</a>
                                            </li>
                                            <li data-uk-filter-control="filter: [data-filter-sector='CI']; group: filter-sector">
                                                <a href="#">INDUSTRIALES</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="uk-margin-remove uk-text-right open-filter-button">
                            <button class="uk-button uk-button-link" uk-toggle="target: #advanced-filter; cls: open-filter, close-filter"><i class="bi bi-funnel-fill"></i> Filtro Avanzado</button>
                        </div>
                    </div>

 
                </div>

                <!-- Totals Result -->

                <!--  END HEADER BLOCK -->

                <div class="uk-flex uk-flex-middle uk-flex-right">

                    <button class="uk-button uk-button-link" type="button" data-uk-tooltip="Ordenado por">
                        <i class="bi bi-chevron-down"></i> {{ sortedby }}
                    </button>

                    <div id="sortdorpdown" uk-dropdown="mode: click">
                        <ul class="uk-nav uk-dropdown-nav uk-margin-remove" uk-margin>
                            <li v-for="{title, selector, order} in sortOptions" v-bind:key="selector" 
                                v-bind:class="{'uk-active': selector == 'data-sort-since-last-update'}" 
                                v-bind:uk-filter-control="'sort: ' + selector + '; order: ' + order"
                                @click="updateSortedBy(title)">
                                    <a href="#">{{ title }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="uk-margin-small-left">
                        <a v-for="{selector} in sortOptions" v-bind:key="selector" 
                            v-bind:class="invertSortDisplay(selector, 'desc')" 
                            v-bind:uk-filter-control="'sort: ' + selector + '; order: desc'" 
                            data-uk-tooltip="Invertir Orden"
                            href="#">
                                <i class="bi bi-arrow-down-up"></i>
                        </a>
                        <a v-for="{selector} in sortOptions" v-bind:key="selector" 
                            v-bind:class="invertSortDisplay(selector, 'asc')" 
                            v-bind:uk-filter-control="'sort: ' + selector + '; order: asc'" 
                            data-uk-tooltip="Invertir Orden"
                            href="#">
                                <i class="bi bi-arrow-down-up"></i>
                        </a>
                    </div>
                    <span class="uk-text-uppercase uk-h5 uk-text-bold uk-margin-remove uk-padding-small">
                        Total: {{ totals.filtered }}
                    </span>
                    <span data-uk-tooltip="Vista Cuadriculada">
                        <a @click="changeLayout('grid')"><i class="bi bi-grid uk-h5"></i></a>
                    </span>
                    <span data-uk-tooltip="Vista Lineal" class="uk-margin-small-left">
                        <a @click="changeLayout('list')"><i class="bi bi-list uk-h5"></i></a>
                    </span>
                </div>

                <!-- ITEM RENDER BLOCK -->
                <!-- card -->
                <div class="uk-margin-top js-filter uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m  uk-grid-match" uk-grid  uk-height-match="target: .uk-card-header">
                    <div v-for="ticker in tickers" :key="ticker['nemonico']" 
                        v-bind:data-computed-grade="Number(ticker.marketPresence.factor)" 
                        v-bind:data-filter-sector="ticker.sectorCode" 
                        v-bind:data-filter-value-variation="getFilterValueVariation(ticker['TickerVariation'])" 
                        v-bind:data-filter-location="getFilterLocation(ticker['companyCode'])" 
                        v-bind:data-sort-index-test="ticker.indexTest" 
                        v-bind:data-sort-since-last-update="ticker.SinceLastUpdate" 
                        v-bind:data-sort-price-variation="ticker.TickerVariation" 
                        :class="getLayoutClass()" 
                        data-tags="">
                        
                        <LastCierresStockMarketItem v-bind:ticker="ticker"></LastCierresStockMarketItem>

                    </div>
                </div>
                <!-- /card -->
            </div>

        </div>
    </section>
    <!--/CARDS WRAPPER-->
    
</template>

<style type="text/css">
    .open-filter-button {
        transition: all .5s ease-in-out;
    }
</style>

<script>


import { buildDataTree } from '@/store/rentaVariableDataTree'
// import { requestData } from '@/store/fetchJsonData'

import UIkit from 'uikit'
import { ref } from 'vue'

import LastCierresStockMarketItem from './LastCierresStockMarketItem'

export default {
    components: { LastCierresStockMarketItem },
    props: ['ticker'],
    data() {
        return {
            tickers: this.getDataList(),
            items: this.getJsonData(),
            totals: {},
            activeLayout: ref('grid'),
            sortedby: ref('Fecha Transacción'),
            activeSort: ref({}),
            sortOptions: [
                {
                    title: 'Fecha Transacción',
                    selector: 'data-sort-since-last-update',
                    order: 'asc'
                },
                {
                    title: 'Presencia Mercado',
                    selector: 'data-computed-grade',
                    order: 'desc'
                },
                {
                    title: 'Variación Valor',
                    selector: 'data-sort-price-variation',
                    order: 'desc'
                }
            ]
        }
    },
    computed: {
    },
    methods: {
        invertSortDisplay(selector, order) {
            const activeSort = this.activeSort

            if (selector != activeSort[0]) {
                return 'uk-hidden'
            } else if (activeSort[1] == order) {
                return 'uk-hidden'
            } else {
                return ''
            }

        },
        updateSortedBy(title) {
            this.sortedby = title
            UIkit.dropdown('#sortdorpdown').hide(false)
        },
        getFilterValueVariation(TickerVariation) {
            const valueNmb = parseFloat(TickerVariation)
            if (valueNmb > 0) {
                return 'up'
            } else if (valueNmb < 0) {
                return 'down'
            } else {
                return 'nochange'
            }
        },
        getFilterLocation(companyCode) {
            if (companyCode == 'XXX') {
                return 'stranger'
            } else {
                return 'local'
            }
        },
        changeLayout(layout) {
            this.activeLayout = layout
            // this.getLayoutClass()
            console.log(this.activeLayout)
        },
        getLayoutClass() {
            if (this.activeLayout == 'list') {
                return 'uk-width-1-1'
            } else {
                return ''
            }

        },
        async getDataList() {
            const tickersList = await buildDataTree()
            // console.log(tickersList)
            this.tickers = tickersList.content
            this.totals = {
                up: tickersList.up,
                down: tickersList.down,
                equal: tickersList.equal,
                filtered: 0
            }
        },
        async getJsonData() {
            // const tickersList = await requestData('StockQuoteMarket')
            // console.log(tickersList)
            // this.tickers = tickersList.content
            // this.totals = {
            //     up: tickersList.up,
            //     down: tickersList.down,
            //     equal: tickersList.equal,
            //     filtered: 0
            // }
        },
        setTotals(total) {
            this.totals.filtered = total
        },
        setActiveSort(state) {
            this.activeSort = state
        }
    },
    mounted() {

        const setTotals = this.setTotals
        const setActiveSort = this.setActiveSort

        // UIkit.util.on('#stock-filter', 'beforeFilter', function (element, state) {
        //     // console.log('beofreFilter element', element)
        //     console.log('beofreFilter state', {state, element})
        //     // console.log('beofreFilter e', e)

        // })
        // Get TOTAL items result on each filter change
        UIkit.util.on('#stock-filter', 'afterFilter', function (item) {

            const el = item.detail[0]

            // SET Active Sort
            setActiveSort(el.getState().sort)

            const elChildren = el.children
            const filterNames = Object.values(el.getState().filter)
            let countResults = 0

            for (let i = elChildren.length - 1; i >= 0; i--) {
                const childRowDataset = elChildren[i]['dataset']

                let valid = filterNames.length

                for (let i2 = filterNames.length - 1; i2 >= 0; i2--) {
                    const filterNamesRow = filterNames[i2]
                    const valueToTest = filterNamesRow.replace(/(\[.*?'|'\])/g, '')
                    const attrName = filterNamesRow.replace(/(\[data-|='.*?'\])/g, '')
                    const dataSetNameCane = attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                                            return index === 0 ? word.toLowerCase() : word.toUpperCase();
                                          }).replace(/\s+|-/g, '')

                    if (valueToTest == childRowDataset[dataSetNameCane]) {
                        valid = valid - 1 
                    }
                }

                // console.log('valid', valid)

                if (valid === 0) {
                    countResults = countResults + 1
                }
            }
            setTotals(countResults)
        })

    }
}
</script>


