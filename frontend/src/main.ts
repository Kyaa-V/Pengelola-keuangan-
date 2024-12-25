import "./assets/main.css";
import { router } from "./router/router.js";
import { createApp } from "vue";
import App from "./App.vue";
import "boxicons";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);
app.use(ToastPlugin);
app.use(router);
app.mount("#app");
