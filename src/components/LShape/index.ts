import type { App } from 'vue';
import LShape from './LShape.vue';
LShape.install = (app: App) => {
    if (LShape.name) {
        app.component(LShape.name, LShape)
    }
}

export default LShape
