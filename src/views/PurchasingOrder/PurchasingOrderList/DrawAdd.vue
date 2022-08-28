<template>
  <div class="container">
    <el-form ref="form3" :model="form3" label-width="auto" label-position="left" class="form">
      <div class="form-container">
        <h3>新增采购单</h3>
        <el-button type="primary" size="small" @click="add">保存采购单</el-button>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="供应商编号:">
              <el-input v-model="form3.supplierNO" placeholder="请输入供应商编号" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营标记信息:">
              <el-input v-model="form3.operationSign" placeholder="请输入运营标记信息" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购备注信息:">
              <el-input v-model="form3.remark" placeholder="请输入备注" size="mini"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      </div>

      <div class="form-container" style="margin-top: 20px; padding-bottom: 0">
        <el-form ref="form" :model="form" label-width="70px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="品类编号">
                <el-input v-model="form.categoryNo" placeholder="品类编号" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品名称">
                <el-input v-model="form.skuName" placeholder="请输入商品名称" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品编号">
                <el-input v-model="form.skuNo" placeholder="请输入商品编号" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="refresh">搜索</el-button>
                <el-button size="mini" @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          max-height="470"
          border
          :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="skuNum" label="商品数量" width="155">
            <template slot-scope="{ row }">
              <el-input-number v-if="row.edit" v-model="row.skuNum" controls-position="right" placeholder="请输入" size="mini"></el-input-number>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="skuNo" label="商品编号"></el-table-column>
          <el-table-column prop="id" label="商品id"></el-table-column>
          <el-table-column prop="skuName" label="商品名称"></el-table-column>
          <el-table-column prop="appDetailUrl" label="对客展示详情链接"></el-table-column>
          <el-table-column prop="appSkuDescription" label="对客展示简单描述"></el-table-column>
          <el-table-column prop="appSkuName" label="对客展示名称"></el-table-column>
          <el-table-column prop="categoryNo" label="商品品类编号"></el-table-column>
          <el-table-column prop="categoryName" label="商品品类名称"></el-table-column>
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

      </div>

    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      tableData: [],
      form3: {
        operationSign: '',
        remark: '',
        supplierNO: '',
      },
      form: {
        skuNo: '',
        skuName: '',
        categoryNo: '',
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      selectedGoods: [],
    }
  },

  watch: {
    drawer(v) {
      if (!v) {
        this.form3 = {
          operationSign: '',
          remark: '',
          supplierNO: '',
        }
        this.reset()
      }
    }
  },

  mounted() {
    this.refresh()
  },
  methods: {
    async add() {
      const detailList = this.tableData.filter(el => el.edit).map(item => {
        return {
          skuNum: item.skuNum,
          skuNo: item.skuNo,
        }
      })
      const { code } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/purchaseOrder/add',
        data: {
          detailList,
          'supplierNO': this.form3.supplierNO,
          'operationSign': this.form3.operationSign || undefined,
          'remark': this.form3.remark || undefined,
        }
      })
      if (code === '0000') this.$emit('refresh')
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
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/page',
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

  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: scroll;
  background-color: #f3f4f6;
  padding-top: 19px;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 23px 30px;
  }
  .table-container {
    padding: 30px;
    padding-top: 0;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
