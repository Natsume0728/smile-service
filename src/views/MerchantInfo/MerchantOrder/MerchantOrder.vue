<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户别名">
              <el-input v-model="form.merchantAlias" placeholder="请输入商户别名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户级别" placeholder="请输入商户级别">
              <el-input v-model="form.merchantLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称" placeholder="请输入商户名称">
              <el-input v-model="form.merchantName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户编号" placeholder="请输入商户编号">
              <el-input v-model="form.merchantNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效状态" placeholder="请输入有效状态">
              <el-input v-model="form.validSate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getMerchantList">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button @click="add">新增</el-button>
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
        <el-table-column prop="merchantAlias" label="商户别名"></el-table-column>
        <el-table-column prop="merchantLevel" label="商户级别"></el-table-column>
        <el-table-column prop="merchantName" label="商户名称"></el-table-column>
        <el-table-column prop="merchantNo" label="商户编号"></el-table-column>
        <el-table-column prop="validSate" label="有效状态"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row: { validSate, id } }">
            <el-button type="text" @click="handleView(id, 'view')">查看</el-button>
            <el-button type="text" @click="handleEdit(id, 'edit')">编辑</el-button>
            <el-button v-if="validSate === 1" type="text" @click="remove(id)">禁用</el-button>
            <el-button v-if="validSate === 0" type="text" @click="renew(id)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="form.pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'BaseProductManage', // 基础产品管理
  data() {
    return {
      form: {
        'grantState': undefined,
        'merchantNo': undefined,
        'merchantOrderNo': undefined,
        'orderState': undefined,
        'pageIndex': 1,
        'pageSize': 10,
        total: 0,
      },
      tableData: [],
    }
  },
  mounted() {
    this.merchantOrder()
  },
  methods: {
    add() {
      this.$router.push({ name: 'MerchantAdd' })
    },

    handleView(id, pageType) {
      this.$router.push({ name: 'MerchantAdd', params: { id, pageType }})
    },
    handleEdit(id, pageType) {
      this.$router.push({ name: 'MerchantAdd', params: { id, pageType }})
    },

    async remove(merchantId) {
      const { data } = await request({
        method: 'get',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/remove',
        params: {
          merchantId,
        }
      })
      this.getMerchantList()
    },
    async renew(merchantId) {
      const { data } = await request({
        method: 'get',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/renew',
        params: {
          merchantId,
        }
      })
      this.getMerchantList()
    },

    async editSellState(skuId, state) {
      const { data } = await request({
        method: 'get',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/editSellState',
        params: {
          skuId,
          state,
        }
      })
    },

    async merchantOrder() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchantOrder/page',
        data: {
          'grantState': this.form.grantState || undefined,
          'merchantNo': this.form.merchantNo || undefined,
          'merchantOrderNo': this.form.merchantOrderNo || undefined,
          'orderState': this.form.orderState || undefined,
          pageIndex: this.form.pageIndex,
          pageSize: this.form.pageSize,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.form.total = total
      console.log('list', list)
    },
    search() {
      console.log('search!')
    },
    reset() {
      console.log('reset!')
    },
    handleSizeChange() {
      console.log('handleSizeChange!')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange!')
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

