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
            <el-table-column label="我能提供的价值">
                <template slot-scope="scope">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column label="二维码">
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
        width="50%">
      <div >
        <!--下面显示已生成的名片预览图片-->
        <!--<el-image :src="imgUrl"></el-image>-->
        <div>
          <div>
            <img src="green_front.jpg" id="正面_meitu_1" class="gwd-img-1ipa"><span class="gwd-span-18vz">上海穆明信息科技有限公司</span><span class="gwd-span-z6x2">谢文林</span>
            <p class="gwd-span-1pxk">高级开发经理</p><span class="gwd-span-bhnv">1186664388@qq.com</span><span class="gwd-span-1maf">18337936899</span><span class="gwd-span-7w50">上海市闵行区申长路668号<br>冠捷大厦G层</span><span class="gwd-span-12za">https://busibetter.com</span>
          </div>
        </div>
        <br/>
        <div align="center">
        <el-button type="primary" @click="save">{{ $t('button.order') }}</el-button>
        <el-button @click.native="printerVisible = false">{{ $t('button.cancel') }}</el-button>
          <el-button type="warning" size="mini"  icon="el-icon-printer" @click.native="download">{{ $t('button.printer') }}</el-button>
        </div>
      </div>
      </el-dialog>
      <div>
        <el-image :src="imgUrl"></el-image>
        </div>
      <!--底部分割线-->
    </div>
</template>
<script src="./businessCard.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/common.scss";
    .image {
      width: 94mm;
      hight:54mm;
      display: block;
      margin-right: 10px;
    }
</style>
<style type="text/css" id="gwd-text-style">p {
  margin: 0px;
}
h1 {
  margin: 0px;
}
h2 {
  margin: 0px;
}
h3 {
  margin: 0px;
}</style>
<style type="text/css">html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
}

.gwd-img-1ipa {
  position: absolute;
  height: 328px;
  left: 111px;
  top: 99px;
  width: 578px;
}
.gwd-span-18vz {
  position: absolute;
  font-weight: bold;
  color: rgb(63, 147, 139);
  height: 25px;
  transform-origin: 50% 50% 0px;
  -webkit-transform-origin: 50% 50% 0px;
  -moz-transform-origin: 50% 50% 0px;
  top: 203px;
  font-size: 17px;
  left: 130px;
  width: 258px;
}
.gwd-span-z6x2 {
  position: absolute;
  transform-origin: 50% 50% 0px;
  -webkit-transform-origin: 50% 50% 0px;
  -moz-transform-origin: 50% 50% 0px;
  left: 172px;
  top: 245px;
  font-weight: bold;
  color: rgb(63, 147, 139);
  width: 97px;
  height: 36px;
  font-size: 30px;
}
.gwd-span-1pxk {
  position: absolute;
  font-weight: bold;
  font-size: 15px;
  left: 269px;
  top: 281px;
  color: rgb(63, 147, 139);
}
.gwd-span-bhnv {
  position: absolute;
  left: 486px;
  top: 182px;
  font-weight: bold;
  color: rgb(63, 147, 139);
}
.gwd-span-1maf {
  position: absolute;
  height: 17px;
  transform-origin: 50% 50% 0px;
  -webkit-transform-origin: 50% 50% 0px;
  -moz-transform-origin: 50% 50% 0px;
  width: 118px;
  font-weight: bold;
  color: rgb(63, 147, 139);
  left: 485px;
  top: 212px;
}
.gwd-span-7w50 {
  position: absolute;
  transform-origin: 50% 50% 0px;
  -webkit-transform-origin: 50% 50% 0px;
  -moz-transform-origin: 50% 50% 0px;
  font-weight: bold;
  color: rgb(63, 147, 139);
  width: 195px;
  height: 35px;
  left: 488px;
  top: 248px;
  font-size: 15px;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform: translate3d(0px, -7px, 0px) rotateZ(-0.493996deg);
  -webkit-transform: translate3d(0px, -7px, 0px) rotateZ(-0.493996deg);
  -moz-transform: translate3d(0px, -7px, 0px) rotateZ(-0.493996deg);
}
.gwd-span-12za {
  position: absolute;
  left: 488px;
  height: 21px;
  transform-origin: 50% 50% 0px;
  -webkit-transform-origin: 50% 50% 0px;
  -moz-transform-origin: 50% 50% 0px;
  font-weight: bold;
  color: rgb(63, 147, 139);
  width: 186px;
  top: 285px;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform: translate3d(-5px, 3px, 0px) rotateZ(-0.653713deg);
  -webkit-transform: translate3d(-5px, 3px, 0px) rotateZ(-0.653713deg);
  -moz-transform: translate3d(-5px, 3px, 0px) rotateZ(-0.653713deg);
}</style>
