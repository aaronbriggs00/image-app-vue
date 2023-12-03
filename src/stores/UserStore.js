import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    logged_in: localStorage.getItem("logged_in"), 
    user_id: localStorage.getItem("user_id"),
    jwt: localStorage.getItem("jwt"),
    user_name: localStorage.getItem("user_name") 
  }),
})