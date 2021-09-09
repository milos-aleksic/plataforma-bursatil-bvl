import firebase from 'firebase'
// import { format, subDays } from 'date-fns'
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

const tickersCollection = db.collection('Emisores')
const cierresCollection = db.collection('Cierres')
const usersCollection = db.collection('users')

// const nowDate = new Date()
// const lastMonth = subDays(nowDate, 10)

export const createTicker = ticker => {
  return tickersCollection.add(ticker)
}

export const getTicker = async id => {
  const ticker = await tickersCollection.doc(id).get()
  if (ticker.exists) {
    return ticker.data()
  } else {
    return null
  }
}


export const getCierresTicker = async (ticker, limit = 0, sort = 'desc') => {
  const cierres = await cierresCollection.where('ticker', '==', ticker).orderBy('fecha', sort).limit(limit).get().then((querySnapshot) => {
    const cierres = []
    querySnapshot.forEach((doc) => {
        cierres.push(doc.data())
    });
    return cierres
  });

  return cierres
}

const getCierresTickers = async (tickers, limit = 0, sort = 'desc') => {
  console.log('getCierresTickers', tickers)
  const cierres = {}
  for (let index = 0; index < tickers.length; index++) {
    const tickerCode = tickers[index].ticker
    if (cierres[tickerCode] == undefined) {
      cierres[tickerCode] = []
    }
    const cierresTIcker = await getCierresTicker(tickerCode, limit, sort)
    console.log('cierresTIcker', cierresTIcker)
    cierres[tickerCode].push(cierresTIcker)

  }

  return cierres
}

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
    tickers.value = await snapshotDocs.map(doc => ({ id: doc.id, cierres: getCierresTickers(doc.data(), 10, 'desc'), ...doc.data() }))
    console.log('useLoadTickers 1', tickers)
  // revisionPeriodicaBVL(tickers)
  })
  onUnmounted(close)
  console.log('useLoadTickers 2', tickers)
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
