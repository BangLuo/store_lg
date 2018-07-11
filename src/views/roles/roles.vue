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
                 <!-- 没有权限显示无权限 -->
                 <!-- <el-row
                 v-if="scope.length === 0?"> -->

                 </el-row>
                <el-row
                class="level1"
                v-for="item1 in scope.row.children"
                :key="item1.id"
                >
                
                  <!-- 显示一级权限 -->
                  <el-col :span="4">
                    <el-tag @close="handleClose(scope.row,item1.id)" closable>{{ item1.authName }}</el-tag>
                  </el-col>
                  <el-col :span="20">
                     <!-- 二级权限 -->
                    <el-row
                    v-for="item2 in item1.children"
                    :key="item2.id">
                      <el-col :span="4">
                        <el-tag closable @close="handleClose(scope.row,item2.id)"  type="success">{{ item2.authName }}</el-tag>
                      </el-col>
                      <!-- 三级权限 -->
                      <el-col :span="20">
                        <el-tag
                        @close="handleClose(scope.row,item3.id)"
                        calss="level3"
                        closable
                        type="error"
                        v-for="item3 in item2.children"
                        :key="item3.id">
                        {{ item3.authName}}
                        </el-tag>
                      </el-col>
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
    },
    // 删除对应权限
    async handleClose (role, rightId) {
      const { data: resData } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const { data, meta: { status, msg } } = resData;
      if (status === 200) {
        // 重新渲染下拉展开
        this.$message.success(msg);
        // this.loadData();数据全部渲染 用户体验差
        // 通过更改scope.row.children 并保持权限展开 拿到role 更改参数即可
        role.children = data;
      } else {
        this.$message.error(msg);
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
.level3 {
  margin: 5px, 10px;
}
.level1 {
  margin-bottom: 10px;
}
</style>
