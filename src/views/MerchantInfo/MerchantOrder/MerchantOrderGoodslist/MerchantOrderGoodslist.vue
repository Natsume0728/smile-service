<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="订单编号">
              <el-input v-model="form.merchantOrderNo" placeholder="请输入订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单商品编号">
              <el-input v-model="form.skuNo" placeholder="请输入订单商品编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="发放形式">
              <el-select v-model="form.grantMode" placeholder="请选择发放形式">
                <el-option label="一次性发放" :value="1"></el-option>
                <el-option label="每月度发放" :value="2"></el-option>
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
        <el-table-column prop="merchantOrderNo" label="订单编号" width="170"></el-table-column>
        <el-table-column prop="skuNo" label="订单商品编号"></el-table-column>
        <el-table-column prop="skuNum" label="商品数量(每人)"></el-table-column>
        <el-table-column prop="exchangeLimit" label="领取后兑换时间限制"></el-table-column>
        <el-table-column prop="exchangeLimitUnit" label="领取后兑换时间限制单位">
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
        <el-table-column label="操作" width="100">
          <template slot-scope="{ row }">
            <el-button type="text" @click="openDraw('edit', row.detailId)">编辑</el-button>
            <el-button type="text" @click="remove(row.detailId)">删除</el-button>
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

      <el-drawer title="" :visible.sync="drawer" :size="drawerType === 'add' ? '80%' : '50%'" :with-header="false">
        <DrawEdit v-if="drawerType === 'edit'" :drawer="drawer" :detail-id="detailId" @refresh="refresh" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import DrawEdit from './DrawEdit.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MerchantOrderGoodslist',

  components: {
    DrawEdit,
  },
  data() {
    return {
      drawerType: 'add',
      detailId: null,
      drawer: false,
      merchantOrderNo: null,
      id: null,
      form: {
        grantMode: undefined,
        skuNo: undefined,
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

    async remove(detailId) {
      this.$confirm('确认删除?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { code } = await request({
            method: 'GET',
            url: '/manage-api/merchantOrderDetail/remove',
            params: { detailId },
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
        url: '/manage-api/merchantOrderDetail/page',
        data: {
          'grantMode': this.form.grantMode || undefined,
          skuNo: this.form.skuNo || undefined,
          'merchantOrderNo': this.merchantOrderNo,
          'pageIndex': this.pageIndex,
          'pageSize': this.pageSize,
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

    openDraw(drawerType, detailId) {
      this.drawerType = drawerType
      this.detailId = detailId
      this.drawer = true
    },

    reset() {
      this.form = {
        grantMode: undefined,
        skuNo: undefined,
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

