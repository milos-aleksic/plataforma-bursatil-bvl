<template>

    <!--CARDS WRAPPER-->
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
        <div class="uk-container uk-container-expand uk-margin-large-bottom">

            <StockMarketDashboard  />

        </div>
    </section>

</template>

<script>

import StockMarketDashboard from './StockMarket/StockMarketDashboard'

export default {
    components: { StockMarketDashboard },
    data() {
        return {
        }
    },
    // computed: {
    // },
    methods: {
    },
    mounted() {

    }
}
</script>


