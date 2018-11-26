import Routes from './routes'
import Navigator from './navigator'
import NavComponent from './components/Navigation'
import {genKey, isObjEqual} from './utils'

export default {
  install: (Vue, {router, store, moduleName = 'navigation', keyName = 'VNK'} = {}) => {
    if (!router) {
      console.error('vue-navigation need options: router');
      return
    }

    const bus = new Vue();
    const navigator = Navigator(bus, store, moduleName, keyName);

    const routerReplace = router.replace.bind(router);
    let replaceFlag = false;
    router.replace = (location, onComplete, onAbort) => {
      replaceFlag = true;
      routerReplace(location, onComplete, onAbort)
    };

    router.beforeEach((to, from, next) => {
      if (!to.query[keyName]) {
        const query = {...to.query};
        if (to.path === from.path && isObjEqual(
          {...to.query, [keyName]: null},
          {...from.query, [keyName]: null},
        ) && from.query[keyName]) {
          query[keyName] = from.query[keyName]
        } else {
          query[keyName] = genKey()
        }
        next({name: to.name, params: to.params, query, replace: replaceFlag || !from.query[keyName]})
      } else {
        next()
      }
    });

    router.afterEach((to, from) => {
      navigator.record(to, from, replaceFlag);
      replaceFlag = false
    });

    Vue.component('navigation', NavComponent(keyName))

    Vue.navigation = Vue.prototype.$navigation = {
      on: (event, callback) => {
        bus.$on(event, callback)
      },
      once: (event, callback) => {
        bus.$once(event, callback)
      },
      off: (event, callback) => {
        bus.$off(event, callback)
      },
      getRoutes: () => Routes.slice(),
      cleanRoutes: () => navigator.reset()
    }
  }
}
