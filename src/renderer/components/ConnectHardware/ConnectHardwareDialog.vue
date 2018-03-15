<template>  
  <v-layout row justify-center>
    <v-dialog dismissable v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Click the right connection</v-card-title>
        <v-card-text>If it says Arduino then it's probably correct!</v-card-text>
        <v-card-actions>
          <v-list two-line>
          <template v-for="(port, index) in ports" >
            <v-list-tile ripple fluid :key="index" @click="connect(port.comName)">
              <v-list-tile-content >
                <v-list-tile-title v-html="port.manufacturer"></v-list-tile-title>
                <v-list-tile-sub-title v-html="port.comName"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  computed: {
    dialog: {
      get() {
        return this.$store.getters.showConnectDialog;
      },
      set(dialog) {
        this.$store.dispatch("showConnectDialog", dialog);
      }
    },
    ports() {
      return this.$store.getters.activePorts;
    },
    myPort() {
      return this.$store.myPort;
    }
  },
  methods: {
    connect(port) {
      this.$store.dispatch("connectSerial", port);
      this.$router.replace({ name: "controller" });
    }
    // userRegister() {
    //   this.dialog = false;
    //   this.$store.dispatch("userRegister", true);
    //   this.$router.replace({ name: "AppAuthentication" });
    // },
    // userLogin() {
    //   this.dialog = false;
    //   this.$store.dispatch("userLogin", true);
    //   this.$router.replace({ name: "AppAuthentication" });
    // }
  }
};
</script>