<template>
  <div class="mod-user">
    <el-form :inline="true" :model="ruleForm" @keyup.enter.native="getDataList()">
      <el-form-item label="商户号">
        <el-input v-model="ruleForm.memberId" placeholder="请输入商户号" clearable></el-input>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="ruleForm.merName" placeholder="请输入商户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="代理商名称">
        <el-input v-model="ruleForm.agentName" placeholder="请输入代理商名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('instormer:mer:save')" type="primary" @click="addHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList" border v-loading="dataListLoading"
      @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column align="center" label="商户信息">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="memberId" header-align="center" align="center" width="180" label="商户号"></el-table-column>
        <el-table-column prop="merchName" header-align="center" align="center" label="商户名" ></el-table-column>
        <el-table-column prop="agentId" header-align="center" align="center" label="代理商号" ></el-table-column>
        <el-table-column prop="agentName" header-align="center" align="center" label="代理商名称" ></el-table-column>
        <el-table-column prop="opdate" header-align="center" align="center" width="100" label="开户日期">
            <template slot-scope="scope">{{scope.opdate| dateYMDFormat}}</template>
        </el-table-column>
        <el-table-column prop="contactName" header-align="center" align="center" width="60" label="联系人"></el-table-column>
        <el-table-column prop="memberStat" header-align="center" align="center" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.memberStat === 'C'" size="small" type="danger">禁用</el-tag>
            <el-tag v-if="scope.row.memberStat === 'N'" size="small" type="danger">正常</el-tag>
            <el-tag v-if="scope.row.memberStat === 'P'" size="small" type="danger">待审核</el-tag>
            <el-tag v-if="scope.row.memberStat === 'F'" size="small" type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="recCretTime" header-align="center" align="center" label="创建时间">
            <template slot-scope="scope">{{scope.recCretTime| dateYMDHMSFormat}}</template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button v-if="isAuth('instormer:mer:update')" type="text" size="small" @click="updateHandle(scope.row.memberId)">修改</el-button>
            <el-button v-if="isAuth('instormer:mer:examine') && scope.row.memberStat === 'P'" type="text" size="small" @click="examineHandle(scope.row.memberId)">审核</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <only-examine v-if="onlyExamineVisible" ref="onlyExamine" @refreshDataList="getDataList"></only-examine>
    <only-update v-if="onlyUpdateVisible" ref="onlyUpdate" @refreshDataList="getDataList"></only-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import OnlyUpdate from './mer-update'
  import OnlyExamine from './mer-examine'
  export default {
    data () {
      return {
        ruleForm: {
          merchName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        onlyUpdateVisible: false,
        onlyExamineVisible: false
      }
    },
    components: {
      TableTreeColumn,
      OnlyUpdate,
      OnlyExamine
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/instormer/mer/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'merid': this.ruleForm.memberId,
            'mername': this.ruleForm.merName,
            'agentname': this.ruleForm.agentName
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
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增
      addHandle (id) {
        this.$router.push({path: '/instormer-mer-add'})
      },
      // 修改
      updateHandle (id){
        this.onlyUpdateVisible = true
        this.$nextTick(() => {
           this.$refs.onlyUpdate.init(id)
        })
      },
      examineHandle (id) {
        this.onlyExamineVisible = true
        console.log(id)
        this.$nextTick(() => {
           this.$refs.onlyExamine.init(id)
        })
      }
    }
  }
</script>
