<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 md4 offset-md1 class="text-xs-center centered">
      <img id="logo" class="logo" src="~@/assets/logo.png" alt="electron-vue">
    </v-flex>
    <v-flex xs12 md6 class="text-xs-center centered">
      <img id="logo" class="logo" src="/static/v.png" alt="Vuetifyjs">
    </v-flex>
    <v-flex xs10 class="mt-3">

    </v-flex>
    <v-flex xs10 class="mt-4">
      <system-information></system-information>
    </v-flex>
    <v-flex xs10 class="mt-4">

    </v-flex>
  </v-layout>
</template>

<script>
import SystemInformation from "./WelcomeView/SystemInformation";

export default {
  name: "welcome",
  components: { SystemInformation },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 100%;
}

.link-btn {
  width: 150px;
}
</style>
