import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const profile =ref({})

  return { profile }
},{persist:true})
