<template>
   <v-toolbar color="indigo" dark>
        <v-toolbar-title>Compare Actual Temps with Targets</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout row wrap>         
          <v-flex xs11 sm5>
            <v-dialog
              ref="fromDialog"
              persistent
              v-model="fromModal"
              lazy
              full-width
              width="290px"
              :return-value.sync="startDate"
            >
              <v-text-field
                slot="activator"
                label="From Date"
                v-model="startDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="startDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="fromModal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.fromDialog.save(startDate); attemptSend()">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs11 sm5>
            <v-dialog
              ref="toDialog"
              persistent
              v-model="toModal"
              lazy
              full-width
              width="290px"
              :return-value.sync="endDate"
            >
              <v-text-field
                slot="activator"
                label="To Date"
                v-model="endDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="endDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="toModal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.toDialog.save(endDate); attemptSend()">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>          
      </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      startDate: null,
      fromModal: false,
      endDate: null,
      toModal: false
    };
  },
  watch: {
    startDate(newVal) {
      console.log("newStartDate", newVal);
      this.$store.dispatch("newStartDate", newVal);
    },
    endDate(newVal) {
      console.log("newEndDate", newVal);
      this.$store.dispatch("newEndDate", newVal);
    }
  },
  methods: {
    attemptSend() {
      if (this.startDate !== null && this.endDate !== null) {
        this.$store.dispatch("fetchData");
      } else {
        console.log("false START");
      }
    }
  }
};
</script>

