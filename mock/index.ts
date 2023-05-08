import { Recordable, viteMockServe  } from 'vite-plugin-mock';

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
    viteMockServe  ({mockModules})
}