<template>
    <div class="app-container">
        <div class="block">
            <el-row>
                <el-col :span="24">
                    <el-button type="success" size="mini"  icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
                    <el-button type="primary" size="mini"  icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
                    <el-button type="danger" size="mini"  icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
                    <el-button type="warning" size="mini"  icon="el-icon-printer" @click.native="printer">{{ $t('button.printer') }}</el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
                  @current-change="handleCurrentChange">
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column label="公司名称">
                <template slot-scope="scope">
                    {{scope.row.company}}
                </template>
            </el-table-column>
            <el-table-column label="电话">
                <template slot-scope="scope">
                    {{scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column label="邮箱">
                <template slot-scope="scope">
                    {{scope.row.email}}
                </template>
            </el-table-column>
            <el-table-column label="地址">
                <template slot-scope="scope">
                    {{scope.row.address}}
                </template>
            </el-table-column>
            <el-table-column label="网址">
                <template slot-scope="scope">
                    {{scope.row.website}}
                </template>
            </el-table-column>
            <el-table-column label="职位">
                <template slot-scope="scope">
                    {{scope.row.position}}
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="业务介绍">
                <template slot-scope="scope">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="二维码">
                <template slot-scope="scope">
                    {{scope.row.qrcode}}
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    {{scope.row.memo}}
                </template>
            </el-table-column>
            <el-table-column label="用户ID">
                <template slot-scope="scope">
                    {{scope.row.userid}}
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="listQuery.limit"
                :total="total"
                @size-change="changeSize"
                @current-change="fetchPage"
                @prev-click="fetchPrev"
                @next-click="fetchNext">
        </el-pagination>

        <el-dialog
                :title="formTitle"
                :visible.sync="formVisible"
                width="70%">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
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
                    <el-col :span="12">
                        <el-form-item label="备注"  >
                            <el-input v-model="form.memo" minlength=1></el-input>
                        </el-form-item>
                    </el-col>
                   <!-- <el-col :span="12">
                        <el-form-item label="用户ID"  >
                            <el-input v-model="form.userid" minlength=1></el-input>
                        </el-form-item>
                    </el-col>-->
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
                    <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
      <el-dialog
        :title="printerTitle"
        :visible.sync="printerVisible"
        width="62%">
      <div >
        <!--下面显示已生成的名片预览图片-->
        <!--<el-image :src="imgUrl"></el-image>-->
        <div class="display-flex" v-show="selTempRow.frontLocationStyle==1">
          <div ref="captureFront">
            <img :src="selTempRow.frontImageUrl" id="green_front" class="gwd-img-1ipa"><span class="gwd-span-18vz">{{form.company}}</span><span class="gwd-span-z6x2">{{form.name}}</span>
            <p class="gwd-span-1pxk">{{form.position}}</p><span class="gwd-span-bhnv">{{form.email}}</span><span class="gwd-span-1maf">{{form.phone}}</span><span class="gwd-span-7w50">{{form.address}}</span><span class="gwd-span-12za">{{form.website}}</span>
          </div>
          <div ref="captureBack" class="margin-set">
            <img :src="selTempRow.backImageUrl" id="green_back" class="gwd-img-1ipa">
           <el-image :src="form.qrcode" id="qrcode" class="gwd-img-mt5w"></el-image>
            <p class="gwd-p-1k6l gwd-p-xsa5">业务</p>
            <p class="gwd-p-1k6l gwd-p-91fv">介绍</p>
            <p class="gwd-p-1yzs">{{form.description}}</p>
          </div>
        </div>
        <div class="display-flex" v-show="selTempRow.frontLocationStyle==2" >
          <div ref="captureFront" >
            <img :src="selTempRow.frontImageUrl"  class="gwd-img-1ipa-2"><span class="gwd-span-z6x2-2">{{form.name}}</span>
            <el-image :src="form.qrcode"  class="gwd-img-mt5w-2-2"></el-image>
            <p class="gwd-span-1pxk-2">{{form.position}}</p><span class="gwd-span-bhnv-2">{{form.email}}</span><span class="gwd-span-1maf-2">{{form.phone}}</span><span class="gwd-span-7w50-2">{{form.address}}</span><span class="gwd-span-12za-2">{{form.website}}</span>
          </div>
          <div ref="captureBack" class="margin-set" >
            <img :src="selTempRow.backImageUrl"  class="gwd-img-1ipa-2">
            <el-image :src="form.qrcode"  class="gwd-img-mt5w-2"></el-image>
            <p class="gwd-p-1k6l-2 gwd-p-xsa5-2">业务介绍</p>
            <!--<p class="gwd-p-1k6l gwd-p-91fv">介绍</p>-->
            <p class="gwd-p-1yzs-2">{{form.description}}</p>
          </div>
        </div>
        <br/>
        <div align="center">
        <el-button type="primary" icon="el-icon-printer" @click="save">{{ $t('button.order') }}</el-button>
        <el-button @click.native="printerVisible = false" type="danger" icon="el-icon-close">{{ $t('button.cancel') }}</el-button>
        <el-button type="warning"  icon="el-icon-download" @click.native="downloadBusinessCard">{{ $t('button.download') }}</el-button>
        </div>
      </div>
      </el-dialog>
      <div>
        <!--<el-image :src="imgUrl"></el-image>-->
        </div>
      <!--底部分割线-->
    </div>
</template>
<script src="./businessCard.js"></script>
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
    }
  .margin-set{
   margin-left: 2.5%;
  }

  /*
  风格1样式
  */
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
      left: 4%;
      top: 35.84%;
      font-size: 16px;
      width: 198.25px;
      height: 19.18px;
    }
    .gwd-span-z6x2 {
      position: absolute;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      left: 5%;
      top: 43.05%;
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
      left: 12.6%;
      top: 41.5%;
    }
    .gwd-span-bhnv {
      position: absolute;
      font-weight: bold;
      color: $primary-front-color;
      left: 31.9%;
      top: 35.42%;
      font-size: 13px;
      width: 20%;
      height: 0.27%;
    }
    .gwd-span-1maf {
      position: absolute;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      left: 31.9%;
      top: 41.40%;
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
      left: 31.9%;
      top: 46.1%;
      font-size: 13px;
      width: 15.59%;
      height: 4.14%;
    }
    .gwd-span-12za {
      position: absolute;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      transform-style: preserve-3d;
      left: 31.9%;
      top: 54.0%;
      font-size: 13px;
      width: 17.13%;
      height: 2.48%;
    }

    .gwd-img-mt5w {
      position: absolute;
      width: 60px;
      height: 60px;
      left: 88%;
      top: 22%;
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
      left: 57%;
      top: 50%;
      width: 35%;
      transform-style: preserve-3d;
      transform: translate3d(-7px, -2px, 0px) rotateZ(-0.845633deg);
    }
    .gwd-p-91fv {
      top: 37%;
      left: 77.5%;
    }
    .gwd-p-xsa5 {
      top: 37%;
      left: 67.2%;
    }

    /*风格2样式*/
    .gwd-img-mt5w-2 {
      width: 120px;
      height: 120px;
      left: 1.8%;
      top: -38%;
    }
    .gwd-img-mt5w-2-2 {
      position: absolute;
      width: 120px;
      height: 120px;
      left: 6.8%;
      top: 35.5%;
    }
    .gwd-img-1ipa-2 {
      position: relative;
      top: 0%;
      left: 0%;
      bottom: 0%;
      margin-bottom: -1%;
      width: 443.99px;
      height: 252.07px;
    }
    .gwd-span-18vz-2 {
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
    .gwd-span-z6x2-2 {
      position: absolute;
      -webkit-transform-origin: 50% 50% 0px;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      left: 21%;
      top: 41.6%;
      font-size: 14px;
      width: 76.39px;
      height: 27.6px;
    }
    .gwd-span-1pxk-2 {
      position: absolute;
      font-weight: bold;
      font-size: 8.7px;
      color: $primary-front-color;
      width: 11%;
      height: 4%;
      left: 29.6%;
      top: 40.50%;
    }
    .gwd-span-bhnv-2 {
      position: absolute;
      font-weight: bold;
      color: $primary-front-color;
      left: 32.9%;
      top: 45.9%;
      font-size: 7.0px;
      width: 20%;
      height: 0.27%;
    }
    .gwd-span-1maf-2 {
      position: absolute;
      -webkit-transform-origin: 50% 50% 0px;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      left: 20.9%;
      top: 45.9%;
      font-size: 7.0px;
      width: 11.9%;
      height: 2.01%;
    }
    .gwd-span-7w50-2 {
      position: absolute;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      transform-style: preserve-3d;
      left: 20.9%;
      top: 49.0%;
      font-size: 7.0px;
      width: 28.59%;
      height: 4.14%;
    }
    .gwd-span-12za-2 {
      position: absolute;
      -webkit-transform-origin: 50% 50% 0px;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      color: $primary-front-color;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      left: 26.9%;
      top: 60.5%;
      font-size: 7.0px;
      width: 17.13%;
      height: 2.48%;
    }


    .gwd-p-1k6l-2 {
      position: absolute;
      height: 32px;
      transform-origin: 50% 50% 0px;
      width: 51px;
      left: 214px;
      top: 124px;
      font-size: 14px;
      font-weight: bold;
      color: $primary-back-color;
    }
    .gwd-p-1yzs-2 {
      position: absolute;
      color: $primary-back-color;
      transform-origin: 50% 50% 0px;
      font-weight: bold;
      font-size: 7.0px;
      left: 66.2%;
      top: 43%;
      width: 28%;
    }
    /* .gwd-p-91fv {
       top: 39.8%;
       left: 70.5%;
     }*/
    .gwd-p-xsa5-2 {
      top: 38.2%;
      left: 66.2%;
      width: 30%;
    }
</style>

