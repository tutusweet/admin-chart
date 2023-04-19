// Copyright (c) 2023 smable<316245279@qq.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import axios from "axios"
const request = axios.create({
  baseURL: "http://39.103.151.139:3001/apis",
  timeout: 3000,
})
request.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data
    }
    throw Error("数据请求失败")
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default request
