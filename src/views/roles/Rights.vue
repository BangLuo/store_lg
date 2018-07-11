<template>
    <div>
        <el-card class="box-card">
            <!-- 面包屑 -->
          <my-breadcrumb level1="权限管理"  level2="权限列表"></my-breadcrumb>
          <!-- 表格 -->
          <el-table
            height="500"
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
              label="层级">
               <template slot-scope="scope">
                <span v-if="scope.row.level === '0'">一级</span>
                <span v-else-if="scope.row.level === '1'">二级</span>
                <span v-else-if="scope.row.level === '2'">三级</span>
               </template>
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
