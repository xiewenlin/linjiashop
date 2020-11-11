<template>
  <div class="vab-image__outter">
    <el-image
      :src="bigSrc"
      fit="cover"
      style="width: 100%; height: 100%"
      @click="clickBig"
    ></el-image>
   <!-- <el-image
      :src="smallSrc"
      class="vab-image__outter__small"
      fit="cover"
      @click="clickSmall"
    ></el-image>-->
    <!--<span class="vab-image__outter__percent">{{ percent }}%</span>-->

  </div>
</template>

<script>
  export default {
    name: 'VabImage',
    components: {},
    props: {
      bigSrc: {
        type: String,
        default: '',
      },
      smallSrc: {
        type: String,
        default: '',
      },
      percent: {
        type: Number,
        default: 97,
      },
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {
      clickBig() {
        this.$emit('click-big')
      },
      clickSmall() {
        this.$emit('click-small')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-image {
    &__outter {
      position: relative;
      width: 100%;
      height: 100%;

      ::v-deep {
        img {
          border-radius: 2px;;
        }
      }

      &__small {
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100px;
        border-bottom: 1px solid #fff;
        border-left: 1px solid #fff;;
        border-radius: 2px;
      }

      &__percent {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-block;
        min-width: 50px;
        height: 25px;
        line-height: 25px;
        color: #fff;;
        text-align: center;
        background-color: #ff4d4f;
        border-radius: 2px;
      }
    }
  }
</style>
