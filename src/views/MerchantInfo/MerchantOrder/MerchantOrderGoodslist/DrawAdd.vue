<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="70px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="品类编号">
              <el-input v-model="form.categoryNo" placeholder="品类编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input v-model="form.skuName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品编号">
              <el-input v-model="form.skuNo" placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询商品</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <h3>标准商品sku列表</h3>
      <el-button type="primary" style="margin-bottom: 10px;" @click="addMerchantOrderDetail">新增勾选商品</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="500"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="领取后兑换时间限制" width="155">
          <template slot-scope="{ row }">
            <el-input-number v-if="row.edit" v-model="row.exchangeLimit" controls-position="right" placeholder="请输入" size="mini"></el-input-number>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="领取后兑换时间限制单位" width="120">
          <template slot-scope="{ row }">
            <el-select v-if="row.edit" v-model="row.exchangeLimitUnit" placeholder="请选择" size="mini">
              <el-option v-for="item in limitTimeUnitTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="发放形式" width="130">
          <template slot-scope="{ row }">
            <el-select v-if="row.edit" v-model="row.grantMode" placeholder="请选择" size="mini">
              <el-option v-for="item in grantModeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="skuNum" label="商品数量(每人)" width="155">
          <template slot-scope="{ row }">
            <el-input-number v-if="row.edit" v-model="row.skuNum" controls-position="right" placeholder="请输入" size="mini"></el-input-number>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="skuName" label="商品名称"></el-table-column>
        <el-table-column prop="appDetailUrl" label="对客展示详情链接"></el-table-column>
        <el-table-column prop="appSkuDescription" label="对客展示简单描述"></el-table-column>
        <el-table-column prop="appSkuName" label="对客展示名称"></el-table-column>
        <el-table-column prop="categoryNo" label="商品品类编号"></el-table-column>
        <el-table-column prop="categoryName" label="商品品类名称"></el-table-column>
        <el-table-column prop="skuDesc" label="商品描述"></el-table-column>
        <el-table-column prop="skuNo" label="商品编号"></el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page.sync="pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="refresh"
          @current-change="refresh"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  name: 'MerchantOrderGoodslistAdd',
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    drawer: {
      type: Boolean,
      default: false,
    }
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
      pageSize: 10,
      selectedGoods: [],
    }
  },

  computed: {
    ...mapGetters([
      'manageCommonEnumDictAll'
    ]),
    limitTimeUnitTypeList() {
      return this.manageCommonEnumDictAll.limitTimeUnitType
    },
    grantModeList() {
      return this.manageCommonEnumDictAll.grantMode
    }
  },

  watch: {
    drawer(v) {
      if (!v) this.reset()
    }
  },

  mounted() {
    this.getGoodsSku()
  },

  methods: {
    async addMerchantOrderDetail() {
      const detailList = this.tableData.filter(el => el.edit).map(item => {
        return {
          exchangeLimit: item.exchangeLimit,
          exchangeLimitUnit: item.exchangeLimitUnit,
          grantMode: item.grantMode,
          skuNum: item.skuNum,
          skuNo: item.skuNo,
        }
      })
      const { code } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrderDetail/add',
        data: {
          orderId: this.id,
          detailList,
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

    addGoods() {
      this.$emit('closeDraw')
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

  },
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
    margin-top: 25px;
    padding: 30px;
    padding-top: 5px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

