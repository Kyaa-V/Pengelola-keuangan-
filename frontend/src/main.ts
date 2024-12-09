import "./assets/main.css";
import { router } from "./router/router.js";
import { createApp } from "vue";
import App from "./App.vue";
import "boxicons";

const app = createApp(App);
app.use(router)
app.mount("#app");