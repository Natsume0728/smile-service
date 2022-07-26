<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row :gutter="100">
          <el-col :span="6">
            <el-form-item label="消费者手机号">
              <el-input v-model="form.phone" placeholder="请输入消费者手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保单号">
              <el-input v-model="form.policyNo" placeholder="请输入保单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="唯一码">
              <el-input v-model="form.uniqueCode" placeholder="请输入唯一码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商户订单编号">
              <el-input v-model="form.merchantOrderNo" placeholder="请输入商户订单编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="6">
            <el-form-item label="发放状态">
              <el-select v-model="form.grantState" placeholder="请输入发放状态">
                <el-option label="未发放" :value="0"></el-option>
                <el-option label="已发放" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="领取状态">
              <el-select v-model="form.receiveState" placeholder="请选择领取状态">
                <el-option label="待领取" :value="0"></el-option>
                <el-option label="已领取" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="auto">
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="auto">
              <el-button @click="reset">重置</el-button>
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
        <el-table-column prop="userId" label="系统用户ID"></el-table-column>
        <el-table-column prop="grantState" label="发放状态">
          <template slot-scope="{ row: { grantState } }">
            <div>{{ grantState === 0 ? '未发放' : grantState === 1 ? '已发放' : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="merchantOrderNo" label="商户订单编号" width="170"></el-table-column>
        <el-table-column prop="phone" label="消费者手机号"></el-table-column>
        <el-table-column prop="policyNo" label="保单号"></el-table-column>
        <el-table-column label="领取状态">
          <template slot-scope="{ row: { receiveState } }">
            <div>{{ receiveState === 0 ? '待领取' : receiveState === 1 ? '已领取' : '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="uniqueCode" label="唯一识别码"></el-table-column>
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
        <el-table-column label="操作" width="60">
          <template slot-scope="{ row: { consumerId } }">
            <el-button type="text" @click="remove(consumerId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page.sync="pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size.sync="pageSize"
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
  name: 'MerchantOrderCustomList',

  data() {
    return {
      merchantOrderNo: null,
      id: null,
      drawer: false,
      form: {
        grantState: undefined,
        phone: undefined,
        policyNo: undefined,
        receiveState: undefined,
        uniqueCode: undefined,
      },
      pageSize: 10,
      pageIndex: 1,
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

    async receive(consumerId) {
      const { code } = await request({
        method: 'GET',
        url: '/manage-api/merchantOrderConsumer/receive',
        params: { consumerId },
      })
      if (code === '0000') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.refresh()
      }
    },

    async remove(consumerId) {
      this.$confirm('确认删除?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { code } = await request({
            method: 'GET',
            url: '/manage-api/merchantOrderConsumer/remove',
            params: { consumerId },
          })
          if (code === '0000') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.refresh()
          }
        })
        .catch(err => { console.log(err) })
    },

    async merchantOrderDetail() {
      const { data } = await request({
        method: 'POST',
        url: '/manage-api/merchantOrderConsumer/page',
        data: {
          merchantOrderNo: this.merchantOrderNo,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          grantState: this.form.grantState ?? undefined,
          phone: this.form.phone ?? undefined,
          policyNo: this.form.policyNo ?? undefined,
          receiveState: this.form.receiveState ?? undefined,
          uniqueCode: this.form.uniqueCode ?? undefined,
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

