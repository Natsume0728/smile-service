<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="90px" size="mini">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="运营标记号">
              <el-input v-model="form.operationSign" placeholder="请输入运营标记号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商编号">
              <el-input v-model="form.supplierNo" placeholder="请输入供应商编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购单编号">
              <el-input v-model="form.purchaseNo" placeholder="请输入采购单编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="采购单状态">
              <el-select v-model="form.orderState" placeholder="请输入采购单状态">
                <el-option label="待提交" :value="1"></el-option>
                <el-option label="待审核" :value="2"></el-option>
                <el-option label="取消" :value="3"></el-option>
                <el-option label="审核不通过" :value="4"></el-option>
                <el-option label="审核通过" :value="5"></el-option>
                <el-option label="已到货" :value="6"></el-option>
                <el-option label="已结单" :value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getPurchaseOrder">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="add">新增采购单</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <h3>采购单列表</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="supplierNo" label="供应商编号"></el-table-column>
        <el-table-column prop="purchaseNo" label="采购单编号"></el-table-column>
        <el-table-column prop="operationSign" label="运营标记信息"></el-table-column>
        <el-table-column prop="purchaseState" label="采购状态">
          <template slot-scope="{ row: { purchaseState } }">
            {{ purchaseState | purchaseStateFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="totalCostPrice" label="采购成本总金额"></el-table-column>
        <el-table-column prop="totalNum" label="采购商品总数"></el-table-column>
        <el-table-column prop="totalPrice" label="采购商品总金额"></el-table-column>
        <el-table-column label="创建人/更新人" width="110">
          <template slot-scope="{ row: { createUser, updateUser } }">
            <div>{{ createUser || '--' }} / {{ updateUser || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="220">
          <template slot-scope="{ row: { createTime, updateTime } }">
            <div>上线时间: {{ createTime || '--' }}</div>
            <div>修改时间: {{ updateTime || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row: { id } }">
            <el-button type="text" @click="openDraw(id, 'view')">查看</el-button>
            <el-button type="text" @click="openDialog(id)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="审核" :visible.sync="dialogVisible" width="30%">
      审核意见:<el-input v-model="auditRemark" placeholder="请输入审核意见"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="audit(1)">同意</el-button>
        <el-button type="primary" @click="audit(2)">拒绝</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-drawer title="" :visible.sync="drawer" size="80%" :with-header="false">
      <DrawView v-if="drawerType === 'view'" :id="drawId" />
      <DrawAdd v-if="drawerType === 'add'" :drawer="drawer" @refresh="refresh" />
    </el-drawer>

  </div>
</template>

<script>
import request from '@/utils/request'
import DrawView from './DrawView.vue'
import DrawAdd from './DrawAdd.vue'

export default {
  name: 'BaseProductManage', // 基础产品管理
  components: {
    DrawView,
    DrawAdd,
  },
  filters: {
    purchaseStateFilter(value) {
      if (value === 1) return '待提交'
      if (value === 2) return '待审核'
      if (value === 3) return '取消'
      if (value === 4) return '审核不通过'
      if (value === 5) return '审核通过'
      if (value === 6) return '已到货'
      if (value === 7) return '已结单'
      return '--'
    }
  },
  data() {
    return {
      drawId: null,
      skuTableData: [],
      drawer: false,
      drawerType: 'view',
      auditRemark: '',
      purchaseId: null,
      dialogVisible: false,
      form: {
        operationSign: '',
        orderState: '',
        purchaseNo: '',
        supplierNo: '',
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getPurchaseOrder()
  },
  methods: {
    refresh() {
      this.drawer = false
      this.getPurchaseOrder()
    },

    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
    },

    add() {
      this.drawerType = 'add'
      this.drawer = true
    },

    openDraw(id) {
      this.drawerType = 'view'
      this.drawId = id
      this.drawer = true
    },

    openDialog(id) {
      this.purchaseId = id
      this.dialogVisible = true
    },

    async audit(auditState) {
      const { code } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/audit',
        data: {
          auditRemark: this.auditRemark,
          auditState,
          purchaseId: this.purchaseId,
        }
      })
      if (code === '0000') {
        this.dialogVisible = false
        this.refresh()
      }
    },

    handleView(id, pageType) {
      // this.$router.push({ name: 'PurchasingOrderAdd', params: { id, pageType }})

    },

    async getPurchaseOrder() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/page',
        data: {
          'operationSign': this.form.operationSign || undefined,
          'orderState': this.form.orderState || undefined,
          'purchaseNo': this.form.purchaseNo || undefined,
          'supplierNo': this.form.supplierNo || undefined,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.total = total
      console.log('list', list)
    },

    reset() {
      this.form = {
        operationSign: '',
        orderState: '',
        purchaseNo: '',
        supplierNo: '',
      }
      this.getPurchaseOrder()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

