
import useFetch from './use-fetch'
export default function() {
  let cierres = {list: [], error: null, fetching: false}
  // let errors = reactive({error: null})
    console.log(cierres)

  const submitted = () => {
    // try {
    //   const response = await fetch(
    //     `https://api1.openbrewerydb.org/cierres/?by_name=${val.value}`
    //   )
    //   const json = await response.json()
    //   cierres.list = ref(json)
    //   console.log(cierres.list)
    // } catch (error) {
    //   console.log(error)
    //   errors.error = reactive({ error })
    // }
    // Todos los CIerres actualizados del mercado
  }
  const {response, error, fetchData, fetching} = useFetch(
    `https://dataondemand.bvl.com.pe/v1/stock-quote/market`,
    {"sector":"","today":false,"companyCode":"","inputCompany":""}
  )
  fetchData()
  cierres.list = response.content
  console.log('cierres.list', cierres.list)
  cierres.error = error
  cierres.fetching = fetching

  console.log(cierres)
    console.log(submitted)
  return {submitted, cierres}
}