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
            <el-form-item label="商户级别">
              <el-input v-model="form.merchantLevel" placeholder="请输入商户级别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商户编号">
              <el-input v-model="form.merchantNo" placeholder="请输入商户编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效状态">
              <el-select v-model="form.validState" placeholder="请输入有效状态">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getMerchantList">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="openDraw(id, 'add')">新增商户</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-container">
      <h3>商户信息</h3>
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
        <el-table-column prop="validState" label="有效状态">
          <template slot-scope="{ row: { validSate } }">
            {{ validState === 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row: { validState, id } }">
            <el-button type="text" @click="openDraw(id, 'view')">查看</el-button>
            <el-button type="text" @click="openDraw(id, 'edit')">编辑</el-button>
            <el-button v-if="validState === 1" type="text" @click="remove(id)">禁用</el-button>
            <el-button v-if="validState === 0" type="text" @click="renew(id)">启用</el-button>
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
    </div>
    <el-drawer title="" :visible.sync="drawer" size="40%" :with-header="false">
      <div class="form-container">
        <DrawView v-if="drawerType === 'view'" :id="drawId" />
        <DrawEdit v-if="drawerType === 'edit'" :id="drawId" @refresh="refresh" />
        <DrawAdd v-if="drawerType === 'add'" @refresh="refresh" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import request from '@/utils/request'
import DrawView from './DrawView.vue'
import DrawAdd from './DrawAdd.vue'
import DrawEdit from './DrawEdit.vue'

export default {
  name: 'BaseProductManage', // 基础产品管理
  components: {
    DrawView,
    DrawAdd,
    DrawEdit,
  },
  data() {
    return {
      drawerType: 'view',
      drawId: null,
      drawer: false,
      form: {
        merchantAlias: '',
        merchantLevel: '',
        merchantName: '',
        merchantNo: '',
        validState: '',
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getMerchantList()
  },
  methods: {
    refresh() {
      this.drawer = false
      this.getMerchantList()
    },

    openDraw(orderId, drawerType) {
      this.drawerType = drawerType
      this.drawId = orderId || undefined
      this.drawer = true
    },
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

    async getMerchantList() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/merchant/page',
        data: {
          'merchantAlias': this.form.merchantAlias || undefined,
          'merchantLevel': this.form.merchantLevel || undefined,
          'merchantName': this.form.merchantName || undefined,
          'merchantNo': this.form.merchantNo || undefined,
          'validState': this.form.validState || undefined,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
      })
      const { list, total } = data
      this.tableData = list
      this.total = total
    },

    reset() {
      this.form = {
        merchantAlias: '',
        merchantLevel: '',
        merchantName: '',
        merchantNo: '',
        validState: '',
      }
      this.refresh()
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
    padding: 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

