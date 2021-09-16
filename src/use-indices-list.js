import {ref, toRefs, reactive} from '@vue/composition-api';
import useFetch from './use-fetch';
export default function() {
  let indices = reactive({list: [], error: null, fetching: false});
  // let errors = reactive({error: null});
  const submitted = async () => {
    // try {
    //   const response = await fetch(
    //     `https://api1.openbrewerydb.org/indices/?by_name=${val.value}`
    //   );
    //   const json = await response.json();
    //   indices.list = ref(json);
    //   console.log(indices.list);
    // } catch (error) {
    //   console.log(error);
    //   errors.error = reactive({ error });
    // }
    const {response, error, fetchData, fetching} = useFetch(
      'https://dataondemand.bvl.com.pe/v1/indices',
      {}
    );
    fetchData();
    indices.list = response;
    indices.error = error;
    indices.fetching = fetching;
  };
  return {submitted, ...toRefs(indices)};
}