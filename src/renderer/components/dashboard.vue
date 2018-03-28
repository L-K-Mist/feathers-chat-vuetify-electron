<template>
    <v-container>
        <v-layout row wrap>
          <waste-inlets></waste-inlets>
          <main-reactor></main-reactor>
          <output-condensor></output-condensor>
            <!-- <temp-slider v-model="heaterRightTarget" :value='heaterRightTarget'></temp-slider>
            <temp-slider v-model="reactorTarget" :value='reactorTarget'></temp-slider> -->
        </v-layout>
    </v-container>
</template>
 
<script>
import MainReactor from "@/components/dashboard/Reactor";
import WasteInlets from "@/components/dashboard/WasteInlets";
import TempsGraph from "@/components/graphs/TempsGraph";
import OutputCondensor from "@/components/dashboard/OutputCondensor";
// const { ipcRenderer } = require("electron");
export default {
  data() {
    return {};
  },
  methods: {},

  mounted() {
    // setInterval(() => {
    //   this.$electron.ipcRenderer.send("ping");
    // }, 1000);
    // this.$electron.ipcRenderer.on("pong", (event, data) => {
    //   this.myDataVar = data;
    //   console.log(data);
    // });
  },
  components: {
    MainReactor,
    WasteInlets,
    TempsGraph,
    OutputCondensor
  }
};
</script>

<style>

</style>

  