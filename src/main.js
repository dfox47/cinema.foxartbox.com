import "@/style.css";

import { createApp } from "vue";

import App from "./App.vue";
import { createPinia } from "pinia";
import notifications from "@kyvg/vue3-notification";

createApp(App).use(notifications).use(createPinia()).mount("#app");
