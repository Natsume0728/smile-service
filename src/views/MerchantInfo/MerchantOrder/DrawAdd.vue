<template>
  <div>
    <el-form ref="addOrderForm" :model="form" inline label-width="auto" label-position="left" size="mini">
      <h3>新增商户订单信息</h3>
      <el-form-item label="订单权益发放份数:" prop="grantNum">
        <el-input-number v-model="form.grantNum" controls-position="right" placeholder="请输入" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="权益发放时间:" prop="grantTimeBegin">
        <el-date-picker
          v-model="form.grantTimeBegin"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择权益发放时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="权益发放后领取截止时间限制:">
        <el-date-picker
          v-model="form.receiveTimeLimit"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择领取截止时间"
        >
        </el-date-picker>
      </el-form-item>

      <h3>新增商户订单消费者信息</h3>
      <el-table
        :data="customTable"
        style="width: 100%"
        max-height="300"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="消费者手机号">
          <template slot-scope="{ row }">
            <el-input v-model="row.phone" size="mini" placeholder="请输入消费者手机号"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="车牌号">
          <template slot-scope="{ row }">
            <el-input v-model="row.carNo" size="mini" placeholder="请输入车牌号"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="保单号">
          <template slot-scope="{ row }">
            <el-input v-model="row.policyNo" size="mini" placeholder="请输入保单号"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row: { uuidv4 }, $index }">
            <el-button v-if="$index === customTable.length - 1" size="mini" type="text" @click="addOneCustom">增加一条</el-button>
            <el-button type="text" size="mini" @click="delOneCusomt(uuidv4)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <h3>新增商户订单商品信息</h3>
      <el-button type="primary" style="margin-bottom: 10px" size="mini" @click="dialogVisible = true">选择商品</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="300"
        border
        :header-cell-style="{ background: '#f9f9f9', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="领取后兑换时间限制" width="155">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.exchangeLimit" controls-position="right" placeholder="请输入" :min="0" size="mini"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="领取后兑换时间限制单位" width="120">
          <template slot-scope="{ row }">
            <el-select v-model="row.exchangeLimitUnit" placeholder="请选择" size="mini">
              <el-option v-for="item in limitTimeUnitTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="发放形式" width="130">
          <template slot-scope="{ row }">
            <el-select v-model="row.grantMode" placeholder="请选择" size="mini">
              <el-option v-for="item in grantModeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="skuNum" label="商品数量(每人)" width="155">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.skuNum" controls-position="right" placeholder="请输入" :min="0" size="mini"></el-input-number>
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

      <el-form-item>
        <el-button type="primary" style="margin-top: 10px" @click="addOrder">保存订单</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
    <el-dialog
      title="商品列表"
      :visible.sync="dialogVisible"
      width="80%"
      append-to-body
    >
      <goodsComponents :visible.sync="dialogVisible" @getSelectedGoods="getSelectedGoods" />
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import goodsComponents from '@/views/components/goodsComponents.vue'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    goodsComponents,
  },

  props: {
    drawer: {
      type: Boolean,
      default: null,
    }
  },
  data() {
    return {
      tableData: [],
      customTable: [
        {
          uuidv4: uuidv4(),
          phone: undefined,
          carNo: undefined,
          policyNo: undefined,
        },
      ],
      dialogVisible: false,
      form: {
        grantNum: undefined,
        grantTimeBegin: undefined,
        receiveTimeLimit: undefined,
      },
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
    delOneCusomt(uuidv4) {
      this.customTable = this.customTable.filter(item => item.uuidv4 !== uuidv4)
    },
    addOneCustom() {
      this.customTable.push({
        uuidv4: uuidv4(),
        phone: undefined,
        carNo: undefined,
        policyNo: undefined,
      })
    },
    getSelectedGoods(val) {
      this.tableData = val
    },

    cancel() {
      this.$emit('refresh')
    },

    reset() {
      this.form = {
        grantNum: undefined,
        grantTimeBegin: undefined,
        receiveTimeLimit: undefined,
      }
      this.tableData = []
      this.customTable = [
        {
          uuidv4: uuidv4(),
          phone: undefined,
          carNo: undefined,
          policyNo: undefined,
        },
      ]
    },
    async addOrder() {
      if (!this.form.grantNum || !this.form.grantTimeBegin) {
        this.$message({
          type: 'error',
          message: '商户订单信息填写有误'
        })
        return
      }
      const customValidate = this.customTable.every(item => item.phone)
      if (!customValidate) {
        this.$message({
          type: 'error',
          message: '消费者信息填写有误'
        })
        return
      }
      const detailList = this.tableData.map(item => {
        return {
          exchangeLimit: item.exchangeLimit,
          exchangeLimitUnit: item.exchangeLimitUnit,
          grantMode: item.grantMode,
          skuNum: item.skuNum,
          skuNo: item.skuNo,
        }
      })
      const goodsValidate = detailList?.length && detailList.every((goods) => {
        if (goods.skuNum && goods.grantMode) {
          if (goods.grantMode === 2) {
            return true
          } else {
            return !!goods.exchangeLimit
          }
        } else {
          return false
        }
      })
      if (!goodsValidate) {
        this.$message({
          type: 'error',
          message: '商品信息填写有误'
        })
        return
      }
      const { code, data: orderId } = await request({
        method: 'post',
        url: '/manage-api/merchantOrder/add',
        data: {
          grantNum: this.form.grantNum || undefined,
          grantTimeBegin: this.form.grantTimeBegin || undefined,
          receiveTimeLimit: this.form.receiveTimeLimit || undefined,
        },
      })
      if (code === '0000') {
        Promise.all([this.addMerchantOrderDetail(orderId), this.addMerchantOrderConsumerAll(orderId)]).then((values) => {
          console.log(values)
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$emit('refresh')
        })
      }
    },

    async addMerchantOrderConsumer(orderId, phone, carNo, policyNo) {
      await request({
        method: 'POST',
        url: '/manage-api/merchantOrderConsumer/add',
        data: {
          phone,
          carNo,
          policyNo,
          orderId,
        },
      })
    },
    async addMerchantOrderConsumerAll(orderId) {
      Promise.all(this.customTable.map(el => this.addMerchantOrderConsumer(orderId, el.phone, el.carNo, el.policyNo)))
    },
    async addMerchantOrderDetail(orderId) {
      const detailList = this.tableData.map(item => {
        return {
          exchangeLimit: item.exchangeLimit,
          exchangeLimitUnit: item.exchangeLimitUnit,
          grantMode: item.grantMode,
          skuNum: item.skuNum,
          skuNo: item.skuNo,
        }
      })
      await request({
        method: 'post',
        url: '/manage-api/merchantOrderDetail/add',
        data: {
          orderId,
          detailList,
        }
      })
    },
  }
}
</script>

<style>

</style>
