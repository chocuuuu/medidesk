import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listenValue, pushValue, updateValue } from '@/firebase'
import { buildChatMessage, buildRefillTicket, slugify, type ChatMessagePayload, type RefillTicketPayload } from '@/utils/liveSupport'

export interface TicketRecord {
  id: string
  ticketId: string
  patientId: string
  patientName: string
  type: 'refill' | 'chat'
  status: 'pending' | 'resolved'
  previewText: string
  medication?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ChatState {
  [patientId: string]: ChatMessagePayload[]
}

const STORAGE_KEY = 'medidesk-live-state'

const defaultTickets: TicketRecord[] = [
  {
    id: 'seed-ticket-1',
    ticketId: 'TKT-001',
    patientId: 'jordan-lee',
    patientName: 'Jordan Lee',
    type: 'refill',
    status: 'pending',
    previewText: 'Please refill my Lisinopril prescription before Friday.',
    medication: 'Lisinopril',
    notes: 'Need it before Friday',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seed-ticket-2',
    ticketId: 'TKT-002',
    patientId: 'alicia-gomez',
    patientName: 'Alicia Gomez',
    type: 'chat',
    status: 'pending',
    previewText: 'I have a question about my medication timing and dosage.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

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

const writeToStorage = (tickets: TicketRecord[], chats: ChatState) => {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ tickets, chats }))
}

export const useTicketStore = defineStore('ticketStore', () => {
  const tickets = ref<TicketRecord[]>(defaultTickets)
  const chats = ref<ChatState>({})
  const connected = ref(false)
  const unsubscribeFns: Array<() => void> = []

  const syncFromStorage = () => {
    const savedState = readFromStorage()
    if (savedState?.tickets?.length) {
      tickets.value = savedState.tickets
    }
    if (savedState?.chats) {
      chats.value = savedState.chats
    }
  }

  const persist = () => {
    writeToStorage(tickets.value, chats.value)
  }

  const ensurePatientChat = (patientId: string, patientName: string) => {
    if (!chats.value[patientId]?.length) {
      chats.value[patientId] = [
        buildChatMessage('system', `Hello ${patientName}! Welcome to MediDesk Support. How can we help with your medications today?`),
      ]
      persist()
    }
  }

  const connect = () => {
    if (connected.value) return

    syncFromStorage()

    const unsubscribe = listenValue('tickets', (value) => {
      if (!value) {
        persist()
        return
      }

      const nextTickets = Object.entries(value as Record<string, Record<string, unknown>>).map(([id, item]) => ({
        id,
        ticketId: String(item.ticketId || `TKT-${String(id).slice(-3).toUpperCase()}`),
        patientId: String(item.patientId || ''),
        patientName: String(item.patientName || ''),
        type: (item.type as TicketRecord['type']) || 'chat',
        status: (item.status as TicketRecord['status']) || 'pending',
        previewText: String(item.previewText || ''),
        medication: item.medication ? String(item.medication) : undefined,
        notes: item.notes ? String(item.notes) : undefined,
        createdAt: String(item.createdAt || new Date().toISOString()),
        updatedAt: String(item.updatedAt || new Date().toISOString()),
      }))

      tickets.value = nextTickets.length ? nextTickets : defaultTickets
      persist()
    })

    unsubscribeFns.push(unsubscribe)

    const chatsUnsubscribe = listenValue('chats', (value) => {
      if (!value) {
        persist()
        return
      }

      const nextChats = Object.entries(value as Record<string, Record<string, unknown>>).reduce<ChatState>((acc, [patientId, messages]) => {
        const nextMessages = Object.entries(messages as Record<string, Record<string, unknown>>).map(([messageId, message]) => ({
          id: String(messageId),
          sender: (message.sender as ChatMessagePayload['sender']) || 'patient',
          text: String(message.text || ''),
          createdAt: String(message.createdAt || new Date().toISOString()),
        }))

        acc[patientId] = nextMessages
        return acc
      }, {})

      chats.value = nextChats
      persist()
    })

    unsubscribeFns.push(chatsUnsubscribe)
    connected.value = true
  }

  const getChatMessages = (patientId: string) => {
    return chats.value[patientId] || []
  }

  const submitRefill = async (payload: { patientId: string, patientName: string, medication: string, notes: string }) => {
    const refillTicket = buildRefillTicket(payload.patientName, payload.medication, payload.notes, payload.patientId)
    const ticketId = `TKT-${Math.floor(Math.random() * 900 + 100)}`
    const ticketPayload = {
      ...refillTicket,
      ticketId,
      id: ticketId,
    }

    const created = await pushValue('tickets', ticketPayload)
    const newTicket = {
      ...ticketPayload,
      id: created?.key || ticketId,
      ticketId,
    }

    tickets.value = [newTicket, ...tickets.value]
    persist()

    return newTicket
  }

  const sendPatientMessage = async (patientId: string, patientName: string, text: string) => {
    const message = buildChatMessage('patient', text)
    const patientMessages = chats.value[patientId] || []
    const nextMessages = [...patientMessages, message]
    chats.value[patientId] = nextMessages
    persist()

    await pushValue(`chats/${patientId}`, message)

    const existingTicket = tickets.value.find((ticket) => ticket.patientId === patientId && ticket.type === 'chat')
    if (!existingTicket) {
      const chatTicket = {
        id: `chat-${patientId}`,
        ticketId: `TKT-${Math.floor(Math.random() * 900 + 100)}`,
        patientId,
        patientName,
        type: 'chat' as const,
        status: 'pending' as const,
        previewText: text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      tickets.value = [chatTicket, ...tickets.value]
      await pushValue('tickets', chatTicket)
      persist()
    }

    return message
  }

  const sendAgentReply = async (patientId: string, text: string) => {
    const message = buildChatMessage('agent', text)
    const patientMessages = chats.value[patientId] || []
    chats.value[patientId] = [...patientMessages, message]
    persist()

    await pushValue(`chats/${patientId}`, message)
    return message
  }

  const updateTicketStatus = async (ticketId: string, status: TicketRecord['status']) => {
    const targetTicket = tickets.value.find((ticket) => ticket.id === ticketId)
    if (!targetTicket) return null

    const updatedTicket = {
      ...targetTicket,
      status,
      updatedAt: new Date().toISOString(),
    }

    tickets.value = tickets.value.map((ticket) => ticket.id === ticketId ? updatedTicket : ticket)
    persist()

    await updateValue(`tickets/${targetTicket.id}`, {
      status,
      updatedAt: updatedTicket.updatedAt,
    })

    return updatedTicket
  }

  const cleanup = () => {
    unsubscribeFns.forEach((unsubscribe) => unsubscribe())
    unsubscribeFns.length = 0
    connected.value = false
  }

  return {
    tickets,
    chats,
    connected,
    connect,
    ensurePatientChat,
    getChatMessages,
    submitRefill,
    sendPatientMessage,
    sendAgentReply,
    updateTicketStatus,
    cleanup,
  }
})
