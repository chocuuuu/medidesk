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

              <v-data-table :headers="headers" :items="tickets" :search="search" hover>
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

    <v-dialog v-model="detailsModal" max-width="500">
      <v-card v-if="selectedTicket" rounded="lg">
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title class="text-subtitle-1">
            Ticket ID: {{ selectedTicket.id }}
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

          <p class="text-caption text-grey-darken-1 mb-2">Message Preview:</p>
          <v-card color="grey-lighten-4" class="pa-4 mb-6 border" elevation="0">
            <p class="text-body-1 mb-0">{{ selectedTicket.previewText }}</p>
          </v-card>

          <v-select
            v-model="selectedTicket.status"
            :items="['pending', 'resolved']"
            label="Update Ticket Status"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 bg-grey-lighten-5 border-top">
          <v-spacer />
          <v-btn variant="text" color="grey-darken-2" @click="detailsModal = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="detailsModal = false" class="px-6">Save & Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface TicketItem {
  id: number
  ticketId: string
  patientName: string
  type: 'refill' | 'chat'
  status: 'pending' | 'resolved'
  previewText: string
}

const headers = [
  { title: 'Ticket ID', key: 'ticketId' },
  { title: 'Type', key: 'type' },
  { title: 'Patient Name', key: 'patientName' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const tickets = ref<TicketItem[]>([
  {
    id: 1,
    ticketId: 'TKT-001',
    patientName: 'Jordan Lee',
    type: 'refill',
    status: 'pending',
    previewText: 'Please refill my Lisinopril prescription before Friday.',
  },
  {
    id: 2,
    ticketId: 'TKT-002',
    patientName: 'Alicia Gomez',
    type: 'chat',
    status: 'pending',
    previewText: 'I have a question about my medication timing and dosage.',
  },
  {
    id: 3,
    ticketId: 'TKT-003',
    patientName: 'Darnell Brooks',
    type: 'refill',
    status: 'resolved',
    previewText: 'The pharmacist confirmed the refill and shipment is on the way.',
  },
])

const isOnline = ref(true)
const search = ref('')
const detailsModal = ref(false)
const selectedTicket = ref<TicketItem | null>(null)

const openTicket = (item: TicketItem) => {
  selectedTicket.value = item
  detailsModal.value = true
}

const queueCount = computed(() => tickets.value.filter((ticket) => ticket.status !== 'resolved').length)
const resolvedCount = computed(() => tickets.value.filter((ticket) => ticket.status === 'resolved').length)
</script>
