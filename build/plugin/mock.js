import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild){
    return viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
        import { setupProdMockServer } from '../mock';
        setupProdMockServer();
        `
    })
}