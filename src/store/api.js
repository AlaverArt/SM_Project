import ReqExec from '@/services/RequestExecutor'
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api/"; //подставьте свои значения в сегменты пути

const endpoints = {
    init: "init_data",
    course: "course",
    student: "student",
    grade: "grade"
};

export default {    
    course: () => ReqExec.get(endpoints.course),

    student: async () => {
        try {
            return await ReqExec.get(endpoints.student);
        }catch (err){
            console.error("Ошибка загрузки студентов");
        }
    },

    grade: async () => {
        try {
            return await ReqExec.get(endpoints.grade);
        }catch (err){
            console.error("Ошибка загрузки грэйдов");
        }
    },
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

    cancelReq: () => ReqExec.cancelReq(),

    //аутентификация, не изменять
    auth: {
        getSession: () => ReqExec.execute("api/auth/getSession", true),
        getUser: () => ReqExec.execute("api/auth/getUser", true)
    }
}