export interface RefillTicketPayload {
  type: 'refill'
  patientId: string
  patientName: string
  medication: string
  notes: string
  status: 'pending' | 'resolved'
  previewText: string
  createdAt: string
  updatedAt: string
}

export interface ChatMessagePayload {
  id: string
  sender: 'system' | 'patient' | 'agent'
  text: string
  createdAt: string
}

export const buildRefillTicket = (
  patientName: string,
  medication: string,
  notes: string,
  patientId: string,
): RefillTicketPayload => {
  const now = new Date().toISOString()

  return {
    type: 'refill',
    patientId,
    patientName,
    medication,
    notes,
    status: 'pending',
    previewText: `Refill requested for ${medication}${notes ? ` — ${notes}` : ''}`,
    createdAt: now,
    updatedAt: now,
  }
}

export const buildChatMessage = (
  sender: ChatMessagePayload['sender'],
  text: string,
  id = `${Date.now()}-${Math.random().toString(16).slice(2)}`,
): ChatMessagePayload => ({
  id,
  sender,
  text,
  createdAt: new Date().toISOString(),
})

export const slugify = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')
