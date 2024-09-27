import { defineStore } from "pinia";
import type { Participant } from "../helpers/participants";

export const useTourStore = defineStore("tour", {
  state: () => ({
    getTours: [
      {
        id: 0,
        title: "Torneo 0",
        type: "Todos vs todos",
        participants: [{
          name: 'kaka',
          type: 'Minimax'
        }, {
          name: 'mess',
          type: 'Minimax'
        }, {
          name: 'cr',
          type: 'Random'
        }, {
          name: 'lamin',
          type: 'Bactrack'
        },
      ],
        actual_state: "Comenzado",
      },
      {
        id: 1,
        title: "Torneo 1",
        type: "Grupos y cruces",
        participants: [{
          name: 'kaka',
          type: 'Minimax'
        }, {
          name: 'mess',
          type: 'Minimax'
        }, {
          name: 'cr',
          type: 'Random'
        }, {
          name: 'lamin',
          type: 'Bactrack'
        },
      ],
        actual_state: "Comenzado",
      },
      {
        id: 2,
        title: "Torneo 2",
        type: "1 vs todos",
        participants: [{
          name: 'kaka',
          type: 'Minimax'
        }, {
          name: 'mess',
          type: 'Minimax'
        }, {
          name: 'cr',
          type: 'Random'
        }, {
          name: 'lamin',
          type: 'Bactrack'
        },
      ],
        actual_state: "Finalizado",
      },
      {
        id: 3,
        title: "Torneo 3",
        type: "Todos vs todos",
        participants: [{
          name: 'kaka',
          type: 'Minimax'
        }, {
          name: 'mess',
          type: 'Minimax'
        }, {
          name: 'cr',
          type: 'Random'
        }, {
          name: 'lamin',
          type: 'Bactrack'
        },
      ],
        actual_state: "Pendiente",
      },
      {
        id: 4,
        title: "Torneo 4",
        type: "Grupos y cruces",
        participants: [{
          name: 'kaka',
          type: 'Minimax'
        }, {
          name: 'mess',
          type: 'Minimax'
        }, {
          name: 'cr',
          type: 'Random'
        }, {
          name: 'lamin',
          type: 'Bactrack'
        },
      ],
        actual_state: "Finalizado",
      },
    ],
  }),
  getters: {
    tours(state) {
      return state.getTours;
    },
  },
  actions: {
    async setTour(new_title: any, new_type: any, new_participants: any) {
      const tour_exist = await this.getTours.some(tour => tour.title == new_title.value)
      if(tour_exist) {
        
        return false
      }
      else {
        const new_id = this.getTours.length
        let new_tour = {
          id: new_id,
          title: new_title,
          type: new_type,
          participants: new_participants,
          actual_state: 'Pendiente'
        }
        this.getTours.push(new_tour);
        return true
      }
    },
    async deleteTour(id: number) {
      const index = await this.getTours.findIndex(tour => tour.id === id)

      if(index != -1) {
        await this.getTours.splice(index, 1);
        return true;
      }
      else return false;
    }
  },
});
