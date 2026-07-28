<template>
  <v-app>
    <v-navigation-drawer permanent app width="260" color="white" class="border-r">
      <div class="d-flex align-center pa-4">
        <v-avatar color="primary" class="me-3">
          <v-icon color="white">mdi-pill</v-icon>
        </v-avatar>
        <div>
          <div class="text-h6 font-weight-bold">MediDesk</div>
          <div class="text-caption text-medium-emphasis">Agent workspace</div>
        </div>
      </div>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-ticket-account" title="Live Queue" value="queue" active color="primary" />
        <v-list-item prepend-icon="mdi-account-group" title="Patient Directory" value="patients" />
        <v-list-item prepend-icon="mdi-history" title="History" value="history" />
        <v-list-item prepend-icon="mdi-cog" title="System Settings" value="settings" />
      </v-list>
    </v-navigation-drawer>

    <!-- STREAMING_CHUNK: Setting up the top application bar... -->
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

    <!-- STREAMING_CHUNK: Building the main dashboard content area... -->
    <v-main class="bg-grey-lighten-4" style="min-height: 100vh;">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-card elevation="1" rounded="lg" class="border"
              style="background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);">
              <v-card-title class="d-flex align-center pa-4 bg-white">
                <v-icon color="primary" class="mr-2">mdi-inbox-multiple</v-icon>
                Active Support Tickets
                <v-spacer />
                <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact"
                  label="Search patients..." variant="outlined" hide-details max-width="300" />
              </v-card-title>

              <v-divider />

              <!-- STREAMING_CHUNK: Rendering the data table for active tickets... -->
              <v-data-table :headers="headers" :items="tickets" :search="search" hover>
                <template #item.type="{ item }">
                  <v-chip :color="item.type === 'refill' ? 'blue-darken-1' : 'purple-darken-1'" size="small"
                    variant="flat">
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

    <!-- STREAMING_CHUNK: Creating the ticket details modal dialog... -->
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
            <v-chip :color="selectedTicket.type === 'refill' ? 'blue-darken-1' : 'purple-darken-1'" size="small"
              variant="flat">
              {{ selectedTicket.type.toUpperCase() }}
            </v-chip>
          </div>

          <!-- STREAMING_CHUNK: Displaying ticket preview and status update... -->
          <p class="text-caption text-grey-darken-1 mb-2">Message Preview:</p>
          <v-card color="grey-lighten-4" class="pa-4 mb-6 border" elevation="0">
            <p class="text-body-1 mb-0">{{ selectedTicket.previewText }}</p>
          </v-card>

          <v-select v-model="selectedTicket.status" :items="['pending', 'resolved']" label="Update Ticket Status"
            variant="outlined" density="comfortable" hide-details class="mb-4" />

          <!-- STREAMING_CHUNK: Rendering conversation history within ticket... -->
          <div class="mb-4">
            <div class="text-caption text-grey-darken-1 mb-2">Conversation</div>
            <v-card color="grey-lighten-5" class="pa-3 border" elevation="0">
              <div v-for="message in selectedTicketMessages" :key="message.id" class="mb-3">
                <div class="text-caption font-weight-bold text-capitalize">{{ message.sender }}</div>
                <div class="text-body-2">{{ message.text }}</div>
              </div>
            </v-card>
          </div>

          <v-textarea v-model="agentReply" label="Reply to the patient" variant="outlined" rows="3"
            density="comfortable" />
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 bg-grey-lighten-5 border-top">
          <v-spacer />
          <v-btn variant="text" color="grey-darken-2" @click="detailsModal = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="saveTicket" class="px-6">Save & Close</v-btn>
          <v-btn color="secondary" variant="flat" @click="sendAgentReply" class="px-6">Send Reply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useTicketStore, type TicketRecord } from '@/stores/ticketStore'

const ticketStore = useTicketStore()

const headers = [
  { title: 'Ticket ID', key: 'ticketId' },
  { title: 'Type', key: 'type' },
  { title: 'Patient Name', key: 'patientName' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const tickets = computed(() => ticketStore.tickets.filter((ticket) => ticket.status !== 'resolved'))
const isOnline = ref(true)
const search = ref('')
const detailsModal = ref(false)
const selectedTicket = ref<TicketRecord | null>(null)
const agentReply = ref('')
const selectedTicketMessages = computed(() => selectedTicket.value ? ticketStore.getChatMessages(selectedTicket.value.patientId) : [])

const openTicket = (item: TicketRecord) => {
  selectedTicket.value = item
  agentReply.value = ''
  detailsModal.value = true
}

const saveTicket = async () => {
  if (!selectedTicket.value) return

  await ticketStore.updateTicketStatus(selectedTicket.value.id, selectedTicket.value.status)
  detailsModal.value = false
}

const sendAgentReply = async () => {
  if (!selectedTicket.value || !agentReply.value.trim()) return

  await ticketStore.sendAgentReply(selectedTicket.value.patientId, agentReply.value.trim())
  agentReply.value = ''
}

onMounted(() => {
  ticketStore.connect()
})
</script>
