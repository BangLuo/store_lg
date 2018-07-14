<template>
     <el-cascader
        expand-trigger="click"
        :options="options"
        v-model="selectedOptions"
        change-on-select
        :props="{
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        }">
      </el-cascader>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      selectedOptions: []
    };
  },
  props: {
    type: {
      type: [String, Number],
      default: 1
    }
  },
  async created () {
    const {data: resData} = await this.$http.get('categories', {
      params: {
        type: this.type
      }
    });
    this.options = resData.data;
  },
  methods: {
    // // 当前数据通过事件方式传出
    // handleChange () {
    //   // $emite 对外部发布一个自定义事件 外部就是使用该组件的父组件
    //   // 然后在调用时 使用传送
    //   this.$emit(this.selectedOptions);
    // }
  }
};
</script>

<style>

</style>
