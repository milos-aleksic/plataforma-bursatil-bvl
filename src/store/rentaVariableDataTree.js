/* Constructor de la Data Stream de la renta Variable */




// Para controlar y dar avisos en base al horario de BVL
// => CONVERTIR EN GLOBAL

// const horarioBVL: {
//   open: [8, 30],
//   close: [17, 30]
// }

import { formatDistanceToNowStrict as formatDistanceToNow, differenceInMonths, differenceInMilliseconds } from 'date-fns'
import esES from 'date-fns/locale/es'


// Datos en JSON se actualizan cada 5 min
// EP: https://dataondemand.bvl.com.pe/v1/stock-quote/market
// import baseData from '@/store/localStorage/dailyUpdates/v1_stock-quote_market.json'
// import baseData from 'https://storage.cloud.google.com/bvl_open_api/diario/stock-quote-market/STOCK-QOUTE-MARKET_23-09-2021-02%3A31%3A45.json'


// https://dataondemand.bvl.com.pe/v1/stock-market-presence/today
import { docStockMarketPresenceDetails as todayPresenceData } from '@/store/localStorage/dailyUpdates/v1_stock-market-presence_today.json'

// https://dataondemand.bvl.com.pe/v1/stock-market-presence/today
import { docStockMarketPresenceDetails as dayBeforeTtodayPresenceData } from '@/store/localStorage/dailyUpdates/v1_stock-market-presence_day-before-today.json'

export const fetchDataOnDemandMiltek = async (url) => {

    const rawResult = await fetch(url)

    return await rawResult.json()
}


const getPercentageDiff = (modifiedValue, baseValue) =>  { // (valorNuevo, valorAntiguo)
    const formuled = ((modifiedValue - baseValue) / modifiedValue) * 100 
    const percentNumber =parseFloat((formuled - (formuled * 2)).toFixed(2))
    return percentNumber
}

/* Funciones */

export const buildDataTree = async () => {

    // Tickers LOOP in order to add other data

    // const baseData = await fetchDataOnDemandMiltek('https://storage.googleapis.com/bvl_open_api/diario/stock-quote-market/STOCK-QOUTE-MARKET_23-09-2021-02%3A31%3A45.json')
    // const baseData = await fetchDataOnDemandMiltek('https://www.npoint.io/docs/c151c4ce8a50ea2b3ffb')
    const baseData = await fetchDataOnDemandMiltek('https://storage.googleapis.com/bvl_open_api/diario/stock-quote-market/v1_stock-quote_market.json')


    const baseDataArray = await baseData['content']

    const dayBeforeTodayPresenceDataArray = await dayBeforeTtodayPresenceData
    const todayPresenceDataArray = await todayPresenceData

    const dayBeforeTodayPresenceDataObj = {}
    const todayPresenceDataObj = {}

    // dayBeforeTodaYPresence conversion de [{},{},{}] a {ticker: {}, ticker: {}, ticker: {}}
    for (let i = dayBeforeTodayPresenceDataArray.length - 1; i >= 0; i--) {
        const yesterdayPresenceRow = dayBeforeTodayPresenceDataArray[i]
        dayBeforeTodayPresenceDataObj[yesterdayPresenceRow['mnemonic']] = yesterdayPresenceRow
    }
    // todaYPresence conversion de [{},{},{}] a {ticker: {}, ticker: {}, ticker: {}}
    for (let i = todayPresenceDataArray.length - 1; i >= 0; i--) {
        const presenceRow = todayPresenceDataArray[i]
        todayPresenceDataObj[presenceRow['mnemonic']] = presenceRow
    }


    // console.log('dayBeforeTodayPresenceDataObj', dayBeforeTodayPresenceDataObj)
    // console.log('todayPresenceDataObj', todayPresenceDataObj)


    // In this loop remove items from stream

    let countInvalids = 0
    // let indexTest = 1
    // Por cada Ticker - BASE DATA MODS
    for (let i = baseData['content'].length - 1; i >= 0; i--) {
        const baseDataTickerRow = baseData['content'][i]
        const computedGrade = {}

        if (!todayPresenceDataObj[baseDataTickerRow['nemonico']] || parseFloat(todayPresenceDataObj[baseDataTickerRow['nemonico']].factor) < 40) {
            baseDataArray.splice(i, 1)
            continue
        }

        if (!baseDataTickerRow.last) {
            countInvalids = countInvalids + 1
        }

        // Con cierres de mas de 3 meses, o sin valor de cierre, se eliminan y salta al siguiente
        if (!baseDataTickerRow.last && !baseDataTickerRow.previous
            || !baseDataTickerRow.previousDate && !baseDataTickerRow.previous || differenceInMonths(new Date(), new Date(baseDataTickerRow.previousDate)) > 3) {
            baseDataArray.splice(i, 1)
            continue
        }

        // baseDataTickerRow['indexTest'] = indexTest
        // indexTest = indexTest + 1

        // Add Presence
        const mnemonic = baseDataTickerRow['nemonico']
        if (todayPresenceDataObj[mnemonic]) {

            // Computed Grade
            computedGrade['marketPresence'] = parseFloat(todayPresenceDataObj[mnemonic]['factor'])

            if (dayBeforeTodayPresenceDataObj[mnemonic]) {
                todayPresenceDataObj[mnemonic]['previous'] = dayBeforeTodayPresenceDataObj[mnemonic]
                todayPresenceDataObj[mnemonic]['MarketPresenceVariation'] = getPercentageDiff(todayPresenceDataObj[mnemonic]['factor'], dayBeforeTodayPresenceDataObj[mnemonic]['factor'])

                // Computed Grade
                computedGrade['MarketPresenceVariation'] = todayPresenceDataObj[mnemonic]['MarketPresenceVariation']
            }
            baseDataTickerRow['marketPresence'] = todayPresenceDataObj[mnemonic]
        }

        // Monto negociado
        if (baseDataTickerRow['negotiatedQuantity']) {

            // Computed Grade
            const negotiatedQuantity = Number(baseDataTickerRow['negotiatedQuantity'])
            computedGrade['negotiatedQuantity'] = negotiatedQuantity

        }

        // Variacion valor cierre
        if (!baseDataTickerRow['last'] || baseDataTickerRow['last'] == baseDataTickerRow['previous']) {
            baseDataTickerRow['TickerVariation'] = 0
        } else {
            baseDataTickerRow['TickerVariation'] = getPercentageDiff(baseDataTickerRow['previous'], baseDataTickerRow['last'])
        }

        // Computed Grade
        computedGrade['TickerVariation'] = baseDataTickerRow['TickerVariation']

        // Grado computado "algoritmo"

        baseDataTickerRow['computedGrade'] = computedGrade
        baseDataTickerRow['computedGradeSum'] = Object.values(computedGrade).reduce((a, b) => a + b, 0)


        if (baseDataTickerRow['lastDate']) {
            baseDataTickerRow['LastUpdate'] = formatDistanceToNow(new Date(baseDataTickerRow['lastDate']), {unit: 'hour', locale: esES})
            baseDataTickerRow['SinceLastUpdate'] = differenceInMilliseconds(new Date(), new Date(baseDataTickerRow['lastDate']))
        } else if (baseDataTickerRow['previousDate']) {
            baseDataTickerRow['SinceLastUpdate'] = differenceInMilliseconds(new Date(), new Date(baseDataTickerRow['previousDate']))
        }
        if (baseDataTickerRow['previousDate']) {
            baseDataTickerRow['PreviousDateFormatted'] = formatDistanceToNow(new Date(baseDataTickerRow['previousDate']), {locale: esES})
        }

        // console.log(mnemonic + ' MarketPresenceVariation', baseDataTickerRow['marketPresence']['MarketPresenceVariation'])
    }
    // console.log(countInvalids, 'No tienen [last]')
    // console.log(baseData)

    return baseData
}
