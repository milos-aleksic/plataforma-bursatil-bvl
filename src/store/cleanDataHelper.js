
import { formatDistanceToNowStrict as formatDistanceToNow, differenceInMilliseconds, compareAsc } from 'date-fns'
import esES from 'date-fns/locale/es'

export const cleanDataHelper = (data, dataType) => {

    let newData = data

    switch (dataType)
    {
        case "stockMarket":
        case "stockMarketLive":
            newData.items = groupByTicker(data.response.values)
            break

        default: 
            console.log('error with pathsToFetch')
    }

    return newData

}

export const formatPresence = (presenceData) => {

    const presenceDataObj = {}

    // dayBeforeTodaYPresence conversion de [{},{},{}] a {ticker: {}, ticker: {}, ticker: {}}
    for (let i = presenceData.length - 1; i >= 0; i--) {
        presenceDataObj[presenceData[i]['mnemonic']] = presenceData[i]
    }

    return presenceDataObj
}

export const formatDates = (itemRow) => {

    let LastUpdate = null
    let SinceLastUpdate = null
    let PreviousDateFormatted = null

    if (itemRow['lastDate']) {
        LastUpdate = formatDistanceToNow(new Date(itemRow['lastDate']), {unit: 'hour', locale: esES})
        SinceLastUpdate = differenceInMilliseconds(new Date(), new Date(itemRow['lastDate']))
        PreviousDateFormatted = formatDistanceToNow(new Date(itemRow['previousDate']), {locale: esES})
    } else if (itemRow['previousDate']) {
        SinceLastUpdate = differenceInMilliseconds(new Date(), new Date(itemRow['previousDate']))
        PreviousDateFormatted = formatDistanceToNow(new Date(itemRow['previousDate']), {locale: esES})
    }

    return { LastUpdate, SinceLastUpdate, PreviousDateFormatted }

}
export const orderItems = (items, order) => {
  const orderedList = [...items]

    switch( order ) {
        case 'createdDate':
            orderedList.sort(function (a, b) {
                return compareAsc(
                    new Date(a.createdDate), 
                    new Date(b.createdDate)
                )
            })
            break
    }

  return orderedList
}

export const groupByTicker = (data) => {

    const groupedByTicker = {}
    const headersList = []

    // console.log('groupedByTicker data arg', data)

    data.map(function(value) {
        // itemRow LOOP

        value['TickerVariation'] = setVariations(value)
        value['PreviousDateFormatted'] = setVariations(value)

        const { LastUpdate, SinceLastUpdate,  PreviousDateFormatted} = formatDates(value)
        if (value['lastDate']) {
            value['LastUpdate'] = LastUpdate
            value['SinceLastUpdate'] = SinceLastUpdate
            value['PreviousDateFormatted'] = PreviousDateFormatted
        } else if (value['previousDate']) {
            value['SinceLastUpdate'] = SinceLastUpdate
            value['PreviousDateFormatted'] = PreviousDateFormatted
        }
        groupedByTicker[value.nemonico] = value

        // Create Headers
        for (const column of Object.keys(value)) {
            if (!headersList.includes(column)) {
                headersList.push(column)
            }
        }

        // console.log('groupedByTicker value in data map()', value)
    })

    return {
        headings: headersList,
        items: groupedByTicker
    }
}

const getPercentageDiff = (modifiedValue, baseValue) =>  { // (valorNuevo, valorAntiguo)
    const formuled = ((modifiedValue - baseValue) / modifiedValue) * 100 
    const percentNumber =parseFloat((formuled - (formuled * 2)).toFixed(2))
    return percentNumber
}

const setVariations = (itemRow) => {

    // Variacion valor cierre
    if (!itemRow['last'] || itemRow['last'] == itemRow['previous']) {
        itemRow['TickerVariation'] = 0
    } else {
        itemRow['TickerVariation'] = getPercentageDiff(itemRow['previous'], itemRow['last'])
    }

    return itemRow['TickerVariation']

}

