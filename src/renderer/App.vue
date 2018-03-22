<template>
  <div id="app">
    <v-app dark>
      <user-guide-dialogue :dialog="loginDialogue.show"></user-guide-dialogue>
      <v-navigation-drawer
        name="chat-drawer"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <h4>Chat Drawer</h4>
        <app-chat></app-chat>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="controller">Dashboard</v-btn>
        <v-btn @click.native.stop="getPorts" ><v-icon class="pr-2">import_export</v-icon>Connect Hardware</v-btn>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
            <connect-dialog></connect-dialog>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import AppChat from "@/components/chat";
import ConnectDialog from "@/components/ConnectHardware/ConnectHardwareDialog";
import UserGuideDialogue from "@/components/UserGuideDialogue";

export default {
  mounted() {
    this.$store.dispatch("signInAuto");
  },
  //name: "p2d-controller",
  data: () => ({
    loginDialogue: {
      show: false
    },

    clipped: true,
    drawer: true,
    fixed: false,
    items: [
      { icon: "apps", title: "Welcome", to: "/" },
      { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
    ],
    right: true,
    rightDrawer: false,
    title: "P2D",
    allPorts: [],
    myPort: {}
  }),
  computed: {
    isSerialConnected() {
      return this.$store.getters.hasPortname;
    },
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  },
  methods: {
    getPorts() {
      this.$store.dispatch("getActivePortsPC");
      this.$store.dispatch("showConnectDialog", true);
    }

    // showConnectDialog() {
    // }
  },
  watch: {
    isSerialConnected(value) {
      if ((value = true)) {
        this.$router.replace({ name: "controller" });
      }
    },
    user(value) {
      if (value !== null && value !== undefined) {
        // Make sure there's an authenticated user
        this.showWelcome = true;
        this.$store.dispatch("fetchUsers");
        this.$store.dispatch("fetchMessages"); // Now that we know there's an authenticated user, we can request messages from the database for our store. - BECAUSE - if we trigger a fetch before there's a logged in user, feathers throws an error.
        //this.$router.replace({ name: "AppChat" });
      } else {
        this.$store.dispatch("showLoginGuide", true);
      }
    }
  },
  components: {
    ConnectDialog,
    AppChat,
    UserGuideDialogue
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
</style>
