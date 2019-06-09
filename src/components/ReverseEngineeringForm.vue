<template>
  <div>
    <v-alert
      v-if="errors && errors.length"
      :value="true"
      type="error"
      outline
      transition="scale-transition"
    >
      <ul>
        <li v-for="error of errors" :key="error.index">{{error.message}}</li>
      </ul>
    </v-alert>
    <v-card>
      <v-toolbar card color="red lighten-1">
        <v-toolbar-title>Rest API Generation Form</v-toolbar-title>
      </v-toolbar>
      <!-- FORM INPUTS -->
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="reverseEngineeringRequest.projectName"
                label="Project Name"
                hint="Ex : MyEccommerceApis"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="reverseEngineeringRequest.url"
                label="Data Source Url"
                required
                hint="Ex : jdbc:mysql://localhost:3306/springbootblog?useSSL=false"
              ></v-text-field>
            </v-flex>
            <v-text-field
              v-model="reverseEngineeringRequest.username"
              label="User Name"
              hint="Database Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="reverseEngineeringRequest.password"
              hint="Database Password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              label="Password"
            ></v-text-field>
          </v-layout>
        </v-form>
      </v-card-text>

      <!-- FORM ACTIONS -->
      <v-card-actions>
        <v-btn block :loading="loadingScan" @click="scan" color="success">Scan DataSource</v-btn>

        <v-btn block :loading="loadingEntities" @click="getEntities" color="success">Show Entities</v-btn>

        <v-btn outline @click="clear" color="error">
          <v-icon color="pink">clear</v-icon>CLEAR
        </v-btn>
      </v-card-actions>
      <!-- FORM ACTIONS ENDS -->
    </v-card>

    <EntityModelsAndFilters v-if="data.length > 0" :entities="data"></EntityModelsAndFilters>
  </div>
</template>

<script>
import axios from "axios";
import EntityModelsAndFilters from "./EntityModelsAndFilters";
export default {
  components: {
    EntityModelsAndFilters
  },
  data: () => ({
    valid: false,
    data: [],
    errors: [],

    message: "",

    // FORM FIELDS
    reverseEngineeringRequest: {
      url:
        "jdbc:mysql://localhost:3306/myschema?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Turkey",
      projectName: "",
      username: "",
      password: ""
    },

    showPassword: false,
    // LOADING STATES
    loadingScan: false,
    loadingEntities: false,
    loadingRestEndpoints: false
  }),

  methods: {
    scan() {
      this.data = [];
      this.errors = [];
      this.loadingScan = true;
      axios
        .post("http://localhost:8585/ds/scan", this.reverseEngineeringRequest)
        .then(response => {
          this.data = response.data;
          this.loadingScan = false;
        })
        .catch(e => {
          this.errors.push(e);
          this.loadingScan = false;
        });
    },
    getEntities() {
      this.data = [];
      this.errors = [];
      this.loadingEntities = true;
      axios
        .get("http://localhost:8585/ds/findNewEntities")
        .then(response => {
          this.data = response.data;
          this.loadingScan = false;
          this.loadingEntities = false;
        })
        .catch(e => {
          this.errors.push(e);
          this.loadingScan = false;
          this.loadingEntities = false;
        });
    },

    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
