<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Looks like you're not logged in yet?</v-card-title>
        <v-card-text>Please Log In with the Username and Password sent to you by your trusty WeLink Consultant</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="userRegister">Yes, let me register</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="userLogin">No, let me log in</v-btn>
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
        return this.$store.getters.showLoginGuide;
      },
      set(dialog) {
        this.$store.dispatch("showLoginGuide", dialog);
      }
    }
  },
  methods: {
    userRegister() {
      this.dialog = false;
      this.$store.dispatch("userRegister", true);
      this.$router.replace({ name: "AppAuthentication" });
    },
    userLogin() {
      this.dialog = false;
      this.$store.dispatch("userLogin", true);
      this.$router.replace({ name: "AppAuthentication" });
    }
  }
};
</script>