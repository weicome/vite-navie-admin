import {createPinia} from 'pinia'
import { App } from 'vue'

export const setupStore = (app: App): void => {
    app.use(createPinia())
}