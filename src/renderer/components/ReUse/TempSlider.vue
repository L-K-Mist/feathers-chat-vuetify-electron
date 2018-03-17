 <template>
        <v-flex xs6>
            <v-card class="ma-1">
                <v-card-text>
                        <v-layout row wrap>
                        <v-flex xs12 sm10>
                            <h5>{{ name }}</h5>
                            <v-slider 
                              :disabled="disabled" 
                              :max="max" :value="sliderVal" 
                              @input="$emit('input', $event)" 
                              thumb-label step="10" 
                              prepend-icon="radio_button_checked" 
                              ticks></v-slider>
                                <v-layout row>
                                <div name="pre-spacer" style="width: 75px; height: 40px"><v-icon>whatshot</v-icon></div>
                                <v-progress-linear
                                    :buffer-value="bufferVal"
                                    :value="progressVal"
                                    buffer
                                    color="red lighten-1"
                                    background-color="red lighten-3"
                                    background-opacity="0.7"
                                    style="margin-right: 15px; margin-top:8px"
                                    >
                                </v-progress-linear>
                                </v-layout>                               
                        </v-flex>
                        <v-flex xs3 sm2>
                            <v-text-field :value="sliderVal" @input="$emit('input', $event)" type="number"></v-text-field>
                            <v-text-field :value="progressVal" @input="$emit('input', $event)" type="number"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
 </template>

 <script>
export default {
  props: {
    value: {
      default: 110,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    name: {
      default: "MaxiMillion",
      type: String
    },
    progressVal: {
      default: 10,
      type: Number
    },
    max: {
      default: 200,
      type: Number
    }
  },
  data() {
    return {
      iconTarget: "radio_button_checked",
      iconFire: "whatshot"
    };
  },
  computed: {
    sliderVal() {
      return this.value;
    },
    bufferVal() {
      return this.sliderVal / this.max * 100;
    }
  }
};
</script>
<style scoped>
/* .slider__track__container {
} */
</style>

 