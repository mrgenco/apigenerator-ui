<template>
    <div>
    <v-card>
         <v-toolbar card color="red lighten-1">
            <v-toolbar-title> Rest API Generation Form </v-toolbar-title>
         </v-toolbar>
         <!-- FORM INPUTS -->
         <v-card-text>           
            <v-form ref="form" v-model="valid" lazy-validation>
               <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="projectname"
                  label="Project Name"
                  hint="Ex : MyEccommerceApis"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
              <v-text-field
                v-model="datasourcename"
                label="Data Source Name"
                hint="Your Database Schema Name"
                required
              ></v-text-field>   
              </v-flex>

              <v-flex xs12>
              <v-text-field
                v-model="datasourceurl"
                label="Data Source Url"
                required
                hint="Ex : jdbc:mysql://localhost:3306/springbootblog?useSSL=false"
              ></v-text-field>
              </v-flex>
              <v-text-field
                v-model="username"
                label="User Name"
                hint="Database Username"
                required
              ></v-text-field>
              <v-text-field
                 v-model="password"
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
                <v-btn 
                  block
                  :loading="loadingScan"
                  @click="scan" 
                  color="success"> 
                  Scan DataSource 
                </v-btn>

                <v-btn block :loading="loadingEntities" @click="getEntities" color="success">
                  Show Entities               
                </v-btn>

                <v-btn outline  @click="clear" color="error"> <v-icon color="pink">clear</v-icon> CLEAR</v-btn>

          </v-card-actions>
          <!-- FORM ACTIONS ENDS -->
      </v-card>
      <v-alert
        v-if="errors && errors.length"
        :value="true"
        type="error"
        outline
        transition="scale-transition"
      >
        <ul>
          <li  v-for="error of errors" :key="error.index">
            {{error.message}}
          </li>
        </ul>        
      </v-alert>

       <!-- ENTITIES DIALOG STARTS -->
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-toolbar card color="red lighten-1">
          <v-toolbar-title> Entities </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <h3 v-for="item in data" :key="item.entityName">
            {{item.entityName}}
             <v-divider></v-divider>
          </h3>           
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" :loading="loadingRestEndpoints" block @click="generateAPIs()">Generate Rest APIs</v-btn>
          <v-btn color="info" to="/endpoints">Existing Rest APIs</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <!-- ENTITIES DIALOG ENDS -->
        



    </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    data: [],
    errors: [],
    response: '',

    message: "",

    // FORM FIELDS
    datasourceurl: "jdbc:mysql://localhost:3306/springbootblog?useSSL=false",
    datasourcename: "",
    projectname: "msproject",
    username: "mrgenco",
    password: "",
    showPassword: false,
    // LOADING STATES
    loadingScan: false,
    loadingEntities: false,
    loadingRestEndpoints: false,

    dialogm1: "",
    dialog: false
  }),

  methods: {
    scan() {
      this.data = [];
      this.errors = [];
      this.loadingScan = true;
      axios
        .post("http://localhost:8585/ds/", {
          url: this.datasourceurl,
          name: this.datasourcename,
          projectName: this.projectname,
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.response = response;
          this.getEntities();
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
          this.dialog = true;
        })
        .catch(e => {
          this.errors.push(e);
          this.loadingScan = false;
          this.loadingEntities = false;
        });
    },
    generateAPIs() {
      this.loadingRestEndpoints = true;
      axios
        .get("http://localhost:8585/ds/generateAPIs")
        .then(response => {
          this.dialog = false;
          this.loadingRestEndpoints = false;
          this.$router.push("endpoints");
          this.response = response;
        })
        .catch(e => {
          this.errors.push(e);
          this.loadingRestEndpoints = false;
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
