<template>

      <div>
        <v-card id="scroll-container" class="ma-4 scroll-y" style="max-height: 500px" >
          <v-list subheader two-line>
              <v-subheader>Recent Chat</v-subheader>
            <v-flex  
                  v-for="(message, index) in messages" :key="index">              
              <v-list-tile xs2>
                <!-- <v-list-tile-avatar class="pa-0">
                  <img :src="message.user.avatar">
                </v-list-tile-avatar> -->
                <v-layout column>
                  <v-subheader xs4 class="pa-0 ma-0">{{ message.user.name }}:</v-subheader>
                  <v-list-tile-content class="ml-2 caption" v-html="message.text">                  
                  </v-list-tile-content>

                </v-layout>
              </v-list-tile>
            </v-flex>
          </v-list>
        </v-card>
      <compose-message></compose-message>
      </div>

<!-- @mouseover="scrollToEnd"  -->
</template>

<script>
import ComposeMessage from "./ComposeMessage";
import debounce from "@/helpers/debounce";

export default {
  components: {
    ComposeMessage
  },
  // beforeUpdate() {
  //   this.scrollToEnd();
  // },
  data() {
    return {};
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  watch: {
    messages: debounce(function(newVal) {
      // console.log("value of heater left: ", newVal);
      this.scrollToEnd();
    }, 500)
  },
  methods: {
    scrollToEnd: function() {
      var container = this.$el.querySelector("#scroll-container");
      container.scrollTop = container.scrollHeight;
    }
  }
};
</script>

