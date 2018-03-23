// import { default as Mooa, mooaRouter } from '../mooa'
//
// class LocalStorageMock {
//   private store: any
//
//   constructor() {
//     this.store = {}
//   }
//
//   clear() {
//     this.store = {}
//   }
//
//   getItem(key: any) {
//     return this.store[key] || null
//   }
//
//   setItem(key: any, value: any) {
//     this.store[key] = value.toString()
//   }
//
//   removeItem(key: any) {
//     delete this.store[key]
//   }
// }
//
// // global.localStorage = new LocalStorageMock()
//
// test('new mooa test', () => {
//   const mooa = new Mooa({
//     mode: 'iframe',
//     debug: false,
//     parentElement: 'app-home',
//     urlPrefix: 'app'
//   })
//
//   mooa.registerApplicationByLink(
//     'help',
//     '/assets/help',
//     mooaRouter.matchRoute('help')
//   )
//   mooa.start()
// })
//
// test('new mooa by register', () => {
//   const mooa = new Mooa({
//     mode: 'iframe',
//     debug: false,
//     parentElement: 'app-home',
//     urlPrefix: 'app'
//   })
//
//   mooa.registerApplication(
//     'help',
//     '/assets/help',
//     mooaRouter.matchRoute('help')
//   )
//   mooa.start()
// })
