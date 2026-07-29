<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" color="white" elevation="2" app>
      <div class="pa-4 d-flex align-center">
        <v-avatar color="primary" size="36" class="mr-3">
          <v-icon color="white">mdi-deskphone</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-bold text-primary">MediDesk</span>
      </div>
      
      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-ticket-account" title="Live Queue" value="queue" active color="primary" />
        <v-list-item prepend-icon="mdi-account-group" title="Patient Directory" value="patients" />
        <v-list-item prepend-icon="mdi-history" title="History" value="history" />
        <v-list-item prepend-icon="mdi-cog" title="System Settings" value="settings" />
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar elevation="1" color="white" app>
      <v-app-bar-title class="text-subtitle-1 font-weight-bold text-grey-darken-2">
        Active Workspace
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center mr-6">
        <span class="mr-3 text-body-2 font-weight-medium" :class="isOnline ? 'text-success' : 'text-grey'">
          {{ isOnline ? 'Status: ONLINE' : 'Status: OFFLINE' }}
        </span>
        <v-switch v-model="isOnline" color="success" hide-details density="compact" inset />
      </div>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-4" style="min-height: 100vh;">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-card elevation="1" rounded="lg" class="border" style="background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);">
              <v-card-title class="d-flex align-center pa-4 bg-white">
                <v-icon color="primary" class="mr-2">mdi-inbox-multiple</v-icon>
                Active Support Tickets
                <v-spacer />
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  density="compact"
                  label="Search patients..."
                  variant="outlined"
                  hide-details
                  max-width="300"
                />
              </v-card-title>

              <v-divider />

              <!-- Data Table -->
              <v-data-table 
                :headers="headers" 
                :items="activeTickets" 
                :search="search" 
                hover
                :loading="!ticketStore.isInitialized"
              >
                <!-- Custom column formatting -->
                <template #item.timestamp="{ item }">
                  {{ new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </template>
                
                <template #item.type="{ item }">
                  <v-chip :color="item.type === 'refill' ? 'blue-darken-1' : 'purple-darken-1'" size="small" variant="flat">
                    <v-icon start size="small">{{ item.type === 'refill' ? 'mdi-pill' : 'mdi-chat' }}</v-icon>
                    {{ item.type.toUpperCase() }}
                  </v-chip>
                </template>

                <template #item.status="{ item }">
                  <v-chip :color="item.status === 'pending' ? 'warning' : 'success'" size="small" variant="tonal">
                    {{ item.status.toUpperCase() }}
                  </v-chip>
                </template>

                <template #item.actions="{ item }">
                  <v-btn size="small" variant="text" color="primary" @click="openTicket(item)">
                    Review
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Ticket Details Modal -->
    <v-dialog v-model="detailsModal" max-width="600">
      <v-card v-if="selectedTicket" rounded="lg">
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title class="text-subtitle-1">
            Ticket ID: {{ selectedTicket.ticketId }}
          </v-toolbar-title>
          <v-btn icon="mdi-close" variant="text" @click="detailsModal = false" />
        </v-toolbar>

        <v-card-text class="pa-6">
          <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h6 mb-0">{{ selectedTicket.patientName }}</h3>
            <v-chip :color="selectedTicket.type === 'refill' ? 'blue-darken-1' : 'purple-darken-1'" size="small" variant="flat">
              {{ selectedTicket.type.toUpperCase() }}
            </v-chip>
          </div>
          
          <v-divider class="mb-4" />

          <!-- Details section based on ticket type -->
          <div v-if="selectedTicket.type === 'refill'" class="mb-4">
            <p class="text-subtitle-2 mb-1">Medication Request:</p>
            <p class="text-body-1 font-weight-medium">{{ selectedTicket.medication }}</p>
            <p v-if="selectedTicket.notes" class="text-caption mt-2">Notes: {{ selectedTicket.notes }}</p>
          </div>

          <div v-else-if="selectedTicket.type === 'chat'">
            <p class="text-caption text-grey-darken-1 mb-2">Message Preview:</p>
            <v-card color="grey-lighten-4" class="pa-4 mb-4 border" elevation="0">
              <p class="text-body-1 mb-0">{{ selectedTicket.previewText }}</p>
            </v-card>
          </div>

          <v-select
            v-model="selectedTicket.status"
            :items="['pending', 'resolved']"
            label="Update Ticket Status"
            variant="outlined"
            density="comfortable"
            hide-details
            class="mb-4"
          />

          <!-- Conversation History -->
          <div class="mb-4">
            <div class="text-caption text-grey-darken-1 mb-2">Conversation</div>
            <v-card color="grey-lighten-5" class="pa-3 border overflow-y-auto" elevation="0" max-height="200">
              <div v-if="selectedTicketMessages.length === 0" class="text-caption text-center text-grey">
                No chat history found.
              </div>
              <div v-for="message in selectedTicketMessages" :key="message.id" class="mb-3">
                <div class="d-flex justify-space-between align-center">
                    <div class="text-caption font-weight-bold text-capitalize" :class="message.sender === 'agent' ? 'text-primary' : ''">
                      {{ message.sender }}
                    </div>
                    <div class="text-caption text-grey" v-if="message.timestamp">
                        {{ new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                    </div>
                </div>
                <div class="text-body-2">{{ message.text }}</div>
              </div>
            </v-card>
          </div>

          <v-textarea
            v-model="agentReply"
            label="Reply to the patient"
            variant="outlined"
            rows="2"
            density="comfortable"
            hide-details
          />
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 bg-grey-lighten-5 border-top">
          <v-spacer />
          <v-btn variant="text" color="grey-darken-2" @click="detailsModal = false">Cancel</v-btn>
          <v-btn color="secondary" variant="flat" @click="sendAgentReply" :disabled="!agentReply.trim()">Send Reply</v-btn>
          <v-btn color="primary" variant="flat" @click="saveTicket" class="px-6">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTicketStore } from '@/stores/ticketStore'
import { slugify } from '@/utils/liveSupport'
import type { Ticket } from '@/types'

const ticketStore = useTicketStore()

// Setup state
const drawer = ref(true)
const isOnline = ref(true)
const search = ref('')
const detailsModal = ref(false)
const selectedTicket = ref<Ticket | null>(null)
const agentReply = ref('')

// Computed properties mapped to store
const activeTickets = computed(() => ticketStore.activeTickets)

// Determine the patientId based on how we generated it in the widget
// (In a real app, the patientId would be stored on the ticket directly)
const currentPatientId = computed(() => {
  if (!selectedTicket.value) return ''
  return slugify(`${selectedTicket.value.patientName}-MediDesk Support`)
})

const selectedTicketMessages = computed(() => {
  if (!currentPatientId.value) return []
  return ticketStore.getChatMessages(currentPatientId.value)
})

// Table Headers configuration
const headers = [
  { title: 'Time', key: 'timestamp', align: 'start' as const, sortable: true },
  { title: 'Patient Name', key: 'patientName', align: 'start' as const },
  { title: 'Type', key: 'type', align: 'center' as const },
  { title: 'Status', key: 'status', align: 'center' as const },
  { title: 'Actions', key: 'actions', align: 'end' as const, sortable: false },
]

onMounted(() => {
  // Connect to Firebase when dashboard loads
  ticketStore.connect()
})

const openTicket = (ticket: Ticket) => {
  selectedTicket.value = { ...ticket } // Create a copy so edits aren't immediate
  agentReply.value = ''
  
  // Ensure we are listening to this patient's chat
  const patientId = slugify(`${ticket.patientName}-MediDesk Support`)
  ticketStore.ensurePatientChat(patientId, ticket.patientName)
  
  detailsModal.value = true
}

const sendAgentReply = async () => {
  if (!selectedTicket.value || !agentReply.value.trim()) return
  
  await ticketStore.sendAgentMessage(currentPatientId.value, agentReply.value)
  agentReply.value = '' // Clear input
}

const saveTicket = async () => {
  if (selectedTicket.value) {
    await ticketStore.updateTicketStatus(selectedTicket.value.ticketId, selectedTicket.value.status)
  }
  detailsModal.value = false
}
</script>