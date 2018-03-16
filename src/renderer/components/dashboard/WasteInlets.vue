<template>
<v-flex xs12>
        <v-card  color="blue-grey darken-2">
            <v-card-title ><strong> Waste Inlets </strong></v-card-title>
            <v-layout row wrap>
                <temp-slider name="Left Target"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
                <temp-slider name="Right Target"  v-model="heaterLeftTarget" :targetTemp='heaterRightTarget'></temp-slider>
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

      heaterRightTarget: 0,
      reactorTarget: 0,
      disabled: true
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
    heaterLeftTarget: function(newVal) {
      this.$store.dispatch("heaterLeftTarget", this.heaterLeftTarget); //this should be triggered by event
    },
    heaterLeftNewValFromStore(newVal) {
      this.heaterLeftTarget = newVal;
    }
  },
  components: {
    TempSlider
  }
};
</script>

