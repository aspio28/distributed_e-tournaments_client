import { defineStore } from "pinia";
import type { Participant } from "../helpers/participants";

export const useTourStore = defineStore("tour", {
  state: () => ({
    getTours: [
      {
        id: '0',
        title: "Glass",
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
        id: '1',
        title: "Las vegas",
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
        id: '2',
        title: "Rally",
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
        id: '3',
        title: "Breaker",
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
        id: '4',
        title: "M. D. Dragon",
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
    tour_by_id: (state) => {
      return(tourId: string) => state.getTours.find(tour => tour.id === tourId)
    }
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
          id: `${new_id}`,
          title: new_title,
          type: new_type,
          participants: new_participants,
          actual_state: 'Pendiente'
        }
        this.getTours.push(new_tour);
        return true
      }
    },
    async deleteTour(id: string) {
      const index = await this.getTours.findIndex(tour => tour.id === id)

      if(index != -1) {
        await this.getTours.splice(index, 1);
        return true;
      }
      else return false;
    },
    async editTour(id: string, new_title: string, new_participants: any) {
      const index = await this.getTours.findIndex(tour => tour.id === id)
      const actual_tour = this.getTours[index]
      let edited_tour = {
        id: id,
        title: new_title,
        type: actual_tour.type,
        participants: new_participants,
        actual_state: actual_tour.actual_state
      }
      if(index != -1) {
        await this.getTours.splice(index, 1, edited_tour)
        return true
      }
      else return false
    }
  },
});
