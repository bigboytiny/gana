<template>
  <el-dialog
    :title="'修改'"
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
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" @keyup.enter.native="ruleFormSubmit()" label-width="90px" :inline="true">
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
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col class="form-group col-md-4">
                  <el-form-item label="商户性质" prop="merchType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.merchType === '1' ? '连锁':'单店'"
                      maxlength="16"
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
                      maxlength="4"
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
              <el-row v-if="ruleForm.merchClass == 'C'">
                <el-col class="form-group col-md-4">
                  <el-form-item label="营业执照有效期类型" prop="licType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.licType === '1' ? '长期':'非长期'"
                      maxlength="16"
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
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="form-group col-md-4">
                  <el-form-item label="法人证件类型" prop="idType" required>
                    <el-input
                      class="form-control"
                      v-model="ruleForm.idType === '1' ? '身份证':'其他'"
                      maxlength="16"
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
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="签约日期" prop="signDate">
                <el-date-picker
                  v-model="ruleForm.signDate"
                  type="date"
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
                <el-input class="form-control" v-model="ruleForm.alipay" placeholder="请输入支付宝费率（%）"></el-input>
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
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="银联0-1000费率（%）" prop="unionpay" required>
                <el-input class="form-control" v-model="ruleForm.unionpay" placeholder="请输入银联费率（%）"></el-input>
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
          <h3>上传资料</h3>
          <el-tag type="danger">注意：带*号项为必填资料</el-tag>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="营业执照 *">
                <el-upload
                  ref="upload1"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'REG_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="REG_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="税务登记证">
                <el-upload
                  ref="upload2"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'TAX_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="TAX_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="组织机构代码">
                <el-upload
                  ref="upload3"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'ORG_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="ORG_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="法人身份证正面 *">
                <el-upload
                  ref="upload4"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'CERT_FILE_FRONT')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="CERT_FILE_FRONT"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="法人身份证国徽面 *">
                <el-upload
                  ref="upload5"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'CERT_FILE_BACK')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="CERT_FILE_BACK"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人身份证正面 *">
                <el-upload
                  ref="upload6"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'SETTLE_CERT_FILE_FRONT')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="SETTLE_CERT_FILE_FRONT"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="结算人身份证国徽面 *">
                <el-upload
                  ref="upload7"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'SETTLE_CERT_FILE_BACK')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="SETTLE_CERT_FILE_BACK"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="开户许可证/开户证明">
                <el-upload
                  ref="upload8"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'PREMIT_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="PREMIT_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="银行卡卡号面 *">
                <el-upload
                  ref="upload9"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'BANK_CARD_FILE_FRONT')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="BANK_CARD_FILE_FRONT"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="银行卡反面 *">
                <el-upload
                  ref="upload10"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'BANK_CARD_FILE_BACK')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="BANK_CARD_FILE_BACK"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="商户协议照片">
                <el-upload
                  ref="upload11"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'MER_AGREE_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="MER_AGREE_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="门头照片 *">
                <el-upload
                  ref="upload12"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'DOOR_PHOTO_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="DOOR_PHOTO_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-group col-md-4">
              <el-form-item label="内景图照片 *">
                <el-upload
                  ref="upload13"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'INTERIOR_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="INTERIOR_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="经营场所-含收银台">
                <el-upload
                  ref="upload14"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'PFB_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="PFB_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="form-group col-md-4">
              <el-form-item label="非法人结算授权函">
                <el-upload
                  ref="upload15"
                  action="#"
                  accept="image/png, image/jpg, image/jpeg"
                  list-type="picture-card"
                  :class="{ disabled: uploadDisabled }"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="(file)=>{beforeUpload(file,'NFS_FILE')}"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="NFS_FILE"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
              @click="ruleFormSubmit()"
              :disabled = "submitDisabled"
            >提交</el-button>
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
        if (value.indexOf("*") < 0 && !isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (value.indexOf("*") < 0 && !isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      var validateIdCard = (rule, value, callback) => {
        if (value.indexOf("*") < 0 && !isIdCard(value)) {
          callback(new Error('身份证格式错误'))
        } else {
          callback()
        }
      }
      var validateBankId = (rule, value, callback) => {
        if (value.indexOf("*") < 0 && !isBankId(value)) {
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
        formDate: new FormData(),
        dialogImageUrl: '',
        dialogVisible: false,
        downloadLoading: '',
        isLoad: true,
        isSuccess: 0,
        submitDisabled: false,
        uploadDisabled: true,
        visible: false,

        REG_FILE:[],
        TAX_FILE:[],
        ORG_FILE:[],
        CERT_FILE_FRONT:[],
        CERT_FILE_BACK:[],
        SETTLE_CERT_FILE_FRONT:[],
        SETTLE_CERT_FILE_BACK:[],
        PREMIT_FILE:[],
        BANK_CARD_FILE_FRONT:[],
        BANK_CARD_FILE_BACK:[],
        MER_AGREE_FILE:[],
        DOOR_PHOTO_FILE:[],
        INTERIOR_FILE:[],
        PFB_FILE:[],
        NFS_FILE:[],
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
          memberId: "",
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
        if (this.active === 3){
          this.$refs.upload1.submit();
          this.$refs.upload2.submit();
          this.$refs.upload3.submit();
          this.$refs.upload4.submit();
          this.$refs.upload5.submit();
          this.$refs.upload6.submit();
          this.$refs.upload7.submit();
          this.$refs.upload8.submit();
          this.$refs.upload9.submit();
          this.$refs.upload10.submit();
          this.$refs.upload11.submit();
          this.$refs.upload12.submit();
          this.$refs.upload13.submit();
          this.$refs.upload14.submit();
          this.$refs.upload15.submit();
          if(this.isLoad){
            this.downloadLoading=this.$loading({
                lock:true,
                text:'数据导入中...',
                spinner:'el-icon-loading',
                background:'rgba(0,0,0,0.7)'
            });
            this.$http({
                method:'post',
                url:this.$http.adornUrl(`/instormer/mer/upload/update`),
                data:this.formDate,
                headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}
            }).then(rsp=>{
                this.downloadLoading.close();
                let resp=rsp.data;
                if(resp.code === 0){
                    if (this.active++ > 4) this.active = 5;
                    this.ruleForm.dataId = resp.dataId;
                }else{
                    this.$message({
                        type:'error',
                        showClose:true,
                        duration:60000,
                        message:resp.msg
                    });
                }
            }).catch(error=> {
                this.downloadLoading.close();
                this.$message({
                    type:'error',
                    showClose:true,
                    duration:60000,
                    message:'请求失败! error:'+error
                });
            });
          }else{
            return;
          }
        }else{
          if (this.active++ > 4) this.active = 5;
        }
      },
      handleExceed(files,fileList){
          this.$message.warning('选择文件太多了!');
      },
      handleRemove(file, fileList) {
        this.uploadDisabled = false;
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        if (fileList.length >= 1) {
          this.uploadDisabled = true;
        }
      },
      beforeUpload(file,name){
          var that=this;
          //文件类型
          var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
          if(fileName!='png' && fileName!='jpeg' && fileName!='jpg'){
              that.$message({
                  type:'error',
                  showClose:true,
                  duration:3000,
                  message:'不支持此类型文件!'
              });
              that.isLoad = false;
              return false;
          }
          //读取文件大小
          var fileSize=file.size;
          if(fileSize>1048576 * 50){
              that.$message({
                  type:'error',
                  showClose:true,
                  duration:3000,
                  message:'文件大于50M!'
              });
              that.isLoad = false;
              return false;
          }
          file = new File([file], name+"."+fileName);
          this.formDate.append('file', file);
          return false;
      },
      init (id) {
        this.ruleForm.memberId = id;
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
            this.REG_FILE =[{name:"REG_FILE",url:url + "REG_FILE"}];
            this.TAX_FILE = [{name:"TAX_FILE",url:url + "TAX_FILE"}];
            this.ORG_FILE=[{name:"ORG_FILE",url:url + "ORG_FILE"}];
            this.CERT_FILE_FRONT=[{name:"CERT_FILE_FRONT",url:url + "CERT_FILE_FRONT"}];
            this.CERT_FILE_BACK=[{name:"CERT_FILE_BACK",url:url + "CERT_FILE_BACK"}];
            this.SETTLE_CERT_FILE_FRONT=[{name:"SETTLE_CERT_FILE_FRONT",url:url + "SETTLE_CERT_FILE_FRONT"}];
            this.SETTLE_CERT_FILE_BACK=[{name:"SETTLE_CERT_FILE_BACK",url:url + "SETTLE_CERT_FILE_BACK"}];
            this.PREMIT_FILE=[{name:"PREMIT_FILE",url:url + "PREMIT_FILE"}];
            this.BANK_CARD_FILE_FRONT=[{name:"BANK_CARD_FILE_FRONT",url:url + "BANK_CARD_FILE_FRONT"}];
            this.BANK_CARD_FILE_BACK=[{name:"BANK_CARD_FILE_BACK",url:url + "BANK_CARD_FILE_BACK"}];
            this.MER_AGREE_FILE=[{name:"MER_AGREE_FILE",url:url + "MER_AGREE_FILE"}];
            this.DOOR_PHOTO_FILE=[{name:"DOOR_PHOTO_FILE",url:url + "DOOR_PHOTO_FILE"}];
            this.INTERIOR_FILE=[{name:"INTERIOR_FILE",url:url + "INTERIOR_FILE"}];
            this.PFB_FILE=[{name:"PFB_FILE",url:url + "PFB_FILE"}];
            this.NFS_FILE=[{name:"NFS_FILE",url:url + "NFS_FILE"}];
          }
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
          })
        })
      },
      // 表单提交
      ruleFormSubmit () {
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/instormer/mer/update`),
              method: "post",
              data: this.$http.adornData(this.ruleForm)
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 3500,
                  onClose: () => {
                    this.$emit("refreshDataList");
                  }
                });
                this.isSuccess=1;
              } else {
                this.$message.error(data.msg);
                this.isSuccess=2;
              }
            });
          } else {
            console.log("error submit!!");
            this.isSuccess=2;
            this.submitDisabled = true;
            return false;
          }
          this.submitDisabled = true;
        });
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
 ul.el-upload-list:not(:empty) + .el-upload--picture-card {
   display: none;
 }
</style>
