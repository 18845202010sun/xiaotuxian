import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from "path";
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      //注册要自动引入的库
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      //将方法与文件之间的对应关系生成到 auto-import.d.ts文件中
      dts: 'auto-import.d.ts',
      //eslintrc配置
      eslintrc: {
        enabled: true, //default 'false'
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      }
    }),
    Components({
      // 指定组件位置，默认是 src/components
      // 这样写以后表示 components 和 views 目录下的组件不需要导入也可以直接使用
      dirs: ["src/components", "src/views"],
      // 搜索子目录
      deep: true,
      // 组件的有效文件扩展名
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "components.d.ts",
    })
  ],
  server: {
    port: 8080     //端口8080
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `
              true; 
              @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
              @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
            `,
        },
        javascriptEnabled: true
      }
    }
  },
  build:{
    assetsInlineLimit:10000
  }
})
