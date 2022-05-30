import api from '@/store/api'

import Grade from '../../model/Grade'
import Course from '../../model/Course'

export default {
    namespaced: true,

    state: {
        courses: new Map(),
        grades: [],
        newGradeDialog: false
    },
    
    mutations: {
        setCourses(state, courses) {
            if(courses){
                state.courses = new Map();
                courses.forEach(course => {
                    state.courses.set(
                        course.code,
                        new Course(
                            course.code,
                            course.name,
                            course.dateStart,
                            course.dateEnd
                        )
                    );
                });
            }
        },
        setGrades(state, grades) {
            if(grades)
                state.grades = grades.map(grade => {
                    return new Grade(
                        grade.code,
                        grade.courseCode,
                        grade.studentCode,
                        grade.grade,
                        grade.gradeDate,
                        grade.isDelete
                    );
                });
        },

        postGrade(state, grade) {
            if(grade)
                state.grades.push(
                    new Grade(
                        grade.code,
                        grade.courseCode,
                        grade.studentCode,
                        grade.grade,
                        grade.gradeDate,
                        grade.isDelete
                    )
                );
        },
        deleteGrade(state, grade) {
            const index = state.grades.indexOf(grade);
            
            grade.isDelete = 1;
            state.grades.splice(index, 1, grade);
        }
    },
    
    actions: {
        async getCourses(context) {
            context.commit('setCourses', await api.course());
        },
        cancelGetCourses(){
            api.cancelCourse();
        },

        async getGrades(context) {
            context.commit('setGrades', await api.grade());
        },
        cancelGetGrades(){
            api.cancelGrade();
        },

        async postGrade(context, grade) {
            context.commit('postGrade', await api.postGrade(grade));
        },
        cancelPostGrade(){
            api.cancelPostGrade();
        },

        async putGrade(context, grade) {
            return await api.putGrade(grade.code, grade);
        },
        cancelPutGrade(){
          api.cancelPutGrade();
        },

        async deleteGrade(context, grade) {
            if(!(await api.deleteGrade(grade.code)).resultCode) {
                context.commit('deleteGrade', grade);
            }
        },
        cancelDeleteGrade(){
          api.cancelDeleteGrade();
        },

        async initData(context) {
            context.commit('setGrades', await api.initData());
        },
        cancelInitData(){
            api.cancelInitData();
        }
    }
}