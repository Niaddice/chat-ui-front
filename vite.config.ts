import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {resolve} from "path"
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8092',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        reactRefresh(),
        viteExternalsPlugin({
            "react": "React",
            "react-dom": "ReactDOM",
            "@chatui/core": "ChatUI"
        })],
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
                additionalData: '@import "./src/assets/style/global.less";',
            },
        },
    },
})
