import firebase from 'firebase'
// import {  getUnixTime, parseISO } from 'date-fns'

import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: 'AIzaSyBjrKR9l241nf4saPkjOopQ1BVpC9tAcCM',
  authDomain: 'plataforma-bursatil-d9e7f.firebaseapp.com',
  projectId: 'plataforma-bursatil-d9e7f',
  storageBucket: 'plataforma-bursatil-d9e7f.appspot.com',
  messagingSenderId: '483025040451',
  appId: '1:483025040451:web:2408d8e55ac5bed5c790f6',
  measurementId: 'G-SBWSWG9Z7B'
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()

// .orderBy('ticker', 'asc')
const tickersCollection = db.collection('Emisores')
// const cierresCollection = db.collection('Cierres')
const usersCollection = db.collection('users')

// const nowDate = new Date()
// const lastMonth = subDays(nowDate, 10)

export const createTicker = ticker => {
  return tickersCollection.add(ticker)
}

export const importTicker = async (ticker) => {
  console.log('importTicker ticker', ticker)
}

export const getTicker = async (id) => {
  console.log('tickersCollection ' + id, tickersCollection)
  const ticker = await tickersCollection.doc(id).get()
  if (ticker.exists) {
    return ticker.data()
  } else {
    return null
  }
}

// export const batchUpdateCierres = async (ticker, cierresApi) => {

//   const batchOpsChunks = (cierresApi.length / 500)
//   const arrayOfChunks = []

//   if (batchOpsChunks > 1) {
//     var i,j, chunk = 500;
//     for (i = 0,j = cierresApi.length; i < j; i += chunk) {
//         arrayOfChunks.push(cierresApi.slice(i, i + chunk))
//     }
//   } else {
//     arrayOfChunks.push(cierresApi)
//   }

//   for (let index = 0; index < arrayOfChunks.length; index++) {
//     const chunkElement = arrayOfChunks[index];
//     console.log('arrayOfChunk chunkElements', chunkElement)

//     // Get a new write batch for each chunk of 500 limit from Firebase.firestore
//     const batch = db.batch()

//     for (let innerindex = 0; innerindex < chunkElement.length; innerindex++) {
//       const cierre = chunkElement[innerindex]
//       batch.set(cierresCollection.doc(), {
//         fecha: cierre.fecha,
//         valor: cierre.valor,
//         ticker: ticker
//       })
//     }

//     // Commit the batch
//     batch.commit().then((result) => {
//         console.log('updateCierres result for each Batch added', result)
//     });
    
//   }

// }
export const updateTickerConCierres = async (ticker, cierresApi) => {
  const tickerDoc = await tickersCollection.where('ticker', '==', ticker).data()
  tickerDoc.cierres = cierresApi

  return updateTicker(tickerDoc)
}

// export const updateCierres = async (ticker, cierresApi) => {
//   const cierresEnSistema = await getCierresTicker(ticker)

  // const missingToAdd = cierresApi.filter(o1 => !cierresEnSistema.some(o2 => o1.fecha === o2.fecha && o1.valor === o2.valor));

  // console.log('cierresApi', cierresApi)
  // console.log('cierresEnSistema', cierresEnSistema)
  // console.log('missingToAdd', missingToAdd)

  // return batchUpdateCierres(ticker, missingToAdd)
  
  // return cierresCollection.doc(id).update(ticker)
// }

// export const getAllCierres = async () => {
//   const cierres = {}

//   await cierresCollection.orderBy("fecha", "desc").limit(10)
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const tickerCierres = doc.data()
//             console.log('doc.data()', tickerCierres)
//             const tickerCode = tickerCierres.ticker
            
//             if (cierres[tickerCode] === undefined) {
//               cierres[tickerCode] = []
//             }
//             cierres[tickerCode].push({fecha: tickerCierres.fecha, valor: tickerCierres.valor})
//           });
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

//     return cierres
// }

// export const getCierresTicker = async (ticker) => {
//   const cierres = []

//   await cierresCollection.where('ticker', '==', ticker).orderBy('fecha', 'desc')
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const docCierre = doc.data();
//             cierres.push(
//               {fecha: docCierre.fecha, valor: docCierre.valor}
//             )
//         });
//     })
//     .catch((error) => {
//         console.log('Error getting documents: ', error);
//     });

//   return cierres
// }

// const getCierresTickers = (tickers, limit = 0, sort = 'desc') => {
//   console.log('tickers getCierresTickers', tickers)
//   const cierres = {}
//   for (let index = 0; index < tickers.length; index++) {
//     const tickerCode = tickers[index].ticker
//     if (cierres[tickerCode] == undefined) {
//       cierres[tickerCode] = []
//     }
//     const cierresTIcker = getCierresTicker(tickerCode, limit, sort)
//     console.log('cierresTIcker', cierresTIcker)
//     cierres[tickerCode].push(cierresTIcker)

//   }

//   return cierres
// }

export const updateTicker = (id, ticker) => {
  return tickersCollection.doc(id).update(ticker)
}

export const deleteTicker = id => {
  return tickersCollection.doc(id).delete()
}

export const useLoadTickers = () => {
  const tickers = ref([])
  const close = tickersCollection.onSnapshot(async snapshot => {
    const snapshotDocs = snapshot.docs
    const cierres = {}
    /* await getAllCierres() */
    console.log('cierres getAllCierres', cierres)
    tickers.value = snapshotDocs.map(doc => ({ id: doc.id, cierres: cierres[doc.data().ticker], ...doc.data() }))
  })
  onUnmounted(close)
  return tickers
}


// Usuarios

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
