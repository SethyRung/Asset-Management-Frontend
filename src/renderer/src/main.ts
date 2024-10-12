import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import { MotionPlugin } from "@vueuse/motion";
import router from "@/router";

const app = createApp(App);

app.use(MotionPlugin);
app.use(router);

app.mount("#app");
