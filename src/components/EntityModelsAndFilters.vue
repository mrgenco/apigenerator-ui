<template>
  <ul>
    <li v-for="entity of entities" :key="entity.entityName">{{entity.entityName}}</li>
  </ul>
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
