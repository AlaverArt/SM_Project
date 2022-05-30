import ReqExec from '@/services/RequestExecutor'
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api/"; //подставьте свои значения в сегменты пути

const endpoints = {
    init: "init_data",
    course: "course",
    student: "student",
    grade: "grade"
};

/**
 * Контроллеры всех запросов
 */
const reqControllers = {
    student: null,
    course: null,
    grade: null,
    postGrade: null,
    putGrade: null,
    deleteGrade: null,
    initData: null
};

/**
 * PREPARE CONTROLLER
 *
 * Отменяет запрос если уже существовал
 * Создаёт или пересоздаёт контроллер
 *
 * @param {string} target цель запроса
 * @return {boolean}
 */
function prepareController(target){
    if(!Object.prototype.hasOwnProperty.call(reqControllers, target))
        return false;
    if(ReqExec.controllerExists(reqControllers[target])) {
        ReqExec.cancel(reqControllers[target]);
        ReqExec.makeController(reqControllers[target]);
    }
    else
        reqControllers[target] = ReqExec.makeController();
    return true;
}

export default {
    course: async () => {
        try{
            const controllerOk = prepareController('course');
            if(!controllerOk) return null;

            return await ReqExec.get(endpoints.course, reqControllers.course);

        } catch (err){
            console.error("Ошибка загрузки курсов");
            return null;
        }
    },
    cancelCourse: () => ReqExec.cancel(reqControllers.course),

    student: async () => {
        try {
            const controllerOk = prepareController('student');
            if(!controllerOk) return null;

            return await ReqExec.get(endpoints.student, reqControllers.student);
        }catch (err){
            console.error("Ошибка загрузки студентов");
            return null;
        }
    },
    cancelStudent: () => ReqExec.cancel(reqControllers.student),

    grade: async () => {
        try {
            const controllerOk = prepareController('grade');
            if(!controllerOk) return null;

            return await ReqExec.get(endpoints.grade, reqControllers.grade);
        }catch (err){
            console.error("Ошибка загрузки грэйдов");
            return null;
        }
    },
    cancelGrade: () => ReqExec.cancel(reqControllers.grade),

    postGrade: async grade => {
        try {
            const controllerOk = prepareController('postGrade');
            if(!controllerOk) return null;

            return await ReqExec.post(endpoints.grade, reqControllers.postGrade, grade);
        }catch (err){
            console.error("Ошибка создания нового грейда");
        }
    },
    cancelPostGrade: () => ReqExec.cancel(reqControllers.postGrade),

    putGrade: async (code, grade) => {
        try {
            const controllerOk = prepareController('putGrade');
            if(!controllerOk) return null;

            return await ReqExec.put(endpoints.grade, reqControllers.putGrade, code, grade);
        }catch (err){
            console.error("Ошибка обновления грейда");
        }
    },
    cancelPutGrade: () => ReqExec.cancel(reqControllers.putGrade),

    deleteGrade: async code => {
        try {
            const controllerOk = prepareController('deleteGrade');
            if(!controllerOk) return null;

            return await ReqExec.delete(endpoints.grade, reqControllers.deleteGrade, code);
        }catch(err){
            console.error("Ошибка удаления грейда");
        }
    },
    cancelDeleteGrade: () => ReqExec.cancel(reqControllers.deleteGrade),

    initData: async () => {
        try {
            const controllerOk = prepareController('initData');
            if(!controllerOk) return null;

            return await ReqExec.get(endpoints.init, reqControllers.initData);
        }catch (err){
            console.error("Ошибка инициализации данных");
        }
    },
    cancelInitData: () => ReqExec.cancel(reqControllers.initData),

    //аутентификация, не изменять
    auth: {
        getSession: () => ReqExec.execute("api/auth/getSession", true),
        getUser: () => ReqExec.execute("api/auth/getUser", true)
    }
}