import Routes from '../routes'
import {getKey, matches} from '../utils'

export default (keyName) => {
  return {
    name: 'navigation',
    abstract: true,
    props: {},
    data: () => ({
      routes: Routes
    }),
    computed: {},
    watch: {
      routes(val) {
        for (const key in this.cache) {
          if (this.cache.hasOwnProperty(key)) {
            if (!matches(val, key)) {
              const vNode = this.cache[key];
              if (vNode.data.type !== 'HomePage') {
                vNode && vNode.componentInstance.$destroy();
                delete this.cache[key];
              }
            }
          }
        }
      },
    },
    created() {
      this.cache = {};
    },
    destroyed() {
      for (const key in this.cache) {
        if (this.cache.hasOwnProperty(key)) {
          const vNode = this.cache[key];
          vNode && vNode.componentInstance.$destroy()
        }
      }
    },
    render() {
      const vNode = this.$slots.default ? this.$slots.default[0] : null;
      if (vNode) {
        vNode.key = vNode.key || (vNode.isComment
          ? 'comment'
          : vNode.tag);
        const key = getKey(this.$route, keyName);
        if (vNode.key.indexOf(key) === -1) {
          vNode.key = `__navigation-${key}-${vNode.key}`;
        }
        if (this.cache[key]) {
          if (vNode.key === this.cache[key].key) {
            vNode.componentInstance = this.cache[key].componentInstance;
          } else {
            this.cache[key].componentInstance.$destroy();
            this.cache[key] = vNode;
          }
        } else {
          this.cache[key] = vNode;
        }
        vNode.data.type = this.$route.meta.type;
        vNode.data.keepAlive = true;
      }
      return vNode;
    }
  }
}
