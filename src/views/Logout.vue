<template>
  <div class="logout"></div>
</template>

<script>
import axios from "axios";
import { mapWritableState } from 'pinia'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  name: 'LogoutView',
  computed: {
    ...mapWritableState(useUserStore, ['logged_in', 'jwt', 'user_name', 'user_id'])
  },
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    this.logged_in = false
    this.jwt = null
    this.user_id = null
    this.user_name = null
    this.$router.push("/");
  },
}
</script>