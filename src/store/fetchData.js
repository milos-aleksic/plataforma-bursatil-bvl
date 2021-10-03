

export const fetchData = async (requestOptions) => {
    const options = (requestOptions.options) ? requestOptions.options : {}

    const state = {
        response: [],
        error: null,
        fetching: false
    }
    console.log('options', options)
    // state.fetching = true
    try {
        const res = await fetch(requestOptions.url, options)
        const json = await res.json()
        state.response = json
    } catch (errors) {
        state.error = errors
    } finally {
        state.fetching = false
    }

    return state
}
