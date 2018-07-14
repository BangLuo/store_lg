<template>
    <el-card class="box-card" id="cardAdd">
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
      <el-tabs v-model="activeName" tab-position="left" @click="HandleClick" >
        <el-tab-pane label="基本信息" name="0">
          <!-- 商品form -->
          <el-form ref="form" :model="form" label-width="80px" height="100%" >
            <el-form-item label="商品名称">
              <el-input  required v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input required v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input required v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input required v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" width="100px">
            <!-- <el-cascader
              :options="options"
              v-model="selectedOptions"
              :props="{
              label: 'cat_name',
              value: 'cat_id',
              children: 'children'
              }">
            </el-cascader> -->
              <category-cas-cader type="2"></category-cas-cader>
           </el-form-item>
           <el-button plain type="success" @click="creatIm">立即创建</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="1">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button plain type="success" @click="nextTab">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="2">
          <quill-editor v-model="content"
            class="content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
         <el-button plain type="success" >提交</el-button>
        </el-tab-pane>
         
      </el-tabs>
    </el-card>
</template>

<script>
// 引入级联
import CategoryCasCader from '@/components/CategoryCasCader';
// 引入 富文本编辑
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'


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
      selectedOptions: [],
      content: '',     // 上传图片
      fileList2: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
      // 
      editorOption: {
      },

    };
  },
  created () {
    this.loadData();
  },
  methods: {
    HandleClick () {
      console.log(111);
    },
     // 添加dialog 完成基本布局 show
    async loadData() {
      const {data: resData} = await this.$http.get('categories?type=3');
      // console.log(resData);
      const { data } = resData;
      this.options = data;
      // console.log(this.options);数据已经获取到 但是没有呈现
    },
    nextTab () {
     
    },
    // 处理图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 提交商品信息 完成商品添加功能
    creatIm () {
      alert(1);
      console.log(this.form);
    }
  },
  components: {
    quillEditor,
    CategoryCasCader

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
#cardAdd {
  height: 800px;
}
.content{
  height: 300px;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow{
  border-bottom: 1px solid #ccc;
}
</style>
