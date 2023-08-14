// alert.js
import { defineStore } from "pinia";
import $http from "axios";
const { notify } = useNotification();
import { useNotification } from "@kyvg/vue3-notification";

export const useCinemaStore = defineStore("cinema", {
  state: () => ({
    seat: {},
    seatList: null,
  }),
  actions: {
    bookedSeat(seat, number, name, selected) {
      notify({
        text: `Место ${seat} ${number} ${
          !selected ? "забронировано" : "разбронировано"
        } на фильм ${name}`,
        duration: 2000,
      });
    },
    async submitSeat(userObj) {
      return await $http
        .get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            ...userObj
          },
        })
        .then(() => {
          notify({
            text: `Спасибо за заявку`,
            duration: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
