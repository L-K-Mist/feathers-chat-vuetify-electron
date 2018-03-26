<template>
  <!-- <div class="small"> -->
    <line-chart :data="chartData" :options="chartOptions"></line-chart>
  <!-- </div> -->
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: "#f87979",
            data: chartData: [
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
      },
      
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