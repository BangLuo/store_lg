<template>
    <div>
        <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="商品管理"  level2="商品分类"></my-breadcrumb>
        <!--添加分类-->
        <el-row class="addgoods">
          <el-col :span="24">
            <el-button  plain type="success">添加分类</el-button>
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
            prop="cat_name"
            label="分类名称"
            width="150">
              <!-- tree grid
                treeKey 绑定到id，给每一个节点设置一个唯一值
                parentKey 绑定到父id属性，区分父子节点
                levelKey 绑定到层级的属性 
                childKey 绑定到存储子元素的属性
              -->
              <el-tree-grid
                prop="cat_name"
                label="分类名称"
                treeKey="cat_id"
                parentKey="cat_pid"
                levelKey="cat_level"
                childKey="children"
                :indentSize="30">
              </el-tree-grid>
          </el-table-column>
          <el-table-column
            label="级别"
            width="150">
              <template slot-scope="scope">
              <span v-if="scope.row.cat_level === 0">一级</span>
              <span v-else-if="scope.row.cat_level === 1">二级</span>
              <span v-else-if="scope.row.cat_level === 2">三级</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="cat_deleted"
            label="是否有效">
            <template slot-scope="scope">
              {{ scope.row.cat_deleted === true? '无效' : '有效' }}
              </template>
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
      </el-card>
    </div>
</template>

<script>
// 引入局部组件 treegrid
import ElTreeGrid from 'element-tree-grid';
export default {
  data () {
    return {
      // 列表所需数据
      loading: false,
      list: [],
      // 分页所需数据
      pagenum: 1,
      pagesize: 5,
      total: -1

    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 获取列表数据
    async loadData () {
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { result, total } = resData.data;
      this.list = result;
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
    }
  },
  components: {
    ElTreeGrid
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
