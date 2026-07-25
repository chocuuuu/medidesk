<!-- Widget Chat Window -->
<v-expand-transition>
  <v-card
    v-if="isOpen"
    class="elevation-10 d-flex flex-column position-fixed"
    width="350"
    height="500"
    rounded="xl"
    style="bottom: 90px; right: 24px; z-index: 9999;"
  >
    <!-- Header -->
    <v-toolbar color="primary" density="compact" class="flex-grow-0">
      <v-toolbar-title class="text-subtitle-1 font-weight-bold">
        MediDesk Support
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" size="small" @click="isOpen = false"></v-btn>
    </v-toolbar>

    <!-- Tabs for Navigation -->
    <v-tabs v-model="activeTab" bg-color="primary" density="compact" grow class="flex-grow-0">
      <v-tab value="schedule">Schedule</v-tab>
      <v-tab value="refill">Refill</v-tab>
      <v-tab value="chat">Chat</v-tab>
    </v-tabs>

    <!-- Tab Content Area -->
    <v-card-text class="flex-grow-1 overflow-y-auto bg-grey-lighten-4 pa-0">
      <v-window v-model="activeTab">
        
        <!-- 1. Schedule Tab -->
        <v-window-item value="schedule">
          <v-list lines="two" class="bg-transparent">
            <v-list-subheader>Today's Medications</v-list-subheader>
            <v-list-item
              v-for="med in mockSchedule"
              :key="med.id"
              :title="med.name"
              :subtitle="med.time + ' - ' + med.dosage"
            >
              <template v-slot:prepend>
                <v-avatar color="blue-lighten-4">
                  <v-icon color="blue-darken-2">mdi-pill</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-checkbox-btn v-model="med.takenToday" color="success" hide-details></v-checkbox-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>

        <!-- 2. Refill Tab -->
        <v-window-item value="refill">
          <v-container>
            <p class="text-body-2 mb-4 text-grey-darken-2">
              Select a medication from your active prescriptions to request a refill from the pharmacy.
            </p>
            <v-select
              v-model="refillSelection"
              :items="mockSchedule.map(m => m.name)"
              label="Select Medication"
              variant="outlined"
              density="comfortable"
            ></v-select>
            
            <v-textarea
              v-model="refillNotes"
              label="Additional Notes (Optional)"
              variant="outlined"
              density="comfortable"
              rows="3"
            ></v-textarea>

            <v-btn
              color="primary"
              block
              @click="submitRefill"
              :loading="isSubmitting"
            >
              Submit Request
            </v-btn>
          </v-container>
        </v-window-item>

        <!-- 3. Chat Tab -->
        <v-window-item value="chat">
          <div class="chat-container d-flex flex-column h-100">
            <div class="chat-messages flex-grow-1 pa-3 overflow-y-auto" style="min-height: 280px;">
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
                  {{ msg.text }}
                </v-card>
              </div>
            </div>
            
            <v-divider></v-divider>
            
            <div class="chat-input pa-2 bg-white">
              <v-text-field
                v-model="newMessage"
                append-inner-icon="mdi-send"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="Type a message..."
                @click:append-inner="sendMessage"
                @keyup.enter="sendMessage"
              ></v-text-field>
            </div>
          </div>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
</v-expand-transition>
