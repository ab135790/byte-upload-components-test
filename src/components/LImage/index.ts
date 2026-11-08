import type { App } from 'vue';
import LImage from './LImage.vue';
LImage.install = (app: App) => {
    if (LImage.name) {
        app.component(LImage.name, LImage);
    }
}

export default LImage;
