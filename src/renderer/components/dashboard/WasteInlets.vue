<template>
<v-flex xs12>
        <v-card  color="blue-grey darken-2">
            <v-card-title ><strong> Waste Inlets </strong></v-card-title>
            <v-layout row wrap>
                <temp-slider name="Left Target"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
                <temp-slider name="Right Target"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
                <temp-slider name="Left Actual"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
                <temp-slider name="Right Actual"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
            </v-layout>
        </v-card>
        <v-card color="blue-grey darken-2"></v-card>
        </v-flex>
  
</template>
<script>
import TempSlider from "@/components/ReUse/TempSlider";
import debounce from "@/helpers/debounce";

export default {
  data() {
    return {
      heaterLeftTarget: 0,
      heaterLeftTargetStable: 0,
      myPort: {}
      // heaterRightTarget: 0,
      // reactorTarget: 0
    };
  },
  computed: {
    heaterLeftNewValFromStore() {
      return this.$store.getters.heaterLeft.targetTemp;
    },
    activePortName() {
      return this.$store.getters.activePortName;
    }
  },
  watch: {
    heaterLeftTarget: debounce(function(newVal) {
      this.heaterLeftTargetStable = newVal;
      this.$store.dispatch("heaterLeftTarget", this.heaterLeftTargetStable); //this should be triggered by event
    }, 1000),
    heaterLeftNewValFromStore(newVal) {
      this.heaterLeftTarget = newVal;
    }
  },
  components: {
    TempSlider
  }
};
</script>

