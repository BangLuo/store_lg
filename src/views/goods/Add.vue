<template>
    <el-card class="box-card">
      <!-- 面包屑 -->
      <my-breadcrumb level1="商品管理"  level2="添加商品"></my-breadcrumb>
      <el-row class="title-add">
        <el-col :span="24">添加商品管理信息</el-col>
      </el-row>
      <!-- 步骤组件 -->
      <el-steps :active="parseInt(activeName) + 1" align-center finish-status="success" class="steps">
        <el-step title="基本信息"></el-step>
        <el-step title="图片"></el-step>
        <el-step title="内容"></el-step>
      </el-steps>
      <!-- tab标签页 -->
      <el-tabs v-model="activeName" tab-position="left" @click="HandleClick">
        <el-tab-pane label="基本信息" name="0">
          <!-- 商品form -->
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-cascader
              lable="选择分类"
              :options="options"
              v-model="selectedOptions"
              change-on-select>
            </el-cascader>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="1">商品图片</el-tab-pane>
        <el-tab-pane label="商品详情" name="2">商品详情</el-tab-pane>
      </el-tabs>
    </el-card>
</template>

<script>

export default {
  data () {
    return {
      active: 0,
      activeName: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      options: [],
      selectedOptions: []
    };
  },
  methods: {
    HandleClick () {
      console.log(111);
    }
  }
};
</script>

<style>
.title-add {
  height: 30px;
  margin-top: 15px;
  margin-bottom: 30px;
  text-align: center;
  background-color: #999;
  border-radius: 5px;
  opacity: 0.6;
  font-size: 16px;
  line-height: 30px;
}
.steps {
  margin-bottom: 30px;
}
</style>
