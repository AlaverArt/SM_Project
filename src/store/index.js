import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import student from '@/store/modules/student'
import grade from '@/store/modules/grade'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: true,
        isLoading: new Map(),
        isLoadingChangeTracker: 1
    },

    getters:{
        isLoading(state) {
            //Обманываю Vue чтобы он увидел изменеия в Map.
            //Лучше так, чем пересоздавать Map при каждом его изменении
            let keys = state.isLoadingChangeTracker;

            keys = Array.from(state.isLoading.keys());
            return keys.some(key => state.isLoading.get(key) === true);
        }
    },

    mutations: {
        toggleDrawer(state) {state.drawer = !state.drawer},
        setDrawer(state, value){state.drawer = value},
        setIsLoading(state, prop) {
            const {id, value} = prop;
            state.isLoading.set(id, value);
            state.isLoadingChangeTracker *= -1;
        }
    },

    actions: {
        async cancelLoadingData(context){
            await Promise.all([
                context.dispatch('student/cancelGetStudents'),
                context.dispatch('grade/cancelGetCourses'),
                context.dispatch('grade/cancelGetGrades'),
            ])
        }
    },

    modules: {
        auth,
        student,
        grade
    }
})
