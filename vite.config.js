import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VitePages from "vite-plugin-pages";
import fs from "fs-extra";
//gray-matter 的功能，可以获取相关文件中的 front-matter，并将其处理为一个对象
import matter from "gray-matter";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src"),
      "@views": resolve("src/views"),
      "@components": resolve("src/components"),
      "@router": resolve("src/router"),
      "@assets": resolve("src/assets"),
      "@store": resolve("src/store"),
      "@styles": resolve("src/styles"),
      "@utils": resolve("src/utils"),
    },
    extensions: [".js", ".ts", ".vue", ".scss", ".tsx", ".jsx", ".css"],
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__dom__",
    }),
    VitePages({
      extensions: ["vue", "md"],//需要包含的文件类型，这里显然是 .vue 和 .md 文件
      pagesDir: "src/views",//寻找文件的目录，这里选择了项目根目录下的 views 目录
      extendRoute(route) {//提供一个方法，对每个文件产生路由做一些加工，这里是对 route.meta 的处理
        const path = resolve(route.component.slice(1));
        const md = fs.readFileSync(path, "utf-8");
        const { data } = matter(md);
        route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        return route;
      },
    })
  ],
});
