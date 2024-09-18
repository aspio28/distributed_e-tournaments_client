<template>
    <div class="card">
        <div class="relative">
            <div class="relative flex items-center justify-end bg-gray-800 h-32">
                <img src="@/assets/portada.png" alt="Portada" class="h-full object-contain mr-20" />
            </div>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-red-800">
                <h2 class="text-5xl font-shadows">Tour</h2>
                <h1 class="text-6xl font-shadows">Tic Tac Toe</h1>
            </div>
        </div>

        <Menubar :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Menubar>
    </div>
</template>
<script setup>
    import { items } from '../helpers/layout_syntax';
    import Menubar from 'primevue/menubar';
</script>