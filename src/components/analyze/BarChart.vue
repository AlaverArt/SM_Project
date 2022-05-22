<template>
  <div>
    <v-sheet
        class="elevation-3 pa-3"
    >
      <h1><slot name="title"></slot></h1>
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
          backgroundColor:'#1976d2'
        }]
      }
    },
    linesColor(){
      return this.$vuetify.theme.dark ? '#fff' : '#000';
    },
    options(){
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            labels:{
              color:this.linesColor
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
              color:this.linesColor
            }
          },
          y: {
            grid:{
              color:this.linesColor
            },
            ticks:{
              color:this.linesColor
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