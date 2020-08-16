<template>
  <div class="agent-add">
    <div class="col-sm-12">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="form-column"
        :inline="true"
      >
        <el-card class="box-card" shadow="always">
          <div class="panel panel-default" id="baseInfo">
            <div class="panel-heading">基本信息</div>
            <div class="panel-body">
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="代理商名称" prop="agentName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.agentName"
                      maxlength="25"
                      placeholder="请输入代理商名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="代理商简称" prop="agentShortName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.agentShortName"
                      maxlength="16"
                      placeholder="请输入代理商简称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="代理商角色" prop="agentType" required>
                    <el-select
                      class="form-control"
                      v-model="ruleForm.agentType"
                      placeholder="请选择代理商角色">
                      <el-option label="企业代理" value="C"></el-option>
                      <el-option label="个人代理" value="P"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="代理商联系人" prop="contactName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contactName"
                      maxlength="25"
                      placeholder="请输入代理商联系人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人手机号" prop="contactTelno" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contactTelno"
                      maxlength="16"
                      placeholder="请输入联系人手机号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人邮箱" prop="contactEmail" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contactEmail"
                      maxlength="16"
                      placeholder="请输入联系人邮箱"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="签约人" prop="signName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.signName"
                      maxlength="25"
                      placeholder="请输入签约人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="签约起止日期" prop="signDate" required>
                    <el-date-picker
                      v-model="ruleForm.signDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="客服电话" prop="csTelNo" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.csTelNo"
                      maxlength="25"
                      placeholder="请输入客服电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="合同编号" prop="contractId" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contractId"
                      maxlength="25"
                      placeholder="请输入合同编号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
        <el-card class="box-card" shadow="always">
          <div class="panel panel-default" id="copAgtInfo" v-if="ruleForm.agentType == 'C'">
            <div class="panel-heading">企业代理信息</div>
            <div class="panel-body">
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司注册名称" prop="corpName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.corpName"
                      maxlength="25"
                      placeholder="请输入公司注册名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司类型" prop="corpType" required>
                    <el-select
                      class="form-control"
                      v-model="ruleForm.corpType"
                      placeholder="请选择公司类型"
                    >
                      <el-option label="国有企业" value="1"></el-option>
                      <el-option label="民营企业" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="是否三证合一" prop="isCodeUnion" required>
                    <el-radio-group v-model="ruleForm.isCodeUnion">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="统一社会信用代码" prop="creditCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.creditCode"
                      maxlength="16"
                      placeholder="请输入统一社会信用代码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="税务登记证代码" prop="taxCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.taxCode"
                      maxlength="25"
                      placeholder="请输入税务登记证代码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="营业执照代码" prop="regCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.regCode"
                      placeholder="请输入营业执照代码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="组织机构代码" prop="orgCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.orgCode"
                      placeholder="请输入组织机构代码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="证照类型" prop="licType" required>
                    <el-radio-group v-model="ruleForm.licType">
                      <el-radio label="1">长期</el-radio>
                      <el-radio label="0">非长期</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="证照有效期" prop="licDate" required>
                    <el-date-picker
                      v-model="ruleForm.licDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司详细地址" prop="corpAddr" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.corpAddr"
                      maxlength="25"
                      placeholder="请输入公司详细地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司注册地址" prop="regAddr" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.regAddr"
                      maxlength="25"
                      placeholder="请输入公司注册地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司所在地区" prop="area" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.area"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="工商注册地所在地区" prop="regArea" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.regArea"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法定代表人" prop="legalName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.legalName"
                      maxlength="25"
                      placeholder="请输入法定代表人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法定代表人证件类型" prop="idType" required>
                    <el-select v-model="ruleForm.idType" placeholder="请选择法定代表人证件类型">
                      <el-option label="身份证" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法定代表人证件编号" prop="idNo" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.idNo"
                      maxlength="25"
                      placeholder="请输入法定代表人证件编号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="证件有效期类型" required>
                    <el-radio-group v-model="ruleForm.idValidType">
                      <el-radio v-model="radio" label="1">长期</el-radio>
                      <el-radio v-model="radio" label="2">非长期</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件有效期" prop="idDate" required>
                    <el-date-picker
                      v-model="ruleForm.idDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="panel panel-default" id="priVateAgtInfo" v-else>
            <div class="panel-heading">个人代理信息</div>
            <div class="panel-body">
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件类型" prop="cidType" required>
                    <el-select v-model="ruleForm.cidType" placeholder="请选择联系人证件类型">
                      <el-option label="身份证" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件编号" prop="cidNo" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.cidNo"
                      maxlength="25"
                      placeholder="请输入联系人证件编号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件有效期类型" prop="contactIdValidType" required>
                    <el-radio-group v-model="ruleForm.contactIdValidType">
                      <el-radio label="0">非长期</el-radio>
                      <el-radio label="1">长期</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件有效期" prop="contactIdDate" required>
                    <el-date-picker
                      v-model="ruleForm.contactIdDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row>-->
                <!--<el-col class="form-group col-md-4">-->
                  <!--<el-form-item label="结算人证件类型" prop="agentShortName" required>-->
                    <!--<el-input class="form-control" maxlength="25" placeholder="请输入结算人证件类型"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col class="form-group col-md-4">-->
                  <!--<el-form-item label="结算人证件编号" prop="agentShortName" required>-->
                    <!--<el-input class="form-control" maxlength="25" placeholder="请输入结算人证件编号"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <!--<el-row>-->
                <!--<el-col class="form-group col-md-4">-->
                  <!--<el-form-item label="结算人证件有效期类型" prop="agentShortName" required>-->
                    <!--<el-radio-group v-model="ruleForm.bankActIdValidType">-->
                      <!--<el-radio label="0">非长期</el-radio>-->
                      <!--<el-radio label="1">长期</el-radio>-->
                    <!--</el-radio-group>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col class="form-group col-md-4">-->
                  <!--<el-form-item label="结算人证件有效期" prop="agentShortName" required>-->
                    <!--<el-input class="form-control" maxlength="25" placeholder="请输入管理员账号"></el-input>-->
                  <!--</el-form-item>-->
                <!--</el-col>-->
              <!--</el-row>-->
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="个人代理地区" prop="agentArea" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.agentArea"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                      placeholder="请选择个人代理省市"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
        <el-card class="box-card" shadow="always">
          <div class="panel panel-default" id="settle">
            <div class="panel-heading">结算信息</div>
            <div class="panel-body">
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="结算账户名" prop="bankActName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.bankActName"
                      maxlength="25"
                      placeholder="请输入结算账户名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="总行名称" prop="bankName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.bankName"
                      maxlength="25"
                      placeholder="请输入总行名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="银行所在地区" prop="bankArea" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.bankArea"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                      placeholder="请选择个人代理省市"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="结算账户号" prop="bankActId" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.bankActId"
                      maxlength="25"
                      placeholder="请输入结算账户名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="结算类型" prop="isPrivate" required>
                    <el-select v-model="ruleForm.isPrivate" placeholder="请选择结算类型">
                      <el-option label="对公" value="1"></el-option>
                      <el-option label="对私" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
        <el-card class="box-card" shadow="always">
          <div class="panel panel-default">
            <div class="panel-body">
              <el-form-item>
                <el-button type="primary" @click="submitForm()" style="width: 158px;marginTop: 22px;" round>提 交</el-button>
              </el-form-item>
            </div>
          </div>
        </el-card>
      </el-form>
    </div>
  </div>
</template>


<script>
  import { regionData, provinceAndCityData } from 'element-china-area-data'
  import { isEmail, isMobile, isIdCard, isBankId } from '@/utils/validate'
  export default {
    name: 'agent-add',
    data () {
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      var validateIdCard = (rule, value, callback) => {
        if (!isIdCard(value)) {
          callback(new Error('身份证格式错误'))
        } else {
          callback()
        }
      }
      var validateBankId = (rule, value, callback) => {
        if (!isBankId(value)) {
          callback(new Error('银行卡格式错误'))
        } else {
          callback()
        }
      }
      return {
        cityOptions: regionData, // 省市区三级联动 不含全部
        provinceAndCityData, // 省市两级联动 不含全部
        form: {
          selectedOptions: []
        },
        agentType: '',
        value1: [],
        radio: '',
        ruleForm: {
          agentName: '有赞科技',
          agentShortName: '有赞科技',
          agentType: 'P',
          contactName: 'jesse',
          signName: 'jesse',
          csTelNo: '0213434343',
          contactEmail: 'jesse@youzan.com',
          contactTelno: '18512341234',
          contactIdDate: ['2020-02-29T16:00:00.000Z', '2020-03-30T16:00:00.000Z'],
          contractId: '3949394838',
          contactIdValidType: '1',
          idValidType: '1',
          signDate: ['2020-02-29T16:00:00.000Z', '2020-03-30T16:00:00.000Z'],
          corpName: '有赞科技',
          corpType: '1',
          regCode: '23423334534423',
          taxCode: '12312331231231',
          orgCode: '123122313243423',
          area: ['120000', '120100', '120101'],
          regAddr: '上海浦东新区陆家嘴',
          isCodeUnion: '1',
          creditCode: '12341234132234123413',
          licType: '1',
          licDate: ['2020-02-29T16:00:00.000Z', '2020-03-30T16:00:00.000Z'],
          corpAddr: '上海浦东新区陆家嘴国金大厦',
          regArea: ['120000', '120100', '120101'],
          legalName: 'jesse',
          idType: '1',
          idNo: '23040934345245345',
          idDate: ['2020-02-29T16:00:00.000Z', '2020-03-30T16:00:00.000Z'],
          cidType: '1',
          cidNo: '43342345234552435245',
          agentArea: ['120000', '120100', '120101'],
          bankActName: '有赞科技',
          bankName: '上海建设银行',
          bankArea: ['120000', '120100', '120101'],
          bankActId: '2452452452452345345',
          isPrivate: '1'
        },
        rules: {
          agentName: [
            { required: true, message: '请输入代理商名称', trigger: 'blur' }
          ],
          agentShortName: [
            { required: true, message: '请输入代理商简称', trigger: 'blur' }
          ],
          agentType: [
            { required: true, message: '请选择代理商角色', trigger: 'change' }
          ],
          contactName: [
            { required: true, message: '请输入代理商联系人', trigger: 'blur' }
          ],
          contactEmail: [
            { required: true, message: '联系人邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          contactTelno: [
            { required: true, message: '联系人手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          bankActId: [
            { required: true, message: '银行卡号不能为空', trigger: 'blur' },
            { validator: validateBankId, trigger: 'blur' }
          ],
          cidNo: [
            { required: true, message: '联系人身份证号不能为空', trigger: 'blur' },
            { validator: validateIdCard, trigger: 'blur' }
          ],
          idNo: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' },
            { validator: validateIdCard, trigger: 'blur' }
          ],
          signName: [
            { required: true, message: '请输入签约人', trigger: 'blur' }
          ],
          corpName: [
            { required: true, message: '请输入公司注册名称', trigger: 'blur' }
          ],
          corpType: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个公司类型',
              trigger: 'change'
            }
          ],
          isCodeUnion: [
            { required: true, message: '请选择是否三证合一', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm () {
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/agent/agent/save`),
              method: 'post',
              data: this.$http.adornData(this.ruleForm)
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created () {}
  }
</script>
<style lang="scss">
  .box-card {
    margin: 20px 0;
  }
  .card-title {
    font-size: 18px;
    color: #b5b5b5;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  .el-form-item__label {
    line-height: 28px;
  }
  .el-form-item__content {
    padding-right: 30px;
  }
  .page-header {
    font-size: 25px;
    padding-bottom: 0;
    margin: 0;
    font-weight: 500;
  }
  .form-column {
    .form-group {
      padding-left: 10px;
      padding-right: 10px;
    }
    .el-form-item {
      width: 100%;
      .el-form-item__label {
        width: 30%;
      }
      .el-form-item__content {
        width: 64%;
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
        }
      }
      .el-range-separator {
        width: 21px;
      }
    }
  }
  .panel {
    .panel-heading {
      font-size: 16px;
      line-height: 35px;
    }
  }
  @media screen and (max-width: 1439px) {
    .form-column .form-group .el-form-item__label:first-child {
      text-align: left;
      width: 100%;
      display: block;
    }
    .form-column .form-group .el-form-item__content {
      width: 100%;
      display: block;
    }
  }
  @media screen and (min-width: 992px) {
    .col-md-4 {
      width: 33.33333333%;
      float: left;
    }
  }
</style>
