<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="运营标记号">
              <el-input v-model="form.operationSign" placeholder="请输入运营标记号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购单状态">
              <el-input v-model="form.orderState" placeholder="请输入采购单状态"></el-input>
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
            <el-form-item label="供应商编号">
              <el-input v-model="form.supplierNo" placeholder="请输入供应商编号"></el-input>
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
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="operationSign" label="运营标记信息"></el-table-column>
        <el-table-column prop="purchaseNo" label="采购单编号"></el-table-column>
        <el-table-column prop="purchaseState" label="采购状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="supplierNo" label="供应商编号"></el-table-column>
        <el-table-column prop="totalCostPrice" label="采购成本总金额"></el-table-column>
        <el-table-column prop="totalNum" label="采购商品总数"></el-table-column>
        <el-table-column prop="totalPrice" label="采购商品总金额"></el-table-column>
        <el-table-column prop="supplierNo" label="供应商编号"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="updateUser" label="更新人"></el-table-column>

        <el-table-column label="时间" width="220">
          <template slot-scope="{ row: { createTime, updateTime } }">
            <div>
              <div>上线时间: {{ createTime || '--' }}</div>
              <div>修改时间: {{ updateTime || '--' }}</div>
            </div>
          </template>
        </el-table-column>
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

    <el-drawer title="" :visible.sync="drawer" size="40%">
      <div class="form-container">
        <el-form v-if="drawerType === 'view'" ref="form3" :model="form2" label-width="auto" label-position="left">
          <div class="title">采购单信息</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建人:">
                <div>{{ form2.createUser }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间:">
                <div>{{ form2.creteTime }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购单ID:">
                <div>{{ form2.id }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运营标记信息:">
                <div>{{ form2.operationSign }}</div>
                <el-input v-if="drawerType === 'add'" v-model="form2.operationSign"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购单编号:">
                <div>{{ form2.purchaseNo }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购状态:">
                <div>{{ form2.purchaseState }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:">
                <div>{{ form2.remark }}</div>
                <el-input v-if="drawerType === 'add'" v-model="form2.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商编号:">
                <div>{{ form2.supplierNo }}</div>
                <el-input v-if="drawerType === 'add'" v-model="form2.supplierNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购成本总金额:">
                <div>{{ form2.totalCostPrice }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购商品总数:">
                <div>{{ form2.totalNum }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="采购商品总金额:">
                <div>{{ form2.totalPrice }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="更新时间:">
                <div>{{ form2.updateTime }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="更新人:">
                <div>{{ form2.updateUser }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-form v-if="drawerType === 'add'" ref="form3" :model="form3" label-width="auto" label-position="left">
          <div class="title">采购单信息</div>
          <el-form-item label="运营标记信息:" placeholder="请输入运营标记信息">
            <el-input v-model="form3.operationSign"></el-input>
          </el-form-item>
          <el-form-item label="备注:" placeholder="请输入备注">
            <el-input v-model="form3.remark"></el-input>
          </el-form-item>
          <el-form-item label="供应商编号:" placeholder="请输入供应商编号">
            <el-input v-model="form3.supplierNo"></el-input>
          </el-form-item>
          <el-button type="primary" @click="dialogVisible2 = true">新增商品</el-button>
          <el-dialog title="新增采购商品" append-to-body :visible.sync="dialogVisible2" width="50%">

            <el-row :gutter="20">
              <el-col :span="6">
                <el-input v-model="skuForm.categoryNo" placeholder="请输入品类编号"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="skuForm.sellState" placeholder="请输入售卖状态"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="skuForm.skuName" placeholder="请输入商品名称"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="skuForm.skuNo" placeholder="请输入商品编号"></el-input>
              </el-col>
            </el-row>

            <el-table
              :data="skuTableData"
              style="width: 100%"
              border
              :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="skuNo" label="产品编码"></el-table-column>
              <el-table-column prop="skuName" label="产品名称"></el-table-column>
              <el-table-column prop="categoryName" label="商品品类"></el-table-column>
              <el-table-column prop="" label="结算方式（待确定）"></el-table-column>
              <el-table-column label="销售状态">
                <template slot-scope="{ row: { sellState } }">
                  <div>{{ sellState === 1 ? '上架' : '下架' }}</div>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="220">
                <template slot-scope="{ row: { createTime, updateTime } }">
                  <div>
                    <div>上线时间: {{ createTime || '--' }}</div>
                    <div>修改时间: {{ updateTime || '--' }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                :current-page="skuForm.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="skuForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="skuForm.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="audit(1)">确认添加</el-button>
              <el-button @click="dialogVisible2 = false">取 消</el-button>
            </span>
          </el-dialog>
        </el-form>

      </div>
    </el-drawer>

  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'BaseProductManage', // 基础产品管理
  data() {
    return {
      skuTableData: [],
      drawer: false,
      drawerType: 'view',
      auditRemark: '',
      purchaseId: null,
      dialogVisible: false,
      dialogVisible2: false,
      form: {
        operationSign: '',
        orderState: '',
        purchaseNo: '',
        supplierNo: '',
      },
      form2: {
        createUser: '',
        creteTime: '',
        id: '',
        operationSign: '',
        purchaseNo: '',
        purchaseState: '',
        remark: '',
        supplierNo: '',
        totalCostPrice: '',
        totalNum: '',
        totalPrice: '',
        updateTime: '',
        updateUser: '',
      },
      form3: {
        operationSign: '',
        remark: '',
        supplierNo: '',
      },
      skuForm: {
        categoryNo: '',
        sellState: '',
        skuName: '',
        skuNo: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0,
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
    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
    },

    add() {
      this.drawerType = 'add'
      this.drawer = true
      this.form2 = {
        createUser: '',
        creteTime: '',
        id: '',
        operationSign: '',
        purchaseNo: '',
        purchaseState: '',
        remark: '',
        supplierNo: '',
        totalCostPrice: '',
        totalNum: '',
        totalPrice: '',
        updateTime: '',
        updateUser: '',
      }
      this.getGoodsSku()
    },

    async getGoodsSku() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/page',
        data: {
          sellState: this.skuForm.sellState || undefined,
          skuNo: this.skuForm.skuNo || undefined,
          skuName: this.skuForm.skuName || undefined,
          categoryName: this.skuForm.categoryName || undefined,
          pageIndex: this.skuForm.pageIndex,
          pageSize: this.skuForm.pageSize,
        }
      })
      const { list, total } = data
      this.skuTableData = list
      this.skuForm.total = total
    },

    openDraw(id) {
      this.drawerType = 'view'
      this.drawer = true
      this.getOrder(id)
    },

    async getOrder(id) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/get',
        params: { id },
      })
      this.form2 = Object.assign(this.form2, data)
    },

    // async purchaseDetail(id) {
    //   const { data } = await request({
    //     method: 'GET',
    //     url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseDetail/page',
    //     params: { id },
    //   })
    //   this.form2 = Object.assign(this.form2, data)
    // },

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
    padding: 80px 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

