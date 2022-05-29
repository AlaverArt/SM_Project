<template>
  <div>
    <bar-chart
        :chartValues="sortedGrades"
        valueName="Оценка"
        xKey="name"
        yKey="grade"
    >
      <template v-slot:top><h1>Результаты прохождения курса</h1></template>
    </bar-chart>
  </div>
</template>

<script>
import BarChart from "@/components/analyze/BarChart";
  export default {
    name:"GradesAnalyze",
    components:{
      BarChart
    },
    computed: {
      actualGrades() {
        return this.$store.state.grade.grades.filter(grade => !grade.isDelete);
      },
      sortedGrades(){
        let grades = this.actualGrades;
        grades.sort(function descend(a,b){ return b.grade - a.grade });//убывание

        grades = grades.map((grade) =>
            ({
              name: grade.studentName.split(" ")[0],
              grade: grade.grade
            })
        );

        return grades;
      },
    },
  }
</script>
