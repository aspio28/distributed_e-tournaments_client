<template>
    <Header />
    
    <Toast class="cursor-default" />

    <AddParticipant
        v-model:visible="addParticipant"
        v-model:participants="participants"
    />

    <div class="flex w-full justify-center my-6 ">
      <div class="max-w-[600px] w-full flex flex-col items-center  bg-gray-300 p-5 rounded-lg border-solid border-2">
        <h1 class="text-center mb-5 text-4xl font-bold text-red-800 font-shadows">Editar Torneo</h1>
        
        <form action="" class="flex flex-col w-full gap-y-5" @submit.prevent="handleSubmit">
            <FormItem label="Titulo">
                <InputText id="title" v-model="new_title"/>
            </FormItem>
            <FormItem label="Participantes">
                <p v-if="participants.length === 0">No hay participantes</p>

                <div v-else class="flex flex-col gap-y-1 mb-1.5 bg-white p-5 rounded-lg border-solid border border-red-800">
                    <article class="flex justify-between gap-x-2">
                    <DataTable :value="participants" 
                                class="font-shadows text-xl" 
                                scrollable scrollHeight="300px"
                                editMode="cell" 
                                @cell-edit-complete="onCellEditComplete"
                                :pt="{
                                    table: { style: 'min-width: 32rem' },
                                    column: {
                                        bodycell: ({ state }) => ({
                                            class: [{ 'pt-0 pb-0': state['d_editing'] }]
                                        })
                                    }
                                }">
                        <Column field="name" header="Nombre">
                        <template #editor="{ data, field}">
                            <InputText v-model="data[field]" autofocus fluid :placeholder="participants.name" />
                        </template>
                        </Column>
                        <Column field="type" header="Tipo de jugador">
                        <template #editor="{ data, field}">
                            <Select
                            v-model="data[field]"
                            :options="availableTypes"
                            optionLabel="name"
                            :placeholder=data[field]
                            class="w-full"
                            />
                        </template>
                        </Column>
                        <Column class="w-24 !text-end">
                        <template #body="{ data }">
                            <Button icon="pi pi-times" @click="handleDeleteParticipant(data)" size="small" rounded></Button>
                        </template>
                        </Column>
                    </DataTable>
                    </article>
                </div>

                <div class="flex justify-end">
                    <Button
                    icon="pi pi-plus"
                    label="Añadir participante"
                    size="small"
                    @click="addParticipant = true"
                    />
                </div>
            </FormItem>
            <section class="flex w-full justify-end gap-x-3">
                <Button size="small" type="submit" label="Editar" />
                <RouterLink to="/">
                <Button
                    size="small"
                    type="button"
                    label="Atrás"
                    severity="secondary"
                />
                </RouterLink>
            </section>
        </form>
      </div>
    </div>
</template>
<script setup>

import Header from "../components/Header.vue";
import { defineProps } from 'vue';
import { ref } from "vue";
import { useTourStore } from "../stores/tourStore";
import FormItem from "../components/FormItem.vue";
import AddParticipant from "../components/AddParticipant.vue";
import router from "@/router";
import { useToast } from "primevue/usetoast";

const toast = useToast()
const typesAvailable = [
  { name: "Tipo 1" },
  { name: "Tipo 2" },
  { name: "Tipo 3" },
];

const availableTypes = [
  { name: "Minimax" },
  { name: "Random" },
  { name: "Backtrack" },
];

const addParticipant = ref(false);
const store = useTourStore()
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const loadTour = store.tour_by_id(props.id)
const participants = ref(loadTour.participants);

const new_title = ref(loadTour.title)

function handleDeleteParticipant(p) {
  participants.value = participants.value.filter((par) => par !== p);
}

const onCellEditComplete = (event) => {
    let { data, newValue, field } = event;
    if(field == 'type') {
      newValue = newValue.name
    }
    if (newValue.trim().length > 0) data[field] = newValue;
    else event.preventDefault();
}

async function handleSubmit() {
  if (participants.value.length < 2) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El torneo debe tener al menos 2 participantes",
      life: 3000,
    });
  } else if (new_title.value.trim().length === 0) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El torneo debe tener un nombre",
      life: 3000,
    });
  } else {
      let tour_edited = await store.editTour(props.id, new_title, participants);
      if(tour_edited) {
        await router.push({ name: 'tourttt'});
        await toast.add({
        severity: "info",
        summary: "Editado",
        detail: `Torneo ${loadTour.title} ha sido editado con exito`,
        life: 3000,
        });
      }
      else {
        toast.add({
        severity: "error",
        summary: "Error",
        detail: `Torneo ${loadTour.title} ya existe`,
        life: 3000,
        });
      }
  }
}
</script>