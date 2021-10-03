<template>

    <div id="StockMarketDashboard">

        <div>
            
            <FilterItems />
            Total: 
            <span v-if="dataLoading">
                <i class="fas fa-spinner"></i>  
            </span>
            <span v-else>
                {{ mainList.value.length }}
            </span>
        </div>
        <!-- Items Grid -->
        <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m  uk-child-width-1-4@l uk-grid-match " data-uk-grid="masonry: true">

            <div v-for="(itemRow, nemonico) in mainList.value" :key="nemonico" v-bind:data-filter-location="(itemRow['companyCode'] == 'XXX') ? 'stranger' : 'local'" data-tags="">

                <!-- {{ itemRow }} -->
                <StockMarketDashboardRow v-bind:itemRow="itemRow" />
            </div>
        </div>
        <!-- Items Grid End -->
<!-- 
        <table class="uk-table">
            <caption class="uk-h3 uk-margin-remove">
                Bolsa de Valores de Lima
            </caption>
            <thead>
                <tr>
                    <th v-for="(column, index) in headingsList" v-bind:key="index">
                        <StockMarketDashboardHeader v-bind:column="column" />
                    </th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td></td>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="row in starterList" v-bind:key="row">
                    <StockMarketDashboardRow  v-bind:row="row" />
                </tr>
            </tbody>
        </table>
 -->
    </div>
    
</template>

<script>


// import { ref } from 'vue'
import FilterItems from '../FilterItems/FilterItems'
import { filteredList } from '../FilterItems/FilterItemsHelper'
import { setStarterList, updateLiveList } from '../../store/dataStreamRV'
import StockMarketDashboardRow from './StockMarketDashboardRow'
import axios from 'axios'

export default {
    name: 'StockMarketDashboard',
    // props: ['itemRow'],
    components: { StockMarketDashboardRow, FilterItems },
    data() {
        return {
            dataLoading: false
        }
    },
    computed: {
        mainList() {
            return filteredList
        }

    },
    methods: {
        setLiveDataLoop () {
            this.livedataloop = setInterval(() => {
                this.setLiveData()
            }, 30000)
        },
        // async setFilteredList() {
        //     const filtered = await filteredList
        //     console.log('filtered', filtered)
        //     this.mainList.value = filtered
        // },
        async setStarterData() {

            try {
                axios({
                    method: 'post',
                    url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market',
                    data: {today: false}
                })
                .then(response => {
                    // console.log('axios Response: ', response)
                    setStarterList(response.data.content)
                    this.setLiveData()
                    // this.info = response
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                    // this.setFilteredList()
                    this.setLiveDataLoop()
                })
                // JSON responses are automatically parsed.
            } catch (error) {
                console.log(error);
            }
            // this.items = apiData.data.content
            // this.headers = this.getHeaders()
        },
        async setLiveData() {

            try {
                axios({
                    method: 'post',
                    url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market',
                    data: {today: true}
                })
                .then(response => {
                    // console.log('axios Response: ', response)
                    updateLiveList(response.data.content)
                    // this.info = response
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })
                // JSON responses are automatically parsed.
            } catch (error) {
                console.log(error);
            }
            // this.items = apiData.data.content
            // this.headers = this.getHeaders()
        }
    },
    mounted() {

        this.setStarterData()
        
        // console.log('filteredList', filteredList.value);
        // this.$store.dispatch("getStarterList");

    },


    beforeUnmount () {
        clearInterval(this.livedataloop)
    }
}
</script>


