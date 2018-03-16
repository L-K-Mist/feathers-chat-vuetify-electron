<template>
          <v-flex xs12>
              <v-card color="blue-grey darken-2" class="mt-1">
                  <v-card-title><strong>Reactor</strong></v-card-title>
                  <v-layout row wrap>
      
        
                        <temp-slider name="Target Temp"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
                        <temp-slider name="Furnace Blower Speed"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>     
                        <temp-slider name="Actual Temp"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>     
                      
                    </v-layout> 
              </v-card>
          </v-flex>
</template>
<script>
import TempSlider from "@/components/ReUse/TempSlider";
export default {
  components: { TempSlider }
};
</script>

