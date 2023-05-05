 

import {createStorage} from './storage'

const prefixKey = 'Vue_Naive_Admin_'

export const Storage = createStorage({
    prefixKey: prefixKey,
    storage: localStorage,
});
