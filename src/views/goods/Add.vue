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
              <category-cas-cader  @ChildChange="handleChildChange"></category-cas-cader>
           </el-form-item>
           <el-button plain type="success" @click="handleNextTab">下一步</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="1">
          <!--
            上传组件---封装的比较完整
            ---此组件并未使用axios 所以提供了了一个headers 来支持设置请求头
            action 用来指定图片上传的地址  用axios的基准路径在这里无效 请填写完整路径
            on-preview：预览时触发
            on-remove： 删除时触发
            file-list： 存储上传的图片数组 {name: xxx, url：xxx}
            -->
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
            :headers="headers"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-button plain type="success" @click="handleNextTab">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="2">
          <quill-editor v-model="content"
            class="content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
          <el-button plain type="success" class="handle-add" @click="creatAdd">提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
</template>

<script>
// 引入级联
import CategoryCasCader from '@/components/CategoryCasCader';
// 引入 富文本编辑
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

export default {
  data () {
    return {
      activeName: '0',
      stepActive: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: []
      },
      options: [],
      selectedOptions: [],
      content: '',
      // 上传图片 设置token请求头
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      pics: [
        // {pic: ''}
      ],
      fileList: [{
        name: '',
        url: ''
      }],
      // 富文本编辑器 所需数据
      editorOption: {
      }
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
    // 下一步
    handleNextTab () {
      this.activeName = Number.parseInt(this.activeName) + 1 + '';
      this.stepActive = this.stepActive + 1;
    },
    // 子组件传值函数
    handleChildChange (data) {
      this.form.goods_cat = data.join(',');
    },
    // 提交商品基本信息 完成商品添加功能
    async creatAdd () {
      console.log('商品添加', this.form);
      const { data: resData } = await this.$http.post('/goods', this.form);
      const meta = resData.meta;
      if (meta.status === 201) {
        this.$message.success(meta.msg);
        this.loadData();
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 处理图片上传部分
    handlePreview(file) {
      console.log(file);
    },
    // 图片上传 成功 TODO
    handleUploadSuccess (response, file, fileList) {
      console.log(response);
      const path = response.data.tmp_path;
      console.log('tmp_path', path);
      this.form.pics.push({
        pic: path
      });
    },
    // 删除已上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
.handle-add {
  margin-top: 100px;
}
</style>
