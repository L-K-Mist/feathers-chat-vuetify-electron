<template>
  <v-container >
     <date-toolbar></date-toolbar>
      <v-card class="pa-4 scroll-y" fluid light>
        <line-chart :chart-data="datacollection" :width="1600"  :height="600"></line-chart>
    <button @click="fillData()">Randomize</button>
        <!-- <line-chart style="padding-right: 30px" :data="chartData" :options="chartOptions" :width="1600"  :height="600"></line-chart> -->
      </v-card>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.js";
import DateToolbar from "./DateToolbar";
export default {
  components: {
    LineChart,
    DateToolbar
  },
  data() {
    return {
      datacollection: null,
      chartOptions: {
        devicePixelRatio: 2,
        responsive: false,
        showLines: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    };
  },
  // mounted() {
  //   this.fillData();
  // },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.$store.getters.timestamp_Labels,
        datasets: [
          {
            label: "Actual Reactor Temps",
            backgroundColor: "rgba(255, 99, 255, 0.2)",
            data: this.$store.getters.actualTemps_Reactor
          },
          {
            label: "Target Reactor Temps",
            backgroundColor: "rgba(255, 99, 0, 0.2)",
            data: this.$store.getters.targetTemps_Reactor
          }
        ]
      };
    }
  },
  computed: {
    state() {
      this.$store.getters.historyState;
    }
  }
};
</script>

<style>
.small {
  max-width: 1600px;
  margin: 150px auto;
}
</style>