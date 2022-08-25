<template>
  <el-form ref="form2" :model="form2" label-width="auto" label-position="left">
    <h3>采购单信息</h3>
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
          <div>{{ form2.purchaseState | purchaseStateFilter }}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="备注:">
          <div>{{ form2.remark }}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="供应商编号:">
          <div>{{ form2.supplierNo }}</div>
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

    <h3>采购单商品明细</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="detailId" label="采购单商品id"></el-table-column>
      <el-table-column prop="purchaserNo" label="采购单号" width="120"></el-table-column>
      <el-table-column prop="skuNo" label="商品sku编号" width="110"></el-table-column>
      <el-table-column prop="costPrice" label="商品成本价格"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="skuNum" label="商品数量"></el-table-column>
      <el-table-column label="创建人/更新人" width="110">
        <template slot-scope="{ row: { createUser, updateUser } }">
          <div>
            <div>{{ createUser || '--' }} / {{ updateUser || '--' }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="220">
        <template slot-scope="{ row: { createTime, updateTime } }">
          <div>上线时间: {{ createTime || '--' }}</div>
          <div>修改时间: {{ updateTime || '--' }}</div>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import request from '@/utils/request'

export default {
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
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
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
      tableData: [],
    }
  },
  watch: {
    id: {
      handler(id) {
        this.getOrder(id)
      },
      immediate: true,
    }
  },
  methods: {
    async getOrder(id) {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/get',
        params: { id },
      })
      this.form2 = Object.assign(this.form2, data)
      this.getList()
    },
    async getList() {
      const { data } = await request({
        method: 'GET',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseDetail/list',
        params: { purchaseNo: this.form2.purchaseNo },
      })
      this.tableData = data
    },
  }
}
</script>

<style>

</style>
