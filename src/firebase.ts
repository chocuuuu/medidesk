import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getDatabase, onValue, push, ref, set, update, type Database } from 'firebase/database'

const projectId = 'medidesk-a9bb2'
const databaseURL = `https://${projectId}-default-rtdb.firebaseio.com`

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyB1ymRMxAUcPKEBezMIQI19VLMGDHqHpSo',
  authDomain: 'medidesk-a9bb2.firebaseapp.com',
  projectId,
  databaseURL,
  storageBucket: 'medidesk-a9bb2.firebasestorage.app',
  messagingSenderId: '336185090085',
  appId: '1:336185090085:web:6f330ac271b25289dc9fcc',
  measurementId: 'G-1LL8PDHJ9Q',
}

let database: Database | null = null

if (projectId && databaseURL) {
  const app = initializeApp(firebaseConfig)
  database = getDatabase(app)
}

export const realtimeDb = database
export const isFirebaseEnabled = Boolean(realtimeDb)

export const getDbRef = (path: string) => {
  if (!realtimeDb) return null
  return ref(realtimeDb, path)
}

export const writeValue = async (path: string, value: unknown) => {
  const targetRef = getDbRef(path)
  if (!targetRef) return null

  await set(targetRef, value)
  return targetRef
}

export const pushValue = async (path: string, value: unknown) => {
  const targetRef = getDbRef(path)
  if (!targetRef) return null

  return push(targetRef, value)
}

export const updateValue = async (path: string, value: Record<string, unknown>) => {
  const targetRef = getDbRef(path)
  if (!targetRef) return null

  await update(targetRef, value)
  return targetRef
}

export const listenValue = (path: string, callback: (value: unknown) => void) => {
  const targetRef = getDbRef(path)
  if (!targetRef) {
    callback(null)
    return () => undefined
  }

  const unsubscribe = onValue(targetRef, (snapshot) => {
    callback(snapshot.val())
  })

  return unsubscribe
}
