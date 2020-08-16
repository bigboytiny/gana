<template>
  <el-dialog
    :title="'审核'"
    customClass="customWidth"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-card class="box-card" shadow="always">
      <el-steps :active="active" finish-status="success">
        <el-step title="主体信息"></el-step>
        <el-step title="结算信息"></el-step>
        <el-step title="业务开通"></el-step>
        <el-step title="上传资料"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-card>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @keyup.enter.native="ruleFormSubmit('0')" label-width="90px" :inline="true">
      <section v-if="this.active == 0">
        <el-card class="box-card" shadow="always">
          <h3>商户资质</h3>
          <div class="panel panel-default">
            <div class="panel-body">
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户类型" prop="merchClass" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchClass === 'C' ? '企业':'个人'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col class="form-group col-md-4">
                  <el-form-item label="商户性质" prop="merchType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchType === '1' ? '连锁':'单店'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户简称" prop="merchShortName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchShortName"
                      maxlength="16"
                      placeholder="请输入商户简称"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户注册名称" prop="merchName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchName"
                      maxlength="16"
                      placeholder="请输入商户注册名称"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="小票名称" prop="merchDefinedName">
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchDefinedName"
                      maxlength="16"
                      placeholder="请输入小票名称"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="公司类型" prop="corpType" required>
                  <el-input
                    class="form-control"
                    v-model="ruleForm.corpType === '1' ? '国有企业':'民营企业'"
                    maxlength="16"
                    :disabled="true"
                  ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户注册省市区" prop="regArea" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.regArea"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                      :disabled="true"
                    />
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户注册详细地址" prop="regAddr" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.regAddr"
                      maxlength="16"
                      placeholder="请输入商户注册详细地址"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户经营省市区" prop="opArea" required>
                    <el-cascader
                      ref="selectedOptions"
                      v-model="ruleForm.opArea"
                      style="width: 100%"
                      :options="cityOptions"
                      clearable
                      :disabled="true"
                    />
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户经营详细地址" prop="merchAddr" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchAddr"
                      maxlength="16"
                      placeholder="请输入商户经营详细地址"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="是否三证合一" prop="isCodeUnion" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.isCodeUnion === '1' ? '是':'否'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item
                    label="统一社会信用代码"
                    prop="creditCode"
                    v-if="ruleForm.isCodeUnion == '1'"
                    required
                  >
                    <el-input
                      class="form-control"
                      v-model="ruleForm.creditCode"
                      maxlength="16"
                      placeholder="请输入统一社会信用代码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C' && ruleForm.isCodeUnion == '0'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="税务登记证代码" prop="taxCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.taxCode"
                      maxlength="25"
                      placeholder="请输入税务登记证代码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="营业执照代码" prop="regCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.regCode"
                      placeholder="请输入营业执照代码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="组织机构代码" prop="orgCode" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.orgCode"
                      placeholder="请输入组织机构代码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="营业执照有效期类型" prop="licType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.licType === '1' ? '长期':'非长期'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="营业执照有效期" prop="licDate" required>
                    <el-date-picker
                      v-model="ruleForm.licDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :disabled="true"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人" prop="legalName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.legalName"
                      maxlength="16"
                      placeholder="请输入法人"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人证件类型" prop="idType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.idType === '1' ? '身份证':'其他'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人证件号码" prop="idNo" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.idNo"
                      maxlength="16"
                      placeholder="请输入法人证件号码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人证件有效期类型" prop="idValidType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.idValidType === '1' ? '长期':'非长期'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人证件有效期" prop="idDate" required>
                    <el-date-picker
                      v-model="ruleForm.idDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :disabled="true"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="商户联系人" prop="contactName" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contactName"
                      maxlength="16"
                      placeholder="请输入商户联系人"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人手机" prop="contactTelno" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.contactTelno"
                      maxlength="11"
                      placeholder="请输入联系人手机号"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人邮箱" prop="contactEmail" required>
                    <el-input
                      class="form-control"
                      maxlength="16"
                      v-model="ruleForm.contactEmail"
                      placeholder="请输入联系人邮箱"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件类型" prop="cidType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.cidType === '1' ? '身份证':'其他'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件号码" prop="cidNo" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.cidNo"
                      maxlength="16"
                      placeholder="请输入联系人证件号码"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人有效期类型" prop="cidValidType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.cidValidType === '1' ? '长期':'非长期'"
                      maxlength="16"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="联系人证件有效期" prop="contactIdDate">
                    <el-date-picker
                      v-model="ruleForm.contactIdDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :disabled="true"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="form-group col-md-4">
                  <el-form-item label="客服电话" prop="csTel" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.csTel"
                      maxlength="16"
                      placeholder="请输入客服电话"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>

        <el-card class="box-card" shadow="always">
          <h3>签约信息</h3>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="合同编号" prop="contractId" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.contractId"
                  maxlength="16"
                  placeholder="请输入合同编号"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="签约人" prop="signName" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.signName"
                  maxlength="16"
                  placeholder="请输入签约人"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="签约日期" prop="signDate">
                <el-date-picker
                  v-model="ruleForm.signDate"
                  type="date"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="合同有效期" prop="contactValidDate">
                <el-date-picker
                  v-model="ruleForm.contactValidDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!-- <el-button type="primary" round style="margin: 12px;float: left" @click="next">上一步</el-button> -->
        <el-button type="primary" round style="margin: 12px;float: right" @click="next">下一步</el-button>
      </section>

      <section v-else-if="this.active == 1">
        <el-card class="box-card" shadow="always">
          <h3>结算信息</h3>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label=" 结算账户类型" prop="isPrivate" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.isPrivate === '1' ? '对私':'对公'"
                  maxlength="16"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算账户名" prop="bankActName" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankActName"
                  maxlength="16"
                  placeholder="请输入结算账户名"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算账户" prop="bankActId" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankActId"
                  maxlength="16"
                  placeholder="请输入结算账户"
                  :disabled="true"
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
                  :disabled="true"
                  clearable
                />
              </el-form-item>
            </el-col>

            <el-col class="form-group col-md-4">
              <el-form-item label="总行名称" prop="bankName" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankName"
                  maxlength="16"
                  placeholder="请输入总行名称"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col class="form-group col-md-4">
              <el-form-item label="支行名称" prop="subBankName" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.subBankName"
                  maxlength="16"
                  placeholder="请输入支行名称"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="银行所在地址" prop="bankAddr" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankAddr"
                  maxlength="16"
                  placeholder="请输入银行所在地址"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="银行联行号" prop="bankUnionCode" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankUnionCode"
                  maxlength="16"
                  placeholder="请输入银行联行号"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人手机号" prop="bankPhone" required>
                <el-input
                  class="form-control"
                  maxlength="16"
                  v-model="ruleForm.bankPhone"
                  placeholder="请输入结算人手机号"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算周期" prop="settleTerm" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.settleTerm === '1' ? 'T1':'D1'"
                  maxlength="16"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人证件类型" prop="bankIdType" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankIdType === '1' ? '身份证':'护照'"
                  maxlength="16"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人证件编号" prop="bankIdNo" required>
                <el-input
                  class="form-control"
                  maxlength="25"
                  v-model="ruleForm.bankIdNo"
                  placeholder="请输入结算人证件编号"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人证件有效期类型" prop="bankActIdValidType" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.bankActIdValidType === '1' ? '长期':'非长期'"
                  maxlength="16"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人证件有效期" prop="bankActIdValidDate" required>
                <el-date-picker
                  v-model="ruleForm.bankActIdValidDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-button type="primary" round style="margin: 12px;float: left" @click="previous">上一步</el-button>
        <el-button type="primary" round style="margin: 12px;float: right" @click="next">下一步</el-button>
      </section>

      <section v-else-if="this.active == 2">
        <el-card class="box-card" shadow="always">
          <h3>业务开通</h3>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="支付宝费率（%）" prop="alipay" required>
                <el-input class="form-control" v-model="ruleForm.alipay" placeholder="请输入支付宝费率（%）" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="微信费率（%）" prop="wechatpay" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.wechatpay"
                  placeholder="请输入微信费率（%）"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="银联0-1000费率（%）" prop="unionpay" required>
                <el-input class="form-control" v-model="ruleForm.unionpay" placeholder="请输入银联费率（%）" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="银联1000以上费率（%）" prop="unionpayTop" required>
                <el-input
                  class="form-control"
                  v-model="ruleForm.unionpayTop"
                  placeholder="请输入银联费率（%）"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-button type="primary" round style="margin: 12px;float: left" @click="previous">上一步</el-button>
        <el-button type="primary" round style="margin: 12px;float: right" @click="next">下一步</el-button>
      </section>

      <section v-else-if="this.active == 3">
        <el-card class="box-card" shadow="always">
            <h3>商户资料</h3>
            <el-tag type="danger">注意：带*号项为必填资料</el-tag>
            <el-row>
              <el-col class="form-group col-md-4">
                <el-form-item label="营业执照" required>
                  <div class="block">
                    <el-image :src="url_REG_FILE"
                    style="width: 100px; height: 100px"
                    :preview-src-list="urls_REG_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="税务登记证">
                  <div class="block">
                    <el-image :src="url_TAX_FILE"
                    style="width: 100px; height: 100px"
                    :preview-src-list="urls_TAX_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="组织机构代码">
                  <div class="block">
                    <el-image :src="url_ORG_FILE"
                    style="width: 100px; height: 100px"
                    :preview-src-list="urls_ORG_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="form-group col-md-4">
                <el-form-item label="法人身份证正面" required>
                  <div class="block">
                    <el-image :src="url_CERT_FILE_FRONT"
                    style="width: 100px; height: 100px"
                    :preview-src-list="urls_CERT_FILE_FRONT" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="法人身份证国徽面" required>
                  <div class="block">
                    <el-image :src="url_CERT_FILE_BACK"
                    style="width: 100px; height: 100px"
                    :preview-src-list="urls_CERT_FILE_BACK" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="结算人身份证正面" required>
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_SETTLE_CERT_FILE_FRONT"
                    :preview-src-list="urls_SETTLE_CERT_FILE_FRONT" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="form-group col-md-4">
                <el-form-item label="结算人身份证国徽面" required>
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_SETTLE_CERT_FILE_BACK"
                    :preview-src-list="urls_SETTLE_CERT_FILE_BACK" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="开户许可证/开户证明">
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_PREMIT_FILE"
                    :preview-src-list="urls_PREMIT_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="银行卡卡号面" required>
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_BANK_CARD_FILE_FRONT"
                    :preview-src-list="urls_BANK_CARD_FILE_FRONT" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="form-group col-md-4">
                <el-form-item label="银行卡反面">
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_BANK_CARD_FILE_BACK"
                    :preview-src-list="urls_BANK_CARD_FILE_BACK" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="商户协议照片">
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_MER_AGREE_FILE"
                    :preview-src-list="urls_MER_AGREE_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="门头照片" required>
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_DOOR_PHOTO_FILE"
                    :preview-src-list="urls_DOOR_PHOTO_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="form-group col-md-4">
                <el-form-item label="内景图照片" required>
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_INTERIOR_FILE"
                    :preview-src-list="urls_INTERIOR_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="经营场所-含收银台">
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_PFB_FILE"
                    :preview-src-list="urls_PFB_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
              <el-col class="form-group col-md-4">
                <el-form-item label="非法人结算授权函">
                  <div class="block">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="url_NFS_FILE"
                    :preview-src-list="urls_NFS_FILE" lazy></el-image>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
        </el-card>
        <el-button type="primary" round style="margin: 12px;float: left" @click="previous">上一步</el-button>
        <el-button type="primary" round style="margin: 12px;float: right" @click="next">下一步</el-button>
      </section>

      <section v-else>
        <el-card class="box-card card-done" shadow="always">

          <i v-if="isSuccess === 1" class="el-icon-success" style="margin-bottom: 20px;font-size: 100px; color: #67C23A"></i>
          <i v-else-if="isSuccess === 2" class="el-icon-error" style="margin-bottom: 20px;font-size: 100px; color: #FF0000"></i>
          <div>
            <!--<el-button type="primary" round style="margin: 12px;float: left" @click="previous">首页</el-button>-->
            <el-button
              type="primary"
              style="width: 158px;marginTop: 22px;"
              round
              @click="ruleFormSubmit('N')"
              :disabled = "submitDisabled"
            >审核通过</el-button>
            <el-button
              type="primary"
              style="width: 158px;marginTop: 22px;"
              round
              @click="ruleFormSubmit('F')"
              :disabled = "submitDisabled"
            >审核不通过</el-button>
          </div>
        </el-card>
      </section>
    </el-form>
  </el-dialog>
</template>

<script>
  import { regionData, provinceAndCityData } from 'element-china-area-data'
  import { isEmail, isMobile, isIdCard, isBankId } from '@/utils/validate'
  export default {
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
        active: 0,
        merchClass: "",
        value1: [],
        fileList:[],
        formDate: new FormData(),
        dialogImageUrl: '',
        dialogVisible: false,
        downloadLoading: '',
        isLoad: true,
        isSuccess: 0,
        submitDisabled: false,
        visible: false,
        memberId: "",

        url_REG_FILE:"",
        url_TAX_FILE:"",
        url_ORG_FILE:"",
        url_CERT_FILE_FRONT:"",
        url_CERT_FILE_BACK:"",
        url_SETTLE_CERT_FILE_FRONT:"",
        url_SETTLE_CERT_FILE_BACK:"",
        url_PREMIT_FILE:"",
        url_BANK_CARD_FILE_FRONT:"",
        url_BANK_CARD_FILE_BACK:"",
        url_MER_AGREE_FILE:"",
        url_DOOR_PHOTO_FILE:"",
        url_INTERIOR_FILE:"",
        url_PFB_FILE:"",
        url_NFS_FILE:"",
        urls_REG_FILE:[],
        urls_TAX_FILE:[],
        urls_ORG_FILE:[],
        urls_CERT_FILE_FRONT:[],
        urls_CERT_FILE_BACK:[],
        urls_SETTLE_CERT_FILE_FRONT:[],
        urls_SETTLE_CERT_FILE_BACK:[],
        urls_PREMIT_FILE:[],
        urls_BANK_CARD_FILE_FRONT:[],
        urls_BANK_CARD_FILE_BACK:[],
        urls_MER_AGREE_FILE:[],
        urls_DOOR_PHOTO_FILE:[],
        urls_INTERIOR_FILE:[],
        urls_PFB_FILE:[],
        urls_NFS_FILE:[],
        ruleForm: {
          merchClass: "C",
          merchType: "2",
          merchShortName: "jun哥的杂货铺",
          merchName: "Test",
          merchDefinedName: "aaa",
          corpType: "1",
          regArea: ["120000", "120100", "120101"],
          regAddr: "sfsfsfds",
          opArea: ["120000", "120100", "120101"],
          merchAddr: "dsfsdfdsfdsdf",
          isCodeUnion: "1",
          creditCode: "1234123413223",
          regCode: "23423423",
          taxCode: "1231231231231",
          orgCode: "12312231243423",
          licType: "1",
          licDate: ["2020-02-29T16:00:00.000Z", "2020-03-30T16:00:00.000Z"],
          legalName: "jesse",
          idType: "1",
          idNo: "230409345245345",
          idValidType: "0",
          idDate: ["2020-02-29T16:00:00.000Z", "2020-03-30T16:00:00.000Z"],
          contactName: "jesse",
          contactTelno: "17617557106",
          contactEmail: "jesse@youzan.com",
          cidType: "1",
          cidNo: "433452435245",
          cidValidType: "0",
          contactIdDate: ["2020-02-29T16:00:00.000Z", "2020-03-30T16:00:00.000Z"],
          csTel: "0213434343",
          contractId: "20200401000001",
          signName: "jesse",
          signDate: "2020-02-29T16:00:00.000Z",
          contactValidDate: [
            "2020-03-29T16:00:00.000Z",
            "2020-03-30T16:00:00.000Z"
          ],
          isPrivate: "0",
          bankActName: "有赞科技",
          bankActId: "2452452345",
          bankArea: ["120000", "120100", "120101"],
          bankName: "上海建设银行",
          subBankName: "上海建设银行",
          bankAddr: "dfsfsfdsfd",
          bankUnionCode: "2452452345",
          bankPhone: "18512341234",
          settleTerm: "1",
          bankIdType: "1",
          bankIdNo: "3254324253465",
          bankActIdValidType: "0",
          bankActIdValidDate: [
            "2020-02-29T16:00:00.000Z",
            "2020-03-30T16:00:00.000Z"
          ],
          alipay: "0.38",
          wechatpay: "0.38",
          unionpay: "0.38",
          unionpayTop: "0.55",
          dataId: ""
        },
        rules: {
          merchShortName: [
            { required: true, message: "请输入商户简称", trigger: "blur" }
          ],
          merchName: [
            { required: true, message: "请输入商户注册名称", trigger: "blur" }
          ],
          contactName: [
            { required: true, message: "请输入代理商联系人", trigger: "blur" }
          ],
          contactEmail: [
            { required: true, message: "联系人邮箱不能为空", trigger: "blur" },
            { validator: validateEmail, trigger: "blur" }
          ],
          contactTelno: [
            { required: true, message: "联系人手机号不能为空", trigger: "blur" },
            { validator: validateMobile, trigger: "blur" }
          ],
          bankActId: [
            { required: true, message: "银行卡号不能为空", trigger: "blur" },
            { validator: validateBankId, trigger: "blur" }
          ],
          cidNo: [
            {
              required: true,
              message: "联系人身份证号不能为空",
              trigger: "blur"
            },
            { validator: validateIdCard, trigger: "blur" }
          ],
          idNo: [
            { required: true, message: "身份证号不能为空", trigger: "blur" },
            { validator: validateIdCard, trigger: "blur" }
          ],
          signName: [
            { required: true, message: "请输入签约人", trigger: "blur" }
          ],
          isCodeUnion: [
            { required: true, message: "请选择是否三证合一", trigger: "blur" }
          ]
        }
      }
    },
    methods: {
      previous() {
        if (this.active-- === 4) this.active = 0;
      },
      next() {
        if (this.active++ > 4) this.active = 5;
      },
      init (id) {
        this.memberId = id;
        this.active = 0;
        this.$http({
          url: this.$http.adornUrl(`/instormer/mer/info/${id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          console.log(data);
          if (data && data.code === 0) {
            this.ruleForm = data.merchForm;
            var url = this.$http.adornUrl(`/instormer/mer/image/get?`);
            url = url + "memberId=" + id+"&fileName=";
            this.url_REG_FILE=url + "REG_FILE";
            this.urls_REG_FILE = [this.url_REG_FILE];
            this.url_TAX_FILE=url + "TAX_FILE";
            this.urls_TAX_FILE = [this.url_TAX_FILE];
            this.url_ORG_FILE=url + "ORG_FILE";
            this.urls_ORG_FILE=[this.url_ORG_FILE];
            this.url_CERT_FILE_FRONT=url + "CERT_FILE_FRONT";
            this.urls_CERT_FILE_FRONT=[this.url_CERT_FILE_FRONT];
            this.url_CERT_FILE_BACK=url + "CERT_FILE_BACK";
            this.urls_CERT_FILE_BACK=[this.url_CERT_FILE_BACK];
            this.url_SETTLE_CERT_FILE_FRONT=url + "SETTLE_CERT_FILE_FRONT";
            this.urls_SETTLE_CERT_FILE_FRONT=[this.url_SETTLE_CERT_FILE_FRONT];
            this.url_SETTLE_CERT_FILE_BACK=url + "SETTLE_CERT_FILE_BACK";
            this.urls_SETTLE_CERT_FILE_BACK=[this.url_SETTLE_CERT_FILE_BACK];
            this.url_PREMIT_FILE=url + "PREMIT_FILE";
            this.urls_PREMIT_FILE=[this.url_PREMIT_FILE];
            this.url_BANK_CARD_FILE_FRONT=url + "BANK_CARD_FILE_FRONT";
            this.urls_BANK_CARD_FILE_FRONT=[this.url_BANK_CARD_FILE_FRONT];
            this.url_BANK_CARD_FILE_BACK=url + "BANK_CARD_FILE_BACK";
            this.urls_BANK_CARD_FILE_BACK=[this.url_BANK_CARD_FILE_BACK];
            this.url_MER_AGREE_FILE=url + "MER_AGREE_FILE";
            this.urls_MER_AGREE_FILE=[this.url_MER_AGREE_FILE];
            this.url_DOOR_PHOTO_FILE=url + "DOOR_PHOTO_FILE";
            this.urls_DOOR_PHOTO_FILE=[this.url_DOOR_PHOTO_FILE];
            this.url_INTERIOR_FILE=url + "INTERIOR_FILE";
            this.urls_INTERIOR_FILE=[this.url_INTERIOR_FILE];
            this.url_PFB_FILE=url + "PFB_FILE";
            this.urls_PFB_FILE=[this.url_PFB_FILE];
            this.url_NFS_FILE=url + "NFS_FILE";
            this.urls_NFS_FILE=[this.url_NFS_FILE];
          }
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
          })
        })
      },
      // 表单提交
      ruleFormSubmit (stat) {
        console.log(stat);
        this.$http({
          url: this.$http.adornUrl(`/instormer/mer/examine`),
          method: 'get',
          params: this.$http.adornParams({
                      'isExamine': stat,
                      'memberId': this.memberId
                    })
        }).then(({data}) => {
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
          this.submitDisabled = true
        })
      }
    }
  }
</script>
<style lang="scss">
  .customWidth{
        width:70%;
  }
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
    .col-md-1 {
      width: 100%;
      float: left;
    }
  }
  .card-done {
    padding: 60px;
    text-align: center;
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
</style>
