import store from '@/store'
import Formatter from "@/utils/Formatter"

export default class Grade {
    code
    courseCode
    studentCode
    grade
    gradeDate
    isDelete

    constructor(code, courseCode, studentCode, grade, gradeDate, isDelete) {
        this.code = code;
        this.courseCode = courseCode;
        this.studentCode = studentCode;
        this.grade = grade;
        this.gradeDate = gradeDate;
        this.isDelete = isDelete;
    }
    
    get courseName() {
        if(this.courseCode === undefined) return '';
        const course = store.state.grade.courses.get(this.courseCode);
        if(course === undefined) return '';
        return course.name;
    }

    get studentName() {
        if(this.studentCode === undefined) return '';
        const student = store.state.student.students.get(this.studentCode);
        if(student === undefined) return '';
        return student.fullName;
    }

    get formatGradeDate() {
        return Formatter.formatDate(this.gradeDate);
    }
}