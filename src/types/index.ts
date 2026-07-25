// These interfaces define exactly what our data should look like.
// This prevents bugs where we might accidentally misspell a property later.

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  takenToday: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'patient' | 'agent';
  timestamp: number;
}

export interface Ticket {
  id: string;
  type: 'refill' | 'chat';
  patientName: string;
  status: 'pending' | 'resolved';
  timestamp: number;
  previewText: string;
}