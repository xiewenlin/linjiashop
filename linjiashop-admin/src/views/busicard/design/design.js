import editorImage from '@/components/Tinymce'
import {getApiUrl} from '@/utils/utils'
import {getToken} from '@/utils/auth'
import Store from "../../../utils/store";
import RandomUtil from "../../../utils/RandomUtil";
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import $ from 'jquery'
import { remove, getList ,save as saveTempMarket} from '@/api/busicard/tempMarket'
import { save as saveBusinessCard} from '@/api/busicard/businessCard'
import { getList as getDicList } from '@/api/system/dict'

export default {
  components: {editorImage},
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-business-card-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    }
    },
  data() {
    return {
      tempList:[
      ],
      dicList:[],
      listQuery: {
        search:undefined,
        page: 1,
        limit: 10,
        id: undefined,
        name:'行业',
        searchType:0
      },
      total: 0,
      radio: '0',
      listLoading: true,
      selRow: {},
      textarea:"",
      stars:0,
      //search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      hotSearchList: ["暂无热门搜索"], //热门搜索数据
      historySearchList: [], //历史搜索数据
      searchList: ["暂无数据"], //搜索返回数据,
      history: false,
      types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
      src: 'https://s1.ax1x.com/2020/10/12/0RyJ41.png',
      spec:'one',
      specs:[],
      specDialogFormVisible:false,
      skuForm:{},
      attrKeySel:'',
      attrKeyList:[],
      attrValList:[],
      showAddAttrKey:false,
      attrKeyForm:{attrName:''},
      attrValForm:{attrVal:''},
      attrValSel:'',
      attrValListSel:[],
      tags:[
      ],
      form: {
        name:'谢文林',
        company:'上海穆明信息科技有限公司',//
        phone:'手机：18337936899',
        email:'邮箱：1186664388@qq.com',
        address:'地址：上海市闵行区申长路668号冠捷大厦G层',
        website:'https://busibetter.com',
        position:'高级开发经理',
        description:'几分钟制作一个网站，完全免费；在线极速制作名片，直接下单打印；企业融资贷款，省时省力；企业服务采购，满足多样性需求。',
        qrcode:'https://i.loli.net/2020/10/20/4VAeoPcUNu3ynkq.png',
        memo:'这是备注内容，哈哈。',
        id:null
      },
      orderForm: {
        number:200,
        total:'500元'
      }
      ,
      skuList:[],
      uploadUrl: '',
      uploadFileId: '',
      uploadHeaders: {
        'Authorization': ''
      },
      idGoods: '',
      active: 0,
      categories: [],
      tinymceId: 'tinymceId',
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      },
      galleryList: [],
      apiUrl: getApiUrl()
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    },
    isHistorySearch() {
      return this.isFocus && !this.listQuery.search;
    },
    isSearchList() {
      return this.isFocus && this.listQuery.search;
    },
    isSearch() {
      return this.isFocus;
    }/*,
    variables() {
      return variables;
    }*/,
    //表单验证
    rules() {
      return {
        // cfgName: [
        //   { required: true, message: this.$t('config.name') + this.$t('common.isRequired'), trigger: 'blur' },
        //   { min: 3, max: 2000, message: this.$t('config.name') + this.$t('config.lengthValidation'), trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      /*this.uploadUrl = getApiUrl() + '/file'
      this.uploadHeaders['Authorization'] = getToken()
      this.idGoods = this.$route.query.id*/
      this.fetchData()
    },

    /*handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },*/
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
      radioOption(item){
        this.selRow=item;
        /*this.variables.primaryFrontColor=item.frontTextColor;
        this.variables.primaryBackColor=item.backTextColor;*/
        document.getElementsByTagName('body')[0].style.setProperty('--primaryFrontColor', item.frontTextColor);
        document.getElementsByTagName('body')[0].style.setProperty('--primaryBackColor', item.backTextColor);
      },
      downloadBusinessCard(){
        var imgUrlFront;
        var imgUrlBack;
        //保存名片基本信息
        this.$refs['form'].validate((valid) => {
          if (valid) {
            saveBusinessCard({
              name:this.form.name,
              company:this.form.company,
              phone:this.form.phone,
              email:this.form.email,
              address:this.form.address,
              website:this.form.website,
              position:this.form.position,
              description:this.form.description,
              qrcode:this.form.qrcode,
              memo:this.form.memo,
              templateId:this.selRow.id,
              id:this.form.id
            }).then(response => {
              this.form.id=response.data.id;
              //下载
              //下载正反面名片压缩包
              html2canvas(this.$refs.captureFront,{
                scale: 3,//图片放大3倍,解决图片模糊问题
                useCORS   : true,// 允许使用跨域图片
                allowTaint: false// 不允许跨域图片污染画布
              }).then(canvas => {
                // 转成图片，生成图片地址
                imgUrlFront = canvas.toDataURL("image/png");
                //this.download(this.imgUrl,"名片正面")
                html2canvas(this.$refs.captureBack,{
                  scale: 3,//图片放大3倍,解决图片模糊问题
                  useCORS   : true,// 允许使用跨域图片
                  allowTaint: false// 不允许跨域图片污染画布
                }).then(canvas => {
                  // 转成图片，生成图片地址
                  imgUrlBack = canvas.toDataURL("image/png");
                  this.downloadZip(imgUrlFront,imgUrlBack);
                });
              });

            })
          } else {
            return false
          }
        })
    },
    downloadZip (imgUrlFront,imgUrlBack) {
      var zip = new JSZip();
      //新增ReadMe文件
      zip.file("ReadMe.txt", "商嘉网：https://busibetter.com/\n");
      // 创建images文件夹
      var imgFolder = zip.folder("images");
      let arr = [imgUrlFront,
        imgUrlBack
      ];
      let flag = 0 //  判断加载了几张图片的标识
      for (let i = 0;i < arr.length;i++) {
        getBase64(arr[i]).then(function(base64){
          base64 = base64.split('base64,')[1]
          imgFolder.file(i + '.png', base64, { base64: true })
          //imgFolder.file(i + '.png', base64, { base64: true })
          if (flag === arr.length - 1) {
            zip.generateAsync({ type: "blob" }).then((blob) => {
              saveAs(blob, "我的名片.zip")
            })
          }
          flag++
        },function(err){
          console.log(err);//打印异常信息
          //设定时间后只执行函数一次
          //setTimeout(this.downloadZip (frontUrl,backUrl), 1000)
        });
      }
      function getBase64(img){
        function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
          var canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
          var ctx = canvas.getContext("2d");
          // 关闭抗锯齿
          ctx.mozImageSmoothingEnabled = false;
          ctx.webkitImageSmoothingEnabled = false;
          ctx.msImageSmoothingEnabled = false;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          return dataURL;
        }
        var image = new Image();
        image.crossOrigin = '*';
        image.src = img;
        var deferred=$.Deferred();
        if(img){
          image.onload =function (){
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
          }
          return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
      }
    },
    focus() {
      this.isFocus = true;
      this.historySearchList =
        Store.loadHistory() == null ? [] : Store.loadHistory();
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    blur() {
      var self = this;
      this.searchBoxTimeout = setTimeout(function() {
        self.isFocus = false;
      }, 300);
    },
    enterSearchBoxHanlder() {
      clearTimeout(this.searchBoxTimeout);
    },
    searchHandler(search,searchType) {
        this.listQuery.searchType=searchType;
      //随机生成搜索历史tag式样
      let n = RandomUtil.getRandomNumber(0, 5);
      let exist =
        this.historySearchList.filter(value => {
          return value.name == this.listQuery.search;
        }).length == 0
          ? false
          : true;
      if (!exist&&this.listQuery.search!=null&&this.listQuery.search!='undefined'&&this.listQuery.search!='') {
        this.historySearchList.push({ name: this.listQuery.search, type: this.types[n] });
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
      if(search!=null||search!=''){
        this.listQuery.search=search;
      }
      //调用查询模板方法
      this.listQuery.page = 1
      this.fetchData();
    },
    closeHandler(search) {
      this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
      Store.saveHistory(this.historySearchList);
      clearTimeout(this.searchBoxTimeout);
      if (this.historySearchList.length == 0) {
        this.history = false;
      }
    },
    removeAllHistory() {
      Store.removeAllHistory();
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.tempList = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
      //查询行业数据
      getDicList(this.listQuery).then(response => {
        var dicString = response.data[0].detail;
        this.dicList=dicString.split(',');
      }).catch(() => {
      })

    },
    prev() {
      if (this.active > 0) {
        this.active -= 1
      }
    },
    save() {
      if(this.active == 0 ){
        //操作说明：1.验证用户选择；2.保存用户数据并给待用的变量赋值
        if(this.radio=='0'){
          this.$message({
            message: '请选择一个必要的模板再点“下一步”',
            type: 'error'
          })
          return
        }

      }

      if(this.active==3){
        //保存名片基本信息
        this.$refs['form'].validate((valid) => {
          if (valid) {
            saveBusinessCard({
              name:this.form.name,
              company:this.form.company,
              phone:this.form.phone,
              email:this.form.email,
              address:this.form.address,
              website:this.form.website,
              position:this.form.position,
              description:this.form.description,
              qrcode:this.form.qrcode,
              memo:this.form.memo,
              templateId:this.selRow.id,
              id:this.form.id
            }).then(response => {
              this.form.id=response.data.id;
            })
          } else {
            return false
          }
        })
      }

      if (this.active < 3) {
        this.active++
        return
      }
      this.$message({
        message: this.$t('common.optionSuccess'),
        type: 'success'
      })
      this.active++
      return
    },
    getGallery() {
      let gallery = ''
      for (let i = 0; i < this.galleryList.length; i++) {
        if (i == 0) {
          gallery = this.galleryList[i].id
        } else {
          gallery += (',' + this.galleryList[i].id)
        }

      }
      return gallery
    },
    handleRemove: function (file, fileList) {
      for (var i = 0; i < this.galleryList.length; i++) {
        if (this.galleryList[i].id === file.id) {
          this.galleryList.splice(i, 1)
        }
      }

    },
    handleUploadPicSuccess(response, raw) {
      if (response.code === 20000) {
        this.form.pic = response.data.realFileName
      } else {
        this.$message({
          message: this.$t('common.uploadError'),
          type: 'error'
        })
      }
    },
    reset() {
      this.listQuery.id = ''
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClose() {

    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    handleUploadGallerySuccess(response, raw) {
      if (response.code === 20000) {
        this.galleryList.push(
          {
            id: response.data.realFileName,
            url: this.apiUrl + '/file/getImgStream?idFile=' + response.data.realFileName
          }
        )
      } else {
        this.$message({
          message: this.$t('common.uploadError'),
          type: 'error'
        })
      }
    }

  }
}
