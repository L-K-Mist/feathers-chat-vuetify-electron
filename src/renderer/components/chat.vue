<template>
  <v-container>
      <v-card>
        <v-layout row>             
          <app-messages></app-messages>
        </v-layout>
      </v-card>
  </v-container>
</template>

<script>
import AppMessages from "@/components/chat/messages";

export default {
  data() {
    return {};
  },
  components: {
    AppMessages
  }
};
</script>

