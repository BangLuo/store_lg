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
            <el-input placeholder="请输入内容" clearable v-model="searchValue" class="input-with-select" >
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
            <el-button type="success" @click="dialogVisible = true" plain>添加用户</el-button>
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
                @change="handleSwitchChange(scope.row)"
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
                  <el-button type="success" icon="el-icon-delete" plain size="mini" @click="handelDel(scope.row.id)"></el-button>
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
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 弹出框部分 -->
        <!-- 添加用户 -->
        <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="60%">
        <el-form label-position="right" label-width="120px" :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.username"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" ></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </el-dialog>
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
      pagenum: 1, // 当前显示页
      pagesize: 6, // 每页多少条显示
      total: 0, // 总共有多少条从后台获取
      // 绑定搜索框
      searchValue: '',
      // 添加用户对话框的配置数据
      dialogVisible: false,
      handleClose: true,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
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
    //  加载获取数据
    async loadData () {
      // 发送前获取token
      const token = sessionStorage.getItem('token');
      // console.log(token);
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 获取总条数
        const { data: { users, total } } = data;
        // 给数据赋值
        this.total = total;
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    },
    // 搜索功能
    handleSearch () {
      this.loadData();
      this.loading = false;
    },
    // 开关改变状态功能
    async handleSwitchChange (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const meta = res.data.meta;
      if (meta.status === 200) {
        this.$message(meta.msg);
      } else {
        this.$message.error('修改用户状态失败');
      }
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.loadData();
    },
    // 删除功能
    async handelDel (userId) {
      const res = await this.$http.delete(`users/${userId}`);
      const meta = res.data.meta;
      if (meta.status === 200) {
        this.$message(meta.msg);
        this.loadData();
        this.loading = false;
      } else {
        this.$message.error('删除失败');
      }
    },
    // 添加弹出层功能
    async handleAdd () {
      const res = await this.$http.post('users', this.form);
      const meta = res.data.meta;
      if (meta.status === 201) {
        this.$message(meta.msg);
        this.dialogVisible = false;
      } else if (meta.status === 400) {
        this.$message('该用户已经存在');
      } else {
        this.$message('添加用户失败');
      }
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
