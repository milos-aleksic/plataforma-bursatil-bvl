
export default function(url, options) {
  console.log('use-fetch')

  const state = {
    response: [],
    error: null,
    fetching: false
  }
  const fetchData = async () => {
    state.fetching = true;
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      state.response = json;
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  };
  return {state, fetchData};
}