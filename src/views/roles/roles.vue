<template>
    <div>
        <el-card class="box-card">
            <!-- 面包屑 -->
          <my-breadcrumb level1="权限管理"  level2="角色列表"></my-breadcrumb>
          <!-- 添加角色 -->
          <el-row class="row-add">
              <el-col :span="24">
                  <el-button>
                      添加角色
                  </el-button>
              </el-col>
          </el-row>
          <!-- 表格 -->
          <el-table
            height="500"
            class="tableRoles"
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
              label="角色名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="path"
              label="角色描述"
              width="150">
            </el-table-column>
            <el-table-column
              prop="level"
              label="操作">
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
  }
};
</script>

<style>
.row-add {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
