// Helper API Bolsa Valores Lima

// import { format, subMonths } from 'date-fns'
// import { ref } from 'vue'
// import { getTicker , updateTickerConCierres} from '@/firebase'

// 1. Listado de todos los emisores 650+ Internacionales tmb
// https://dataondemand.bvl.com.pe/v1/stock-quote/share

// 2. Devuelve el TIcker, la razon social "companyName" y "companyCode" de la BVL
// https://dataondemand.bvl.com.pe/v1/stock-quote/share/TICKER

// Sector Codigo => Nombre
// https://dataondemand.bvl.com.pe/v1/sector

// https://dataondemand.bvl.com.pe/v1/issuers/companyCode/info
// https://dataondemand.bvl.com.pe/v1/issuers/ // Locales con info



export const getDataOnDemand = async (tipoFetch) => {

  let url = ''
  const data = {}

  if (tipoFetch == 'EmisoresLocales') {
      url = 'https://dataondemand.bvl.com.pe/v1/issuers/search'
      data['firstLetter'] = ''
      data['sectorCode'] = ''
      data['companyName'] = ''
      const emisoresList = await fetchDataOnDemand(url, data)
      const emisoresListObj = {}
      for (var i = emisoresList.length - 1; i >= 0; i--) {
        emisoresList[i]['cierres'] = []
        emisoresListObj[emisoresList[i]['companyCode']] = emisoresList[i]
      }

      return await appendTodayCierres(emisoresListObj)
  }
  
}


export const appendTodayCierres = async (emisoresList) => {
  const todayCierres = await fetchDataOnDemand('https://dataondemand.bvl.com.pe/v1/stock-quote/market', {sector:'', today:false, companyCode:'', inputCompany:''})
  for (let i = todayCierres['content'].length - 1; i >= 0; i--) {
    let cierresHoy = false
    const cierre = todayCierres['content'][i]
    if (emisoresList[cierre['companyCode']] != undefined) {
      if (cierre['last'] != undefined) {
        cierresHoy = true
      }
      emisoresList[cierre['companyCode']]['cierreshoy'] = cierresHoy
      emisoresList[cierre['companyCode']]['cierres'].push(cierre)
    }

  }

  return emisoresList

}

export const fetchDataOnDemand = async (url, data) => {

  const myHeaders = new Headers()
  myHeaders.append("accept", "application/json, text/plain, */*")
  myHeaders.append("content-type", "application/json")

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  const rawResult = await fetch(url, requestOptions)

  return await rawResult.json()
}


/*
export const normalizarInstrumentos = (instrumentos = []) => {
  for (let i = instrumentos.length - 1; i >= 0; i--) {
    const instruento = instrumentos[i]

  }
}

export const normalizarEmisores = async (emisores = []) => {
  for (let i = emisores.length - 1; i >= 0; i--) {
    const emisor = emisores[i]
    const newEmisor = {
        companyCode: emisor['companyCode'],
        companyName: emisor['companyName'],
        sectorCode: emisor['sectorCode'],
        sectorDescription: emisor['sectorDescription'],
        stock: emisor['stock'],
        index: normalizarInstrumentos(emisor['index']),
        fixedValues: normalizarInstrumentos(emisor['fixedValues'])
    }
  }
}

export const normalizarRentas = async (listValue = []) => {

  const newListValue = {}
  for (let i = listValue.length - 1; i >= 0; i--) {

    const listaActual = listValue[i]
    const tipoValor = listaActual['valueType'] // RF o RV

    if (tipoValor == 'RF' || 
      tipoValor == 'RV' && listaActual['dateInscription'] != null) {


      if (newListValue[tipoValor] == undefined) {
        newListValue[tipoValor] = []
      }

      newListValue[tipoValor].push(listaActual)
    }

  }

  return newListValue
}
export const useLoadTickersBVL = async () => {
  const tickers = ref([])

  try {
    
    // const emisores = await fetch('https://dataondemand.bvl.com.pe/v1/issuers')
    const emisores = await fetch('https://firebasestorage.googleapis.com/v0/b/plataforma-bursatil-d9e7f.appspot.com/o/dataOnDemandBVL%2Fv1%2Fissuers.json?alt=media&token=2270a2a6-c2f5-47c1-90d4-2b0c5b0d0d13')
    const allTickers =  await emisores.json()
    const filteredTickers = {}
    for (var i = allTickers.length - 1; i >= 0; i--) {

      if (!allTickers[i].active) {
        continue
      }


      const emisorItem = allTickers[i]
      // Lists - listados de acciones en la BVL
      const listValue = await normalizarRentas(emisorItem['listValue'])
      console.log(listValue, 'listValue')
      if (!listValue.length) {
        continue
      }

      filteredTickers[emisorItem['companyCode']] = {
        companyCode: emisorItem['companyCode'], // Codigo interno BVL
        rpjCode: emisorItem['rpjCode'],
        companyName: emisorItem['companyName'], // Razon social
        originCode: emisorItem['originCode'],
        sectorCode: emisorItem['sectorCode'], // Categoria BVL (Sector)
        description: emisorItem['description'], // Tipo de actividad
        subSectorCode: emisorItem['subSectorCode'],
        active: emisorItem['active'],
        fax: emisorItem['fax'],
        website: emisorItem['website'],
        companyAddress: emisorItem['companyAddress'],
        descriptionFundation: emisorItem['descriptionFundation'],
        dateFundation: emisorItem['dateFundation'],
        phone: emisorItem['phone'],
        esActDescription: emisorItem['esActDescription'],
        listValue: listValue,
        listManager: emisorItem['listManager'],
        listTypeCompositionAcc: emisorItem['listTypeCompositionAcc'],
      }




      // listManager: emisorItem['listManager'],
      // listTypeCompositionAcc: emisorItem['listTypeCompositionAcc'],

      let hayCierres = false

      if (!allTickers[i].listValue.length) {
        continue
      }
      for (var i2 = allTickers[i].listValue.length - 1; i2 >= 0; i2--) {
        const listValues = allTickers[i].listValue[i2]
        console.log(listValues.listLastValue[0].tkrCode, listValues.dateInscription + '(' + listValues.listLastValue.length + ')')
        if (!listValues.dateInscription || !listValues.listLastValue.length) {
          continue
        } else {
          hayCierres = true
          break
          // console.log(listValues.listLastValue[0].tkrCode, listValues.listLastValue[0])
        }
      }
      if (hayCierres) {
        filteredTickers.push(allTickers[i])
      }
    
    }
    tickers.value = filteredTickers

  } catch (error) {
    console.log(error)
  }
  
  return tickers

  // console.log('useLoadTickersBVL emisoresJson tickers', tickers)
}

export const checkIfExistsTicker = async (ticker) => {
  const localTicker = await getTicker(ticker)
  if (!localTicker) {
    const data = await fetchTicker(ticker)
    // const data = await fetchTickerInfo(ticker)
    
    console.log('currencySymbol', data.currencySymbol)
    return data
  } else {
    return localTicker
  }
}

export const fetchTickerInfo = async (ticker) => {

  const response = await fetch('https://dataondemand.bvl.com.pe/v1/stock-quote/share/' + ticker )
  
  // console.log('response', response);
  const tickerJson = await response.json()
  
  const tickerInfo =  await fetch('https://dataondemand.bvl.com.pe/v1/issuers/' + tickerJson.companyCode + '/info')

  return await tickerInfo.json()
}

const fetchTicker = async (ticker, startDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd'), endDate = format(new Date(), 'yyyy-MM-dd')) => {
  
  const response = await fetch('https://dataondemand.bvl.com.pe/v1/stock-quote/share-values/' + ticker + '?startDate='+startDate+'&endDate='+endDate)

  const data = await response.json()

  if (data['nemonico'] == ticker) {
    if (data['values'].length == 0) {
      data['error'] = 'TICKER existe, pero no tiene cierres en ultimos 3 meses'
    }
    return data
  } else {
    if (data['nemonico'] == null) {
      return {error: 'El codigo TICKER no es el correcto o no existe en el sistema'}
    }
  }

}


export const updateCierresBVL = async (ticker) => {

  const data = await fetchTicker(ticker)
  try {
    const cierresBVL = data.values
    const cierresListed = {}
    for (let index = 0; index < cierresBVL.length; index++) {
      cierresListed[cierresBVL[index][0]] = Number(cierresBVL[index][1])
    }
    console.log('cierresListed', cierresListed)
    const updateResult = await updateTickerConCierres(ticker, cierresListed)

    return updateResult

  } catch (error) {
    console.log('updateCierresBVL ERROR', error)
  }

  return data.values
}

*/