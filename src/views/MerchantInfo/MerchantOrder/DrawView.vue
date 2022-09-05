<template>
  <div>
    <el-form ref="addOrderForm" :model="form" inline label-width="auto" label-position="left" size="mini">
      <h3>商户订单信息</h3>
      <el-form-item label="订单权益发放份数:" prop="grantNum">
        <div>{{ form.grantNum || '--' }}</div>
      </el-form-item>
      <el-form-item label="权益发放时间:" prop="grantTimeBegin">
        <div>{{ form.grantTimeBegin || '--' }}</div>
      </el-form-item>
      <el-form-item label="权益发放后领取截止时间限制:">
        <div>{{ form.receiveTimeLimit || '--' }}</div>
      </el-form-item>

      <h3>商户订单消费者信息</h3>
      <el-table
        :data="customTable"
        style="width: 100%"
        max-height="200"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="消费者手机号">
          <template slot-scope="{ row }">
            <div>{{ row.phone || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="车牌号">
          <template slot-scope="{ row }">
            <div>{{ row.carNo || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="保单号">
          <template slot-scope="{ row }">
            <div>{{ row.policyNo || '--' }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page.sync="customPageIndex"
          :page-sizes="[5, 10]"
          :page-size.sync="customPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="customTotal"
          @size-change="merchantOrderConsumer"
          @current-change="merchantOrderConsumer"
        >
        </el-pagination>
      </div>

      <h3>商户订单商品信息</h3>
      <el-table
        :data="[...tableData, ...tableData]"
        style="width: 100%"
        max-height="350"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="领取后兑换时间限制" width="155">
          <template slot-scope="{ row }">
            <div>{{ row.exchangeLimit || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="领取后兑换时间限制单位" width="120">
          <template slot-scope="{ row }">
            <div>
              {{
                row.exchangeLimitUnit === 1 ? '日' :
                row.exchangeLimitUnit === 2 ? '月' :
                row.exchangeLimitUnit === 3 ? '年' :
                '--'
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发放形式" width="130">
          <template slot-scope="{ row }">
            <div>{{ row.grantMode === 1 ? '一次性发放' : row.grantMode === 2 ? '每月度发放' : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="skuNum" label="商品数量(每人)" width="155">
          <template slot-scope="{ row }">
            <div>{{ row.skuNum || '--' }}</div>
          </template>
        </el-table-column>
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
          @size-change="merchantOrderDetail"
          @current-change="merchantOrderDetail"
        >
        </el-pagination>
      </div>

    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  props: {
    orderId: {
      type: Number,
      default: null,
    },
    merchantOrderNo: {
      type: String,
      default: null,
    },
    drawer: {
      type: Boolean,
      default: null,
    }
  },
  data() {
    return {
      form: {
        grantNum: undefined,
        grantTimeBegin: undefined,
        receiveTimeLimit: undefined,
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      customTable: [],
      customPageIndex: 1,
      customPageSize: 5,
      customTotal: 0,
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
    orderId: {
      handler() {
        this.getMerchantOrder()
      },
      immediate: true,
    },

    merchantOrderNo: {
      handler() {
        this.merchantOrderConsumer()
        this.merchantOrderDetail()
      },
      immediate: true,
    },

    drawer(v) {
      if (!v) {
        this.form = {
          grantNum: undefined,
          grantTimeBegin: undefined,
          receiveTimeLimit: undefined,
        }
      }
    }
  },
  methods: {
    // 订单信息
    async getMerchantOrder() {
      const { data, code } = await request({
        method: 'GET',
        url: '/manage-api/merchantOrder/get',
        params: {
          orderId: this.orderId,
        },
      })
      if (code === '0000') {
        this.form = {
          grantNum: data.grantNum || '--',
          grantTimeBegin: data.grantTimeBegin || '--',
          receiveTimeLimit: data.receiveTimeLimit || '--',
        }
      }
    },
    // 消费者列表
    async merchantOrderConsumer() {
      const { data } = await request({
        method: 'POST',
        url: '/manage-api/merchantOrderConsumer/page',
        data: {
          merchantOrderNo: this.merchantOrderNo,
          pageIndex: this.customPageIndex,
          pageSize: this.customPageSize,
        },
      })

      const { list, total } = data
      this.customTable = list
      this.customTotal = total
    },
    // 商品列表
    async merchantOrderDetail() {
      const { data } = await request({
        method: 'POST',
        url: '/manage-api/merchantOrderDetail/page',
        data: {
          merchantOrderNo: this.merchantOrderNo,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })

      const { list, total } = data
      this.tableData = list
      this.total = total
    },

    cancel() {
      this.$emit('refresh')
    },

  }
}
</script>

<style>

</style>
