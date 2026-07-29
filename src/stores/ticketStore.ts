import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { listenValue, pushValue, updateValue, isFirebaseEnabled } from '@/firebase'
import type { Ticket, ChatMessage } from '@/types'

const STORAGE_KEY = 'medidesk-live-state'

const readFromStorage = () => {
  if (typeof window === 'undefined') return null
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved)
  } catch {
    return null
  }
}

const writeToStorage = (tickets: Ticket[], chats: Record<string, ChatMessage[]>) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tickets, chats }))
}

export const useTicketStore = defineStore('tickets', () => {
  // State
  const tickets = ref<Ticket[]>([])
  const chats = ref<Record<string, ChatMessage[]>>({})
  const isInitialized = ref(false)
  const unsubscribeFns: Array<() => void> = []

  // Getters (Computed properties in Setup Stores)
  const activeTickets = computed(() => {
    return tickets.value
      .filter((t) => t.status === 'pending')
      .sort((a, b) => b.timestamp - a.timestamp)
  })

  const getChatMessages = computed(() => {
    return (patientId: string) => chats.value[patientId] || []
  })

  const syncFromStorage = () => {
    const savedState = readFromStorage()
    if (savedState?.tickets?.length) tickets.value = savedState.tickets
    if (savedState?.chats) chats.value = savedState.chats
  }

  const persist = () => writeToStorage(tickets.value, chats.value)

  const connect = () => {
    if (!isFirebaseEnabled || isInitialized.value) return
    console.log('🔌 TicketStore: Connecting to Firebase Realtime Database...')

    syncFromStorage()

    // Listen to all tickets (Single Source of Truth)
    const unsubscribeTickets = listenValue('tickets', (data) => {
      if (!data) {
        tickets.value = []
        persist()
        return
      }

      const ticketList = Object.entries(data as Record<string, any>).map(([key, val]) => ({
        ticketId: key, // Use Firebase's auto-generated key as the ID
        ...val
      }))

      // Sort by newest first
      tickets.value = ticketList.sort((a, b) => b.timestamp - a.timestamp)
      persist()
    })

    unsubscribeFns.push(unsubscribeTickets)
    isInitialized.value = true
  }

  const ensurePatientChat = async (patientId: string, patientName: string) => {
    if (!isFirebaseEnabled) return

    const unsubscribeChats = listenValue(`chats/${patientId}`, (data) => {
      if (!data) {
        chats.value[patientId] = []
        return
      }
      
      const messages = Object.entries(data as Record<string, any>).map(([key, val]) => {
        // Normalize the timestamp to handle legacy data formats like 'createdAt' strings
        let normalizedTimestamp = val.timestamp;
        
        if (!normalizedTimestamp && val.createdAt) {
           const parsedDate = new Date(val.createdAt);
           if (!isNaN(parsedDate.getTime())) {
               normalizedTimestamp = parsedDate.getTime();
           }
        }
        
        // Fallback if we completely fail to find a valid time
        if (!normalizedTimestamp) {
            normalizedTimestamp = 0;
        }

        return {
          id: key,
          ...val,
          timestamp: normalizedTimestamp
        }
      })
      
      chats.value[patientId] = messages.sort((a, b) => a.timestamp - b.timestamp)
      persist()
    })
    
    unsubscribeFns.push(unsubscribeChats)
  }

  const sendPatientMessage = async (patientId: string, patientName: string, text: string) => {
    if (!isFirebaseEnabled) return

    // 1. Push message. We don't push to local state because listenValue will handle it instantly.
    await pushValue(`chats/${patientId}`, {
      sender: 'patient',
      text,
      timestamp: Date.now()
    })

    // 2. Check if an active ticket exists for this chat, if not, create one
    const activeChatTicket = tickets.value.find(t => t.patientName === patientName && t.type === 'chat' && t.status === 'pending')
    
    if (!activeChatTicket) {
      await pushValue('tickets', {
        type: 'chat',
        patientName: patientName,
        status: 'pending',
        timestamp: Date.now(),
        previewText: text
      })
    }
  }

  const sendAgentMessage = async (patientId: string, text: string) => {
    if (!isFirebaseEnabled) return
    
    await pushValue(`chats/${patientId}`, {
      sender: 'agent',
      text,
      timestamp: Date.now()
    })
  }

  const updateTicketStatus = async (ticketId: string, status: 'pending' | 'resolved') => {
    if (!isFirebaseEnabled) return
    await updateValue(`tickets/${ticketId}`, { status })
  }

  const cleanup = () => {
    unsubscribeFns.forEach((unsubscribe) => unsubscribe())
    unsubscribeFns.length = 0
    isInitialized.value = false
  }

  return {
    // State
    tickets,
    chats,
    isInitialized,
    
    // Getters
    activeTickets,
    getChatMessages,
    
    // Actions
    connect,
    ensurePatientChat,
    sendPatientMessage,
    sendAgentMessage,
    updateTicketStatus,
    cleanup
  }
})