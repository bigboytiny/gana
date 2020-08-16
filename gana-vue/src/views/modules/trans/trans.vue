<template>
  <div class="mod-log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="订单号">
        <el-input v-model="dataForm.mchOrderId" placeholder="订单号" clearable></el-input>
      </el-form-item>
      <el-form-item label="支付类型">
        <el-select
          v-model="dataForm.channelId"
          @focus="getChannelId"
          placeholder="支付类型">
          <el-option
            v-for="item in dataForm.channels"
            :key="item.channelCode"
            :label="item.channelName"
            :value="item.channelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易日期">
        <el-date-picker
          v-model="dataForm.transDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column align="center">
        <el-table-column prop="transDate" header-align="center" align="center" width="150" label="交易日期">
            <template slot-scope="scope">{{scope.transDate| dateYMDFormat}}</template>
        </el-table-column>
        <el-table-column prop="mchOrderId" header-align="center" align="center" width="150" label="订单号"></el-table-column>
        <el-table-column prop="payOrderId" header-align="center" align="center" width="150" label="支付订单号"></el-table-column>
        <el-table-column prop="channelOrderNo" header-align="center" align="center" width="150" label="渠道订单号"></el-table-column>
        <el-table-column prop="channelId" header-align="center" align="center" width="90" label="支付类型"></el-table-column>
        <el-table-column prop="amount" header-align="center" align="center"  width="90" label="交易金额"></el-table-column>
        <el-table-column prop="status" header-align="center" align="center" width="50" label="状态"></el-table-column>
        <el-table-column prop="device" header-align="center" align="center" width="50" label="设备"></el-table-column>
        <el-table-column prop="deviceSn" header-align="center" align="center" width="120" label="设备唯一ID"></el-table-column>
        <el-table-column prop="subject" header-align="center" align="center" width="90" :show-overflow-tooltip="true" label="商品标题"></el-table-column>
        <el-table-column prop="body" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="商品描述"></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          mchOrderId: '',
          channels:[{
                       channelCode: '0',
                       channelName: '全部'
                     }],
          channelId: '0',
          transDate: ['','']
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        selectionDataList: []
      }
    },
    created () {
      //this.getChannelId();
      this.getDataList();
    },
    methods: {
      getChannelId(){
          this.$http({
            url: this.$http.adornUrl('/trans/trans/getChannels'),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.channels = data.channels
              console.log(this.dataForm.channels);
            }
          });
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/trans/trans/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'mchOrderId': this.dataForm.mchOrderId,
            'channelId': this.dataForm.channelId,
            'transDate': this.dataForm.transDate,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      }
    }
  }
</script>
