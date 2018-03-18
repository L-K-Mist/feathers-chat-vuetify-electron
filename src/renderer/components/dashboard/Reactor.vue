<template>
          <v-flex xs12>
              <v-card color="blue-grey darken-2" class="mt-1">
                  <v-card-title><strong>Reactor</strong></v-card-title>
                  <v-layout row wrap>
      
        
                        <temp-slider name="Target Temp"  
                        v-model="heaterReactorTarget"
                        :value="heaterReactorTarget" 
                        :progressVal="heaterReactorActual"
                        :max="500"></temp-slider>
                        <flasher-slider name="Furnace Blower Speed"  v-model="blowerSpeed" :targetTemp='blowerSpeed'></flasher-slider>                           
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

