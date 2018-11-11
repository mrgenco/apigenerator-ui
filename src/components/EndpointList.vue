<template lang="html">

  <v-card  transition="scale-transition" dark>
         <v-toolbar card color="red lighten-1" dark>
            <v-toolbar-title> Generated EndPoints </v-toolbar-title>
         </v-toolbar>
      

         <v-card-text>    
            <v-list v-if="urls">
              <template v-for="(item, index) in urls._links">
                <v-list-tile
                  :key="item.title"
                  ripple
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.href }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-btn round color="success" @click="redirectServiceUrl(item.href)"> 
                    Discover
                    <v-icon dark>arrow_forward</v-icon>
                  </v-btn>
              </v-list-tile>
              
              
              </template>

            </v-list>
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
               <v-btn  to="/generator" color="red lighten-1">
               <v-icon dark left>arrow_back</v-icon>Back
            </v-btn>  
         </v-card-text>
        
      </v-card>

</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      urls : [],
      errors : [],
      loading : false
    }
  },
  created() {
     this.loading = true;
     axios.get("http://localhost:8081/")
           .then(response => {
             this.urls = response.data;
             this.loading = true;
           })
           .catch(e => {
             this.errors.push(e);
             this.loading = false;
           });
  },
  methods: {
    redirectServiceUrl(url){
      let serviceUrl = url.substr(0, url.indexOf('{')); 
    //  window.location.replace(serviceUrl);
      window.open(serviceUrl, '_blank').focus();
    }
  }

}
</script>

<style scoped>

#header{

  background-color: black;
  color: black;

}
h5 {
  color: black;
  font-size: 25px;
}

h2{
 
  padding: 5px;
  font-size: 20px;
    text-align: center;
    margin: auto;
}

h3{
  padding: 5px;
  font-size: 15px;
  background-color:whitesmoke;
  border-radius: 3px;
  color: #000;
  text-align: center;
  margin: auto;
}

.mrg-list{
  width: 75%;
  margin: 0 auto;
  padding-top: 25px;
}


.loader {
  margin: auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #00d1b2;
  border-bottom: 16px solid #ff3860;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
