<template>
    <div>
      <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
           <!-- 搜索框 #app公共样式影响 -->
        <el-row class="search">
          <el-col :span="24" >
            <el-input placeholder="请输入内容" clearable  class="input-with-select" >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain>添加用户</el-button>
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
              prop="username"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="电话"
              width="150">
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="150">
              <template slot-scope="scope">
              {{ scope.row.create_time | fmData('YYYY-MM-DD') }}
              </template>
            </el-table-column>
             <el-table-column
              prop="mobile"
              label="用户状态"
              width="100">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
             <el-table-column
              prop="mg_status"
              label="操作"
              width="200">
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
          :current-page="pagenum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表数据
      list: [],
      loading: true,
      // 分页相关数据
      pagenum: 1,
      pagesize: 100,
      total: 0
    };
  },
  created () {
    // 发送请求获取数据前 验证token
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$router.push({name: 'login'});
    }
    this.loadData();
    this.loading = false;
  },
  methods: {

    async loadData () {
      // 发送前获取token
      const token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get('users?pagenum=1&pagesize=5');
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const { data: { users } } = data;
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.search {
  margin-top: 15px;
  margin-bottom: 15px;
}
.search .el-input {
  width: 300px;
}
.pagenations{
  margin-top: 15px;
}
</style>
