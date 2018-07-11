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
                scope.row ==>{roleName , roleDesc children 当前角色的所有权限}
                 -->
                 <!-- 没有权限显示无权限 -->
                 <el-row
                 v-if="scope.row.children.length === 0">
                 <el-col :span="24">该角色无权限</el-col>
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
             <template slot-scope="scope">
                <el-row>
                  <el-button type="primary" icon="el-icon-edit" plain size="mini"  ></el-button>
                  <el-button type="success" icon="el-icon-check" plain size="mini" @click="showCurrentRights(scope.row)" ></el-button>
                  <el-button type="success" icon="el-icon-delete" plain size="mini" ></el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹出对话框 分配角色 -->
          <!-- node-key 给每一个节点绑定一个唯一值 default-checked-keys 数组中的id 就可找到该节点
          因为node-key中需要的id在相应权限中有 即treeData中返回 因此可直接使用id -->
          <el-dialog
            @open="handleShowRightsDialog"
            title="权限分配"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            node-key="id"
            :default-checked-keys="defaultCheckedIdList"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSetRights">确 定</el-button>
            </span>
          </el-dialog>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true,
      // 权限分配 所需数据
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: -1,
      defaultCheckedIdList: []
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
      // console.log('resData', resData);
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
    },
    // 点击对号，显示dialog对话框 获取tree型
    async handleShowRightsDialog () {
      this.dialogVisible = true;
      // 获取treeData数据
      const res = await this.$http.get('rights/tree');
      const { data } = res.data;
      this.treeData = data;
    },
    // 显示当前角色在tree型结构上的权限
    showCurrentRights (role) {
      this.dialogVisible = true;
      console.log(role);
      this.roleId = role.id;
      // 遍历三层权限结构的role 找出第三层权限的id 赋值给书
      const arr = [];
      role.children.forEach((item1) => {
        // arr.push(item1.id);
        // 遍历二级权限
        item1.children.forEach((item2) => {
          // arr.push(item2.id);
          // 遍历三级权限
          item2.children.forEach((item3) => {
            arr.push(item3.id);
          });
        });
      });
      this.defaultCheckedIdList = arr;
    },
    // 设置分配权限
    async handleSetRights () {
      this.dialogVisible = false;
      // 获取选中的nodekeys 和halfnodekeys
      const nodekeys = this.$refs.tree.getCheckedKeys();
      const halfnodekeys = this.$refs.tree.getHalfCheckedKeys();
      const newArr = [...nodekeys, ...halfnodekeys];
      // - 请求路径：roles/:roleId/rights  - 请求方法：post   rids 以 , 分割的权限 ID 列表
      const rids = newArr.join(',');
      const {data: resData} = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: rids
      });
      const { meta: {status, msg} } = resData;
      if (status === 200) {
        // 权限设置成功
        this.dialogVisible = false;
        this.loadData();
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
