
// differenceInMilliseconds
import { formatDistanceToNowStrict, differenceInMilliseconds } from 'date-fns'
import { format } from 'date-fns'
// import { ref } from 'vue'
// import { utcToZonedTime } from 'date-fns-tz'
import esES from 'date-fns/locale/es'

const formatDates = (itemRow) => {

    let lastDateFormatted = null
    let sinceLastDate = null
    let previousDateFormatted = null
    let sincePreviousDate = null
    let lastUpdateDiffMilisecs = null

    if (itemRow['lastDate']) {
        const lastDate = new Date(itemRow['lastDate'] + 'Z')
        lastDateFormatted = format(lastDate, 'H:mm:ss dd/MM/yyyy')
        lastUpdateDiffMilisecs = differenceInMilliseconds(lastDate, new Date())
        sinceLastDate = formatDistanceToNowStrict(lastDate , {locale: esES})
    } else if (itemRow['previousDate']) {
        const previousDate = new Date(itemRow['previousDate'] + 'Z')
        previousDateFormatted = format(previousDate, 'H:mm:ss dd/MM/yyyy')
        lastUpdateDiffMilisecs = differenceInMilliseconds(previousDate, new Date())
        sincePreviousDate = formatDistanceToNowStrict(previousDate, {locale: esES})
    }

    return { sinceLastDate, sincePreviousDate, lastDateFormatted, previousDateFormatted, lastUpdateDiffMilisecs }

}


// To object conversion for easy matching
export const groupByTicker = (data) => {
    const groupedByTicker = {}
    data.map(function(value) {
        groupedByTicker[value.nemonico] = value
    })
    return groupedByTicker
}

// To array conversion
export const ungroupByTicker = (data) => {
    const ungroupedByTicker = []
    Object.keys(data).map(function(value) {
        ungroupedByTicker.push(data[value])
    })
    return ungroupedByTicker
}

export const normalizeData = (data) => {

    // const headersList = []
    const itemsList = []

    // console.log('groupedByTicker data arg', data)

    data.map(function(value) {
        // itemRow LOOP
        value['companyLocation'] = (value['companyCode'] == 'XXX') ? 'Internacional' : 'Local'
        value['hasData'] = (value['last'] !== undefined || (value['previous'] !== undefined && value['previousDate'] !== undefined)) ? true : false

        value['closeValue'] = (value['last'] !== undefined) ? value['last'] : ( (value['previous'] !== undefined) ? value['previous'] :  0)
        value['TickerVariation'] = setVariations(value)
        value['SincePreviousDate'] = setVariations(value)

        // Prepare objects with formated dates
        const { sinceLastDate, sincePreviousDate, lastDateFormatted, previousDateFormatted, lastUpdateDiffMilisecs } = formatDates(value)

        value['lastUpdateDiffMilisecs'] = lastUpdateDiffMilisecs
        if (value['lastDate']) {
            value['sinceLastDate'] = sinceLastDate
            value['lastDateFormatted'] = lastDateFormatted
        } else if (value['previousDate']) {
            value['sincePreviousDate'] = sincePreviousDate
            value['previousDateFormatted'] = previousDateFormatted
        }
        itemsList.push(value)

        // Create Headers
        // for (const column of Object.keys(value)) {
        //     if (!headersList.includes(column)) {
        //         headersList.push(column)
        //     }
        // }
        return value
        // console.log('groupedByTicker value in data map()', value)
    })


    return itemsList
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
