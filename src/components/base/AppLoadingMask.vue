<template>
    <v-dialog
        v-model="isLoading"
        persistent
        overlay-opacity="0.15"
        width="20%"
    >
        <v-progress-linear
            indeterminate
            color="light-blue"
        ></v-progress-linear>
        <v-btn @click="cancelLoadingData">cancel</v-btn>
    </v-dialog>
</template>

<script>
export default {
    name: "AppLoadingMask",

    computed: {
        isLoading: {
            get() {return this.$store.getters.isLoading},
            set() {}
        }
    },
    methods:{
      cancelLoadingData(){
        this.$store.dispatch('cancelLoadingData');
      }
    }
}
</script>