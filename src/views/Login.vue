<template>
  <div class="login">
    <p class="alert-text">{{alert}}</p>
    <form @submit.prevent="loginWithPassword">
      <div class="input-div">
        <span>Username</span>
        <input type="text" v-model="username" />
      </div>
      <div class="input-div">
        <span>Password</span>
        <input type="password" v-model="password" />
      </div>
      <button class="auth-button" type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapWritableState } from 'pinia'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  name: 'LoginView',
  components: {},
  data() {
      return {
        username: "",
        password: "",
        alert: "",
      };
  },
  computed: {
    ...mapWritableState(useUserStore, ['logged_in', 'jwt', 'user_name', 'user_id'])
  },
  methods: {
      // Log in with the form's username and password
      loginWithPassword() {
        this.alert = ""
        var params = {
          username: this.username,
          password: this.password
        }
        axios.post('http://localhost:3000/sessions', params).then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          this.logged_in = true
          this.jwt = response.data.jwt
          this.user_id = response.data.user_id
          this.user_name = response.data.username

          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("logged_in", true);
          localStorage.setItem("user_name", response.data.username);
          this.$router.push("/images");
        }).catch((error) => {
          if (error.response) {
            this.alert = "invalid username or password"
          } else {
            console.log('Error', error.message)
          }
        });
      }}
  };
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 30%
}

.input-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

input[type=text], select {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  flex-basis: 72%;
}

input[type=password], select {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  flex-basis: 72%;
}

.alert-text {
  color: red;
}
</style>