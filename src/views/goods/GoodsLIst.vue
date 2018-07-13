<template>
    <div>
        <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="商品管理"  level2="商品列表"></my-breadcrumb>
        <!--添加分类-->
        <el-row class="addgoods">
          <el-col :span="24">
            <el-button
            plain type="success"
           >添加分类</el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
          v-loading="loading"
          stripe
          border
          :data="list"
          style="width: 100%">
          <el-table-column
          type="index"
          width="50">
          </el-table-column>
          <el-table-column
          prop="goods_name"
          label="商品名称"
          >
          </el-table-column>
          <el-table-column
          prop="goods_price"
          label="商品价格">
          </el-table-column>
           <el-table-column
          prop="goods_price"
          label="商品价格">
          </el-table-column>
          
          <el-table-column
            prop="level"
            label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
                <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
                <el-button type="success" icon="el-icon-delete" plain size="mini"></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
         <el-pagination
          class="pagenations"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 添加dialog部分 -->
        <!-- <el-dialog
          title="添加商品分类"
          :visible.sync="dialogAddVisible"
          width="80%">
          <el-form label-width="100px" width="150px">
              <el-form-item label="分类名称">
                <el-input v-model="addCatName"></el-input>
              </el-form-item>
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              change-on-select>
            </el-cascader>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
          </el-form>
        </el-dialog> -->
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 列表所需数据
      loading: false,
      list: [],
      // 分页所需数据
      pagenum: 1,
      pagesize: 5,
      total: -1,
      //添加
      dialogAddVisible: false,
      addCatName: '',
      options: [],
      selectedOptions: [],

    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 获取列表数据
    async loadData () {
      const { data: resData } = await this.$http.get(`/goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { goods, total } = resData.data;
      console.log(resData);
      this.list = goods;
      this.total = total;
      this.loading = false;
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.loading = true;
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.loading = true;
      this.pagenum = val;
      this.loadData();
    },
   
  }
};
</script>

<style>
.addgoods {
  margin-top: 15px;
  margin-bottom: 15px;
}
.pagenations{
  margin-top: 15px;
}
</style>
