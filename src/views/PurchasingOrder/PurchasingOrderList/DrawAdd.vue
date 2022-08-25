<template>
  <el-form ref="form3" :model="form3" label-width="auto" label-position="left" style="over-flow: scroll">
    <h3>新增采购单</h3>
    <el-form-item label="供应商编号:" placeholder="请输入供应商编号">
      <el-input v-model="form3.supplierNo"></el-input>
    </el-form-item>
    <el-form-item label="运营标记信息:" placeholder="请输入运营标记信息">
      <el-input v-model="form3.operationSign"></el-input>
    </el-form-item>
    <el-form-item label="备注:" placeholder="请输入备注">
      <el-input v-model="form3.remark"></el-input>
    </el-form-item>
    <el-button type="primary" @click="dialogVisible2 = true">新增商品</el-button>
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
    <el-dialog title="新增采购商品" append-to-body :visible.sync="dialogVisible2" width="60%">

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
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      dialogVisible2: false,
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
    }
  },
  mounted() {
    this.getGoodsSku()
  },
  methods: {
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
    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
    },
  }
}
</script>

<style>

</style>
