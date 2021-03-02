<template>
  <button @click="show">Update</button>
  <canvas
    v-if="renderComponent"
    ref="myChart"
    width="400"
    height="400"
  ></canvas>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "ChartVue",
  data() {
    return {
      renderComponent: true,
    };
  },

  watch:{
      numbers(){
          console.log(this.numbers);
          this.forceRerender();
          this.show();
      }
  },
  props: {
    numbers: Array,
    type: String,
  },
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    show() {
      var ctx = this.$refs.myChart;
      new Chart(ctx, {
        type: this.type,
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: this.numbers,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  },
  mounted() {
    this.show();
  },
};
</script>
<style scoped>
</style>