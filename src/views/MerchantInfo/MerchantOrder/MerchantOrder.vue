<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="发放状态">
              <el-select v-model="form.grantState" placeholder="请输入发放状态">
                <el-option label="未发放" value="0"></el-option>
                <el-option label="已发放" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="form.merchantNo" placeholder="请输入商户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户订单编号">
              <el-input v-model="form.merchantOrderNo" placeholder="请输入商户订单编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="订单状态">
              <el-select v-model="form.orderState" placeholder="请输入订单状态">
                <el-option label="待审核" value="1"></el-option>
                <el-option label="已取消" value="2"></el-option>
                <el-option label="审核不通过" value="3"></el-option>
                <el-option label="审核通过" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="merchantOrder">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="add">新增商户订单</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <h3>商户订单</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="grantState" label="发放状态">
          <template slot-scope="{ row: { grantState } }">
            <div>{{ grantState === 0 ? '未发放' : '已发放' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="merchantNo" label="商户编号"></el-table-column>
        <el-table-column prop="merchantOrderNo" label="商户订单编号"></el-table-column>
        <el-table-column prop="orderState" label="订单状态">
          <template slot-scope="{ row: { orderState } }">
            <div>{{ orderState | orderStateFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="{ row: { id } }">
            <el-button type="text" @click="openDraw(id, 'view')">查看</el-button>
            <el-button type="text" @click="submit(id)">提交审核</el-button>
            <el-button type="text" @click="openDialog(id)">审核</el-button>
            <el-button type="text" @click="cancel(id)">取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="form.pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <el-dialog title="审核" :visible.sync="dialogVisible" width="30%">
        审核意见:<el-input v-model="auditForm.auditRemark" placeholder="请输入审核意见"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="audit(4)">审核通过</el-button>
          <el-button type="primary" @click="audit(3)">审核不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <el-drawer title="" :visible.sync="drawer" size="40%">
        <div class="form-container">
          <DrawView v-if="drawerType === 'view'" :id="drawId" />
          <DrawAdd v-if="drawerType === 'add'" @refresh="refresh" />
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import DrawView from './DrawView.vue'
import DrawAdd from './DrawAdd.vue'

export default {
  name: 'BaseProductManage', // 基础产品管理
  filters: {
    orderStateFilter(value) {
      if (value === 1) return '待审核'
      if (value === 2) return '已取消'
      if (value === 3) return '审核不通过'
      if (value === 4) return '审核通过'
      return '--'
    }
  },
  components: {
    DrawView,
    DrawAdd,
  },
  data() {
    return {
      drawId: null,
      drawerType: 'add',
      drawer: false,
      auditForm: {
        orderId: '',
        auditRemark: '',
        auditState: null,
      },
      dialogVisible: false,
      form: {
        'grantState': undefined,
        'merchantNo': undefined,
        'merchantOrderNo': undefined,
        'orderState': undefined,
        'pageIndex': 1,
        'pageSize': 10,
        total: 0,
      },
      tableData: [],
    }
  },
  mounted() {
    this.merchantOrder()
  },
  methods: {
    refresh() {
      this.drawer = false
      this.merchantOrder()
    },

    openDraw(orderId) {
      this.drawerType = 'view'
      this.drawId = orderId
      this.drawer = true
    },

    add() {
      this.drawerType = 'add'
      this.drawer = true
    },

    handleView(id, pageType) {
      this.$router.push({ name: 'MerchantAdd', params: { id, pageType }})
    },
    handleEdit(id, pageType) {
      this.$router.push({ name: 'MerchantAdd', params: { id, pageType }})
    },

    async submit(orderId) {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/submit',
        data: {
          orderId,
        }
      })
      this.merchantOrder()
    },

    async cancel(orderId) {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/cancel',
        data: {
          orderId,
        }
      })
      this.merchantOrder()
    },

    openDialog(id) {
      this.auditForm.orderId = id
      this.dialogVisible = true
    },

    async audit(auditState) {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/audit',
        data: {
          orderId: this.auditForm.orderId,
          auditRemark: this.auditForm.auditRemark,
          auditState,
        }
      })
      this.merchantOrder()
    },

    async merchantOrder() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/page',
        data: {
          'grantState': this.form.grantState || undefined,
          'merchantNo': this.form.merchantNo || undefined,
          'merchantOrderNo': this.form.merchantOrderNo || undefined,
          'orderState': this.form.orderState || undefined,
          pageIndex: this.form.pageIndex,
          pageSize: this.form.pageSize,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.form.total = total
    },
    search() {
      console.log('search!')
    },
    reset() {
      this.form = {
        'grantState': undefined,
        'merchantNo': undefined,
        'merchantOrderNo': undefined,
        'orderState': undefined,
        'pageIndex': 1,
        'pageSize': 10,
        total: 0,
      }
      this.merchantOrder()
    },
    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 19px 34px 0;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 23px 30px;
  }
  .table-container {
    margin-top: 25px;
    padding: 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

