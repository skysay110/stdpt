<template>
  <div class="model">
    <h4 v-if="title" class="title">{{title}}</h4>
    <div v-if="mode === 'grid'" class="cell_box" ref="cell_box">
      <mu-ripple class="cell"
                 :style="getWidth"
                 v-for="(cell,idx) in getCells"
                 v-if="!cell.hide"
                 :key="idx"
                 @click="itemClick(cell)">
        <div class="iconfont"
             :style="{
                height: cellWidth/2+'px',
                width:cellWidth/2+'px',
                lineHeight:cellWidth/2+'px',
                background:backgroundList[idx%8],
                color:'#fff',
                borderRadius:'100%'}">
          <img :src="cell.icon" alt="">
        </div>
        <label>{{cell.name}}</label>
      </mu-ripple>
    </div>
    <div v-if="mode === 'list'">
      <div class="list" v-for="(cell,idx) in getCells"
           :key="idx"
           @click="itemClick(cell)"
           v-if="!cell.hide">
        <mu-ripple ref="item" class="item ripple" :style="{height: `${itemHeight}px`}">
          <!--<img :src="cell.icon" alt="">-->
          <span style="flex: 1;color: #333">{{cell.name}}</span>
          <i class="iconfont icon-arrow-right" style="color: #999;"></i>
        </mu-ripple>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "MineModel",
    props: {
      title: {
        type: String,
        default: ''
      },
      cells: {
        type: Array,
        required: true
      },
      cols: {
        type: Number,
        default: 4,
      },
      mode: {
        type: String,
        default: 'grid'
      }
    },
    data() {
      return {
        cellWidth: 0,
        backgroundList: ['#f6ac2f', '#68e4ae', '#c567f3', '#81e0dc',
          '#b1e75b', '#6fd7f2', '#f38041', '#f2e268'],
        itemHeight: 0,
      }
    },
    computed: {
      getWidth() {
        return {
          width: `${100 / this.cols}%`
        }
      },
      getCells() {
        return this.cells.filter(item => !item.hide)
      }
    },
    methods: {
      itemClick(cell) {
        if (cell.fn) {
          cell.fn(this.$parent.$parent);
          this.$emit('onFnComplete', cell.name)
        } else if (cell.url) {
          this.$router.push(cell.url)
        }
      },
      init() {
        this.$nextTick(() => {
          if (this.mode === 'grid') {
            this.cellWidth = this.$refs.cell_box.clientWidth / this.cols;
          } else {
            this.itemHeight = this.$refs.item[0].clientHeight;
          }
        })
      }
    },
    activated() {
      this.init();
    },
    watch: {
      'mode'(){
        this.init()
      }
    }
  }
</script>

<style lang="less" scoped>
  .model {
    .title {
      margin: 10px;
      clear: both;
    }
    .cell_box {
      overflow: hidden;
      position: relative;
      .cell {
        transition: .5s all;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        float: left;
        &:active {
          background: #eee;
        }
        > div {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 28px;
            height: 28px;
            vertical-align: top;
          }
        }

        label {
          padding: 5px 0 10px;
          color: #666;
        }
      }
    }
    .list {
      .item {
        overflow: hidden;
        background-color: #fff;
        padding: 20px;
        margin: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }

  .ripple {
    color: rgba(33, 150, 243, 0.27);
  }
</style>
