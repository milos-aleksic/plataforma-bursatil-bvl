import { getPathsToFetch } from './getSourcePaths'
import { fetchData } from './fetchData'
import { cleanDataHelper } from './cleanDataHelper'


export const buildData = async (dataType) => {

    let state = {response: [], error: null, fetching: false}

    const dataMode = 'liveApi'
    // const dataMode = 'autoApi'

    const requestParams = getPathsToFetch(dataType)

    state  = await fetchData(requestParams[dataMode])
    const cleanData = await cleanDataHelper(state, dataType)
    console.log('cleanData', cleanData)


    return cleanData 
}