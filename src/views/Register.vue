<template>
  <div class="register">
    <p class="alert-text"> {{ alert }} </p>
    <form @submit.prevent="registerUser">
      <div class="input-div">
        <span>Username</span>
        <input type="text" v-model="username" />
      </div>
      <div class="input-div">
        <span>Password</span>
        <input type="password" v-model="password" />
      </div>
      <div class="input-div">
        <span>Confirm Password</span>
        <input type="password" v-model="password_confirmation" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegisterView',
  components: {},
  data() {
      return {
        username: "",
        password: "",
        password_confirmation: "",
        alert: "",
      };
  },
  methods: {
    registerUser() {
        this.alert = ""
        var params = {
          user: {
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation
          }
        }
        axios.post('http://localhost:3000/users', params).then((response) => {
          console.log(response)
          this.$router.push("/login");
        }).catch((error) => {
          if (error.response) {
            this.alert = error.response.data.errors
          } else {
            console.log('Error', error.message)
          }
        });
      }
    }
  };
</script>
