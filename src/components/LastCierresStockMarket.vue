<template>

    <!--CARDS WRAPPER-->
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-expand uk-margin-large-bottom">

            <div class="uk-grid uk-grid-medium uk-child-width-1-1" data-uk-grid="masonry: true" data-uk-sortable="handle: .drag-icon" data-uk-filter="target: .js-filter; animation: fade">
                <ul class="uk-subnav">
                    <li class="uk-active" data-uk-filter-control="sort: [data-computed-grade]; filter: [data-filter-location='local']"><a href="#">Nacional</a></li>
                    <li uk-filter-control="sort: [data-computed-grade]; filter: [data-filter-location='stranger']"><a href="#">Internacional</a></li>
                    <li uk-filter-control="sort: [data-computed-grade]; filter: [data-filter-location='']"><a href="#">Todo</a></li>
                </ul>
                <!-- card -->
                <div v-for="ticker in tickers" :key="ticker['nemonico']" v-bind:data-filter-location="(ticker['companyCode'] == 'XXX') ? 'stranger' : 'local'" class="js-filter" data-tags="">
                    
                    <LastCierresStockMarketItem v-bind:ticker="ticker"></LastCierresStockMarketItem>

                </div>
                <!-- /card -->
                
            </div>

        </div>
    </section>
    <!--/CARDS WRAPPER-->
    
</template>

<script>

import { getDataOnDemand } from '@/bvlHelper'
import LastCierresStockMarketItem from './LastCierresStockMarketItem'
// import dataOnDemand_Helper from '@/store/helpers/dataOnDemand_Helper'
// console.log('dataOnDemand_Helper', dataOnDemand_Helper)
export default {
    components: { LastCierresStockMarketItem },
    props: ['ticker'],
    data() {
        return {
            tickers: this.getTickersList(),
            totals: {}
        }
    },
    methods: {
        async getTickersList() {
            const tickersList = await getDataOnDemand('LastCierresStockMarket')
            this.tickers = tickersList.content
            this.totals = {
                up: tickersList.up,
                down: tickersList.down,
                equal: tickersList.equal
            }
        }
    }
}
</script>


