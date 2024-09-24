import { defineStore } from 'pinia'

export const useTourStore = defineStore('tour', {
  state: () => ({
    getTours: [
      {
        id: 0,
        title: 'Torneo 0',
        type: 'Todos vs todos',
        participants: 20,
        actual_state: 'Comenzado'
      },
      {
        id: 1,
        title: 'Torneo 1',
        type: 'Grupos y cruces',
        participants: 16,
        actual_state: 'Comenzado'
      },
      {
        id: 2,
        title: 'Torneo 2',
        type: '1 vs todos',
        participants: 19,
        actual_state: 'Finalizado'
      },
      {
        id: 3,
        title: 'Torneo 3',
        type: 'Todos vs todos',
        participants: 20,
        actual_state: 'Pendiente'
      },
      {
        id: 4,
        title: 'Torneo 4',
        type: 'Grupos y cruces',
        participants: 20,
        actual_state: 'Finalizado'
      },
    ]
  }),
  getters: {
    tours(state) {
      return state.getTours
    }
  }
})
