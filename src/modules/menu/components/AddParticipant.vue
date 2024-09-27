<script setup lang="ts">
import { ref, watch } from "vue";
import FormItem from "./FormItem.vue";
import {
  type Participant,
  type ParticipantType,
} from "../helpers/participants";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const visible = defineModel<boolean>("visible", { required: true });
const participants = defineModel<Participant[]>("participants", {
  required: true,
});

const availableTypes: ParticipantType[] = [
  { name: "Minimax" },
  { name: "Random" },
  { name: "Backtrack" },
];

const name = ref("");
const type = ref(availableTypes[0]);

watch(visible, () => {
  name.value = "";
  type.value = availableTypes[0];
});

function handleSubmit() {
  if (name.value.trim().length > 0) {
    participants.value = [
      ...participants.value,
      { name: name.value, type: type.value.name },
    ];

    visible.value = false;
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El participante debe tener un nombre",
      life: 3000,
    });
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Añadir participante"
    :style="{ width: '25rem' }"
  >
    <form
      action=""
      class="flex flex-col gap-y-4"
      @submit.prevent="handleSubmit"
    >
      <FormItem label="Nombre">
        <InputText id="title" v-model="name" />
      </FormItem>

      <FormItem label="Tipo de participante">
        <Select
          v-model="type"
          :options="availableTypes"
          optionLabel="name"
          placeholder="Tipo de participante"
          class="w-full"
        />
      </FormItem>

      <section class="flex justify-end w-full gap-x-2.5">
        <Button type="submit" label="Añadir" size="small" />
        <Button
          type="button"
          label="Cerrar"
          size="small"
          severity="secondary"
          @click="visible = false"
        />
      </section>
    </form>
  </Dialog>
</template>
