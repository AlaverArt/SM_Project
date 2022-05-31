<template>
    <v-data-table
        :headers="headers"
        :items="actualGrades"
        :items-per-page="15"
        item-key="code"
        class="elevation-3"
    >

        <template v-slot:top>
            <v-toolbar dense>
                <v-toolbar-title>Таблица грейдов</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="primary text-lg-button mx-2"
                       @click="$store.state.grade.newGradeDialog = true"
                       x-small
                       fab
                >
                +</v-btn>
                <v-btn v-if="!isLoading" class="primary text-lg-button"
                       @click="refreshData"
                       x-small
                       fab
                >
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
                <v-btn v-else class="primary text-lg-button"
                     @click="cancelLoadingData"
                     x-small
                     fab
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
            </v-toolbar>
        </template>

        <template v-slot:item.grade="editGrade">
            <v-edit-dialog
                :return-value.sync="editGrade.item.grade"
                @save="save(editGrade)"
                @open="open(editGrade.item.grade)"
            >
                {{ editGrade.item.grade }}

                <template v-slot:input>
                    <v-text-field
                        v-model="editGrade.item.grade"
                        :rules="[rules.grade]"
                        label="Грейд"
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>

        <template v-slot:item.actions="item">
            <v-icon @click="deleteItem(item.item)">mdi-delete</v-icon>
        </template>

        <template v-slot:no-data v-if="!isLoading">
            <v-btn small color="primary" @click="initData">
                Восстановить данные
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: "GrdGrid",

    data() {
        return {
            headers: [
                {text: "Код", value: "code"},
                {text: "Курс", value: "courseName"},
                {text: "ФИО", value: "studentName"},
                {text: "Грейд", value: "grade"},
                {text: "Дата", value: "formatGradeDate", align: "center"},
                {text: "Удалить", value: "actions", align: "center", sortable: false}
            ],

            rules: {
                grade: val => (val && !isNaN(val) && val >= 0 && val <= 25) || "число от 0 до 25"
            },

            currentGradeValue: null
        };
    },

    methods: {
        open(value) {
            this.currentGradeValue = value;
        },
        async save(edit) {
            let isError = 1;
            if (this.rules.grade(edit.item.grade) === true) {
                try {
                    edit.item.grade = Number(edit.item.grade);
                    isError = (await this.$store.dispatch("grade/putGrade", edit.item)).resultCode;

                } catch (error) {
                    console.error(error);
                }
            }
            
            setTimeout(() => (edit.item.grade = isError ? this.currentGradeValue : Number(edit.item.grade)));
        },

        deleteItem(grade) {
            this.$store.dispatch("grade/deleteGrade", grade);
        },

        initData() {
            this.$store.dispatch("grade/initData");
        },

        async refreshData(){
          //Думал одновременная отправка запросов будет быстрее последовательной,
          // но выходит наоборот. Оставил для демонстрации. Пока не понимаю почему.
          await Promise.all([
            this.$store.dispatch("grade/getCourses"),
            this.$store.dispatch("student/getStudents"),
            this.$store.dispatch("grade/getGrades")
          ])
        },
        cancelLoadingData() {
          this.$store.dispatch('cancelLoadingData');
        }
    },

    computed: {
        actualGrades() {
            return this.$store.state.grade.grades.filter(grade => !grade.isDelete);
        },
        isLoading(){
          return this.$store.getters.isLoading;
        }
    },
};
</script>
