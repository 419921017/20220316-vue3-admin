import { createApp } from "vue";
// import ElementPlus from "element-plus";
import "normalize.css/normalize.css";

import "@styles/index.scss";
import router from "@/router";
import App from "@/App.vue";
import initSvgIcon from "@/icons";
import "virtual:svg-icons-register";
import ElementPlusInstall, { Size } from "./plugins/element";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";

const app = createApp(App)
  .use(router)
  // .use(ElementPlus)
  .use(ElementPlusInstall)
  .use(initSvgIcon)
  .mount("#app");


// vue实例上挂载属性类型声明
// declare module "@vue/runtime-core" {
//   interface ComponentCustomProperties {
//     $message: typeof ElMessage;
//     $notify: typeof ElNotification;
//     $confirm: typeof ElMessageBox.confirm;
//     $alert: typeof ElMessageBox.alert;
//     $prompt: typeof ElMessageBox.prompt;
//     $ELEMENT: {
//       size: Size;
//     };
//   }
// }
export default app;
