import type { App } from 'vue';
const plugins = {
    install: (app: App) => {
        app.config.globalProperties.$echo = () => {
            console.log('a plugin')
        }
        app.provide('test', { message: 'from plugin' })
    }
}

export default plugins
