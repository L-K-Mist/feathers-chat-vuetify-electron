<template>
  <v-container grid-list-md>
      <v-card class="text-xs-center" color="blue-grey darken-2" >
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
            <v-layout row wrap>
                <v-spacer></v-spacer>
                <flasher-slider name="Furnace Blower Intensity"  
                v-model="blowerSpeed" 
                :targetTemp='blowerSpeed'></flasher-slider>                           
                <v-spacer></v-spacer>
            </v-layout>
      </v-card>
  </v-container>
</template>
<script>
import TempSlider from "@/components/ReUse/TempSlider";
import debounce from "@/helpers/debounce";
import FlasherSlider from "@/components/ReUse/FlasherSlider";
export default {
  data() {
    return {
      heaterReactorTarget: 150,
      blowerSpeed: 50
    };
  },
  computed: {
    heaterReactorActual() {
      return this.$store.getters.heaterReactor.actualTemp;
    },
    blowerSpeedNewValFromStore() {
      return this.$store.getters.heaterReactor.blowerSpeed;
    },
    heaterReactorNewValFromStore() {
      return this.$store.getters.heaterReactor.targetTemp;
    }
  },
  watch: {
    heaterReactorTarget: debounce(function(newVal) {
      this.$store.dispatch("heaterReactorTarget", newVal);
    }, 1000),
    heaterReactorNewValFromStore(newVal) {
      this.heaterReactorTarget = newVal;
    },
    blowerSpeedNewValFromStore(newVal) {
      this.blowerSpeed = newVal;
    },
    blowerSpeed: debounce(function(newVal) {
      this.$store.dispatch("blowerSpeed", newVal);
      // console.log("debounce triggered");
    }, 500)
  },
  components: { TempSlider, FlasherSlider }
};
</script>

