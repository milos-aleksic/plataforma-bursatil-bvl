

export const fetchData = async (url, options) => {

    const state = {
        response: [],
        error: null,
        fetching: false
    }
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

    return state
}
