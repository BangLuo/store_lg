<template>
    <div>
      <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="订单管理"  level2="订单列表"></my-breadcrumb>
        <!--省市区三级联动-->
        <el-cascader
          class="addaddress"
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
        <!-- 表格 -->
        <el-table
          v-loading="loading"
          stripe
          border
          :data="orderList"
          style="width: 100%">
          <el-table-column
          type="index"
          width="50">
          </el-table-column>
          <el-table-column
          prop="order_number"
          label="订单编号"
          >
          </el-table-column>
          <el-table-column
          label="是否付款">
          <template slot-scope="scope">
            <el-row>
              <el-col :span=24>
                <span v-if="scope.row.order_pay === '0'">
                    <el-button plain type="warning">未付款</el-button>
                </span>
               <span v-else-if="scope.row.order_pay === '1'">
                  <el-button plain type="success">已付款</el-button>
                </span>
              </el-col>
            </el-row>
          </template>
          </el-table-column>
          <el-table-column
          prop="is_send"
          label="是否发货">
          </el-table-column>
           <el-table-column
          prop="create_time"
          label="下单时间">
            <template slot-scope="scope">
              {{ scope.row.create_time | fmData('YYYY-MM-DD') }}
            </template>
            </el-table-column>
          <el-table-column
            prop="level"
            label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
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
import {regionData} from 'element-china-area-data';
export default {
  data () {
    return {
      loading: false,
      pagenum: 1,
      pagesize: 5,
      total: -1,
      orderList: [],
      // 级联
      options: regionData,
      selectedOptions: []
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 获取订单列表
    async loadData() {
      const {data: resData} = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log('订单列表', resData);
      const {data: { goods, total }, meta: { status, msg }} = resData;
      if (status === 200) {
        this.total = total;
        this.orderList = goods;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.loading = true;
      this.pagesize = val;
      this.loadData();
      this.loading = false;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.loading = true;
      this.pagenum = val;
      this.loadData();
      this.loading = false;
    },
    // 地区级联
    handleChange (value) {
      console.log(value);
    }
  }
};
</script>

<style>
.addaddress {
  margin-top: 15px;
  margin-bottom: 15px;
}
.pagenations{
  margin-top: 15px;
}
</style>
