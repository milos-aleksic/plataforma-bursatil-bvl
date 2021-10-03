// import {ref, toRefs, reactive} from '@vue/composition-api'
// import {toRefs, reactive} from '@vue/composition-api'

import { getGoogleSheetUrl } from './gSheetHelper'

export const getPathsToFetch = (keyword) => {

    let pathsToFetch = []

    switch (keyword)
    {
        case "stockMarket":
            pathsToFetch = {
                autoApi: {url: getGoogleSheetUrl(keyword)}, // Auto API GSheet
                gStorageApi: {url: 'https://storage.googleapis.com/bvl_open_api/diario/stock-quote-market/v1_stock-quote_market.json'}, // Google Storage Object
                liveApi: {
                    url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market', 
                    options: {today: false},
                    mode: 'POST'
                }
            }
            break

        case "stockMarketLive":
            pathsToFetch = {
                autoApi: {url: getGoogleSheetUrl(keyword)}, // Auto API GSheet
                gStorageApi: {url: 'https://storage.googleapis.com/bvl_open_api/diario/stock-quote-market/v1_stock-quote_market.json'}, // Google Storage Object
                liveApi: {
                    url: 'https://dataondemand.bvl.com.pe/v1/stock-quote/market', 
                    options: {today: true},
                    mode: 'POST'
                }
            }
            break

        default: 
            console.log('error with pathsToFetch')
    }

    return pathsToFetch
}
