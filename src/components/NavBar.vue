<template>
  <div class="nav">
    <router-link to="/images" v-if="logged_in">Images</router-link>
    <router-link to="/register" v-if="!logged_in">Signup</router-link>
    <router-link to="/login" v-if="!logged_in">Login</router-link>
    <router-link v-on:click="logout()" to="/" v-if="logged_in">Logout</router-link>
  </div>
</template>

<script>
import axios from "axios";
import { mapWritableState } from 'pinia'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  name: 'NavBar',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapWritableState(useUserStore, ['logged_in', 'jwt', 'user_name', 'user_id'])
  },
  methods: {
    logout() {
      delete axios.defaults.headers.common["Authorization"];
      this.logged_in = false
      this.jwt = null
      this.user_id = null
      this.user_name = null

      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      localStorage.removeItem("logged_in");
      localStorage.removeItem("user_name");
    }
  },
};
</script>

<style>

.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>