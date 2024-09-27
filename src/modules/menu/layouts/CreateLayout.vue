<template>
  <Header />

  <Toast class="cursor-default" />

  <AddParticipant
    v-model:visible="addParticipant"
    v-model:participants="participants"
  />

  <div class="flex w-full justify-center my-6 ">
    <div class="max-w-[600px] w-full flex flex-col items-center  bg-gray-300 p-5 rounded-lg border-solid border-2">
      <h1 class="text-center mb-5 text-4xl font-bold text-red-800 font-shadows">Crear torneo</h1>
      <form
        action=""
        @submit.prevent="handleSubmit"
        class="flex flex-col w-full gap-y-5"
      >
        <FormItem label="Título">
          <InputText id="title" v-model="title" />
        </FormItem>

        <FormItem label="Tipo de torneo">
          <Select
            v-model="type"
            :options="typesAvailable"
            optionLabel="name"
            placeholder="Tipo de torneo"
            class="w-full"
          />
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
                    <InputText v-model="data[field]" autofocus fluid />
                  </template>
                </Column>
                <Column field="type" header="Tipo de jugador">
                  <template #editor="{ data, field}">
                    <InputText v-model="data[field]" autofocus fluid />
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
          <Button size="small" type="submit" label="Crear" />
          <Button
            size="small"
            type="button"
            label="Atrás"
            severity="secondary"
          />
        </section>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "../components/Header.vue";
import FormItem from "../components/FormItem.vue";
import AddParticipant from "../components/AddParticipant.vue";
import { type Participant } from "../helpers/participants";
import { useToast } from "primevue/usetoast";
import { useTourStore } from "../stores/tourStore";
import router from "@/router";

const store = useTourStore();

const typesAvailable = [
  { name: "Tipo 1" },
  { name: "Tipo 2" },
  { name: "Tipo 3" },
];

const toast = useToast();

const title = ref("");
const type = ref(typesAvailable[0]);
const participantLimit = ref(8);
const participants = ref<Participant[]>([]);

const addParticipant = ref(false);

function handleDeleteParticipant(p: Participant) {
  participants.value = participants.value.filter((par) => par !== p);
}

async function handleSubmit() {
  if (participants.value.length < 2) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El torneo debe tener al menos 2 participantes",
      life: 3000,
    });
  } else if (title.value.trim().length === 0) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El torneo debe tener un nombre",
      life: 3000,
    });
  } else {
      let tour_set = await store.setTour(ref(title.value), ref(type.value.name), ref(participants.value));
      if(tour_set) {
        await router.push({ name: 'tourttt'});
        await toast.add({
        severity: "success",
        summary: "Creado",
        detail: `Torneo ${title.value} ha sido creado con exito`,
        life: 3000,
        });
      }
      else {
        toast.add({
        severity: "error",
        summary: "Error",
        detail: `Torneo ${title.value} ya existe`,
        life: 3000,
        });
      }
  }
}

const onCellEditComplete = (event: any) => {
    let { data, newValue, field } = event;
      if (newValue.trim().length > 0) data[field] = newValue;
      else event.preventDefault();
}
</script>
