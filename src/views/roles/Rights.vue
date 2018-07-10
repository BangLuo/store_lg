<template>
    <div>
        <el-card class="box-card">
            <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 表格 -->
          <el-table
            class="tableRights"
            stripe
            border
            :data="list"
            style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
              prop="authName"
              label="权限名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="path"
              label="路径"
              width="150">
            </el-table-column>
            <el-table-column
              prop="level"
              label="层级"
             >
            </el-table-column>
          </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      const res = await this.$http.get('rights/list');
      console.log(res.data);
      this.list = res.data.data;
    }
  }
};
</script>

<style>
.tableRights {
  margin-top: 15px;
}
</style>
