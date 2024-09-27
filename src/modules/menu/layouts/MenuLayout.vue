<template>
  <Header />
  <Toast class="cursor-default" />
  <ConfirmPopup class="cursor-default" />

  <div class="flex justify-between my-8 px-8">
    <IconField class="flex items-center gap-2">
      <InputIcon class="pi pi-search" />
      <InputText placeholder="Search" type="text" class="w-[400px] sm:w-auto" />
    </IconField>

    <RouterLink to="/create">
      <Button icon="pi pi-plus" label="Añadir torneo" />
    </RouterLink>
  </div>

  <div
    class="container mx-auto px-6 mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
  >
    <div v-for="tour in store.getTours" :key="tour.id" class="group relative">
      <div
        class="relative h-80 w-auto rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64"
      >
        <Card
          :class="[
            getBorderColor(tour.actual_state),
            'border-2',
            'm-2',
            'cursor-default',
          ]"
        >
          <template #title>{{ tour.title }}</template>
          <template #subtitle>Tipo de torneo: {{ tour.type }}</template>
          <template #content>
            <div>
              <div>Participantes: {{ tour.participants.length }}</div>
              <div>Estado: {{ tour.actual_state }}</div>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Resultados"
                icon="pi pi-info-circle"
                severity="secondary"
                outlined
                class="w-80"
              />
              <Button icon="pi pi-cog" class="w-full" />
              <Button
                @click="delete_tour($event, tour)"
                icon="pi pi-trash"
                class="w-full"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";

import Header from "../components/Header.vue";

import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useTourStore } from "../stores/tourStore";

const toast = useToast();
const confirm = useConfirm();

const store = useTourStore();

const getBorderColor = (actual_state) => {
  switch (actual_state) {
    case "Comenzado":
      return "border-green-800";
    case "Finalizado":
      return "border-red-800";
    case "Pendiente":
      return "border-yellow-600";
    default:
      return "border-black-800";
  }
};

const delete_tour = async (event, tour) => {
  confirm.require({
    target: event.currentTarget,
    message: "Estas seguro que desea elimiar este torneo?",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: "Cancelar",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Borrar",
      severity: "primary",
    },
    accept: async() => {
        const deleted = await store.deleteTour(tour.id);
        let confirm_message = `Error al tratar de eliminar el torneo: ${tour.title}`
        if(deleted) {
            confirm_message = `Torneo: ${tour.title} eliminado`;
        }
        await toast.add({
            severity: "secondary",
            summary: "Confirmación",
            detail: confirm_message,
            life: 3000,
        });
    },
  });
};
</script>
