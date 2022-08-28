<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
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
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="add">新增商户订单商品</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <h3>商户订单商品明细</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="detailId" label="商户订单明细id"></el-table-column>
        <el-table-column prop="merchantOrderNo" label="商户订单编号"></el-table-column>
        <el-table-column prop="skuNo" label="商户订单商品sku编号"></el-table-column>
        <el-table-column prop="skuNum" label="商品数量(每人)"></el-table-column>
        <el-table-column prop="exchangeLimit" label="领取后兑换时间限制"></el-table-column>
        <el-table-column prop="exchangeLimitUnit" label="领取后兑换时间限制单位" width="180">
          <template slot-scope="{ row: { exchangeLimitUnit } }">
            <div>{{ exchangeLimitUnit === 1 ? '日' : exchangeLimitUnit === 2 ? '月' : exchangeLimitUnit === 3 ? '年' : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="grantMode" label="发放形式">
          <template slot-scope="{ row: { grantMode } }">
            <div>{{ grantMode === 1 ? '一次性发放' : grantMode === 2 ? '每月度发放' : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="220">
          <template slot-scope="{ row: { createTime, updateTime } }">
            <div>创建时间: {{ createTime || '--' }}</div>
            <div>更新时间: {{ updateTime || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建人/更新人">
          <template slot-scope="{ row: { createUser, updateUser } }">
            <div>{{ createUser || '--' }}/{{ updateUser || '--' }}</div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="refresh"
          @current-change="refresh"
        >
        </el-pagination>
      </div>

      <el-drawer title="" :visible.sync="drawer" size="80%" :with-header="false">
        <DrawAdd :id="id" :drawer="drawer" @refresh="refresh" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import DrawAdd from './DrawAdd.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MerchantOrderGoodslist',

  components: {
    DrawAdd,
  },
  data() {
    return {
      merchantOrderNo: null,
      id: null,
      drawer: false,
      form: {
        'grantState': undefined,
        'merchantNo': undefined,
        'merchantOrderNo': undefined,
        'orderState': undefined,
      },
      'pageSize': 10,
      'pageIndex': 1,
      total: 0,
      tableData: [],
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

  mounted() {
    this.merchantOrderNo = this.$route?.params?.merchantOrderNo
    this.id = this.$route?.params?.id
    this.refresh()
  },
  methods: {

    async merchantOrderDetail() {
      const { data } = await request({
        method: 'POST',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrderDetail/page',
        data: {
          'grantMode': undefined,
          'merchantOrderNo': this.merchantOrderNo,
          'pageIndex': this.pageIndex,
          'pageSize': this.pageSize,
          'skuNo': undefined,
        },
      })

      const { list, total } = data
      this.tableData = list
      this.total = total
    },

    refresh() {
      this.drawer = false
      this.merchantOrderDetail()
    },

    add() {
      this.drawer = true
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
      this.refresh()
    },

  },
}
</script>

<style lang="scss" scoped>

</style>

