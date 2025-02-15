declare global {
  interface Window {
    [key: string]: unknown
  }
}

import axios, { type AxiosRequestConfig } from 'axios'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
// import sysConfig from '@/config'
import { useToken } from '@/stores/counter'
import router from '@/router'
// import signMd5Utils from '@/utils/signMd5Utils'
axios.defaults.baseURL = ''

axios.defaults.timeout = 60000
// loading
class loadingInstance {
  loading: null
  loadingCount: number
  constructor(loading = null, count = 0) {
    this.loading = loading // 实例对象
    this.loadingCount = count // loading次数
  }
  showLoading(config: AxiosRequestConfig) {
    // 监测url带有page或list, 显示loadIng
    const urlSplitArr = (config.url || '').split('/')
    const [urlFlag = ''] = [...urlSplitArr].reverse()
    if (this.loadingCount === 0) {
      if (urlFlag === 'page') {
        // this.loading = ElLoading.service({
        // 	lock: true,
        // 	text: '加载中'
        // });
      }
    }
    this.loadingCount++
  }
  hideLoading() {
    // 隐藏loading
    this.loadingCount--
    if (this.loadingCount === 0) {
      // this.loading.close()
      this.loading = null
    }
  }
}

const loading = new loadingInstance()

// HTTP request 拦截器
axios.interceptors.request.use(
  (config) => {
    loading.showLoading(config)
    config.headers.pageName = router.currentRoute.value.name
    const token = useToken().token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    if (config.method == 'get') {
      config.params = config.params || {}
    }
    // Object.assign(config.headers, sysConfig.HEADERS)
    // 前端请求统一加签
    // const sign = signMd5Utils.getSign(config.url, config.params, config.data)
    // if (config.url.indexOf('?') != -1) {
    //   config.url = config.url + '&sign=' + sign
    // } else {
    //   config.url = config.url + '?sign=' + sign
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

//FIX 多个API同时401时疯狂弹窗BUG
let MessageBox_401_show = false

// HTTP response 拦截器
axios.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    response.data.code !== undefined && loading.hideLoading()
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === 0) {
      return response
    } else {
      ElMessage({
        duration: 5000,
        type: 'warning',
        message: response.data.msg,
      })
    }

    return response
  },
  (error) => {
    if (error.response) {
      loading.hideLoading()
      if (error.response.status == 404) {
        ElNotification.error({
          title: '请求错误',
          message: 'Status:404，正在请求不存在的服务器记录！',
        })
      } else if (error.response.status == 403) {
        ElNotification.error({
          title: '鉴权失败',
          message: error.response.data.msg || 'Status:403，鉴权失败！',
        })
      } else if (error.response.status == 500) {
        ElNotification.error({
          title: '请求错误',
          message: error.response.data.msg || 'Status:500，服务器发生错误！',
        })
      } else if (error.response.status == 401) {
        if (!MessageBox_401_show) {
          MessageBox_401_show = true
          ElMessageBox.confirm(
            '当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。',
            '无权限访问',
            {
              type: 'error',
              closeOnClickModal: false,
              center: true,
              confirmButtonText: '重新登录',
              beforeClose: (action, instance, done) => {
                MessageBox_401_show = false
                done()
              },
            },
          )
            .then(() => {
              // store.dispatch('Logout').then(() => {
              //   router.replace({ path: '/login' })
              // })
            })
            .catch(() => {})
        }
      } else {
        ElNotification.error({
          title: '请求错误',
          message: error.msg || `Status:${error.response.status}，未知错误！`,
        })
      }
    } else {
      loading.hideLoading()
      ElNotification.error({
        title: '请求错误',
        message: '请求服务器无响应！',
      })
    }
    return Promise.reject(error.response)
  },
)

const http = {
  /** get 请求
   * @param  {string} url 接口地址
   * @param  {object} params 请求参数
   * @param  {object} config 参数
   */
  get: function (url: string, params: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: params,
        ...config,
      })
        .then((response) => {
          if (config.responseType === 'blob') {
            resolve(response)
          } else {
            resolve(response.data)
          }
        })
        .catch((error) => {
          resolve(error || {})
          reject(error)
        })
    })
  },

  /** post 请求
   * @param  {string} url 接口地址
   * @param  {object} data 请求参数
   * @param  {object} config 参数
   */
  post: function (url: string = '', data: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config,
      })
        .then((response) => {
          if (config.responseType === 'blob') {
            resolve(response)
          } else {
            resolve(response.data)
          }
        })
        .catch((error) => {
          resolve(error || {})
        })
    })
  },

  /** post form 表单形式  请求
   * multipart/form-data
   * @param  {string} url 接口地址
   * @param  {object} data 请求参数
   * @param  {object} config 参数
   */
  postForm: function (url: string = '', data: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (config.responseType === 'blob') {
            resolve(response)
          } else {
            resolve(response.data)
          }
        })
        .catch((error) => {
          resolve(error || {})
        })
    })
  },

  /** put 请求
   * @param  {string} url 接口地址
   * @param  {object} data 请求参数
   * @param  {object} config 参数
   */
  put: function (url: string, data: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'put',
        url: url,
        data: data,
        ...config,
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          resolve(error || {})
        })
    })
  },

  /** patch 请求
   * @param  {string} url 接口地址
   * @param  {object} data 请求参数
   * @param  {object} config 参数
   */
  patch: function (url: string, data: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url: url,
        data: data,
        ...config,
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          resolve(error || {})
          reject(error)
        })
    })
  },

  /** delete 请求
   * @param  {string} url 接口地址
   * @param  {object} data 请求参数
   * @param  {object} config 参数
   */
  delete: function (url: string, data: object = {}, config: AxiosRequestConfig = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: data,
        ...config,
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          resolve(error || {})
          reject(error)
        })
    })
  },
  /**
   * 文件下载
   * @param url
   * @param data
   * @param config
   */
  download: function (
    url: string,
    data: object = {},
    config: AxiosRequestConfig = { responseType: 'blob' },
  ) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        ...config,
      })
        .then((res) => {
          if (res.status === 200) {
            const filename = res.headers['content-disposition'] || ''
            const blob = new Blob([res.data], {
              type: res.data.type,
            })
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = decodeURIComponent(filename.split('filename=')[1])
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement)
            window.URL.revokeObjectURL(href)
          }
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /** jsonp 请求
   * @param  {string} url 接口地址
   * @param  {string} name JSONP回调函数名称
   */
  jsonp: function (url: string, name: string = 'jsonp') {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      const _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
      script.id = _id
      script.type = 'text/javascript'
      script.src = url
      window[name] = (response: unknown) => {
        resolve(response)
        document.getElementsByTagName('head')[0].removeChild(script)
        try {
          delete window[name]
        } catch (e) {
          window[name] = undefined
          console.log(e)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  },
}

export default http
