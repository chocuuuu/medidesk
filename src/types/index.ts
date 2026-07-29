// These interfaces define exactly what our data should look like.
// This prevents bugs where we might accidentally misspell a property later.

export interface MedicationItem {
  id: number;
  name: string;
  dosage: string;
  time: string;
  takenToday: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'system' | 'patient' | 'agent';
  timestamp?: number;
  createdAt?: string | number;
}

export interface Ticket {
  ticketId: string;
  type: 'refill' | 'chat' | 'test';
  patientName: string;
  status: 'pending' | 'resolved';
  timestamp: number;
  previewText?: string;
  
  // Optional fields specific to Refill requests
  medication?: string;
  notes?: string;
}