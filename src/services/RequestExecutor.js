/**
 * Реализация HTTP-клиента (вместо axios).
 * методы: get, post, put, delete
 * @this baseUrl - базовый url - api/(rest rpc cursor)/schema/package/
 * @this loadingMask - флаг, вкл/выкл маску
 */
import store from '@/store'

const INIT = {
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
};

class RequestExecutor {
    constructor() {
        this.baseUrl = "";
        this.loadingMask = true; //отключать, если не требуется глобальная маска
        this.controllers = new Map();
        console.info("Request Executor Init!");
    }

    /**
     * GET
     *
     * @param {string} url Endpoint.
     * @param {number} controllerId id контроллера запроса
     * @param {number} code Код, если есть.
     * @return {Promise}
     */
    get(url, controllerId, code) {return this.execute((code ? url + "/" + code : url), controllerId, false, {...INIT, method: "GET"});}

    /**
     * POST
     *
     * @param {string} url Endpoint.
     * @param {number} controllerId id контроллера запроса
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    post(url,  controllerId, data) {return this.execute(url, controllerId, false, {...INIT, method: "POST"}, data);}

    /**
     * PUT
     *
     * @param {string} url Endpoint.
     * @param {number} controllerId id контроллера запроса
     * @param {number} code Код.
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    put(url, controllerId,code, data) {return this.execute(url + "/" + code, controllerId, false, {...INIT, method: "PUT"}, data);}

    /**
     * DELETE
     *
     * @param {string} url Endpoint.
     * @param {number} controllerId id контроллера запроса
     * @param {number} code Код.
     * @return {Promise}
     */
    delete(url, controllerId, code, ) {return this.execute(url + "/" + code, controllerId, false, {...INIT, method: "DELETE"});}

    /**
     * EXECUTE
     *
     * @param {string} url Endpoint.
     * @param {number} controllerId id контроллера запроса
     * @param {boolean} exact не подставлять baseUrl
     * @param {object} init параметры запроса
     * @param {object} data тело запроса
     * @return {Promise}
     */
    async execute(url, controllerId, exact, init, data) {
        if(this.loadingMask) store.commit("setIsLoading", {id: controllerId, value: true});

        const location = exact ? url : this.baseUrl + url;
        try {
            if(data) init = {...init, body: JSON.stringify(data)};

            const controller = this.controllers.get(controllerId);
            if(controller !== undefined)
                init.signal = controller.signal;

            const response = await fetch(location, init);
            //if(!response.ok) throw new Error("Network error!");

            return await response.json();

        } catch(error) {
            //console.error(error);// убрал т.к. api.js сам выведет сообщение
            throw new Error(error);

        } finally {
            this.controllers.set(controllerId, null);
            store.commit("setIsLoading", {id: controllerId, value: false});
        }
    }

    /**
     * MAKE CONTROLLER
     *
     * Если id не задан создаёт контроллер
     * Если id задан пересоздаёт контроллер
     *
     * @param {number} controllerId id контроллера если есть
     * @return {number}
     */
    makeController(controllerId= this.controllers.size){
        this.controllers.set(controllerId, new AbortController());
        return controllerId;
    }


    /**
     * CONTROLLER EXISTS
     *
     * Проверяет создан ли контроллер по id
     *
     * @param {number} controllerId id контроллера
     * @return {boolean}
     */
    controllerExists(controllerId){
        let result = false;
        const controller = this.controllers.get(controllerId);
        if(controller !== undefined)
            result = true;
        return result;
    }

    /**
     * CANCEL
     *
     * Если контроллер существует, отменяет запрос и заменяет контроллер на null
     *
     * @param controllerId {number} id контроллера
     */
    cancel(controllerId){
        const controller = this.controllers.get(controllerId);
        if(controller !== undefined && controller !== null) controller.abort();
        this.controllers.set(controllerId, null);
    }
}

export default new RequestExecutor();