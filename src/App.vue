<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8" max-width="960">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="rounded-xl elevation-2 pa-6">
              <v-chip color="primary" class="mb-4" prepend-icon="mdi-heart-pulse">
                Care coordination
              </v-chip>
              <h1 class="text-h4 font-weight-bold mb-3">Welcome to your patient dashboard</h1>
              <p class="text-body-1 text-medium-emphasis">
                Review your medication schedule, request a refill, or message your care team from the floating support widget.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />

    <PatientWidget
      patient-name="Jordan Lee"
      assistant-title="MediDesk Support"
      assistant-subtitle="Medication support • refill requests • care chat"
    />
  </v-app>
</template>

<script lang="ts" setup>
import PatientWidget from '@/components/PatientWidget.vue'
</script>