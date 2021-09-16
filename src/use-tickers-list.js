import {ref, toRefs, reactive} from '@vue/composition-api';
import useFetch from './use-fetch';
export default function() {
  let tickers = reactive({list: [], error: null, fetching: false});
  const val = ref('');
  // let errors = reactive({error: null});
  const submitted = async () => {
    // try {
    //   const response = await fetch(
    //     `https://api1.openbrewerydb.org/tickers/?by_name=${val.value}`
    //   );
    //   const json = await response.json();
    //   tickers.list = ref(json);
    //   console.log(tickers.list);
    // } catch (error) {
    //   console.log(error);
    //   errors.error = reactive({ error });
    // }
    const {response, error, fetchData, fetching} = useFetch(
      `https://api.openbrewerydb.org/tickers/?by_name=${val.value}`,
      {}
    );
    fetchData();
    tickers.list = response;
    tickers.error = error;
    tickers.fetching = fetching;
  };
  return {submitted, ...toRefs(tickers), val};
}