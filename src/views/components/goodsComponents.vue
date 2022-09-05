<template>
  <div class="goods-components-container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="70px" size="mini">
        <el-row :gutter="5">
          <el-col :span="6">
            <el-form-item label="商品名称">
              <el-input v-model="form.skuName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品编号">
              <el-input v-model="form.skuNo" placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品类编号">
              <el-input v-model="form.categoryNo" placeholder="品类编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="auto">
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="auto">
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-container">
      <el-table
        :row-key="getRowKey"
        :data="tableData"
        style="width: 100%"
        max-height="500"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" reserve-selection></el-table-column>
        <el-table-column prop="skuNo" label="商品编号"></el-table-column>
        <el-table-column prop="skuName" label="商品名称"></el-table-column>
        <el-table-column prop="appSkuName" label="对客展示名称"></el-table-column>
        <el-table-column prop="appDetailUrl" label="对客展示详情链接"></el-table-column>
        <el-table-column prop="appSkuDescription" label="对客展示简单描述"></el-table-column>
        <el-table-column prop="categoryNo" label="品类编号"></el-table-column>
        <el-table-column prop="categoryName" label="品类名称"></el-table-column>
        <el-table-column prop="skuDesc" label="商品描述"></el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page.sync="pageIndex"
          :page-sizes="[5, 10]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="refresh"
          @current-change="refresh"
        >
        </el-pagination>
      </div>
      <div style="display: flex; justify-content: right;">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'MerchantOrderGoodslistAdd',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        skuNo: '',
        skuName: '',
        categoryNo: '',
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 5,
      selectedGoods: [],
    }
  },

  mounted() {
    this.getGoodsSku()
  },

  methods: {
    confirm() {
      this.$emit('update:visible', false)
      this.$emit('getSelectedGoods', this.selectedGoods)
    },
    cancel() {
      this.$emit('update:visible', false)
      this.$emit('getSelectedGoods', [])
    },
    getRowKey(row) {
      return row.id
    },

    handleSelectionChange(val) {
      this.selectedGoods = val
      const selectedIds = val.map(el => el.id)
      this.tableData.forEach(item => {
        item.edit = selectedIds.includes(item.id)
      })
    },

    refresh() {
      this.getGoodsSku()
    },

    async getGoodsSku() {
      const { data } = await request({
        method: 'post',
        url: '/manage-api/goodsSku/page',
        data: {
          sellState: 1,
          skuNo: this.form.skuNo || undefined,
          skuName: this.form.skuName || undefined,
          categoryNo: this.form.categoryNo || undefined,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          exchangeLimit: null,
          exchangeLimitUnit: null,
          grantMode: null,
          skuNum: null,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.total = total
    },

    reset() {
      this.form = {
        skuNo: '',
        skuName: '',
        categoryNo: '',
      }
      this.refresh()
    },

  },
}
</script>

<style lang="scss" scoped>
.goods-components-container {
  height: 100%;
  background-color: #f3f4f6;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 0;
  }
  .table-container {
    .pagination-container {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

