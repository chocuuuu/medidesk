import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getDatabase, onValue, push, ref, set, update, type Database } from 'firebase/database'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
}

let database: Database | null = null

if (firebaseConfig.projectId && firebaseConfig.databaseURL) {
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
