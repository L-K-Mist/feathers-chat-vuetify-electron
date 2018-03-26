<template>
  <v-container >
     <date-toolbar></date-toolbar>
      <v-card class="pa-4 scroll-y" fluid light>
        <line-chart style="padding-right: 30px" :data="chartData" :options="chartOptions" :width="1600"  :height="600"></line-chart>
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
      items: [
        { text: "26-03-2018" },
        { text: "27-03-2018" },
        { text: "28-03-2018" },
        { text: "29-03-2018" },
        { text: "26-03-2018" },
        { text: "26-03-2018" },
        { text: "26-03-2018" }
      ],

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
            label: "Actual Temps",
            backgroundColor: "rgba(255, 99, 255, 0.2)",
            data: [
              30,
              40,
              50,
              60,
              70,
              80,
              85,
              90,
              95,
              100,
              105,
              110,
              115,
              120,
              125,
              130,
              135,
              140,
              142,
              144,
              146,
              148,
              150,
              152,
              154,
              154,
              152,
              150,
              148,
              150
            ]
          },
          {
            label: "Target Temps",
            backgroundColor: "rgba(255, 99, 0, 0.2)",
            data: [
              0,
              80,
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
  computed: {
    state() {
      this.$store.getters.historyState;
    }
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