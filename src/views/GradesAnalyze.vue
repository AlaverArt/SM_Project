<template>
  <div>
    <h1>Результаты прохождения курса</h1>
    <simple-graph :chartData="chartData" :options="graphOptions"></simple-graph>
  </div>
</template>

<script>
import SimpleGraph from "@/components/analyze/SimpleGraph";
  export default {
    name:"GradesAnalyze",
    components:{
      SimpleGraph
    },
    data(){
      return{

      }
    },
    computed: {
      actualGrades() {
        return this.$store.state.grade.grades.filter(grade => !grade.isDelete);
      },
      chartData(){
        const grades = this.actualGrades;
        grades.sort((a,b) => (a.grade < b.grade) ? 1 : ((b.grade < a.grade) ? -1 : 0));//descent

        return {
          labels:grades.map((grade) => grade.studentName.split(" ")[0]),
          datasets: [{
            label:"Оценка",
            backgroundColor:'#1976d2',
            data: grades.map((grade) => grade.grade)
          }]
        }
      },
      fontColor(){
        return this.$vuetify.theme.dark ? '#fff' : '#000';
      },
      graphOptions() {

        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontColor: this.fontColor,
            }
          },
          scales: {
            yAxes: [{
              gridLines: {
                color: this.fontColor,
              },
              ticks: {
                fontColor: this.fontColor,
              }
            }],
            xAxes: [{
              gridLines: {
                color: this.fontColor,
              },
              ticks: {
                fontColor: this.fontColor,
              }
            }],
          }
        }
      }
    },
  }
</script>
