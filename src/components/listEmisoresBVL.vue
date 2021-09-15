<template>

    <!--CARDS WRAPPER-->
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-expand uk-margin-large-bottom" data-uk-filter="target: .js-filter-ticker; animation: fade">

            <alpha-index></alpha-index>
            
            <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m  uk-child-width-1-4@l uk-grid-match js-filter-ticker" data-uk-grid="masonry: true" data-uk-sortable="handle: .drag-icon">
                
                <!-- card companyName.charAt(0).toUpperCase() +  -->
                <div v-for="{ id, sectorCode, sectorDescription, stock, fixedValues, companyCode, companyName, alphabet = companyName.charAt(0).toUpperCase() + '-index', cierres} in tickers" v-bind:data-indexLetter="alphabet" :key="id" data-tags="">
                    <div class="uk-card uk-card-small uk-card-default">
                        <div class="uk-card-header">
                            <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                                <div class="uk-width-expand">
                                    <span class="cat-txt  uk-text-bold">{{companyName}} ({{companyCode}})</span>
                                </div>
                                <div class="uk-width-auto uk-text-right uk-text-muted">
                                    {{sectorCode}}
                                </div>
                            </div>
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
                        <div class="uk-card-body">


                            <!-- Rentas -->
                            <div class="uk-text-center uk-grid uk-grid-small uk-child-width-1-2 uk-grid-divider" data-uk-grid>

                                <!-- Acciones -->
                                <div v-if="stock.length">
                                    <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">Renta Variable</h6>
                                    <div>
                                        {{stock[0]}}
                                        <span v-if="stock.length > 1" class="uk-text-danger uk-text-small" v-bind:data-uk-tooltip="removeFirstElement(stock).join(',')">
                                            (+{{stock.length - 1}})
                                        </span>
                                    </div>

                                </div>

                                <div v-if="fixedValues.length">
                                    <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">Renta FIja</h6>
                                    <div>{{fixedValues[0]['nemonico']}} 
                                        <span v-if="fixedValues.length > 1" class="uk-text-danger uk-text-small" v-bind:data-uk-tooltip="removeFirstElement(fixedValues).map(item => item.nemonico).join(', ')">
                                            (+{{fixedValues.length - 1}})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="cierres.length">
                                <div v-for="cierre in cierres" :key="cierre['nemonico']">{{cierre['nemonico']}}: {{cierre['currency']}}{{cierre['last']}}</div>
                            </div>
{{index}}
<!-- 
                            <div v-if="index.length">
                                <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">Indice</h6>
                                <div v-for="indice in index" :key="indice">{{indice}}</div>
                            </div>
                             -->
                        </div>
                        <div class="uk-card-footer">
                            <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                                <div class="uk-width-expand uk-text-small">
                                    {{sectorDescription}}
                                </div>
                                <div class="uk-width-auto uk-text-right">
                                    <a href="#" data-uk-tooltip="title: Twitter" class="uk-icon-link" data-uk-icon="icon:circle; ratio: 0.8"></a>
                                    <a href="#" data-uk-tooltip="title: Instagram" class="uk-icon-link" data-uk-icon="icon:circle; ratio: 0.8"></a>
                                    <a href="#" data-uk-tooltip="title: Behance" class="uk-icon-link" data-uk-icon="icon:circle; ratio: 0.8"></a>
                                    <a href="#" data-uk-tooltip="title: Pinterest" class="uk-icon-link" data-uk-icon="icon:circle; ratio: 0.8"></a>
                                </div>
                                <div class="uk-width-auto uk-text-right">
                                    <a data-uk-tooltip="title: Añadir a Favoritos" href="#" class="uk-icon-link" data-uk-icon="icon:heart; ratio: 1"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /card -->
                
            </div>
        </div>
    </section>
    <!--/CARDS WRAPPER-->
    
</template>

<script>

import { importTicker } from '@/firebase'
import { getDataOnDemand } from '@/bvlHelper'

export default {
    data() {
        return {
            tickers: this.getTickersBVL()
        }
    },
    setup() {
        return { importTicker }
    },
    methods: {
        removeFirstElement(arrayRmv) {
            arrayRmv.shift()
            return arrayRmv
        },
        async getTickersBVL() {
            this.tickers = await getDataOnDemand('EmisoresLocales')
            console.log('this.tickers', this.tickers)
        }
    }
}
</script>

