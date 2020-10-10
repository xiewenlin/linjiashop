import countryApi from '@/api/covid/country'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '添加新冠肺炎分布',
      isAdd: true,
      form: {
        id: '',
        name: '',
        count: '',
        deadCount: ''
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: '国家不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '国家长度必须在2到20个字符以内', trigger: 'blur' }
        ],
        cfgValue: [
          { required: true, message: '累计确诊人数必填', trigger: 'blur' }
        ]
      }
    }
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
      countryApi.getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
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
        id: '',
        name: '',
        count: '',
        deadCount: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '添加新冠肺炎国家统计数据'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          countryApi.save({
            id: this.form.id,
            name: this.form.name,
            count: this.form.count,
            deadCount: this.form.deadCount
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
        this.formTitle = '修改新冠肺炎国家统计数据'
        this.formVisible = true
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
          countryApi.remove(id).then(response => {
            this.$message({
              message: this.$t('common.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }

  }
}
