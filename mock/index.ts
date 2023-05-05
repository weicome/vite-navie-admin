import { Recordable } from 'vite-plugin-mock';
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob<Recordable>('./**/*.ts', {eager: true});

const mockModules: any[] = []
Object.keys(modules).forEach((key)=> {
    if(key.includes('/_')){
        return 
    }
    mockModules.push(...modules[key].default)
})

export function setupProdMockServer(){
    console.log('mockModules', mockModules)
    createProdMockServer(mockModules)
}