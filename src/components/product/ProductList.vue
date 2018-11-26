<template>
  <container-view loadingType="list"
                  ref="container"
                  :isLoading="isLoading">
    <mu-load-more @refresh="refresh"
                  :refreshing="refreshing"
                  :loading="loading"
                  @load="load">
      <div class="product_list">
        <ul>
          <li v-for="product in productList">
            <Product :it="product"></Product>
          </li>
        </ul>
      </div>
    </mu-load-more>
  </container-view>
</template>

<script>
  import Product from '@/components/common/Product'
  import Appbar from "../common/AppBar";
  import BottomNav from "../common/BottomNav";
  import ContainerView from "../common/ContainerView";

  export default {
    name: "ProductList",
    data() {
      return {
        productList: [],
        num: 1,
        row: 10,
        isLoading: true,
        refreshing: false,
        loading: false,
      }
    },
    components: {
      ContainerView,
      BottomNav,
      Appbar,
      Product,
    },
    methods: {
      refresh() {
        this.refreshing = true;
        this.$refs.container.scrollTop = 0;
        this.getCpList(false)
      },
      load() {
        this.loading = true;
        this.getCpList(true)
      },
      getCpList(isLoadMore) {
        if (isLoadMore) {
          this.num++;
        } else {
          this.num = 1;
        }
        let that = this;
        let params = new URLSearchParams();
        params.append('num', String(this.num));
        params.append('row', String(this.row));
        params.append('mappid', this.config.appId);
        if (this.num !== 1) {
          params.append('str', this.str);
        }
        this.$api.apiCp.getCpListAll(params)
          .then(res => {
            let data = res;
            let list = data.rows;
            that.str = data.str;
            if (isLoadMore) {
              that.productList = that.productList.concat(list);
              that.loading = false;
            } else {
              that.refreshing = false;
              that.allLoaded = false;
              that.productList = list;
            }
            if (list.length === 0) {
              that.allLoaded = true;
            }
            that.isLoading = false;
          })
      },
    },
    mounted() {
      this.getCpList();
    },
  }
</script>

<style lang="less" scoped>

  .product_list {
    display: flex;
    flex-direction: column;
    .filter_box {
      position: fixed;
      width: 100%;
      z-index: 10000;
      background-color: #f7f7f7;
      ul {
        display: flex;
        border-bottom: 1px solid #eceaeb;
        position: relative;
        li {
          text-align: center;
          flex: 1;
          list-style: none;
          padding: .3rem 0;
          border-right: 1px solid #eceaeb;
          .area, .purpose, .nature, .more {
            color: #6c6a6b;
            position: relative;
            font-size: .25rem;
            line-height: .25rem;
            .iconfont {
              font-size: .25rem;
            }
            .icon-sanjiao_xia {
              margin-left: .1rem;
            }
            .icon-filter {
              margin-right: .1rem;
            }
          }
          .filterSelected {
            color: #fe6672;
          }
        }
        li:last-child {
          border-right: 0px solid #eceaeb;
        }
      }
    }
    .product_box {
      flex: 1;
      background: #FFF;
      height: 100%;
      overflow: scroll;
    }
  }
</style>
