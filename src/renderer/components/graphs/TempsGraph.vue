<template>
  <v-container >
    <v-card class="pa-4 scroll-y" fluid light>
        <line-chart  :data="chartData" :options="chartOptions" :width="1600"  :height="600"></line-chart>
    </v-card>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      chartOptions: {
        responsive: false,
        showLines: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      },
      chartData: {
        labels: [
          "26-03-2018 01:00:29",
          "26-03-2018 01:00:59",
          "26-03-2018 01:01:29",
          "26-03-2018 01:01:59",
          "26-03-2018 01:02:29",
          "26-03-2018 01:02:59",
          "26-03-2018 01:03:29",
          "26-03-2018 01:03:59",
          "26-03-2018 01:04:29",
          "26-03-2018 01:04:59",
          "26-03-2018 01:05:29",
          "26-03-2018 01:05:59",
          "26-03-2018 01:06:29",
          "26-03-2018 01:06:59",
          "26-03-2018 01:07:29",
          "26-03-2018 01:07:59",
          "26-03-2018 01:08:29",
          "26-03-2018 01:08:59",
          "26-03-2018 01:09:29",
          "26-03-2018 01:09:59",
          "26-03-2018 01:10:29",
          "26-03-2018 01:10:59",
          "26-03-2018 01:11:29",
          "26-03-2018 01:11:59"
        ],
        datasets: [
          {
            label: "Target Temps",
            backgroundColor: "#f87979",
            data: [
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150,
              150
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()], // use store getters to populate here
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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