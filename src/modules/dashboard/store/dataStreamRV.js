import { ref } from 'vue';
// ungroupByTicker
import { groupByTicker, ungroupByTicker, normalizeData } from './cleanDataHelper'

import { filterList } from '@/modules/dashboard/components/FilterItems/FilterItemsHelper'


const starterList = ref([])
const liveList = ref([])

export const starterUpdatedList = ref([])
export const dataLoading = ref(true)
export const dataResume = ref({})

export const setStarterList = startList => {
    starterList.value = normalizeData(startList)
    starterUpdatedList.value = starterList.value
    // filterList()

};

export const updateLiveList = newLiveList => {
    
    liveList.value = normalizeData(newLiveList)

    const actualList = groupByTicker(starterUpdatedList.value)
    const newList = groupByTicker(liveList.value)

    Object.keys(newList).map((tickerCode) => {
        if (actualList[tickerCode] !== undefined) {
            Object.assign(actualList[tickerCode], newList[tickerCode].items)
        }
    })


    dataResume.value = getTotals()
    starterUpdatedList.value = ungroupByTicker(actualList)

    filterList()
}


const getTotals = () => {
    const dataResume = {
        headings: [],
        segment: [],
        minValue: 0,
        maxValue: 0,
        sectors: {}
    }
    starterUpdatedList.value.map(function(value) {

        // Headings
        Object.keys(value).map((heading) => {

            // Market Segment RV1, RV2, RV3
            if (!dataResume.headings.includes(heading)) {
                dataResume.headings.push(heading)
            }

        })

        // Market Segment RV1, RV2, RV3
        if (!dataResume.segment.includes(value.segment)) {
            dataResume.segment.push(value.segment)
        }

        // Min and Max actual values
        if (value.closeValue > 0 && value.closeValue < dataResume.minValue || value.closeValue > 0 && dataResume.minValue === 0) {
            dataResume.minValue = value.closeValue
        }
        if (value.closeValue > dataResume.maxValue) {
            dataResume.maxValue = value.closeValue
        }

        if (value.sectorCode && dataResume[value.sectorCode] === undefined) {
            dataResume.sectors[value.sectorCode] = value.sectorDescription
        }
    })

    return dataResume
}


// export const setTotals = () => {

//     const normalizedList = starterUpdatedList.value
//     const buildDataResume = {}

//     for (var i = normalizedList.length - 1; i >= 0; i--) {
//         const itemRow = normalizedList[i]

//         buildDataResume.values = []
//         const finalValue = (value['last'] !== undefined) ? value['last'] : (value['previous'] !== undefined) ? value['previous'] : 0
//         if (finalValue > 0) {
//             if (value.currency == 'US$') {
//                 const minValue = buildDataResume.values.USD.minValue
//                 const maxValue = buildDataResume.values.USD.maxValue
//                 if (!minValue || minValue > finalValue) {
//                     buildDataResume.values.USD.minValue = finalValue
//                 }
//                 if (!maxValue || maxValue < finalValue) {
//                     dataResume.values.USD.maxValue = finalValue
//                 }
//             } else {
//                 const minValue = buildDataResume.values.PEN.minValue
//                 const maxValue = buildDataResume.values.PEN.maxValue
//                 if (!minValue || minValue > finalValue) {
//                     buildDataResume.values.PEN.minValue = finalValue
//                 }
//                 if (!maxValue || maxValue < finalValue) {
//                     buildDataResume.values.PEN.maxValue = finalValue
//                     buildDataResume.values.PEN.maxValue = finalValue
//                 }
//             }
//         }

//         // Set Total Values , iterate over totals and update with item values
//         Object.keys(itemRow).map((propKey) => {

//             const propValue = itemRow[propKey]
//             const itemRowValue = value[propKey]
//             // console.log(propKey, propValue)
//             switch(propKey)
//             {
//                 case 'values':
//                     // List of EXISTING Sector Codes in the list
//                     // Las existing Value, separated by currency also
//                     break

//                 case 'sectorCode':
//                     if (itemRowValue && !propValue) {
//                         dataResume.value[propKey][itemRowValue] = value.sectorDescription                    }
//                     break

//                 // default:
//                 //     if (itemRowValue && !propValue) {
//                 //         dataResume.value[propKey].push(itemRowValue)
//                 //     }
//                 //     break
                

//             }
//         })
//     }


