<template>
<v-flex xs12>
        <v-card  color="blue-grey darken-2">
            <v-card-title ><strong> Waste Inlets </strong></v-card-title>
            <v-layout row wrap>
                <temp-slider name="Left Target"  
                  v-model="heaterLeftTarget" 
                  :value='heaterLeftTarget' 
                  :progressVal="heaterLeftActual"></temp-slider>
                <temp-slider name="Right Target"  
                  v-model="heaterRightTarget" 
                  :value='heaterRightTarget' 
                  :progressVal="heaterRightActual"></temp-slider>
                <!-- <temp-slider :disabled="disabled" name="Right Actual"  v-model="heaterRightStore.actualTemp" :value='heaterRightStore.actualTemp'></temp-slider> -->
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
      heaterLeftTarget: 150,
      //heaterLeftActual: 20,
      //heaterRightActual: 20,
      heaterRightTarget: 150,
      reactorTarget: 0,
      disabled: true
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
    }
  },
  watch: {
    heaterLeftStore(newVal) {
      this.heaterLeftActual = newVal.actualTemp;
    },
    heaterLeftTarget: function(newVal) {
      this.$store.dispatch("heaterLeftTarget", this.heaterLeftTarget); //this should be triggered by event
    },
    heaterLeftNewValFromStore(newVal) {
      this.heaterLeftTarget = newVal;
    },
    heaterRightTarget: function(newVal) {
      this.$store.dispatch("heaterRightTarget", this.heaterRightTarget); //this should be triggered by event
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

