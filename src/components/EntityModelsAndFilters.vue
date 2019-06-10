<template>
  <v-flex xs12>
    <v-list>
      <v-list-group v-for="entity in entities" :key="entity.entityName">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ entity.entityName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(key,value) in entity.fields" :key="value">
          <v-list-tile-content>
            <v-list-tile-title>{{ value }} : {{ key }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-flex>
</template>

<script>
import axios from "axios";
export default {
  props: ["entities"],

  dat() {
    return {
      entities: []
    };
  },

  created() {
    this.entities = entities;
  },

  methods: {
    generateRestServices() {}
  }
};
</script>

<style>
</style>
