<template>
  <div>
    <v-sheet
        class="elevation-3 pa-3"
    >
      <slot name="top"></slot>
      <Bar
          :chart-options="options"
          :chart-data="chartData"
      ></Bar>
    </v-sheet>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name:'BarChart',
  components:{Bar},
  props: {
    chartValues:{
      type: Array,
      default: null
    },
    valueName:{
      type:String
    },
    xKey:{
      type:String
    },
    yKey:{
      type:String
    }
  },
  computed:{
    chartData(){
      return{
        datasets:[{
          label:this.valueName,
          data: this.chartValues,
          backgroundColor: this.barColor
        }]
      }
    },
    linesColor(){
      return this.$vuetify.theme.dark ? '#9f9f9f' : '#777777';
    },
    fontColor(){
      return this.$vuetify.theme.dark ? '#ffffff' : '#000000';
    },
    barColor(){
      return this.$vuetify.theme.dark ? '#4382c2' : '#4b88d7';
    },
    options(){
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            labels:{
              color:this.fontColor
            }
          },
        },
        parsing:{
          xAxisKey:this.xKey,
          yAxisKey:this.yKey
        },
        scales: {
          x: {
            grid:{
              color:this.linesColor
            },
            ticks:{
              color:this.fontColor
            }
          },
          y: {
            grid:{
              color:this.linesColor
            },
            ticks:{
              color:this.fontColor
            }
          },
        }
      }
    }
  }
}
</script>

<style scoped>

</style>