import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    role: 'Manager' as 'Operator' | 'Manager',
  }),

  actions: {
    setRole(newRole: 'Operator' | 'Manager') {
      this.role = newRole
    },
  },
})
