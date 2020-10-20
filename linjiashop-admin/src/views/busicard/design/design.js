import editorImage from '@/components/Tinymce'
import {getApiUrl} from '@/utils/utils'
import {getToken} from '@/utils/auth'
import Store from "../../../utils/store";
import RandomUtil from "../../../utils/RandomUtil";
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import $ from 'jquery'
import { remove, getList, save } from '@/api/busicard/tempMarket'


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
        /*{
          id:1,
          tempName:"蓝色经典",
          tempDesc:"官方推荐蓝色系模板",
          preFrontImageUrl:"https://i.loli.net/2020/10/16/VYBjiOyL6cWksAR.jpg",
          preBackImageUrl:"https://i.loli.net/2020/10/16/i2eCK14L6QvTlZw.jpg",
          frontImageUrl:"https://i.loli.net/2020/10/15/C5fXe31H6AtlkI9.jpg",
          frontTextColor:"#7580c6",
          frontLocationStyle:"1",
          backImageUrl:"https://i.loli.net/2020/10/15/EPRloSeVsidbDHh.jpg",
          backTextColor:"#FFFFFF",
          backLocationStyle:"1",
          tempTag:"简洁,商务，蓝色",
          templateIndustry:"互联网",
          recommend:"0",
          stars:4.5,
          tempCode:"保留选项",
          temp_price:"0",
          srcFlag: true
        },
        {
          id:2,
          tempName:"绿色经典",
          tempDesc:"官方推荐绿色系模板",
          preFrontImageUrl:"https://i.loli.net/2020/10/16/tjNM1TCpHVG2l9Q.png",
          preBackImageUrl:"https://i.loli.net/2020/10/16/i7dhF4BCM9VlEpP.png",
          frontImageUrl:"https://i.loli.net/2020/10/15/AqvwkVUh7sB8tNL.jpg",
          frontTextColor:"#3f938b",
          frontLocationStyle:"1",
          backImageUrl:"https://i.loli.net/2020/10/15/bTN5ekVp8sPCGdW.jpg",
          backTextColor:"#FFFFFF",
          backLocationStyle:"1",
          tempTag:"简洁,商务，蓝色",
          templateIndustry:"互联网",
          recommend:"0",
          stars:4.5,
          tempCode:"保留选项",
          temp_price:"0",
          srcFlag: true
        }*/
      ],
      radio: '0',
      listLoading: true,
      selRow: {},
      textarea:"",
      stars:0,
      search: "", //当前输入框的值
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
        company:'上海穆明信息科技有限公司',
        phone:'18337936899',
        email:'1186664388@qq.com',
        address:'上海市闵行区申长路668号冠捷大厦G层',
        website:'https://busibetter.com',
        position:'高级开发经理',
        description:'几分钟制作一个网站，完全免费；在线极速制作名片，直接下单打印；企业融资贷款，省时省力；企业服务采购，满足多样性需求。',
        qrcode:'https://i.loli.net/2020/10/10/zRfneiAgoPwxUD2.jpg',
        memo:'这是备注内容，哈哈。',
        userid:'4',
        id: '1'
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
      return this.isFocus && !this.search;
    },
    isSearchList() {
      return this.isFocus && this.search;
    },
    isSearch() {
      return this.isFocus;
    }/*,
    variables() {
      return variables;
    }*/
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
    searchHandler() {
      //随机生成搜索历史tag式样
      let n = RandomUtil.getRandomNumber(0, 5);
      let exist =
        this.historySearchList.filter(value => {
          return value.name == this.search;
        }).length == 0
          ? false
          : true;
      if (!exist) {
        this.historySearchList.push({ name: this.search, type: this.types[n] });
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
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
    },
    prev() {
      if (this.active > 0) {
        this.active -= 1
      }
    },
    save() {

      if(this.active == 0 ){
        //操作说明：1.验证用户选择；2.保存用户数据并给待用的变量赋值
     /*   if(this.form.name === '' ||
          this.form.idCategory === '' ||
          this.form.descript === ''){
          this.$message({
            message: '请输入必要的商品项目',
            type: 'error'
          })
          return
        }
        goodsApi.saveBaseInfo({
          name: this.form.name,
          idCategory: this.form.idCategory,
          descript: this.form.descript,
          isNew: this.form.isNew,
          isHot:this.form.isHot
        }).then( response => {
          this.idGoods = response.data
        })
        attrValApi.getAttrBy(this.form.idCategory).then(response2 => {
          this.attrKeyList = response2.data.keyList
          this.attrValList = response2.data.valList
        })*/
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
      /*const content = this.getContent()
      const gallery = this.getGallery()
      if(this.spec === 'more'){
        //如果商品配置多规格，则删除单规格配置
        this.form.price =''
        this.form.marketingPrice =''
        this.form.stock = ''
      }
      goodsApi.save({
        name: this.form.name,
        pic: this.form.pic,
        gallery: gallery,
        idCategory: this.form.idCategory,
        descript: this.form.descript,
        detail: content,
        stock: this.form.stock,
        price: this.form.price,
        isDelete: this.form.isDelete,
        isOnSale: this.form.isOnSale,
        id: this.idGoods,
        isNew: this.form.isNew,
        isHot:this.form.isHot
      }).then(response => {
        this.$message({
          message: this.$t('common.optionSuccess'),
          type: 'success'
        })
        this.$router.push('/goods')
      })*/
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
