import { describe, expect, it } from 'vitest'
import { buildChatMessage, buildRefillTicket } from './liveSupport'

describe('liveSupport helpers', () => {
  it('builds a refill ticket with the expected shape', () => {
    const ticket = buildRefillTicket('Jordan Lee', 'Lisinopril', 'Need it before Friday', 'patient-jordan')

    expect(ticket.type).toBe('refill')
    expect(ticket.status).toBe('pending')
    expect(ticket.patientName).toBe('Jordan Lee')
    expect(ticket.patientId).toBe('patient-jordan')
    expect(ticket.previewText).toContain('Lisinopril')
  })

  it('builds a chat message payload for a patient message', () => {
    const message = buildChatMessage('patient', 'Need help with my refill')

    expect(message.sender).toBe('patient')
    expect(message.text).toBe('Need help with my refill')
    expect(message.createdAt).toBeTruthy()
  })
})
