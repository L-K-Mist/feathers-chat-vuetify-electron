 <template>
        <v-flex xs6>
            <v-card class="ma-1">
                <v-card-text>
                    <h5>{{ name }}</h5>
                        <v-layout row wrap>
                        <v-flex xs12 sm10>
                            <v-slider prepend-icon="whatshot" :value="target" @input="$emit('input', $event)" thumb-label step="10" ticks></v-slider>
                        </v-flex>
                        <v-flex xs3 sm2>
                            <v-text-field :value="target" @input="$emit('input', $event)" type="number"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
 </template>

 <script>
export default {
  props: ["targetTemp", "name", "max"],
  data() {
    return {};
  },
  computed: {
    target() {
      return this.targetTemp;
    }
  }
};
</script>
 