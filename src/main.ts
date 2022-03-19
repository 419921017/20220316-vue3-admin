import { createApp } from "vue";
import ElementPlus from "element-plus";
import "normalize.css/normalize.css";

import "@styles/index.scss";
import router from "@/router";
import App from "@/App.vue";
import initSvgIcon from "@/icons";
import "virtual:svg-icons-register";

const app = createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(initSvgIcon)
  .mount("#app");

export default app;
