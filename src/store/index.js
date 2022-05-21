import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import student from '@/store/modules/student'
import grade from '@/store/modules/grade'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: true,
        isLoading: false
    },

    mutations: {
        toggleDrawer(state) {state.drawer = !state.drawer},
        setDrawer(state, value){state.drawer = value},
        setIsLoading(state, flag) {state.isLoading = flag}
    },

    actions: {
    },

    modules: {
        auth,
        student,
        grade
    }
})
