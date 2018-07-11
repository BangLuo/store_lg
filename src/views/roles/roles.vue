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
            v-loading="loading"
            height="500"
            class="tableRoles"
            stripe
            border
            :data="list"
            style="width: 100%">
            <el-table-column
            type="expand">
              <template slot-scope="scope">
                <!-- 当前角色的权限列表
                scope.row ==>{roleName , 
                roleDesc children 当前角色的所有权限}
                 -->
                <el-row
                v-for="item1 in scope.row.children"
                :key="item1.id"
                >
                  <!-- 显示一级权限 -->
                  <el-col :span="4">
                    <el-tag>{{ item1.authName }}</el-tag>
                  </el-col>
                 
                  <el-col :span="20">
                     <!-- 二级权限 -->
                    <el-row
                    v-for="item2 in item1.children"
                    :key="item2.id">
                      <el-row :span="4">
                        <el-tag type="success">{{ item2.authName }}</el-tag>
                      </el-row>
                      <el-row :span="20">

                      </el-row>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="roleDesc"
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
      list: [],
      loading: true
    };
  },
  created () {
    this.loadData();
    this.loading = false;
  },
  methods: {
    // 加载角色列表
    async loadData () {
      const {data: resData} = await this.$http.get('roles');
      // 解析响应数据
      console.log('resData', resData);
      const {data, meta} = resData;
      if (meta.status === 200) {
        this.list = data;
      } else {
        this.$message.error(meta.msg);
      }
    }
  }
};
</script>

<style>
.row-add {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
