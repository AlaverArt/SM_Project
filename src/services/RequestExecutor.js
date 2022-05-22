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
    //TODO: Cancel request (+Alaverdyan Artem 15.05.2022)
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
     * @param {number} code Код, если есть.
     * @return {Promise}
     */
    get(url, code) {return this.execute((code ? url + "/" + code : url), false, {...INIT, method: "GET"});}

    /**
     * POST
     *
     * @param {string} url Endpoint.
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    post(url, data) {return this.execute(url, false, {...INIT, method: "POST"}, data);}

    /**
     * PUT
     *
     * @param {string} url Endpoint.
     * @param {number} code Код.
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    put(url, code, data) {return this.execute(url + "/" + code, false, {...INIT, method: "PUT"}, data);}

    /**
     * DELETE
     *
     * @param {string} url Endpoint.
     * @param {number} code Код.
     * @return {Promise}
     */
    delete(url, code) {return this.execute(url + "/" + code, false, {...INIT, method: "DELETE"});}

    /**
     * EXECUTE
     *
     * @param {string} url Endpoint.
     * @param {boolean} exact не подставлять baseUrl
     * @param {object} init параметры запроса
     * @param {object} data тело запроса
     * @return {Promise}
     */
    async execute(url, exact, init, data) {
        if(this.loadingMask) store.commit("setIsLoading", true);

        const location = exact ? url : this.baseUrl + url;
        try {
            if(data) init = {...init, body: JSON.stringify(data)};

            if(this.controllers.get(location))
                this.controllers.get(location).cancel();

            const controller = new AbortController();
            this.controllers.set(location, controller);
            init.signal = controller.signal;

            const response = await fetch(location, init);
            //if(!response.ok) throw new Error("Network error!");

            return await response.json();

        } catch(error) {
            //console.error(error);// убрал т.к. api.js сам выведет сообщение
            throw new Error(error);

        } finally {
            this.controllers.delete(location);
            store.commit("setIsLoading", false);
        }
    }

    /**
     * CANCEL REQUEST
     *
     * @param url {string} адрес запроса
     * @param exact {boolean} не подставлять baseUrl
     */
    cancel(url, exact = false){
        const location = exact ? url : this.baseUrl + url;
        const controller = this.controllers.get(location);
        if(controller !== undefined) controller.abort();
    }
}

export default new RequestExecutor();