<template>
  <v-app dark>
    <v-toolbar color="red lighten-1" app>
      <v-toolbar-title class="headline text-uppercase">
        <span>API GENERATOR - BETA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="mt-1">
        <v-btn flat to="/about">ABOUT</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="mt-1">
        <v-btn flat to="/">HOME</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-xl>
        <v-layout row justify-center align-center fill-height>
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
