<template>
    <Header />
    <div class="flex justify-center my-8">
            <IconField class="flex items-center gap-2">
                <InputIcon class="pi pi-search" />
                <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
            </IconField>
    </div>
    <div class="flex mt-7 ml-7">
        <Card :class="[borderColor, 'border-2', 'm-2']" style="width: 25rem; overflow: hidden">
            <template #title>Torneo1</template>
            <template #subtitle>Tipo de torneo: xxx</template>
            <template #content>
                <div>
                    <div>Participantes: x</div>
                    <div>Estado: {{ estado }}</div>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Resultados" icon="pi pi-info-circle" severity="secondary" outlined class="w-80" />
                    <Button icon="pi pi-cog" class="w-full" />
                    <Button icon="pi pi-trash" class="w-full" />
                </div>
            </template>
        </Card>
        <Card :class="[borderColor, 'border-2', 'm-2']" style="width: 25rem; overflow: hidden">
            <template #title>Torneo2</template>
            <template #subtitle>Tipo de torneo: xxx</template>
            <template #content>
                <div>
                    <div>Participantes: x</div>
                    <div>Estado: {{ estado }}</div>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Resultados" icon="pi pi-info-circle" severity="secondary" outlined class="w-full" />
                    <Button icon="pi pi-cog" class="w-full" />
                    <Button icon="pi pi-trash" class="w-full" />
                </div>
            </template>
        </Card>
    </div>
</template>
<script setup>
    import Card from 'primevue/card';
    import Button from 'primevue/button';
    import IconField from 'primevue/iconfield';
    import InputIcon from 'primevue/inputicon';
    import InputText from 'primevue/inputtext';
    
    import Header from '../components/Header.vue';

    import { computed, ref } from 'vue';

    const estado = ref('comenzado');

    const borderColor = computed(() => {
    return {
        'border-green-800': estado.value === 'comenzado',
        'border-red-800': estado.value === 'finalizado',
        'border-yellow-800': estado.value === 'pendiente',
        };
    });
</script>
<style>
    .card {
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 1px 1px 3px lightgray
    }
</style>