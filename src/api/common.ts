import http from '@/utils/request'
// import fetchJsonp from 'fetch-jsonp'
//测试
export const getUserList = (params: object) => {
  return http.get('/api/user/list', params)
}

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch('https://v1.hitokoto.cn')
  return await res.json()
}

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key: string) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`)
  return await res.json()
}

// 获取高德地理天气信息
export const getWeather = async (key: string, city: unknown) => {
  const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`)
  return await res.json()
}

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  const res = await fetch('https://api.oioweb.cn/api/weather/GetWeather')
  return await res.json()
}

export const getWebSiteList = async (params: object) => {
  return await http.get('/api/webSite/list', params)
}

export const getNewConfig = async () => {
  return await http.get('/api/web-config/getNewConfig')
}
