<template>
  <div>
    <simple-graph
        :chartValues="sortedGrades"
        valueName="Оценка"
        xKey="name"
        yKey="grade"
    >
      <template v-slot:title>Результаты прохождения курса</template>
    </simple-graph>
  </div>
</template>

<script>
import SimpleGraph from "@/components/analyze/SimpleGraph";
  export default {
    name:"GradesAnalyze",
    components:{
      SimpleGraph
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
