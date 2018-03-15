<template>
    <v-container>
        <v-layout row wrap>
            <temp-slider name="Mike"  v-model="heaterLeftTarget" :targetTemp='heaterLeftTarget'></temp-slider>
            <!-- <temp-slider v-model="heaterRightTarget" :targetTemp='heaterRightTarget'></temp-slider>
            <temp-slider v-model="reactorTarget" :targetTemp='reactorTarget'></temp-slider> -->
        </v-layout>
    </v-container>
</template>

<script>
import debounce from "@/helpers/debounce";
import TempSlider from "@/components/ReUse/TempSlider";
const { ipcRenderer } = require("electron");
var SerialPort = require("serialport-builds-electron");
export default {
  data() {
    return {
      heaterLeftTarget: 0,
      heaterLeftTargetStable: 0,
      myPort: {}
      // heaterRightTarget: 0,
      // reactorTarget: 0
    };
  },
  methods: {
    readSerialData(data) {
      console.log(data);
    }
  },
  computed: {
    heaterLeftNewValFromStore() {
      return this.$store.getters.heaterLeft.targetTemp;
    },
    activePortName() {
      return this.$store.getters.activePortName;
    }
  },
  watch: {
    heaterLeftTarget: debounce(function(newVal) {
      this.heaterLeftTargetStable = newVal;
      this.$store.dispatch("heaterLeftTarget", this.heaterLeftTargetStable); //this should be triggered by event
    }, 1000),
    heaterLeftNewValFromStore(newVal) {
      this.heaterLeftTarget = newVal;
    }
    // activePortName(newVal) {}
  },
  mounted() {
    setInterval(() => {
      this.$electron.ipcRenderer.send("ping");
    }, 1000);
    this.$electron.ipcRenderer.on("pong", (event, data) => {
      this.myDataVar = data;
      console.log(data);
    });
    //this.myPort = new SerialPort(this.activePortName, 9600);
    //console.log(this.myPort);
    // this.myPort.open();
    // this.myPort.write("A");
    // this.myPort.on("data", () => {
    //   console.log("data");
    // });
    // this.$store.myPort.on("data", readSerialData);
  },
  components: {
    TempSlider
  }
};
</script>
  