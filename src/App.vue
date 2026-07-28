<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8" max-width="1200">
        <v-row justify="center">
          <v-col cols="12">
            <v-card class="rounded-xl elevation-1 border pa-6" style="background: linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);">
              <div class="d-flex flex-column flex-md-row justify-space-between align-start align-md-center gap-4">
                <div>
                  <v-chip color="primary" class="mb-4" prepend-icon="mdi-heart-pulse">
                    Care coordination
                  </v-chip>
                  <h1 class="text-h4 font-weight-bold mb-2">Welcome to your MediDesk workspace</h1>
                  <p class="text-body-1 text-medium-emphasis mb-0">
                    Review medication needs, manage support queues, and connect with care teams through a consistent experience.
                  </p>
                </div>
                <v-btn color="primary" prepend-icon="mdi-theme-light-dark" variant="flat" @click="$vuetify.theme.cycle()">
                  Toggle theme
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <AgentDashboard />
      </v-container>
    </v-main>

    <PatientWidget
      patient-name="Jordan Lee"
      assistant-title="MediDesk Support"
      assistant-subtitle="Medication support • refill requests • care chat"
    />
  </v-app>
</template>

<script lang="ts" setup>
import AgentDashboard from '@/components/AgentDashboard.vue'
import PatientWidget from '@/components/PatientWidget.vue'
</script>