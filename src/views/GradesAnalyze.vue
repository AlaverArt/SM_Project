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
//Перешёл с vue-chartjs-3 на vue-chartjs-4
//В 4 версии данные и настройки графика по умолчанию реактивны. Необходимость в watcher отпала(но скорее всего у них там свой)
//Зашил все настройки в simple-graph т.к. разнообразия столбчатых диаграмм пока не планирую
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
