<template>
  <div class="app-container">
    <div class="block">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="prev" v-show="active>0" size="mini">上一步</el-button>
        <el-button type="primary" @click="save" v-show="active!=3&&active!=4" size="mini">下一步</el-button>
      </el-col>
    </el-row>
  </div>
    <br>
    <div class="block">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择模板"></el-step>
        <el-step title="填写信息"></el-step>
        <el-step title="预览效果"></el-step>
        <el-step title="制作打印"></el-step>
      </el-steps>
    </div>

    <div v-show="active==0">
      <div>
        <el-row>
          <el-col :span="3" class="center">
            <el-button type="text" class="el-button">热门</el-button>
            <el-button type="text" class="el-button">全部</el-button>
            <el-button type="text" class="el-button">常用</el-button>
          </el-col>
          <el-col :span="8" class="center">
            <el-input
              v-model="search"
              @focus="focus"
              @blur="blur"
              @keyup.enter.native="searchHandler"
              placeholder="输入关键字搜索模板"
            >
              <el-button slot="append"  icon="el-icon-search" id="search" @click="searchHandler"></el-button>
            </el-input>
            <!---设置z-index优先级,防止被走马灯效果遮挡-->
            <el-card
              @mouseenter="enterSearchBoxHanlder"
              v-if="isSearch"
              class="box-card"
              id="search-box"
              style="position:relative;z-index:15"
            >
              <dl v-if="isHistorySearch">
                <dt class="search-title" v-show="history">历史搜索</dt>
                <dt class="remove-history" v-show="history" @click="removeAllHistory">
                  <i class="el-icon-delete"></i>清空历史记录
                </dt>
                <el-tag
                  v-for="search in historySearchList"
                  :key="search.id"
                  closable
                  :type="search.type"
                  @close="closeHandler(search)"
                  style="margin-right:5px; margin-bottom:5px;"
                >{{search.name}}</el-tag>
                <dt class="search-title">热门搜索</dt>
                <dd v-for="search in hotSearchList" :key="search.id">{{search}}</dd>
              </dl>
              <dl v-if="isSearchList">
                <dd v-for="search in searchList" :key="search.id">{{search}}</dd>
              </dl>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="center">
            所属行业：
            <el-button type="text" class="el-button">全部</el-button>
            <el-button type="text" class="el-button">人力资源</el-button>
            <el-button type="text" class="el-button">互联网</el-button>
            <el-button type="text" class="el-button">房地产</el-button>
            <el-button type="text" class="el-button">餐饮</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="8" :data="tempList" v-for="(item, index) in tempList" :key="item.id">
            <el-card :body-style="{ padding: '30px' }">
              <!--<i class="el-icon-s-opportunity">点击图片切换正反面</i>-->
               <img @click="item.srcFlag=!item.srcFlag" :src="item.srcFlag?item.preFrontImageUrl:item.preBackImageUrl"  class="image">
              <div style="padding: 10px;">
                <span>{{item.tempName}}</span>
                <div class="bottom clearfix">
                  <el-row>
                    <template>
                    <el-col :span="18"><time class="time">{{item.tempDesc}}</time>
                      <el-rate
                        v-model="item.stars"
                        disabled
                        show-score
                        text-color="#ff9900"
                      >
                      </el-rate></el-col><!--@click="radioOption(item.radio,index)"-->
                    <el-col :span="6"><el-radio @click.native="radioOption(item)"  v-model="radio" :label="item.id">请选择</el-radio></el-col>
                    </template>
                  </el-row>
                </div>
              </div>
            </el-card><br>
          </el-col>
        </el-row>
      </div>
    </div>



    <el-form ref="form" :model="form" :rules="rules" label-width="150px" v-show="active==1">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名"  >
            <el-input v-model="form.name" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名称"  >
            <el-input v-model="form.company" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话"  >
            <el-input v-model="form.phone" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱"  >
            <el-input v-model="form.email" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址"  >
            <el-input v-model="form.address" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网址"  >
            <el-input v-model="form.website" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位"  >
            <el-input v-model="form.position" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="我能提供的价值"  >
            <el-input v-model="form.description" minlength=1></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二维码"  >
            <el-input v-model="form.qrcode" minlength=1></el-input>
          </el-form-item>
        </el-col>
       <!-- <el-col :span="24">
          <el-form-item label="二维码">
            <el-upload
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleUploadPicSuccess"
              class="avatar-uploader"
              accept=".jpg,.jpeg,.png,.gif">
              <img v-if="form.pic" :src="apiUrl+ '/file/getImgStream?idFile=' +form.pic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item label="备注"  >
            <el-input v-model="form.memo" minlength=1 value="这是备注内容，哈哈哈哈"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
             <el-form-item label="用户ID"  >
                 <el-input v-model="form.userid" minlength=1></el-input>
             </el-form-item>
         </el-col>-->
      </el-row>
    </el-form>

    <div v-show="active==2">
        <!--下面显示已生成的名片预览图片-->
        <!--<el-image :src="imgUrl"></el-image>-->
        <div class="display-flex">
          <div ref="captureFront">
            <img :src="selRow.frontImageUrl" id="green_front" class="gwd-img-1ipa"><span class="gwd-span-18vz">{{form.company}}</span><span class="gwd-span-z6x2">{{form.name}}</span>
            <p class="gwd-span-1pxk">{{form.position}}</p><span class="gwd-span-bhnv">{{form.email}}</span><span class="gwd-span-1maf">{{form.phone}}</span><span class="gwd-span-7w50">{{form.address}}</span><span class="gwd-span-12za">{{form.website}}</span>
          </div>
          <div ref="captureBack" class="margin-set">
            <img :src="selRow.backImageUrl" id="green_back" class="gwd-img-1ipa">
            <el-image :src="form.qrcode" id="qrcode" class="gwd-img-mt5w"></el-image>
            <p class="gwd-p-1k6l gwd-p-xsa5">业务介绍</p>
            <!--<p class="gwd-p-1k6l gwd-p-91fv">介绍</p>-->
            <p class="gwd-p-1yzs">{{form.description}}</p>
          </div>
        </div>
        <br/>
        <div align="center">
          <el-button type="warning"  icon="el-icon-download" @click.native="downloadBusinessCard">{{ $t('button.download') }}</el-button>
        </div>
    </div>
    <el-form  label-width="150px" v-show="active==3">
      <el-row>
        <el-col :span="8" >
          <el-form-item label="材质选择：" >
            <el-radio class="radio" v-model="spec" label="one">铜版纸名片</el-radio>
            <el-radio class="radio" v-model="spec" label="2" >Pvc名片材质</el-radio>
            <el-radio class="radio" v-model="spec" label="3">冰白纸</el-radio>
            <el-radio class="radio" v-model="spec" label="4" >布纹纸</el-radio>
            <el-radio class="radio" v-model="spec" label="5">炫银纸</el-radio>
            <el-radio class="radio" v-model="spec" label="6" >荷兰白卡纸</el-radio>
            <el-radio class="radio" v-model="spec" label="7">丽芙纸</el-radio>
            <el-radio class="radio" v-model="spec" label="8" >哑粉纸</el-radio>
          </el-form-item>

        </el-col>
        <el-col :span="8" >
          <el-form-item label="会员特价：" >
            <span style="color: red ">￥468元 / 200张</span>
          </el-form-item>
          <el-form-item label="订购数量：">
            <el-input-number v-model="orderForm.number" :min="0" :max="100000"></el-input-number>
          </el-form-item>
          <el-form-item label="应付价格：">
            ￥500元
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save" >{{$t('button.order')}}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-image src="/favicon.ico" class="logo"></el-image>
              <span>上海穆明信息有限公司</span>
              <el-button style="float: right; padding: 3px 0" type="text">+关注服务商</el-button>
            </div>
            <div>上海穆明信息科技有限公司秉持“勤奋、责任、积累、创新、团队合作”的核心价值观，争取通过自身不断的努力，为客户提供优质服务，为社会创造更大价值。</div>
            <el-row>
              <el-col :span="5" align="right"><el-button type="text" class="el-button">免费咨询</el-button></el-col>
              <el-col :span="5"  style="float: right; padding: 3px 0"><el-button type="text" class="el-button">查看主页</el-button></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
<!--
      <el-button type="primary" icon="el-icon-printer" @click="save">{{ $t('button.order') }}</el-button>
-->
      <el-tabs type="card">
        <el-tab-pane> <span slot="label"><i class="el-icon-star-on"></i> 用户评价</span>用户评价</el-tab-pane>
        <el-tab-pane> <span slot="label"><i class="el-icon-s-opportunity"></i> 流程说明</span>流程说明</el-tab-pane>
        <el-tab-pane> <span slot="label"><i class="el-icon-message"></i> 建议反馈</span>建议反馈</el-tab-pane>
      </el-tabs>
    </el-form>

    <el-form ref="form" :model="form"  label-width="150px" v-show="active==4" >
      <el-form-item label="我要评价：">
        <el-rate v-model="stars"></el-rate>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评价内容"
          v-model="textarea">
        </el-input>
      </el-form-item><br>
      <el-form-item label="上传图片：">
        <el-upload
          list-type="picture-card"
          :action="uploadUrl"
          :headers="uploadHeaders"
          :file-list="galleryList"
          :on-remove="handleRemove"
          :on-success="handleUploadGallerySuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="save" >{{$t('button.submit')}}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script src="./design.js"></script>

<style>
  .logo {
    width: 24px;
    height: 24px;
  }
  .center {
    margin-top: 15px;
    margin-left: 200px;
  }
 /* #search {
    background-color: #1a97ff;
    border-radius: 0%;
  }*/
  .search-title {
    color: #bdbaba;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .remove-history {
    color: #bdbaba;
    font-size: 15px;
    float: right;
    margin-top: -22px;
  }
  #search-box {
    width: 555px;
    height: 300px;
    margin-top: 0px;
    padding-bottom: 20px;
  }
</style>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<style scoped>

  .tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
  }

  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";

  $primary-front-color: var(--primaryFrontColor,#3f938b);//#3f938b;
  $primary-back-color: var(--primaryBackColor,#FFFFFF);//#FFFFFF;

  .image {
    width: 94mm;
    hight:54mm;
    display: block;
    margin-right: 10px;
  }
  .qrcode {
    position: relative;
    top: 0%;
    left: 1%;
    width: 60px;
    hight:60px;
  }
  .display-flex {
    display: flex;
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    margin-left: 12%;
    width: 100%;
  }

  .margin-set{
    margin-left: 2.5%;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0px;
  }
  .gwd-img-1ipa {
    position: relative;
    top: 0%;
    left: 0%;
    bottom: 0%;
    margin-bottom: -1%;
    width: 443.99px;
    height: 252.07px;
  }
  .gwd-span-18vz {
    position: absolute;
    font-weight: bold;
    color: $primary-front-color;
    transform-origin: 50% 50% 0px;
    left: 16%;
    top: 38.84%;
    font-size: 16px;
    width: 198.25px;
    height: 19.18px;
  }
  .gwd-span-z6x2 {
    position: absolute;
    transform-origin: 50% 50% 0px;
    font-weight: bold;
    color: $primary-front-color;
    left: 17%;
    top: 46.05%;
    font-size: 23px;
    width: 74.39px;
    height: 27.6px;
  }
  .gwd-span-1pxk {
    position: absolute;
    font-weight: bold;
    font-size: 15px;
    color: $primary-front-color;
    width: 11%;
    height: 4%;
    left: 23.6%;
    top: 44.5%;
  }
  .gwd-span-bhnv {
    position: absolute;
    font-weight: bold;
    color: $primary-front-color;
    left: 35.9%;
    top: 38.42%;
    font-size: 13px;
    width: 20%;
    height: 0.27%;
  }
  .gwd-span-1maf {
    position: absolute;
    transform-origin: 50% 50% 0px;
    font-weight: bold;
    color: $primary-front-color;
    left: 35.9%;
    top: 42.40%;
    font-size: 13px;
    width: 10.9%;
    height: 2.01%;
  }
  .gwd-span-7w50 {
    position: absolute;
    transform-origin: 50% 50% 0px;
    font-weight: bold;
    color: $primary-front-color;
    transform-style: preserve-3d;
    left: 35.9%;
    top: 45.5%;
    font-size: 13px;
    width: 11.59%;
    height: 4.14%;
  }
  .gwd-span-12za {
    position: absolute;
    transform-origin: 50% 50% 0px;
    font-weight: bold;
    color: $primary-front-color;
    transform-style: preserve-3d;
    left: 35.9%;
    top: 50.5%;
    font-size: 13px;
    width: 17.13%;
    height: 2.48%;
  }

  .gwd-img-mt5w {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 75%;
    top: 30.2%;
  }
  .gwd-p-1k6l {
    position: absolute;
    height: 32px;
    transform-origin: 50% 50% 0px;
    width: 51px;
    left: 214px;
    top: 124px;
    font-size: 22px;
    font-weight: bold;
    color: $primary-back-color;
  }
  .gwd-p-1yzs {
    position: absolute;
    color: $primary-back-color;
    font-weight: bold;
    font-size: 16px;
    text-align: justify;
    left: 55.7%;
    top: 48%;
    width: 25%;
    transform-style: preserve-3d;
    transform: translate3d(-7px, -2px, 0px) rotateZ(-0.845633deg);
  }
  /* .gwd-p-91fv {
     top: 39.8%;
     left: 70.5%;
   }*/
  .gwd-p-xsa5 {
    top: 39.8%;
    left: 64.2%;
    width: 30%;
  }

</style>

