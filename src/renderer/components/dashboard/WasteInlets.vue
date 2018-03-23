<template>
  <v-container grid-list-md>
    <v-card class="text-xs-center" color="blue-grey darken-2">
        <v-card-title><h3> Waste Inlets </h3></v-card-title>
        <v-layout row wrap>
            <temp-slider name="Left Target"  
              v-model="heaterLeftTarget" 
              :value='heaterLeftTarget' 
              :progressVal="heaterLeftActual"></temp-slider>
            <temp-slider name="Right Target"  
              v-model="heaterRightTarget" 
              :value='heaterRightTarget' 
              :progressVal="heaterRightActual"></temp-slider>             
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-flex v-bind="{[`xs${fanCardWidth}`]:true}"  >
                  <v-card class="ma-2">
                    <v-card-text> 
                      <v-layout row >
                        <v-flex>
                          <h5>Left Cooling Fan</h5>
                          <v-layout row>
                          <v-icon class="mt-4 mr-3">toys</v-icon>                          
                          <v-switch 
                          v-model="leftFanOn"
                          :hint="fanLeftState"
                          persistent-hint
                          class="mt-3 "></v-switch>
                          <v-flex class="mt-4">
                          </v-flex>
                          </v-layout>                              
                        </v-flex>
                        <v-flex>
                          <h5>Right Cooling Fan</h5>
                          <v-layout row>
                          <v-icon class="mt-4 mr-3">toys</v-icon>                          
                          <v-switch 
                          v-model="rightFanOn"   
                           :hint="fanRightState"
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
      heaterLeftTarget: 150,
      //heaterLeftActual: 20,
      //heaterRightActual: 20,
      heaterRightTarget: 150,
      reactorTarget: 0,
      leftFanOn: false,
      rightFanOn: false
    };
  },
  computed: {
    heaterLeftActual() {
      return this.$store.getters.heaterLeft.actualTemp;
    },
    heaterRightActual() {
      return this.$store.getters.heaterRight.actualTemp;
    },
    heaterLeftNewValFromStore() {
      return this.$store.getters.heaterLeft.targetTemp;
    },
    heaterRightNewValFromStore() {
      return this.$store.getters.heaterRight.targetTemp;
    },
    leftFanOnNewValFromStore() {
      return this.$store.getters.heaterLeft.fanOn;
    },
    rightFanOnNewValFromStore() {
      return this.$store.getters.heaterRight.fanOn;
    },
    fanLeftState() {
      return this.leftFanOn ? "On" : "Off";
    },
    fanRightState() {
      return this.rightFanOn ? "On" : "Off";
    }
  },
  watch: {
    heaterLeftTarget: debounce(function(newVal) {
      console.log("value of heater left: ", newVal);
      this.$store.dispatch("heaterLeftTarget", newVal);
    }, 1000),
    heaterRightTarget: debounce(function(newVal) {
      console.log("value of heater left: ", newVal);
      this.$store.dispatch("heaterRightTarget", this.heaterRightTarget); //this should be triggered by event
    }, 1000),
    leftFanOn: function(newVal) {
      this.$store.dispatch("fanLeftState", newVal);
    },
    rightFanOn: function(newVal) {
      this.$store.dispatch("fanRightState", newVal);
    },
    leftFanOnNewValFromStore: function(newVal) {
      this.leftFanOn = newVal;
    },
    rightFanOnNewValFromStore: function(newVal) {
      this.rightFanOn = newVal;
    },
    heaterLeftNewValFromStore(newVal) {
      this.heaterLeftTarget = newVal;
    },
    heaterRightNewValFromStore(newVal) {
      this.heaterRightTarget = newVal;
    }
  },
  components: {
    TempSlider
  }
};
</script>

