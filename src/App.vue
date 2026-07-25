<template>
  <v-app>
    <!-- Your main application content goes here -->
    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <h1 class="text-h3 font-weight-bold mb-4">Patient Portal Dashboard</h1>
            <p class="text-body-1 text-medium-emphasis">
              Your main application content goes here. The widget is floating in the bottom right corner!
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Theme Toggle (Optional) -->
    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />

    <!-- Import the floating Patient Widget -->
    <PatientWidget />
  </v-app>
</template>

<script lang="ts" setup>
import PatientWidget from '@/components/PatientWidget.vue'
</script>