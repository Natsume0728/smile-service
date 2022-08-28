<template>
  <div class="container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
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
            <el-form-item label="销售状态">
              <el-select v-model="form.sellState" placeholder="请选择销售状态">
                <el-option label="上架" :value="1"></el-option>
                <el-option label="下架" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :span="8">
            <el-form-item label="商品编号">
              <el-input v-model="form.skuNo" placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="openDraw('add')">新增商品</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="table-container">
      <h3>标准商品sku列表</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="采购单商品id"></el-table-column>
        <el-table-column prop="appDetailUrl" label="对客展示详情链接"></el-table-column>
        <el-table-column prop="appSkuDescription" label="对客展示简单描述"></el-table-column>
        <el-table-column prop="appSkuName" label="对客展示名称"></el-table-column>
        <el-table-column prop="categoryName" label="商品品类名称"></el-table-column>
        <el-table-column prop="categoryNo" label="商品品类编号"></el-table-column>
        <el-table-column prop="skuDesc" label="商品描述"></el-table-column>
        <el-table-column prop="skuName" label="商品名称"></el-table-column>
        <el-table-column prop="skuNo" label="商品sku编号"></el-table-column>
        <el-table-column label="销售状态">
          <template slot-scope="{ row: { sellState } }">
            <div>{{ sellState === 1 ? '上架' : '下架' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建人/更新人">
          <template slot-scope="{ row: { createUser, updateUser } }">
            <div>{{ createUser || '--' }}/{{ updateUser || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="220">
          <template slot-scope="{ row: { createTime, updateTime } }">
            <div>
              <div>上线时间: {{ createTime || '--' }}</div>
              <div>修改时间: {{ updateTime || '--' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row: { id, sellState } }">
            <el-button type="text" @click="openDraw('edit', id)">编辑</el-button>
            <el-button type="text" @click="editSellState(id, sellState === 1 ? 2 : 1)">{{ sellState === 1 ? '下架' : '上架' }}</el-button>
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
        <DrawEdit v-if="drawerType === 'edit'" :id="drawId" @refresh="refresh" />
        <DrawAdd v-if="drawerType === 'add'" :drawer="drawer" @refresh="refresh" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import request from '@/utils/request'
import DrawEdit from './DrawEdit.vue'
import DrawAdd from './DrawAdd.vue'

export default {
  name: 'GoodsList',
  components: {
    DrawAdd,
    DrawEdit,
  },
  data() {
    return {
      drawerType: 'view',
      drawId: null,
      drawer: false,
      form: {
        skuNo: '',
        skuName: '',
        sellState: '',
        categoryNo: '',
      },
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getGoodsSku()
  },
  methods: {
    refresh() {
      this.drawer = false
      this.getGoodsSku()
    },

    openDraw(drawerType, id) {
      this.drawerType = drawerType
      this.drawId = id
      this.drawer = true
    },

    async editSellState(skuId, state) {
      const { code } = await request({
        method: 'get',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/editSellState',
        params: {
          skuId,
          state,
        }
      })
      if (code === '0000') this.refresh()
    },

    async getGoodsSku() {
      const { data } = await request({
        method: 'post',
        url: 'https://dev.defenderfintech.com/smile-api/manage-api/goodsSku/page',
        data: {
          sellState: this.form.sellState || undefined,
          skuNo: this.form.skuNo || undefined,
          skuName: this.form.skuName || undefined,
          categoryNo: this.form.categoryNo || undefined,
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
        skuNo: '',
        skuName: '',
        sellState: '',
        categoryNo: '',
      }
      this.refresh()
    },

  },
}
</script>

<style lang="scss" scoped>
.container {
  // min-height: 100vh;
  min-height: 100%;
  background-color: #f3f4f6;
  padding: 10px 34px 0;
  .form-container, .table-container {
    background: #fff;
  }
  .form-container {
    padding: 23px 30px;
    padding-bottom: 5px;
  }
  .table-container {
    margin-top: 20px;
    padding: 5px 30px;
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

