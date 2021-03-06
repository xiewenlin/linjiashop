import { remove, getList, save } from '@/api/busicard/businessCard'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import $ from 'jquery'
import { get } from '@/api/busicard/tempMarket'


export default {
  data() {
    return {
      printerVisible: false,
      printerTitle:"名片效果预览",
      formVisible: false,
      formTitle: '添加名片设计',
      isAdd: true,
      userid:'',
      selTempRow:{},
      form: {
        name:'',
        company:'',
        phone:'',
        email:'',
        address:'',
        website:'',
        position:'',
        description:'',
        qrcode:'',
        memo:'',
        userid:'',
        id: '',
        templateId:'',
        logo:''
      },
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      rules:{
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度必须在2到20个字符以内', trigger: 'blur' }
        ],
        company:[
          { required: true, message: '公司名称不能为空', trigger: 'blur' },
          { min: 2, max: 100, message: '公司名称长度必须在2到100个字符以内', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '姓名长度必须在2到20个字符以内', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '邮箱长度必须在2到50个字符以内', trigger: 'blur' }
        ],
        address:[
          { required: false, message: '地址不能为空', trigger: 'blur' },
          { min: 2, max: 200, message: '地址长度必须在2到200个字符以内', trigger: 'blur' }
        ],
        website:[
          { required: false, message: '网址不能为空', trigger: 'blur' },
          { min: 2, max: 200, message: '网址长度必须在2到200个字符以内', trigger: 'blur' }
        ],
        position:[
          { required: false, message: '职位不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '职位长度必须在2到50个字符以内', trigger: 'blur' }
        ],
        description:[
          { required: false, message: '业务介绍', trigger: 'blur' },
          { min: 1, max: 500, message: '业务介绍长度必须在1到500个字符以内', trigger: 'blur' }
        ],
        qrcode:[
          { required: false, message: '二维码不能为空', trigger: 'blur' },
          { min: 1, max: 500, message: '二维码长度必须在1到500个字符以内', trigger: 'blur' }
        ],
        memo:[
          { required: false, message: '备注不能为空', trigger: 'blur' },
          { min: 2, max: 200, message: '备注长度必须在2到200个字符以内', trigger: 'blur' }
        ],
        logo:[
          { required: false, message: 'LOGO不能为空', trigger: 'blur' },
          { min: 2, max: 500, message: 'LOGO长度必须在2到500个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  computed: {
    //表单验证
/*    rules() {
      return {
        name: [
          { required: true, message: '姓名不能为空呀', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度必须在2到20个字符以内', trigger: 'blur' }
        ]
      }
    }*/
  },
  created() {
    this.init()

  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        this.userid=response.data.filters[0].value
      })
    },
    search() {
      this.fetchData()
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
    resetForm() {
      this.form = {
        name:'',
        company:'',
        phone:'',
        email:'',
        address:'',
        website:'',
        position:'',
        description:'',
        qrcode:'',
        memo:'',
        userid:'',
        id: '',
        templateId:'',
        logo:''
      }
    },
    add() {
      this.resetForm()
      this.form.userid=this.userid;
      this.formTitle = '添加名片设计',
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          save({
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
      userid:this.form.userid,
      id: this.form.id,
      templateId:this.form.templateId,
      logo:this.form.logo
          }).then(response => {
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
          })
        } else {
          return false
        }
      })
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: this.$t('common.mustSelectOne'),
        type: 'warning'
      })
      return false
    },
    edit() {
      if (this.checkSel()) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '编辑名片设计'
        this.formVisible = true
      }
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
          if(imgUrlFront=='data:,'||imgUrlBack=='data:,'){
            this.$notify.error({
              title: '下载出错啦',
              message: '图片生成失败，请联系客服！'
            })
            return;
          }
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
    },download(href, name){//压在Blob格式的图片
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },downloadByBlob(url,name){//根据图片url下载图片
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob)
          download(url,name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    },
    printer() {
      if (this.checkSel()) {
        //查询模板信息
        get(this.selRow.templateId).then(response => {
          this.selTempRow = response.data;
          document.getElementsByTagName('body')[0].style.setProperty('--primaryFrontColor', this.selTempRow.frontTextColor);
          document.getElementsByTagName('body')[0].style.setProperty('--primaryBackColor', this.selTempRow.backTextColor);
        })

      this.form = this.selRow
      this.printerVisible = true
      }
    },
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm(this.$t('common.deleteConfirm'), this.$t('common.tooltip'), {
          confirmButtonText: this.$t('button.submit'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          remove(id).then(response => {
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
          }).catch( err=> {
            this.$notify.error({
              title: '错误',
              message: err
            })
          })
        }).catch(() => {
        })
      }
    }

  }
}
