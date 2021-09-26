// import {ref, toRefs, reactive} from '@vue/composition-api'
import {toRefs, reactive} from '@vue/composition-api'
// import useFetch from './use-fetch'


const useFetch = async (url, options) => {

    const state = reactive({
        response: [],
        error: null,
        fetching: false
    })
    const fetchData = async () => {
        state.fetching = true
        try {
            const res = await fetch(url, options)
            const json = await res.json()
            state.response = json
        } catch (errors) {
            state.error = errors
        } finally {
            state.fetching = false
        }
    }
    return {...toRefs(state), fetchData}
}

export const requestData = async function(type) {
    let items = reactive({list: [], error: null, fetching: false})
    let submitted = null
    let breakLoop = false
    const requestParams = getsourcePath(type)
    // let errors = reactive({error: null})

    for (var i = requestParams.length - 1 ;i >= 0; i--) {

        const request = requestParams[i]
        const options = (request.options) ? request.options : {}
        console.log('options', options)
        submitted = async () => {
            const {response, error, fetching, fetchData} = await useFetch(
                request.url,
                options
            )

            fetchData();
            items.list = response
            items.error = error
            items.fetching = fetching

            if (!items.error) {
                breakLoop = true
            }
        }

        if (breakLoop) {
            break
        }
    }

    return {submitted, ...toRefs(items)}
}

const getsourcePath = (keyword) =>  { // (valorNuevo, valorAntiguo)
    let jsonPaths = []

    switch (keyword)
    {
        case "StockQuoteMarket": 
            jsonPaths = [
                {url: 'https://storage.googleapis.com/bvl_open_api/diario/stock-quote-market/v1_stock-quote_market.json'},
                {url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market', options: {today: false}}
            ]
            break

        default: 
            console.log('error with jsonPaths')
    }
    return jsonPaths
}
