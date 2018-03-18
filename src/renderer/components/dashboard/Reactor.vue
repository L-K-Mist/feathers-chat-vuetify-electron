<template>
  <v-flex xs12>
      <v-card color="blue-grey darken-2" class="mt-1">
          <v-card-title><h3>Reactor</h3></v-card-title>
          <v-layout row wrap>
            <v-spacer></v-spacer>
                <temp-slider name="Target Temp"  
                v-model="heaterReactorTarget"
                :value="heaterReactorTarget" 
                :progressVal="heaterReactorActual"
                :max="500"
                :mainCardWidth="12"></temp-slider>
                <v-spacer></v-spacer>
            </v-layout> 
            <v-layout row>
                <v-spacer></v-spacer>
                <flasher-slider name="Furnace Intensity"  
                v-model="blowerSpeed" 
                :targetTemp='blowerSpeed'></flasher-slider>                           
                <v-spacer></v-spacer>
            </v-layout>
      </v-card>
  </v-flex>
</template>
<script>
import TempSlider from "@/components/ReUse/TempSlider";
import FlasherSlider from "@/components/ReUse/FlasherSlider";
export default {
  data() {
    return {
      heaterReactorTarget: 30,
      blowerSpeed: 100
    };
  },
  computed: {
    heaterReactorActual() {
      return this.$store.getters.heaterReactor.actualTemp;
    },

    heaterReactorNewValFromStore() {
      return this.$store.getters.heaterReactor.targetTemp;
    }
  },
  watch: {
    heaterReactorTarget: function(newVal) {
      this.$store.dispatch("heaterReactorTarget", this.heaterReactorTarget); //this should be triggered by event
    },
    heaterReactorNewValFromStore(newVal) {
      this.heaterReactorTarget = newVal;
    }
  },
  components: { TempSlider, FlasherSlider }
};
</script>

