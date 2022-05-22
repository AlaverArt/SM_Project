import ReqExec from '@/services/RequestExecutor'
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api/"; //подставьте свои значения в сегменты пути

const endpoints = {
    init: "init_data",
    course: "course",
    student: "student",
    grade: "grade"
};

export default {    
    course: async () => {
        try{
            return await ReqExec.get(endpoints.course);
        } catch (err){
            console.error("Ошибка загрузки курсов");
        }
    },
    cancelCourse: () => ReqExec.cancel(endpoints.course),

    student: async () => {
        try {
            return await ReqExec.get(endpoints.student);
        }catch (err){
            console.error("Ошибка загрузки студентов");
        }
    },
    cancelStudent: () => ReqExec.cancel(endpoints.student),

    grade: async () => {
        try {
            return await ReqExec.get(endpoints.grade);
        }catch (err){
            console.error("Ошибка загрузки грэйдов");
        }
    },
    cancelGrade: () => ReqExec.cancel(endpoints.grade),

    postGrade: async grade => {
        try {
            return await ReqExec.post(endpoints.grade, grade);
        }catch (err){
            console.error("Ошибка создания нового грейда");
        }
    },

    putGrade: async (code, grade) => {
        try {
            return await ReqExec.put(endpoints.grade, code, grade);
        }catch (err){
            console.error("Ошибка обновления грейда");
        }
    },

    deleteGrade: async code => {
        try {
            return await ReqExec.delete(endpoints.grade, code);
        }catch(err){
            console.error("Ошибка удаления грейда");
        }
    },

    initData: async () => {
        try {
            return await ReqExec.get(endpoints.init);
        }catch (err){
            console.error("Ошибка инициализации данных");
        }
    },
    cancelInitData: () => ReqExec.cancel(endpoints.init),

    //аутентификация, не изменять
    auth: {
        getSession: () => ReqExec.execute("api/auth/getSession", true),
        getUser: () => ReqExec.execute("api/auth/getUser", true)
    }
}