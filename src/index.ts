import type { App } from 'vue';

import LText from './components/LText';
import LShape from './components/LShape';
import LImage from './components/LImage';

const components = [
    LText,
    LImage,
    LShape
]

const install = (app: App) => {
    components.forEach(component => {
        if(component.name) {
            app.component(component.name, component)
        }
    })
}

export {
    LText,
    LShape,
    LImage,
    install
}

export default {
    install
}
