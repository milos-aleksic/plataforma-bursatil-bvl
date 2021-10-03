// import {ref, toRefs, reactive} from '@vue/composition-api'
// import {toRefs, reactive} from '@vue/composition-api'
// import useFetch from './use-fetch'


const useFetch = async (url, options) => {

    const state = {
        response: [],
        error: null,
        fetching: false
    }
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
    return {state, fetchData}
}
