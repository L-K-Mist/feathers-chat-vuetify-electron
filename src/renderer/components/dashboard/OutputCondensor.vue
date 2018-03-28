<template>
  <v-container grid-list-md>
    <v-card class="text-xs-center" color="blue-grey darken-2">
        <v-card-title><h3> Twin Condensors </h3></v-card-title>
        <v-layout row wrap>
            <temp-slider name="Phase One Condensor"  
              v-model="condensorOne" 
              :value='condensorOne' 
              :progressVal="condensorOneActual"></temp-slider>
            <temp-slider name="Phase Two Condensor"  
              v-model="condensorTwo" 
              :value='condensorTwo' 
              :progressVal="condensorTwoActual"></temp-slider>             
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex v-bind="{[`xs${fanCardWidth}`]:true}"  >
                  <v-card class="ma-2">
                    <v-card-text> 
                      <v-layout row>
                        <v-flex>
                          <h5>Condensor One Cooling Fan</h5>
                          <v-layout row>
                          <v-icon class="mt-4 mr-3">toys</v-icon>                          
                          <v-switch 
                          v-model="condensorOneFanOn"
                          :hint="condensorOneFanState"
                          persistent-hint
                          class="mt-3 "></v-switch>
                          <v-flex class="mt-4">
                          </v-flex>
                          </v-layout>                              
                        </v-flex>
                        <v-flex>
                          <h5>Condensor Two Cooling Fan</h5>
                          <v-layout row>
                          <v-icon class="mt-4 mr-3">toys</v-icon>                          
                          <v-switch 
                          v-model="condensorTwoFanOn"   
                           :hint="condensorTwoFanState"
                          persistent-hint                          
                          class="mt-3 "></v-switch>
                          <v-flex class="mt-4">
                          </v-flex>
                          </v-layout>
                        </v-flex> 
                      </v-layout>
                    </v-card-text>
                  </v-card>  
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>               
        </v-layout>
    </v-card>
    <v-card color="blue-grey darken-2"></v-card>
  </v-container>
</template>
<script>
import TempSlider from "@/components/ReUse/TempSlider";
import debounce from "@/helpers/debounce";

export default {
  data() {
    return {
      fanCardWidth: "8",
      condensorOne: 60,
      //condensorOneActual: 20,
      //condensorTwoActual: 20,
      condensorTwo: 60,
      condensorOneFanOn: false,
      condensorTwoFanOn: false
    };
  },
  computed: {
    condensorOneActual() {
      return this.$store.getters.condensorOne.actualTemp;
    },
    condensorTwoActual() {
      return this.$store.getters.condensorTwo.actualTemp;
    },
    condensorOneNewValFromStore() {
      return this.$store.getters.condensorOne.targetTemp;
    },
    heaterRightNewValFromStore() {
      return this.$store.getters.condensorTwo.targetTemp;
    },
    condensorOneFanOnNewValFromStore() {
      return this.$store.getters.condensorOne.fanOn;
    },
    condensorTwoFanOnNewValFromStore() {
      return this.$store.getters.condensorTwo.fanOn;
    },
    condensorOneFanState() {
      return this.condensorOneFanOn ? "On" : "Off";
    },
    condensorTwoFanState() {
      return this.condensorTwoFanOn ? "On" : "Off";
    }
  },
  watch: {
    condensorOne: debounce(function(newVal) {
      // console.log("value of heater left: ", newVal);
      this.$store.dispatch("condensorOneTarget", newVal);
    }, 1000),
    condensorTwo: debounce(function(newVal) {
      // console.log("value of heater left: ", newVal);
      this.$store.dispatch("condensorTwoTarget", this.condensorTwo); //this should be triggered by event
    }, 1000),
    condensorOneFanOn: function(newVal) {
      this.$store.dispatch("condensorOneFanOn", newVal);
    },
    condensorTwoFanOn: function(newVal) {
      this.$store.dispatch("condensorTwoFanOn", newVal);
    },
    condensorOneFanOnNewValFromStore: function(newVal) {
      this.condensorOneFanOn = newVal;
    },
    condensorTwoFanOnNewValFromStore: function(newVal) {
      this.condensorTwoFanOn = newVal;
    },
    condensorOneNewValFromStore(newVal) {
      this.condensorOne = newVal;
    },
    condensorTwoNewValFromStore(newVal) {
      this.condensorTwo = newVal;
    }
  },
  components: {
    TempSlider
  }
};
</script>

