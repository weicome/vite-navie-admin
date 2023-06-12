import { viteMockServe } from "vite-plugin-mock"

export function configMockPlugin(isBuild) {
	const viteM = viteMockServe({
		mockPath: "mock",
		localEnabled: !isBuild,
		prodEnabled: isBuild,
		injectCode: `
        import { setupProdMockServer } from 'mock'
        console.log('set',setupProdMockServer)
        setupProdMockServer();
    `
	})
	console.log(viteM)
	return viteM
}
