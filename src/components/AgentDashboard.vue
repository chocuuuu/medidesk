<template>
  <v-container class="py-4" max-width="960">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="rounded-xl elevation-2 pa-6">
          <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center mb-6 gap-4">
            <div>
              <v-chip color="primary" class="mb-4" prepend-icon="mdi-account-cog">
                Agent workspace
              </v-chip>
              <h2 class="text-h4 font-weight-bold mb-2">Care operations dashboard</h2>
              <p class="text-body-1 text-medium-emphasis mb-0">
                Monitor the queue, review incoming messages, and keep patient follow-ups moving smoothly.
              </p>
            </div>
            <v-btn color="primary" prepend-icon="mdi-plus" variant="flat">
              New case
            </v-btn>
          </div>

          <v-row>
            <v-col cols="12" md="4">
              <v-card color="primary" variant="tonal" rounded="lg" class="h-100">
                <v-card-text>
                  <div class="text-caption text-uppercase">Open queue</div>
                  <div class="text-h5 font-weight-bold mt-2">{{ queueCount }}</div>
                  <div class="text-body-2 mt-1">Patients waiting for review</div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card color="success" variant="tonal" rounded="lg" class="h-100">
                <v-card-text>
                  <div class="text-caption text-uppercase">Resolved today</div>
                  <div class="text-h5 font-weight-bold mt-2">{{ resolvedCount }}</div>
                  <div class="text-body-2 mt-1">Cases completed this shift</div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card color="amber" variant="tonal" rounded="lg" class="h-100">
                <v-card-text>
                  <div class="text-caption text-uppercase">Status</div>
                  <div class="text-h5 font-weight-bold mt-2">{{ isOnline ? 'Online' : 'Away' }}</div>
                  <div class="text-body-2 mt-1">Live support availability</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-card variant="outlined" rounded="lg" class="mt-6">
            <v-card-title class="d-flex align-center justify-space-between">
              <span>Active support queue</span>
              <v-chip color="primary" size="small">{{ queueCount }} active</v-chip>
            </v-card-title>
            <v-card-text class="px-2 pb-2">
              <v-list lines="two">
                <v-list-item
                  v-for="ticket in tickets"
                  :key="ticket.id"
                  :title="ticket.patientName"
                  :subtitle="`${ticket.preview} • ${ticket.eta}`"
                >
                  <template #prepend>
                    <v-avatar color="primary" variant="tonal">
                      <v-icon>{{ ticket.type === 'refill' ? 'mdi-pill' : 'mdi-chat' }}</v-icon>
                    </v-avatar>
                  </template>
                  <template #append>
                    <v-chip :color="ticket.status === 'pending' ? 'warning' : 'success'" size="small" variant="tonal">
                      {{ ticket.status }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface TicketItem {
  id: number
  patientName: string
  type: 'refill' | 'chat'
  status: 'pending' | 'review' | 'resolved'
  preview: string
  eta: string
}

const tickets = ref<TicketItem[]>([
  {
    id: 1,
    patientName: 'Jordan Lee',
    type: 'refill',
    status: 'pending',
    preview: 'Medication refill request for Lisinopril',
    eta: 'Next update in 10 min',
  },
  {
    id: 2,
    patientName: 'Alicia Gomez',
    type: 'chat',
    status: 'review',
    preview: 'Needs clarification on dosing schedule',
    eta: 'Priority follow-up',
  },
  {
    id: 3,
    patientName: 'Darnell Brooks',
    type: 'refill',
    status: 'resolved',
    preview: 'Pharmacy confirmed refill shipment',
    eta: 'Completed 2 min ago',
  },
])

const isOnline = ref(true)
const queueCount = computed(() => tickets.value.filter((ticket) => ticket.status !== 'resolved').length)
const resolvedCount = computed(() => tickets.value.filter((ticket) => ticket.status === 'resolved').length)
</script>
