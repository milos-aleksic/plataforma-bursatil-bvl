// import dependency to handle HTTP request to our back end
import axios from 'axios'
import { createStore } from 'vuex';
import { groupByTicker, formatPresence } from './cleanDataHelper';

import { format } from 'date-fns'


// import Vuex from 'vuex'
// import Vue from 'vue'

//load Vuex
// Vue.use(Vuex);

//to handle state
const state = {
    starterList: [],
    presenceList: [],
    liveUpdateList: [],
    liveUpdatePresenceList: [],
    listItem: {},
    filteredList: [],
    listFilter: {
        search: '',
        status: 'all',
        order: 'createdDate'
    }
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    getStarterList( { commit }) {
        axios({
                method: 'post',
                url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market',
                data: {today: false}
            })
            .then(response => {
                const dataReady = groupByTicker(response.data.content)
                commit('SET_STARTER', dataReady.items)
                // commit('SET_STOCKQUOTE_HEADINGS', dataReady.headings)
        })
    },
    getLiveList ({ commit }) {
        axios({
                method: 'post',
                url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market',
                data: {today: true}
            })
            .then(response => {
                const dataReady = groupByTicker(response.data.content)
                commit('SET_LIVE', dataReady.items)
        })
    },
    async filterList ({ commit }) {
        await commit('SET_FILTERED_LIST')
        await commit('ORDER_LIST')
    },
    async filterOrder ({ commit }, order) {
        await commit('SET_LIST_ORDER', order)
        await commit('ORDER_LIST')
    },
    async filterStatus ({ commit, dispatch }, status) {
        await commit('SET_FILTER_STATUS', status)
        dispatch('filterList')
    },

    // ,
    // getPresenceDataLive_rv ({ commit }) {
    //     axios.get('https://dataondemand.bvl.com.pe/v1/stock-market-presence/today')
    //         .then(response => {
    //             const dataReady = response.data.docStockMarketPresenceDetails
    //             commit('SET_PRESENCE_LIVE_RV', dataReady.items)
    //     })
    // },
    // getPresenceDataPrev_rv ({ commit }) {
    //     axios.get('https://dataondemand.bvl.com.pe/v1/historic-stock-market-presence/filter?presenceType=RV&date=' + format(new Date(), 'yy-MM-d'))
    //         .then(response => {
    //             const dataReady = formatPresence(response.data.docStockMarketPresenceDetails)
    //             commit('SET_PRESENCE_PREV_RV', dataReady.items)
    //         }
    //     )
    // },
    // setSort_StockMarket ({ commit, sort = 'lastDate' }) {
    //     switch (sort) {
    //         default:
    //             commit('FILTER_STOCK_LIST')
    //             break
    //     }
    // }
}

//to handle mutations
const mutations = {
    SET_STARTER(state, list) {
        state.starterList = list
    },
    SET_LIVE(state, list) { // Updates STARTER

        const actualList = state.starterList

        Object.keys(newLiveList).map((tickerCode) => {
            if (actualList[tickerCode] !== undefined) {
                Object.assign(actualList[tickerCode], newLiveList[tickerCode])
            }
        })

        state.starterList = newLiveList
        state.liveList = newLiveList
    },
    SET_FILTERED_LIST(state, list) { // List of all properties received from BVL API, not ll items have all of them
        state.filteredList = list
    },    
    SET_FILTER_STATUS(state, status) {
        state.filter.status = status
    },
    SET_LIST_ORDER(state, order) {
        state.filter.order = order
    },
    ORDER_LIST(state, order) {
        const filteredList = state.filteredList
        state.filteredList = filteredList
    }
    // ,
    // SET_STOCKQUOTE_HEADINGS(state, list) {
    //     state.StockMarketHeadingsList = list
    // },
    // SET_PRESENCE_LIVE_RF(state, list) {
    //     state.PresenceLiveRV = list
    // },
    // SET_PRESENCE_PREV_RV(state, list) {
    //     state.PresencePrevRV = list

    // }
}

//export store module
export default createStore({
    state,
    getters,
    actions,
    mutations
})