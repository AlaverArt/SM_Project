<template>
    <v-navigation-drawer v-model="drawer" app>
        <app-logo></app-logo>
        <v-divider></v-divider>
        
        <app-user-info></app-user-info>
        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                :to="item.route"
            >
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import AppLogo from "@/components/base/AppLogo"
import AppUserInfo from "@/components/base/AppUserInfo"

export default {
    name: "AppDrawer",
    components: {AppLogo, AppUserInfo},

    data() {
        return {
            items: [
                {
                    title: "Грейды",
                    icon: "mdi-view-dashboard",
                    route: "/"
                },
                {
                    title: "Аналитика",
                    icon: "mdi-forum",
                    route: "/grades_analyze"
                }
            ],
        }
    },
    computed: {
        drawer: {
            get() {return this.$store.state.drawer},
            set(value) {this.$store.commit('setDrawer', value)}
        }
    },
}
</script>
