<template>
  <v-btn
    icon="mdi-message-text"
    color="primary"
    size="large"
    elevation="8"
    position="fixed"
    location="bottom right"
    class="ma-6"
    style="z-index: 9998;"
    @click="isOpen = !isOpen"
  />

  <v-expand-transition>
    <v-card
      v-if="isOpen"
      class="elevation-10 d-flex flex-column position-fixed border"
      width="350"
      height="500"
      rounded="xl"
      style="bottom: 90px; right: 24px; z-index: 9999; background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);"
    >
      <v-toolbar color="primary" density="compact" class="flex-grow-0 rounded-t-xl">
        <v-toolbar-title class="d-flex flex-column">
          <span class="text-subtitle-1 font-weight-bold">{{ assistantTitle }}</span>
          <span class="text-caption text-white/80">{{ assistantSubtitle }}</span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false" />
      </v-toolbar>

      <v-tabs v-model="activeTab" bg-color="primary" density="compact" grow class="flex-grow-0">
        <v-tab value="schedule">Schedule</v-tab>
        <v-tab value="refill">Refill</v-tab>
        <v-tab value="chat">Chat</v-tab>
      </v-tabs>

      <v-card-text class="flex-grow-1 overflow-y-auto bg-grey-lighten-4 pa-0">
        <v-window v-model="activeTab">
          <v-window-item value="schedule">
            <div class="pa-3">
              <v-card color="primary" variant="tonal" class="mb-3 rounded-lg">
                <v-card-text class="d-flex justify-space-between align-center pa-3">
                  <div>
                    <div class="text-caption text-uppercase">Today's status</div>
                    <div class="text-body-1 font-weight-bold">
                      {{ completedTodayCount }} of {{ mockSchedule.length }} medications marked done
                    </div>
                  </div>
                  <v-chip color="success" size="small">{{ pendingTodayCount }} pending</v-chip>
                </v-card-text>
              </v-card>

              <v-list lines="two" class="bg-transparent">
                <v-list-subheader>Medication schedule</v-list-subheader>
                <v-list-item
                  v-for="med in mockSchedule"
                  :key="med.id"
                  :title="med.name"
                  :subtitle="med.time + ' - ' + med.dosage"
                >
                  <template #prepend>
                    <v-avatar color="blue-lighten-4">
                      <v-icon color="blue-darken-2">mdi-pill</v-icon>
                    </v-avatar>
                  </template>
                  <template #append>
                    <v-checkbox-btn v-model="med.takenToday" color="success" hide-details />
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-window-item>

          <v-window-item value="refill">
            <v-container>
              <v-alert
                v-if="refillSuccessMessage"
                type="success"
                variant="tonal"
                class="mb-4"
                closable
                density="compact"
                @click:close="refillSuccessMessage = ''"
              >
                {{ refillSuccessMessage }}
              </v-alert>

              <p class="text-body-2 mb-4 text-grey-darken-2">
                Select a medication from your active prescriptions to request a refill from the pharmacy.
              </p>
              <v-select
                v-model="refillSelection"
                :items="mockSchedule"
                item-title="name"
                item-value="name"
                label="Select Medication"
                variant="outlined"
                density="comfortable"
              />

              <v-textarea
                v-model="refillNotes"
                label="Additional Notes (Optional)"
                variant="outlined"
                density="comfortable"
                rows="3"
              />

              <v-btn
                color="primary"
                block
                @click="submitRefill"
                :loading="isSubmitting"
                :disabled="!refillSelection || isSubmitting"
              >
                {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
              </v-btn>
            </v-container>
          </v-window-item>

          <v-window-item value="chat">
            <div class="chat-container d-flex flex-column h-100">
              <div ref="chatMessagesContainer" class="chat-messages flex-grow-1 pa-3 overflow-y-auto" style="height: 330px;">
                <div
                  v-for="msg in chatMessages"
                  :key="msg.id"
                  :class="['d-flex mb-3', msg.sender === 'patient' ? 'justify-end' : 'justify-start']"
                >
                  <v-card
                    :color="msg.sender === 'patient' ? 'primary' : 'white'"
                    :class="['pa-2 px-3 text-body-2', msg.sender === 'patient' ? 'text-white' : 'text-black']"
                    elevation="1"
                    max-width="80%"
                    rounded="lg"
                  >
                    <div v-if="msg.sender !== 'patient'" class="text-caption mb-1 text-medium-emphasis">
                      {{ assistantTitle }}
                    </div>
                    {{ msg.text }}
                  </v-card>
                </div>
              </div>

              <v-divider />

              <div class="chat-input pa-2 bg-white border-t">
                <v-text-field
                  v-model="newMessage"
                  append-inner-icon="mdi-send"
                  variant="outlined"
                  density="compact"
                  hide-details
                  placeholder="Type a message..."
                  @click:append-inner="sendMessage"
                  @keyup.enter.prevent="sendMessage"
                />
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-expand-transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { pushValue } from '@/firebase'
import { useTicketStore } from '@/stores/ticketStore'
import { slugify } from '@/utils/liveSupport'

interface Props {
  patientName?: string
  assistantTitle?: string
  assistantSubtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  patientName: 'Jordan',
  assistantTitle: 'MediDesk Support',
  assistantSubtitle: 'Medication support at your fingertips',
})

type TabValue = 'schedule' | 'refill' | 'chat'

const ticketStore = useTicketStore()
const patientId = computed(() => slugify(`${props.patientName}-${props.assistantTitle}`))
const isOpen = ref(false)
const activeTab = ref<TabValue>('schedule')

interface MedicationItem {
  id: number
  name: string
  time: string
  dosage: string
  takenToday: boolean
}

const mockSchedule = ref<MedicationItem[]>([
  { id: 1, name: 'Lisinopril', time: '8:00 AM', dosage: '10mg', takenToday: true },
  { id: 2, name: 'Atorvastatin', time: '8:00 AM', dosage: '20mg', takenToday: false },
  { id: 3, name: 'Metformin', time: '6:00 PM', dosage: '500mg', takenToday: false },
])

const completedTodayCount = computed(() => mockSchedule.value.filter((med) => med.takenToday).length)
const pendingTodayCount = computed(() => mockSchedule.value.length - completedTodayCount.value)

const refillSelection = ref<string | null>(null)
const refillNotes = ref('')
const isSubmitting = ref(false)
const refillSuccessMessage = ref('')

const submitRefill = async () => {
  if (!refillSelection.value) return

  isSubmitting.value = true

  try {
    await pushValue('tickets', {
      type: 'refill',
      patientName: props.patientName,
      medication: refillSelection.value,
      notes: refillNotes.value,
      status: 'pending',
      timestamp: Date.now(),
    })

    refillSuccessMessage.value = `Refill request sent for ${refillSelection.value}.`
    refillSelection.value = null
    refillNotes.value = ''
    activeTab.value = 'schedule'
  } catch (error) {
    console.error('Firebase write error:', error)
  } finally {
    isSubmitting.value = false
  }
}

interface ChatMessage {
  id: string
  sender: 'system' | 'patient' | 'agent'
  text: string
}

const chatMessages = computed<ChatMessage[]>(() => ticketStore.getChatMessages(patientId.value).map((msg) => ({
  id: msg.id,
  sender: msg.sender,
  text: msg.text,
})))
const newMessage = ref('')
const chatMessagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessagesContainer.value) {
      chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight
    }
  })
}

watch(chatMessages, () => {
  scrollToBottom()
}, { deep: true })

onMounted(() => {
  ticketStore.connect()
  ticketStore.ensurePatientChat(patientId.value, props.patientName)
  scrollToBottom()
})

const sendMessage = async () => {
  const trimmedMessage = newMessage.value.trim()
  if (!trimmedMessage) return

  await ticketStore.sendPatientMessage(patientId.value, props.patientName, trimmedMessage)
  newMessage.value = ''
  scrollToBottom()
}
</script>

<style scoped>
.chat-messages {
  scroll-behavior: smooth;
}
</style>