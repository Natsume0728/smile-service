<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
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
                <el-option label="无效" :value="0"></el-option>
                <el-option label="有效" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="auto">
              <el-button type="primary" icon="el-icon-search" @click="getMerchantList">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="auto">
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label-width="auto">
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
        max-height="550"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="merchantNo" label="商户编号"></el-table-column>
        <el-table-column prop="merchantAlias" label="商户别名"></el-table-column>
        <el-table-column prop="merchantName" label="商户名称"></el-table-column>
        <el-table-column prop="merchantLevel" label="商户级别"></el-table-column>
        <el-table-column prop="merchantNoParent" label="上级商户编号"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
        <el-table-column prop="bankAccountName" label="银行账户开户名称"></el-table-column>
        <el-table-column prop="bankAccountNo" label="银行账号"></el-table-column>
        <el-table-column prop="bankName" label="开户银行名称"></el-table-column>
        <el-table-column prop="email" label="联系邮箱" width="150"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="110"></el-table-column>
        <el-table-column label="结算周期">
          <template slot-scope="{ row: { settlementInterval } }">
            {{ settlementInterval === 1 ? '月结' : settlementInterval === 2 ? '季结':'--' }}
          </template>
        </el-table-column>
        <el-table-column label="结算方式">
          <template slot-scope="{ row: { settlementMode } }">
            {{ settlementMode === 1 ? '线下结算' :'--' }}
          </template>
        </el-table-column>

        <el-table-column label="有效状态">
          <template slot-scope="{ row: { validState } }">
            {{ validState === 0 ? '无效' : validState === 1 ? '有效':'--' }}
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
  name: 'MerchantList',
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
        address: undefined,
        bankAccountName: undefined,
        bankAccountNo: undefined,
        bankName: undefined,
        createTime: undefined,
        createUser: undefined,
        email: undefined,
        id: undefined,
        merchantAlias: undefined,
        merchantLevel: undefined,
        merchantName: undefined,
        merchantNo: undefined,
        merchantNoParent: undefined,
        phone: undefined,
        settlementInterval: undefined,
        settlementMode: undefined,
        updateTime: undefined,
        updateUser: undefined,
        validState: undefined,
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
        url: '/manage-api/merchant/remove',
        params: {
          merchantId,
        }
      })
      this.getMerchantList()
    },
    async renew(merchantId) {
      const { data } = await request({
        method: 'get',
        url: '/manage-api/merchant/renew',
        params: {
          merchantId,
        }
      })
      this.getMerchantList()
    },

    async getMerchantList() {
      const { data } = await request({
        method: 'post',
        url: '/manage-api/merchant/page',
        data: {
          merchantAlias: this.form.merchantAlias ?? undefined,
          merchantLevel: this.form.merchantLevel ?? undefined,
          merchantName: this.form.merchantName ?? undefined,
          merchantNo: this.form.merchantNo ?? undefined,
          validState: this.form.validState ?? undefined,
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
</style>

